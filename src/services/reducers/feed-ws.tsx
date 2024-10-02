import {
	FEED_WS_CONNECTION_SUCCESS,
	FEED_WS_CONNECTION_ERROR,
	FEED_WS_CONNECTION_CLOSED,
	FEED_WS_GET_MESSAGE,
} from '../actions/feed-ws';
import { TFeedWsAction } from '../constants/feed-ws';
import { TWsMessage } from '../types';

type TFeedWsState = {
	feedWsConnected: boolean;
	feedWsMessage: TWsMessage;
	error?: Event;
};

const initialState: TFeedWsState = {
	feedWsConnected: false,
	feedWsMessage: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
		message: '',
	},
};

export const feedWsReducer = (
	state: TFeedWsState = initialState,
	action: TFeedWsAction
): TFeedWsState => {
	switch (action.type) {
		case FEED_WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				feedWsConnected: true,
			};
		case FEED_WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				feedWsConnected: false,
			};
		case FEED_WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				feedWsConnected: false,
			};
		case FEED_WS_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				feedWsMessage: action.payload,
			};
		default:
			return state;
	}
};
