import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';
import { IngredientType } from './ingredients';
import { v4 as uuidv4 } from 'uuid';

export interface BurgerIngredientType extends IngredientType {
	uuid: string;
}

interface AddIngredientAction {
	type: typeof ADD_INGREDIENT;
	ingredient: IngredientType;
}

interface RemoveIngredient {
	type: typeof REMOVE_INGREDIENT;
	ingredient: BurgerIngredientType;
}

interface ReplaceBun {
	type: typeof REPLACE_BUN;
	bun: IngredientType;
}

interface ClearConstructor {
	type: typeof CLEAR_CONSTRUCTOR;
}

export type BurgerConstructorActionTypes =
	| AddIngredientAction
	| RemoveIngredient
	| ReplaceBun
	| ClearConstructor;

const burgerConstructorInitialState = {
	bun: null,
	selectedIngredients: [] as BurgerIngredientType[],
};

export interface BurgerConstructorStateTypes {
	bun: BurgerIngredientType;
	selectedIngredients: BurgerIngredientType[];
}

export const burgerConstructorReducer = (
	state = burgerConstructorInitialState,
	action: BurgerConstructorActionTypes
) => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			const ingredientWithUuid = {
				...action.ingredient,
				uuid: uuidv4(),
			};
			return {
				...state,
				selectedIngredients: [...state.selectedIngredients, ingredientWithUuid],
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				selectedIngredients: state.selectedIngredients.filter(
					(ingredient) => ingredient.uuid !== action.ingredient.uuid
				),
			};
		}
		case REPLACE_BUN: {
			return {
				...state,
				bun: action.bun,
			};
		}
		case CLEAR_CONSTRUCTOR: {
			return burgerConstructorInitialState;
		}
		default: {
			return state;
		}
	}
};
