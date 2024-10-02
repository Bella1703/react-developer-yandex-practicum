import { TFeedWsStoreActions } from '../constants/feed-ws';
import { TAppDispatch, TAppThunk } from '../reducers';
import { request } from '../../utils/request';
import { TWsMessage } from '../types';

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

export const getOrderByNumber =
	(orderNumber: string): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			const data = await request(`orders/${orderNumber}`);
			dispatch({
				type: FEED_WS_GET_MESSAGE,
				payload: data as TWsMessage,
			});
		} catch (error) {
			alert('Что-то пошло не так');
		}
	};
