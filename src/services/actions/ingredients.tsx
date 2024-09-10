import { TIngredient } from '../reducers/ingredients';
import { request } from '../../utils/request';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export type IngredientsResponseType = {
	success: boolean;
	data: TIngredient[];
};

export const getIngredients = () => {
	return async function (
		dispatch: (arg0: { type: string; ingredients?: TIngredient[] }) => void
	) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		try {
			const data = await request('ingredients');
			dispatch({
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: (data as IngredientsResponseType).data,
			});
		} catch (error) {
			dispatch({
				type: GET_INGREDIENTS_ERROR,
			});
		}
	};
};
