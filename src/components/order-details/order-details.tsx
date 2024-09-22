import s from './order-details.module.scss';
import React from 'react';
import illustration from '../../images/illustration.png';
import { useSelector } from '../../services/hooks';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails = (): React.JSX.Element => {
	const { response, isLoading, hasError } = useSelector((state) => state.order);
	const dateFromServer = '2022-10-10T17:33:32.877Z';

	return (
		<div className={s.content}>
			<p className={`text text_type_digits-default ${s.centerText}`}>#034533</p>
			<p className={'text text_type_main-medium mt-10'}>
				Black Hole Singularity острый бургер
			</p>
			<p className={'text text_type_main-default blueText mt-3'}>Выполнен</p>
			<p className={'text text_type_main-medium mt-15'}>Состав:</p>
			<ul className={`${s.cards} scrollContainer mt-6`}>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
				<li className={s.card}>
					<div>
						<div className={'ingredient'}>
							<img src={illustration} alt='' />
						</div>
						<p className='text text_type_main-default pl-4'>
							Флюоресцентная булка R2-D3
						</p>
					</div>
					<p className={`${s.price} text text_type_digits-default`}>
						2 x 20 <CurrencyIcon type='primary' />
					</p>
				</li>
			</ul>
			<div className={`${s.totalInfo} mt-10`}>
				<FormattedDate
					date={new Date(dateFromServer)}
					className='text text_type_main-default text_color_inactive'
				/>
				<p className={`${s.price} text text_type_digits-default`}>
					510 <CurrencyIcon type='primary' />
				</p>
			</div>
		</div>
	);
};
