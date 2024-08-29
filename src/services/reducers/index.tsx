import { combineReducers } from 'redux';
import { ingredientsReducer, IngredientsStateTypes } from './ingredients';
import {
	burgerConstructorReducer,
	BurgerConstructorStateTypes,
} from './burger-constructor';
import { OrderStateTypes, placeOrderReducer } from './order';
import {
	ingredientDetailsInitialStateTypes,
	ingredientDetailsReducer,
} from './ingredient-details';
import { userReducer, UserStateTypes } from './user';

export type RootState = {
	ingredients: IngredientsStateTypes;
	burgerConstructor: BurgerConstructorStateTypes;
	order: OrderStateTypes;
	ingredientDetails: ingredientDetailsInitialStateTypes;
	user: UserStateTypes;
};

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: placeOrderReducer,
	ingredientDetails: ingredientDetailsReducer,
	user: userReducer,
});
