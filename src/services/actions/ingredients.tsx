import {
	IngredientType,
	IngredientsStateTypes,
	IngredientsActionTypes,
} from '../reducers/ingredients';
import { ThunkAction } from 'redux-thunk';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = (): ThunkAction<
	void,
	IngredientsStateTypes,
	unknown,
	IngredientsActionTypes
> => {
	return async function (
		dispatch: (arg0: { type: string; ingredients?: IngredientType[] }) => void
	) {
		dispatch({
			type: GET_INGREDIENTS,
		});
		try {
			const res = await fetch(
				'https://norma.nomoreparties.space/api/ingredients'
			);
			if (!res.ok) {
				throw new Error('Ответ сети был не ok.');
			}
			const data = await res.json();
			if (data && data.success) {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: data.data,
				});
			} else {
				dispatch({
					type: GET_INGREDIENTS_FAILED,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_INGREDIENTS_FAILED,
			});
		}
	};
};
