import type { Middleware, MiddlewareAPI } from 'redux';
import { TWSStoreActions } from './constants/ws';
import { TAppDispatch, TRootState, TRootAction } from './reducers';
import { TWsMessage } from './types';

export const wsMiddleware = (
	wsUrl: string,
	wsActions: TWSStoreActions
): Middleware => {
	return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TRootAction) => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
			const accessToken = localStorage.getItem('accessToken');



			//если токен устарел



			//test
			if (type === wsInit) {
				socket = new WebSocket(`${wsUrl}`);
			}


			// if (type === wsInit && accessToken) {
			// 	socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
			// }
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: TWsMessage = JSON.parse(data);

					dispatch({
						type: onMessage,
						payload: parsedData,
					});
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};
			}
			next(action);
		};
	}) as Middleware;
};
