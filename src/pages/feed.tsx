import s from './feed.module.scss';
import { OrderCard } from '../components/order/order-card';
import React from 'react';

export const Feed = (): React.JSX.Element => {
	return (
		<div className={s.container}>
			<h1 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h1>
			<div className={s.columns}>
				<div className={'scrollContainer'}>
					<OrderCard className='mb-4' />
					<OrderCard className='mb-4' />
					<OrderCard className='mb-4' />
					<OrderCard className='mb-4' />
					<OrderCard className='mb-4' />
					<OrderCard className='mb-4' />
				</div>
				<div className={s.info}>
					<div className={s.statuses}>
						<div>
							<p className='text text_type_main-medium mb-6'>Готовы:</p>
							<ul className={s.list}>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
								<li className={'text text_type_digits-default blueText'}>
									034533
								</li>
							</ul>
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>В работе:</p>
							<ul className={s.list}>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
							</ul>
						</div>
					</div>
					<span>
						<p className='text text_type_main-medium'>
							Выполнено за все время:
						</p>
						<p className='text text_type_digits-large numberShadow'>28 752</p>
					</span>
					<span>
						<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
						<p className='text text_type_digits-large numberShadow'>138</p>
					</span>
				</div>
			</div>
		</div>
	);
};
