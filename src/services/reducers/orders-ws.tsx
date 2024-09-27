import {
	ORDERS_WS_CONNECTION_SUCCESS,
	ORDERS_WS_CONNECTION_ERROR,
	ORDERS_WS_CONNECTION_CLOSED,
	ORDERS_WS_GET_MESSAGE,
} from '../actions/orders-ws';
import { TOrdersWsAction } from '../constants/orders-ws';
import { TWsMessage } from '../types';

type TOrdersWsState = {
	wsConnected: boolean;
	orderWsMessage: TWsMessage;
	error?: Event;
};

const initialState: TOrdersWsState = {
	wsConnected: false,
	orderWsMessage: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
	},
};

export const ordersWsReducer = (
	state: TOrdersWsState = initialState,
	action: TOrdersWsAction
): TOrdersWsState => {
	switch (action.type) {
		case ORDERS_WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case ORDERS_WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false,
			};
		case ORDERS_WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false,
			};
		case ORDERS_WS_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				orderWsMessage: action.payload,
			};
		default:
			return state;
	}
};
