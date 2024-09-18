import { GET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { TIngredient } from '../types';
import { TGetIngredientDetailsAction } from '../constants/ingredient-details';

type TIngredientDetailsInitialState = {
	ingredientDetails: null | TIngredient;
};
const ingredientDetailsInitialState: TIngredientDetailsInitialState = {
	ingredientDetails: null,
};

export const ingredientDetailsReducer = (
	state: TIngredientDetailsInitialState = ingredientDetailsInitialState,
	action: TGetIngredientDetailsAction
): TIngredientDetailsInitialState => {
	switch (action.type) {
		case GET_INGREDIENT_DETAILS: {
			return {
				ingredientDetails:
					action.ingredients.find(
						(ingredient: TIngredient) => ingredient._id === action.id
					) || null,
			};
		}
		default: {
			return state;
		}
	}
};
