import { IngredientType } from '../reducers/ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
	return async function (
		dispatch: (arg0: { type: string; ingredients?: IngredientType[] }) => void
	) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		try {
			const res = await fetch(apiUrl);
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
					type: GET_INGREDIENTS_ERROR,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_INGREDIENTS_ERROR,
			});
		}
	};
};
