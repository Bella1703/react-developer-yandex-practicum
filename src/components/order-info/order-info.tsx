import s from './order-info.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../services/types';
import { FEED_WS_CONNECTION_START } from '../../services/actions/feed-ws';
import { useLocation } from 'react-router-dom';

export const OrderInfo = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const background = location.state?.background;
	const orderId = location.pathname.split('/')[2];
	const { ingredients } = useSelector((state) => state.ingredients);
	const { feedWsMessage } = useSelector((state) => state.feedWs);
	const { orderWsMessage } = useSelector((state) => state.ordersWs);
	const [order, setOrder] = useState<TOrder | undefined>(undefined);

	const findOrderById = (): TOrder | undefined => {
		let foundOrder = feedWsMessage.orders?.find((item) => item._id === orderId);
		if (!foundOrder) {
			foundOrder = orderWsMessage.orders?.find((item) => item._id === orderId);
		}
		return foundOrder;
	};
	useEffect(() => {
		dispatch({ type: FEED_WS_CONNECTION_START });
	}, []);
	useEffect(() => {
		if (feedWsMessage.orders.length || orderWsMessage.orders.length) {
			const foundOrder = findOrderById();
			setOrder(foundOrder);
		}
	}, [feedWsMessage.orders, orderWsMessage.orders]);

	const totalPrice = useMemo(() => {
		// ?? след строка?

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
				#{order?.number}
			</p>
			<p className={'text text_type_main-medium mt-10'}>{order?.name}</p>
			<p className={'text text_type_main-default blueText mt-3'}>
				{order?.status === 'done'
					? 'Выполнен'
					: order?.status === 'pending'
					? 'В работе'
					: 'Создан'}
			</p>
			<p className={'text text_type_main-medium mt-15'}>Состав:</p>
			<ul className={`${s.cards} scrollContainer mt-6`}>
				{order?.ingredients
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
				{/*//поправить - убрать условие*/}

				{order && (
					<FormattedDate
						date={new Date(order.createdAt)}
						className='text text_type_main-default text_color_inactive'
					/>
				)}

				<p className={`${s.price} text text_type_digits-default`}>
					{totalPrice} <CurrencyIcon type='primary' />
				</p>
			</div>
		</div>
	);
};
