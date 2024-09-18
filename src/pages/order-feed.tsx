import s from './order-feed.module.scss';
import { OrderCard } from '../components/order/order-card';
import React from 'react';

export const OrderFeed = (): React.JSX.Element => {
	return (
		<div className={s.container}>
			<h1 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h1>
			<div className={s.columns}>
				{/*<div className={s.orderCards}>*/}
				{/*	<OrderCard className='mb-4' />*/}
				{/*	<OrderCard className='mb-4' />*/}
				{/*	<OrderCard className='mb-4' />*/}
				{/*</div>*/}
				{/*<div className={s.ordersInfo}>*/}

				{/*</div>*/}
			</div>
		</div>
	);
};
