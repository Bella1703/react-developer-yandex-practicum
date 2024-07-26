import s from './order-details.module.scss';
import React from 'react';
import imageDone from '../../../images/done.png';

export const OrderDetails = () => {
	return (
		<div className={s.content}>
			<h2 className={`${s.number} text text_type_digits-large mt-9`}>034536</h2>
			<p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
			<img src={imageDone} alt='' className={`${s.image} mt-15`} />
			<p className={'text text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
			<p className={'text text_type_main-default text_color_inactive mt-2 mb-15'}>Дождитесь готовности на орбитальной станции</p>
		</div>
	);
};
