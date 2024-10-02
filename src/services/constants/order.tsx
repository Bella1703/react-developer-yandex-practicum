import {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_ERROR,
} from '../actions/order';

export type TPlaceOrderAction = {
	readonly type: typeof PLACE_ORDER_REQUEST;
};
export type TPlaceOrderSuccessAction = {
	readonly type: typeof PLACE_ORDER_SUCCESS;
	readonly response: object;
};
export type TPlaceOrderFailedAction = {
	readonly type: typeof PLACE_ORDER_ERROR;
};
export type TOrderAction =
	| TPlaceOrderAction
	| TPlaceOrderSuccessAction
	| TPlaceOrderFailedAction;
