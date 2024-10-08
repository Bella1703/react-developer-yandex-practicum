import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { requestWithRefresh } from '../../utils/request';
import { TAppDispatch, TAppThunk } from '../reducers';
import { TOrder } from '../types';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST' as const;
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS' as const;
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR' as const;

export type OrderResponseType = {
	success: boolean;
	name: string;
	order: TOrder;
};

export const placeOrder =
	(order: Array<string>, token: string): TAppThunk =>
	async (dispatch: TAppDispatch) => {
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
