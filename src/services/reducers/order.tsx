import {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_ERROR,
	OrderResponseType,
} from '../actions/order';

type TPlaceOrderAction = {
	type: typeof PLACE_ORDER_REQUEST;
};
type TPlaceOrderSuccessAction = {
	type: typeof PLACE_ORDER_SUCCESS;
	response: object;
};
type TPlaceOrderFailedAction = {
	type: typeof PLACE_ORDER_ERROR;
};
export type TOrderAction =
	| TPlaceOrderAction
	| TPlaceOrderSuccessAction
	| TPlaceOrderFailedAction;
export type TOrderState = {
	response: null | OrderResponseType;
	isLoading: boolean;
	hasError: boolean;
};
const initialState: TOrderState = {
	response: null,
	isLoading: false,
	hasError: false,
};

export const placeOrderReducer = (
	state = initialState,
	action: TOrderAction
): TOrderState => {
	switch (action.type) {
		case PLACE_ORDER_REQUEST: {
			return {
				...state,
				isLoading: true,
				hasError: false,
			};
		}
		case PLACE_ORDER_SUCCESS: {
			return {
				response: action.response as OrderResponseType,
				isLoading: false,
				hasError: false,
			};
		}
		case PLACE_ORDER_ERROR: {
			return {
				...state,
				isLoading: false,
				hasError: true,
			};
		}
		default: {
			return state;
		}
	}
};
