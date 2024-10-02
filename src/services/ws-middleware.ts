import type { Middleware, MiddlewareAPI } from 'redux';
import { TOrdersWsStoreActions } from './constants/orders-ws';
import { TFeedWsStoreActions } from './constants/feed-ws';
import { TAppDispatch, TRootState, TRootAction } from './reducers';
import { TWsMessage } from './types';
import { refreshToken } from '../utils/request';

export const wsMiddleware = (
	wsActions: TOrdersWsStoreActions | TFeedWsStoreActions,
	withRefreshToken = false
): Middleware => {
	return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
		let socket: WebSocket | null = null;
		let url = '';

		return (next) => (action: TRootAction) => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				url = action.payload;
				socket = new WebSocket(url);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData: TWsMessage = JSON.parse(data);
						if (withRefreshToken && parsedData.message === 'Invalid or missing token') {
							refreshToken()
								.then((refreshData) => {
									const wsUrl = new URL(url);
									wsUrl.searchParams.set(
										'token',
										refreshData.accessToken.replace.slice(7)
									);
									socket = new WebSocket(wsUrl);
								})
								.catch(() => {
									dispatch({ type: onError, payload: event });
								});

							dispatch({ type: onClose });
						}

						dispatch({
							type: onMessage,
							payload: parsedData,
						});
					} catch (err) {
						dispatch({ type: onError, payload: event });
					}
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};
			}
			next(action);
		};
	}) as Middleware;
};
