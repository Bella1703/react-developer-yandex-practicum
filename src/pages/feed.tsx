import s from './feed.module.scss';
import { OrderCard } from '../components/order/order-card';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { FEED_WS_CONNECTION_START } from '../services/actions/feed-ws';

export const Feed = (): React.JSX.Element => {
	const { feedWsConnected, feedWsMessage } = useSelector((state) => state.feedWs);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!feedWsConnected) {
			dispatch({ type: FEED_WS_CONNECTION_START });
		}
	}, []);

	return (
		<div className={s.container}>
			<h1 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h1>
			{feedWsConnected && (
				<div className={s.columns}>
					<div className={'scrollContainer'}>
						{feedWsMessage.orders.map((order, index) => (
							<OrderCard className='mb-4' order={order} key={index} />
						))}
					</div>
					<div className={s.info}>
						<div className={s.statuses}>
							<div>
								<p className='text text_type_main-medium mb-6'>Готовы:</p>
								<ul className={s.list}>
									{feedWsMessage.orders
										.filter((order) => order.status === 'done')
										.slice(0, 14)
										.map((order, index) => (
											<li
												key={index}
												className={'text text_type_digits-default blueText'}>
												{order.number}
											</li>
										))}
								</ul>
							</div>
							<div>
								<p className='text text_type_main-medium mb-6'>В работе:</p>
								<ul className={s.list}>
									{feedWsMessage.orders
										.filter((order) => order.status === 'pending')
										.slice(0, 14)
										.map((order, index) => (
											<li
												key={index}
												className={'text text_type_digits-default'}>
												{order.number}
											</li>
										))}
								</ul>
							</div>
						</div>
						<span>
							<p className='text text_type_main-medium'>
								Выполнено за все время:
							</p>
							<p className='text text_type_digits-large numberShadow'>
								{feedWsMessage.total}
							</p>
						</span>
						<span>
							<p className='text text_type_main-medium'>
								Выполнено за сегодня:
							</p>
							<p className='text text_type_digits-large numberShadow'>
								{feedWsMessage.totalToday}
							</p>
						</span>
					</div>
				</div>
			)}
		</div>
	);
};
