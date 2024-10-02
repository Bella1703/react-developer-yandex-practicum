import { TOrdersWsStoreActions } from '../constants/orders-ws';

export const ORDERS_WS_CONNECTION_START = 'ORDERS_WS_CONNECTION_START' as const;
export const ORDERS_WS_CONNECTION_SUCCESS = 'ORDERS_WS_CONNECTION_SUCCESS' as const;
export const ORDERS_WS_CONNECTION_ERROR = 'ORDERS_WS_CONNECTION_ERROR' as const;
export const ORDERS_WS_CONNECTION_CLOSED = 'ORDERS_WS_CONNECTION_CLOSED' as const;
export const ORDERS_WS_GET_MESSAGE = 'ORDERS_WS_GET_MESSAGE' as const;

export const ordersWsActions: TOrdersWsStoreActions = {
	wsInit: ORDERS_WS_CONNECTION_START,
	onOpen: ORDERS_WS_CONNECTION_SUCCESS,
	onClose: ORDERS_WS_CONNECTION_CLOSED,
	onError: ORDERS_WS_CONNECTION_ERROR,
	onMessage: ORDERS_WS_GET_MESSAGE,
};
