import { TIngredient } from '../types';
import { request } from '../../utils/request';
import { TAppDispatch, TAppThunk } from '../reducers';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR' as const;

export type IngredientsResponseType = {
	success: boolean;
	data: Array<TIngredient>;
};

export const getIngredients =
	(): TAppThunk => async (dispatch: TAppDispatch) => {
		dispatch({ type: GET_INGREDIENTS_REQUEST });
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
