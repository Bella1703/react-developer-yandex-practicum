import { v4 as uuidv4 } from 'uuid';
import { IngredientType } from '../reducers/ingredients';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient: IngredientType) => {
	return {
		type: ADD_INGREDIENT,
		payload: {
			...ingredient,
			uuid: uuidv4(),
		},
	};
};
