import { GET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { TIngredient } from '../types';

export type TGetIngredientDetailsAction = {
	readonly type: typeof GET_INGREDIENT_DETAILS;
	readonly ingredients: Array<TIngredient>;
	readonly id: string;
};
