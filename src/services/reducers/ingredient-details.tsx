import { GET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { TIngredient } from './ingredients';

export type TGetIngredientDetailsAction = {
	type: typeof GET_INGREDIENT_DETAILS;
	ingredients: Array<TIngredient>;
	id: string;
};
export type TIngredientDetailsInitialState = {
	ingredientDetails: null | TIngredient;
};
const ingredientDetailsInitialState: TIngredientDetailsInitialState = {
	ingredientDetails: null,
};

export const ingredientDetailsReducer = (
	state = ingredientDetailsInitialState,
	action: TGetIngredientDetailsAction
): TIngredientDetailsInitialState => {
	switch (action.type) {
		case GET_INGREDIENT_DETAILS: {
			return {
				ingredientDetails:
					action.ingredients.find(
						(ingredient) => ingredient._id === action.id
					) || null,
			};
		}
		default: {
			return state;
		}
	}
};
