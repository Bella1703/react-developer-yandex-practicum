import React from 'react';
import { OrderCard } from '../components/order/order-card';

export const Orders = (): React.JSX.Element => {
	return (
		<div className={'scrollContainer'}>
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
		</div>
	);
};
