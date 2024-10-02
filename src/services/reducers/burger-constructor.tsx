import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
	MOVE_INGREDIENT,
} from '../actions/burger-constructor';
import { TBurgerConstructorAction } from '../constants/burger-constructor';
import { TBurgerIngredient } from '../types';

type TBurgerConstructorState = {
	bun: TBurgerIngredient | null;
	selectedIngredients: Array<TBurgerIngredient>;
};

const burgerConstructorInitialState: TBurgerConstructorState = {
	bun: null,
	selectedIngredients: [] as TBurgerIngredient[],
};

export const burgerConstructorReducer = (
	state: TBurgerConstructorState = burgerConstructorInitialState,
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
					(ingredient: TBurgerIngredient) =>
						ingredient.uuid !== action.ingredient.uuid
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
			const dragCard: TBurgerIngredient =
				state.selectedIngredients[action.dragIndex];
			const newCards: Array<TBurgerIngredient> = [...state.selectedIngredients];
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
