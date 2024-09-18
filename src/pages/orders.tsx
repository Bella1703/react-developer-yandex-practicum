import React from 'react';
import { OrderCard } from '../components/order/order-card';
import s from "./order-feed.module.scss";

export const Orders = (): React.JSX.Element => {
	return (
		<div>
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
			<OrderCard className='mb-5' />
		</div>
	);
};
