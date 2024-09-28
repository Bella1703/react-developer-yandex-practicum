import type { Middleware, MiddlewareAPI } from 'redux';
import { TOrdersWsStoreActions } from '../constants/orders-ws';
import { TAppDispatch, TRootState, TRootAction } from '../reducers';
import { TWsMessage } from '../types';
import { refreshToken } from '../../utils/request';

export const ordersWsMiddleware = (
	wsUrl: string,
	wsActions: TOrdersWsStoreActions
): Middleware => {
	return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TRootAction) => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
			const accessToken = localStorage.getItem('accessToken');

			if (type === wsInit && accessToken) {
				socket = new WebSocket(`${wsUrl}?token=${accessToken.slice(7)}`);
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
						if (parsedData.message === 'Invalid or missing token') {
							refreshToken()
								.then((refreshData) => {
									const url = new URL(wsUrl);
									url.searchParams.set(
										'token',
										refreshData.accessToken.replace.slice(7)
									);
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
