import s from './order-card.module.scss';
import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import illustration from '../../images/illustration.png';

type TOrderCard = {
	className?: string;
};

export const OrderCard = ({
	className,
}: TOrderCard): React.JSX.Element | null => {
	const images = [
		illustration,
		illustration,
		illustration,
		illustration,
		illustration,
		illustration,
		illustration,
		illustration,
	];

	return (
		<div className={`${s.container} pt-6 pr-6 pb-6 pl-6 ${className}`}>
			<span className={s.row}>
				<p className='text text_type_digits-default'>#034535</p>
				<p className='text text_type_main-default text_color_inactive'>
					Сегодня, 16:20
				</p>
			</span>
			<p className='text text_type_main-medium'>
				Death Star Starship Main бургер
			</p>
			<span className={s.row}>
				<ul className={s.iconRow}>
					{images.map((image, index) => (
						<li
							className={`${s.ingredient} ${
								images.length > 6 && index === 5 ? s.darkened : ''
							}`}
							key={index}>
							<img src={image} alt='' />
						</li>
					))}
				</ul>
				{images.length > 6 && (
					<span className={`${s.counter} text text_type_main-default`}>
						+{images.length - 6}
					</span>
				)}

				<p className='text text_type_digits-default'>
					480 <CurrencyIcon type='primary' />
				</p>
			</span>
		</div>
	);
};
