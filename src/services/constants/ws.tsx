import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
} from '../actions/ws';
import { TWsMessage } from '../types';

export type TWsConnectionStartAction = {
	readonly type: typeof WS_CONNECTION_START;
};
export type TWsConnectionSuccessAction = {
	readonly type: typeof WS_CONNECTION_SUCCESS;
};
export type TWsConnectionErrorAction = {
	readonly type: typeof WS_CONNECTION_ERROR;
	readonly payload: Event;
};
export type TWsConnectionClosedAction = {
	readonly type: typeof WS_CONNECTION_CLOSED;
};
export type TWsGetMessageAction = {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: TWsMessage;
};

export type TWsAction =
	| TWsConnectionStartAction
	| TWsConnectionSuccessAction
	| TWsConnectionErrorAction
	| TWsConnectionClosedAction
	| TWsGetMessageAction;

export type TWSStoreActions = {
	wsInit: typeof WS_CONNECTION_START;
	onOpen: typeof WS_CONNECTION_SUCCESS;
	onClose: typeof WS_CONNECTION_CLOSED;
	onError: typeof WS_CONNECTION_ERROR;
	onMessage: typeof WS_GET_MESSAGE;
};
