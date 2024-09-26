import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
} from '../actions/ws';
import { TWsAction } from '../constants/ws';
import { TWsMessage } from '../types';

type TWsState = {
	wsConnected: boolean;
	message: TWsMessage;
	error?: Event;
};

const initialState: TWsState = {
	wsConnected: false,
	message: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
	},
};

export const wsReducer = (
	state: TWsState = initialState,
	action: TWsAction
): TWsState => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false,
			};
		case WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false,
			};
		case WS_GET_MESSAGE:
			console.log(action.payload);
			return {
				...state,
				error: undefined,
				message: action.payload,
			};
		default:
			return state;
	}
};
