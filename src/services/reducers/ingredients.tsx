import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';
import { TIngredient } from '../types';
import { TIngredientsAction } from '../constants/ingredients';

type TIngredientsState = {
	ingredients: TIngredient[] | [];
	isLoading: boolean;
	hasError: boolean;
};

const initialState: TIngredientsState = {
	ingredients: [],
	isLoading: false,
	hasError: false,
};

export const ingredientsReducer = (
	state: TIngredientsState = initialState,
	action: TIngredientsAction
): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				isLoading: true,
				hasError: false,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				ingredients: action.ingredients,
				isLoading: false,
				hasError: false,
			};
		}
		case GET_INGREDIENTS_ERROR: {
			return {
				...state,
				isLoading: false,
				hasError: true,
			};
		}
		default: {
			return state;
		}
	}
};
