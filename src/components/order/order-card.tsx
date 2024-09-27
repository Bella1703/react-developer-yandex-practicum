import s from './order-card.module.scss';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TOrder } from '../../services/types';
import { useSelector } from '../../services/hooks';

type TOrderCard = {
	order: TOrder;
	className?: string;
};

export const OrderCard = ({
	order,
	className,
}: TOrderCard): React.JSX.Element | null => {
	const { ingredients } = useSelector((state) => state.ingredients);
	const location = useLocation();

	return (
		<Link
			key={order._id}
			to={`/feed/${order._id}`}
			state={{ background: location }}
			className={`${s.container} pt-6 pr-6 pb-6 pl-6 ${className}`}>
			<span className={s.row}>
				<p className='text text_type_digits-default'>#{order.number}</p>
				<FormattedDate
					date={new Date(order.updatedAt)}
					className='text text_type_main-default text_color_inactive'
				/>
			</span>
			<p className='text text_type_main-medium'>{order.name}</p>
			<span className={s.row}>
				<ul className={s.iconRow}>
					{order.ingredients.map((ingredient, index) => {
						const item = ingredients.find((item) => item._id === ingredient);
						if (!item) return null;

						return (
							<li
								className={`ingredient ${
									order.ingredients.length > 6 && index === 5 ? s.darkened : ''
								}`}
								key={index}>
								<span>
									<img src={item.image} alt='' />
								</span>
							</li>
						);
					})}
				</ul>
				{order.ingredients.length > 6 && (
					<span className={`${s.counter} text text_type_main-default`}>
						+{order.ingredients.length - 6}
					</span>
				)}
				<p className='text text_type_digits-default'>
					{order.ingredients.reduce((sum, id) => {
						const ingredient = ingredients.find((item) => item._id === id);
						return ingredient ? sum + ingredient.price : sum;
					}, 0)}
					<CurrencyIcon type='primary' />
				</p>
			</span>
		</Link>
	);
};
