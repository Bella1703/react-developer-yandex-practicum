import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
	MOVE_INGREDIENT,
} from '../actions/burger-constructor';
import { TIngredient, TBurgerIngredient } from '../types';

export type TAddIngredientAction = {
	readonly type: typeof ADD_INGREDIENT;
	readonly payload: TBurgerIngredient;
};

export type TRemoveIngredientAction = {
	readonly type: typeof REMOVE_INGREDIENT;
	readonly ingredient: TBurgerIngredient;
};

export type TReplaceBunAction = {
	readonly type: typeof REPLACE_BUN;
	readonly bun: TIngredient;
};

export type TClearConstructorAction = {
	readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TMoveIngredientAction = {
	readonly type: typeof MOVE_INGREDIENT;
	readonly dragIndex: number;
	readonly hoverIndex: number;
};

export type TBurgerConstructorAction =
	| TAddIngredientAction
	| TRemoveIngredientAction
	| TReplaceBunAction
	| TClearConstructorAction
	| TMoveIngredientAction;
