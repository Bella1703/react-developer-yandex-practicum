import React, { useEffect } from 'react';
import { OrderCard } from '../components/order/order-card';
import { useDispatch, useSelector } from '../services/hooks';
import { ORDERS_WS_CONNECTION_START } from '../services/actions/orders-ws';

export const Orders = (): React.JSX.Element => {
	const { orderWsConnected, orderWsMessage } = useSelector(
		(state) => state.ordersWs
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!orderWsConnected) {
			dispatch({ type: ORDERS_WS_CONNECTION_START });
		}
	}, []);
	return (
		<div className={'scrollContainer'}>
			{orderWsConnected &&
				orderWsMessage.orders
					.slice()
					.reverse()
					.map((order, index) => (
						<OrderCard className='mb-5' order={order} key={index} />
					))}
		</div>
	);
};
