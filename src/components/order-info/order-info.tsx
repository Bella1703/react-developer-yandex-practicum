import s from './order-info.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import {
	getOrderByNumber,
	FEED_WS_CONNECTION_START,
} from '../../services/actions/feed-ws';
import { ORDERS_WS_CONNECTION_START } from '../../services/actions/orders-ws';

export const OrderInfo = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const background = location.state?.background;
	const orderNumber =
		location.pathname.split('/')[location.pathname.split('/').length - 1];
	const { ingredients } = useSelector((state) => state.ingredients);
	const { feedWsConnected, feedWsMessage } = useSelector(
		(state) => state.feedWs
	);
	const { orderWsConnected, orderWsMessage } = useSelector(
		(state) => state.ordersWs
	);
	const { response } = useSelector((state) => state.order);

	const order = useSelector(() => {
		let foundOrder = feedWsMessage.orders?.find(
			(item) => item.number === +orderNumber
		);
		if (!foundOrder) {
			foundOrder = orderWsMessage.orders?.find(
				(item) => item.number === +orderNumber
			);
		}
		if (!foundOrder && response?.order?.number === +orderNumber) {
			foundOrder = response.order;
		}
		return foundOrder;
	});

	useEffect(() => {
		if (!feedWsConnected) {
			dispatch({ type: FEED_WS_CONNECTION_START });
		}
		if (!orderWsMessage) {
			dispatch({ type: ORDERS_WS_CONNECTION_START });
		}
	}, [dispatch, feedWsConnected, orderWsConnected]);

	useEffect(() => {
		if (!order) {
			dispatch(getOrderByNumber(orderNumber));
		}
	}, []);

	const totalPrice = useMemo(() => {
		if (!order) return 0;

		return order.ingredients.reduce((acc, ingredientId) => {
			const ingredient = ingredients.find((item) => item._id === ingredientId);
			if (ingredient) {
				return acc + ingredient.price;
			}
			return acc;
		}, 0);
	}, [order, ingredients]);

	if (!order) {
		return (
			<div className={s.content}>
				<p className={'text text_type_main-medium mt-10'}>Загрузка...</p>
			</div>
		);
	}

	return (
		<div className={`${s.content} ${background ? '' : 'mt-30'}`}>
			<p className={`text text_type_digits-default ${s.centerText}`}>
				#{order.number}
			</p>
			<p className={'text text_type_main-medium mt-10'}>{order.name}</p>
			<p className={'text text_type_main-default blueText mt-3'}>
				{order.status === 'done'
					? 'Выполнен'
					: order.status === 'pending'
					? 'В работе'
					: 'Создан'}
			</p>
			<p className={'text text_type_main-medium mt-15'}>Состав:</p>
			<ul className={`${s.cards} scrollContainer mt-6`}>
				{order.ingredients
					.reduce((acc, ingredient) => {
						const item = ingredients.find((item) => item._id === ingredient);
						if (!item) return acc;
						const existingItem = acc.find((el) => el.item._id === item._id);
						if (existingItem) {
							existingItem.count += 1;
						} else {
							acc.push({ item, count: 1 });
						}
						return acc;
					}, [] as { item: (typeof ingredients)[0]; count: number }[])
					.map(({ item, count }, index) => (
						<li key={index} className={s.card}>
							<div>
								<div className={'ingredient'}>
									<span>
										<img src={item.image} alt={item.name} />
									</span>
								</div>
								<p className='text text_type_main-default pl-4'>{item.name}</p>
							</div>
							<p className={`${s.price} text text_type_digits-default`}>
								{count} x {item.price} <CurrencyIcon type='primary' />
							</p>
						</li>
					))}
			</ul>
			<div className={`${s.totalInfo} mt-10`}>
				<FormattedDate
					date={new Date(order.createdAt)}
					className='text text_type_main-default text_color_inactive'
				/>
				<p className={`${s.price} text text_type_digits-default`}>
					{totalPrice} <CurrencyIcon type='primary' />
				</p>
			</div>
		</div>
	);
};
