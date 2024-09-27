import {
	FEED_WS_CONNECTION_START,
	FEED_WS_CONNECTION_SUCCESS,
	FEED_WS_CONNECTION_ERROR,
	FEED_WS_CONNECTION_CLOSED,
	FEED_WS_GET_MESSAGE,
} from '../actions/feed-ws';
import { TWsMessage } from '../types';

export type TFeedWsConnectionStartAction = {
	readonly type: typeof FEED_WS_CONNECTION_START;
};
export type TFeedWsConnectionSuccessAction = {
	readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
};
export type TFeedWsConnectionErrorAction = {
	readonly type: typeof FEED_WS_CONNECTION_ERROR;
	readonly payload: Event;
};
export type TFeedWsConnectionClosedAction = {
	readonly type: typeof FEED_WS_CONNECTION_CLOSED;
};
export type TFeedWsGetMessageAction = {
	readonly type: typeof FEED_WS_GET_MESSAGE;
	readonly payload: TWsMessage;
};

export type TFeedWsAction =
	| TFeedWsConnectionStartAction
	| TFeedWsConnectionSuccessAction
	| TFeedWsConnectionErrorAction
	| TFeedWsConnectionClosedAction
	| TFeedWsGetMessageAction;

export type TFeedWsStoreActions = {
	wsInit: typeof FEED_WS_CONNECTION_START;
	onOpen: typeof FEED_WS_CONNECTION_SUCCESS;
	onClose: typeof FEED_WS_CONNECTION_CLOSED;
	onError: typeof FEED_WS_CONNECTION_ERROR;
	onMessage: typeof FEED_WS_GET_MESSAGE;
};
