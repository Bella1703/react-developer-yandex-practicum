import { Dispatch } from 'react';
import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { requestWithRefresh } from '../../utils/request';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';

export interface OrderResponseType {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
}

export const placeOrder = (order: string[], token: string) => {
	return async (
		dispatch: Dispatch<{ type: string; response?: OrderResponseType }>
	) => {
		dispatch({
			type: PLACE_ORDER_REQUEST,
		});
		try {
			const data = await requestWithRefresh('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({ ingredients: order }),
			});
			dispatch({
				type: PLACE_ORDER_SUCCESS,
				response: data as OrderResponseType,
			});
			dispatch({
				type: CLEAR_CONSTRUCTOR,
			});
		} catch (error) {
			dispatch({
				type: PLACE_ORDER_ERROR,
			});
		}
	};
};
