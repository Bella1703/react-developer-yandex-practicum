import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
	MOVE_INGREDIENT,
} from '../actions/burger-constructor';
import { TIngredient } from './ingredients';

export type TBurgerIngredient = TIngredient & {
	uuid: string;
};

type TAddIngredientAction = {
	type: typeof ADD_INGREDIENT;
	payload: TBurgerIngredient;
};

type TRemoveIngredientAction = {
	type: typeof REMOVE_INGREDIENT;
	ingredient: TBurgerIngredient;
};

type TReplaceBunAction = {
	type: typeof REPLACE_BUN;
	bun: TIngredient;
};

type TClearConstructorAction = {
	type: typeof CLEAR_CONSTRUCTOR;
};

type TMoveIngredientAction = {
	type: typeof MOVE_INGREDIENT;
	dragIndex: number;
	hoverIndex: number;
};

export type TBurgerConstructorAction =
	| TAddIngredientAction
	| TRemoveIngredientAction
	| TReplaceBunAction
	| TClearConstructorAction
	| TMoveIngredientAction;

export type TBurgerConstructorState = {
	bun: TBurgerIngredient | null;
	selectedIngredients: Array<TBurgerIngredient>;
};

const burgerConstructorInitialState: TBurgerConstructorState = {
	bun: null,
	selectedIngredients: [] as TBurgerIngredient[],
};

export const burgerConstructorReducer = (
	state = burgerConstructorInitialState,
	action: TBurgerConstructorAction
): TBurgerConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			return {
				...state,
				selectedIngredients: [...state.selectedIngredients, action.payload],
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
				bun: {
					...action.bun,
					uuid: (action.bun as TBurgerIngredient).uuid,
				},
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
