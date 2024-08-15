import {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_ERROR,
	OrderResponseType,
} from '../actions/order';

interface PlaceOrderAction {
	type: typeof PLACE_ORDER_REQUEST;
}
interface PlaceOrderSuccessAction {
	type: typeof PLACE_ORDER_SUCCESS;
	response: object;
}
interface PlaceOrderFailedAction {
	type: typeof PLACE_ORDER_ERROR;
}
export type OrderActionTypes =
	| PlaceOrderAction
	| PlaceOrderSuccessAction
	| PlaceOrderFailedAction;
export interface OrderStateTypes {
	response: null | OrderResponseType;
	isLoading: boolean;
	hasError: boolean;
}
const initialState: OrderStateTypes = {
	response: null,
	isLoading: false,
	hasError: false,
};

export const placeOrderReducer = (
	state = initialState,
	action: OrderActionTypes
): OrderStateTypes => {
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
