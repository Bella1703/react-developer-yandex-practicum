import {
	PLACE_ORDER,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_FAILED,
	ResponseTypes,
} from '../actions/order';

interface PlaceOrderAction {
	type: typeof PLACE_ORDER;
}
interface PlaceOrderSuccessAction {
	type: typeof PLACE_ORDER_SUCCESS;
	response: object;
}
interface PlaceOrderFailedAction {
	type: typeof PLACE_ORDER_FAILED;
}
export type OrderActionTypes =
	| PlaceOrderAction
	| PlaceOrderSuccessAction
	| PlaceOrderFailedAction;
export interface OrderStateTypes {
	response: null | ResponseTypes;
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
		case PLACE_ORDER: {
			return {
				...state,
				isLoading: true,
				hasError: false,
			};
		}
		case PLACE_ORDER_SUCCESS: {
			return {
				response: action.response as ResponseTypes,
				isLoading: false,
				hasError: false,
			};
		}
		case PLACE_ORDER_FAILED: {
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
