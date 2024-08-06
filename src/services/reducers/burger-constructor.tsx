import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
	MOVE_INGREDIENT,
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

interface RemoveIngredientAction {
	type: typeof REMOVE_INGREDIENT;
	ingredient: BurgerIngredientType;
}

interface ReplaceBunAction {
	type: typeof REPLACE_BUN;
	bun: IngredientType;
}

interface ClearConstructorAction {
	type: typeof CLEAR_CONSTRUCTOR;
}

interface MoveIngredientAction {
	type: typeof MOVE_INGREDIENT;
	dragIndex: number;
	hoverIndex: number;
}

export type BurgerConstructorActionTypes =
	| AddIngredientAction
	| RemoveIngredientAction
	| ReplaceBunAction
	| ClearConstructorAction
	| MoveIngredientAction;

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
		case MOVE_INGREDIENT: {
			const dragCard = state.selectedIngredients[action.dragIndex];
			const newCards = [...state.selectedIngredients];
			newCards.splice(action.dragIndex, 1);
			newCards.splice(action.hoverIndex, 0, dragCard);
			return {
				...state,
				selectedIngredients: newCards,
			};
		}
		default: {
			return state;
		}
	}
};
