import { TFeedWsStoreActions } from '../constants/feed-ws';

export const FEED_WS_CONNECTION_START = 'FEED_WS_CONNECTION_START' as const;
export const FEED_WS_CONNECTION_SUCCESS = 'FEED_WS_CONNECTION_SUCCESS' as const;
export const FEED_WS_CONNECTION_ERROR = 'FEED_WS_CONNECTION_ERROR' as const;
export const FEED_WS_CONNECTION_CLOSED = 'FEED_WS_CONNECTION_CLOSED' as const;
export const FEED_WS_GET_MESSAGE = 'FEED_WS_GET_MESSAGE' as const;

export const feedWsActions: TFeedWsStoreActions = {
	wsInit: FEED_WS_CONNECTION_START,
	onOpen: FEED_WS_CONNECTION_SUCCESS,
	onClose: FEED_WS_CONNECTION_CLOSED,
	onError: FEED_WS_CONNECTION_ERROR,
	onMessage: FEED_WS_GET_MESSAGE,
};
