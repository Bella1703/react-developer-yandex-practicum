import { GET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { IngredientType } from './ingredients';

interface GetIngredientDetailsActionTypes {
	type: typeof GET_INGREDIENT_DETAILS;
	ingredients: IngredientType[];
	id: string;
}
export interface ingredientDetailsInitialStateTypes {
	ingredientDetails: null | IngredientType;
}
const ingredientDetailsInitialState: ingredientDetailsInitialStateTypes = {
	ingredientDetails: null,
};

export const ingredientDetailsReducer = (
	state = ingredientDetailsInitialState,
	action: GetIngredientDetailsActionTypes
) => {
	switch (action.type) {
		case GET_INGREDIENT_DETAILS: {
			return {
				ingredientDetails: action.ingredients.find(
					(ingredient) => ingredient._id === action.id
				),
			};
		}
		default: {
			return state;
		}
	}
};
