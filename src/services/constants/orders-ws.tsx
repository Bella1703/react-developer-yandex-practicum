import {
	ORDERS_WS_CONNECTION_START,
	ORDERS_WS_CONNECTION_SUCCESS,
	ORDERS_WS_CONNECTION_ERROR,
	ORDERS_WS_CONNECTION_CLOSED,
	ORDERS_WS_GET_MESSAGE,
} from '../actions/orders-ws';
import { TWsMessage } from '../types';

export type TOrdersWsConnectionStartAction = {
	readonly type: typeof ORDERS_WS_CONNECTION_START;
	readonly payload: string;
};
export type TOrdersWsConnectionSuccessAction = {
	readonly type: typeof ORDERS_WS_CONNECTION_SUCCESS;
};
export type TOrdersWsConnectionErrorAction = {
	readonly type: typeof ORDERS_WS_CONNECTION_ERROR;
	readonly payload: Event;
};
export type TOrdersWsConnectionClosedAction = {
	readonly type: typeof ORDERS_WS_CONNECTION_CLOSED;
};
export type TOrdersWsGetMessageAction = {
	readonly type: typeof ORDERS_WS_GET_MESSAGE;
	readonly payload: TWsMessage;
};

export type TOrdersWsAction =
	| TOrdersWsConnectionStartAction
	| TOrdersWsConnectionSuccessAction
	| TOrdersWsConnectionErrorAction
	| TOrdersWsConnectionClosedAction
	| TOrdersWsGetMessageAction;

export type TOrdersWsStoreActions = {
	wsInit: typeof ORDERS_WS_CONNECTION_START;
	onOpen: typeof ORDERS_WS_CONNECTION_SUCCESS;
	onClose: typeof ORDERS_WS_CONNECTION_CLOSED;
	onError: typeof ORDERS_WS_CONNECTION_ERROR;
	onMessage: typeof ORDERS_WS_GET_MESSAGE;
};
