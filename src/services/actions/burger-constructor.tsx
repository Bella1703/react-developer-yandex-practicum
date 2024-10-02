import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../types';
import { TAddIngredientAction } from '../constants/burger-constructor';

export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT' as const;
export const REPLACE_BUN = 'REPLACE_BUN' as const;
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR' as const;
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT' as const;

export const addIngredient = (
	ingredient: TIngredient
): TAddIngredientAction => {
	return {
		type: ADD_INGREDIENT,
		payload: {
			...ingredient,
			uuid: uuidv4(),
		},
	};
};
