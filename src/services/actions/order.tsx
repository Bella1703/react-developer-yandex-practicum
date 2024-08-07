import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { Dispatch } from 'react';
import { CLEAR_CONSTRUCTOR } from './burger-constructor';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';

export interface ResponseTypes {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

const apiUrl = 'https://norma.nomoreparties.space/api/orders';

export const placeOrder = (
	order: string[]
): ThunkAction<
	void,
	RootState,
	unknown,
	{ type: string; response?: ResponseTypes }
> => {
	return async (
		dispatch: Dispatch<{ type: string; response?: ResponseTypes }>
	) => {
		dispatch({
			type: PLACE_ORDER_REQUEST,
		});
		try {
			const res = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: order }),
			});
			if (!res.ok) {
				throw new Error('Ответ сети был не ok.');
			}
			const data: ResponseTypes = await res.json();
			if (data && data.success) {
				dispatch({
					type: PLACE_ORDER_SUCCESS,
					response: data,
				});
				dispatch({
					type: CLEAR_CONSTRUCTOR,
				});
			} else {
				dispatch({
					type: PLACE_ORDER_ERROR,
				});
			}
		} catch (error) {
			dispatch({
				type: PLACE_ORDER_ERROR,
			});
		}
	};
};
