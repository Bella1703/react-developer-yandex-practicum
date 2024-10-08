import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { placeOrderReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';
import { userReducer } from './user';
import { feedWsReducer } from './feed-ws';
import { ordersWsReducer } from './orders-ws';
import { TBurgerConstructorAction } from '../constants/burger-constructor';
import { TIngredientsAction } from '../constants/ingredients';
import { TOrderAction } from '../constants/order';
import { TGetIngredientDetailsAction } from '../constants/ingredient-details';
import { TUserAction } from '../constants/user';
import { TFeedWsAction } from '../constants/feed-ws';
import { TOrdersWsAction } from '../constants/orders-ws';
import { store } from '../../index';

export type TRootState = ReturnType<typeof store.getState>;

export type TRootAction =
	| TBurgerConstructorAction
	| TGetIngredientDetailsAction
	| TIngredientsAction
	| TOrderAction
	| TUserAction
	| TFeedWsAction
	| TOrdersWsAction;

export type TAppThunk<TReturn = void> = ThunkAction<
	TReturn,
	TRootState,
	unknown,
	TRootAction
>;
export type TAppDispatch = ThunkDispatch<TRootState, unknown, TRootAction>;

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: placeOrderReducer,
	ingredientDetails: ingredientDetailsReducer,
	user: userReducer,
	feedWs: feedWsReducer,
	ordersWs: ordersWsReducer,
});
