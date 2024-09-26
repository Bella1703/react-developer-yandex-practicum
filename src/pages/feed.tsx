import s from './feed.module.scss';
import { OrderCard } from '../components/order/order-card';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { WS_CONNECTION_START } from '../services/actions/ws';

export const Feed = (): React.JSX.Element => {
	const { wsConnected, message } = useSelector((state) => state.ws);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: WS_CONNECTION_START });
	}, []);

	return (
		<div className={s.container}>
			<h1 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h1>
			{wsConnected && (
				<div className={s.columns}>
					<div className={'scrollContainer'}>
						{message.orders.map((order, index) => (
							<OrderCard className='mb-4' order={order} key={index} />
						))}
					</div>
					<div className={s.info}>
						<div className={s.statuses}>
							<div>
								<p className='text text_type_main-medium mb-6'>Готовы:</p>
								<ul className={s.list}>
									{message.orders
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
									{message.orders
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
								{message.total}
							</p>
						</span>
						<span>
							<p className='text text_type_main-medium'>
								Выполнено за сегодня:
							</p>
							<p className='text text_type_digits-large numberShadow'>
								{message.totalToday}
							</p>
						</span>
					</div>
				</div>
			)}
		</div>
	);
};
