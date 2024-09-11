import { combineReducers } from 'redux';
import {
	ingredientsReducer,
	TIngredientsAction,
	TIngredientsState,
} from './ingredients';
import {
	burgerConstructorReducer,
	TBurgerConstructorAction,
	TBurgerConstructorState,
} from './burger-constructor';
import { TOrderState, placeOrderReducer, TOrderAction } from './order';
import {
	TIngredientDetailsInitialState,
	ingredientDetailsReducer,
	TGetIngredientDetailsAction,
} from './ingredient-details';
import { userReducer, TUserState, TUserAction } from './user';
import { Reducer } from 'react';

export type TRootState = {
	ingredients: TIngredientsState;
	burgerConstructor: TBurgerConstructorState;
	order: TOrderState;
	ingredientDetails: TIngredientDetailsInitialState;
	user: TUserState;
};

export type TRootAction =
	| TIngredientsAction
	| TBurgerConstructorAction
	| TOrderAction
	| TGetIngredientDetailsAction
	| TUserAction;

export const rootReducer: Reducer<TRootState | undefined, TRootAction> =
	combineReducers({
		ingredients: ingredientsReducer,
		burgerConstructor: burgerConstructorReducer,
		order: placeOrderReducer,
		ingredientDetails: ingredientDetailsReducer,
		user: userReducer,
	});
