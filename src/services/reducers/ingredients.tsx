import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';

export interface IngredientType {
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
}
interface GetIngredientsAction {
	type: typeof GET_INGREDIENTS_REQUEST;
}
interface GetIngredientsSuccessAction {
	type: typeof GET_INGREDIENTS_SUCCESS;
	ingredients: IngredientType[];
}
interface GetIngredientsFailedAction {
	type: typeof GET_INGREDIENTS_ERROR;
}
export type IngredientsActionTypes =
	| GetIngredientsAction
	| GetIngredientsSuccessAction
	| GetIngredientsFailedAction;
export interface IngredientsStateTypes {
	ingredients: IngredientType[] | [];
	isLoading: boolean;
	hasError: boolean;
}
const initialState: IngredientsStateTypes = {
	ingredients: [],
	isLoading: false,
	hasError: false,
};

export const ingredientsReducer = (
	state = initialState,
	action: IngredientsActionTypes
): IngredientsStateTypes => {
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
