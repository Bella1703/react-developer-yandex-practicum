import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};
type TGetIngredientsAction = {
	type: typeof GET_INGREDIENTS_REQUEST;
};
type TGetIngredientsSuccessAction = {
	type: typeof GET_INGREDIENTS_SUCCESS;
	ingredients: TIngredient[];
};
type TGetIngredientsFailedAction = {
	type: typeof GET_INGREDIENTS_ERROR;
};
export type TIngredientsAction =
	| TGetIngredientsAction
	| TGetIngredientsSuccessAction
	| TGetIngredientsFailedAction;
export type TIngredientsState = {
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
	state = initialState,
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
