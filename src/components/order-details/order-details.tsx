import s from './order-details.module.scss';
import React from 'react';
import imageDone from '../../images/done.png';
import { useSelector } from '../../services/hooks';

export const OrderDetails = (): React.JSX.Element => {
	const { response, isLoading, hasError } = useSelector((state) => state.order);

	return (
		<div className={s.content}>
			{hasError && (
				<p className={'text text_type_main-large'}>
					Что-то пошло не так. Попробуйте создать заказ снова.
				</p>
			)}
			{isLoading && (
				<>
					<p className={'text text_type_main-large mb-9'}>
						Формируем заказ
					</p>
					<p className={s.spinner}></p>
				</>
			)}
			{!hasError && !isLoading && response && response.success && (
				<>
					<h2 className={`${s.number} text text_type_digits-large mt-9`}>
						{response.order.number}
					</h2>
					<p className={'text text_type_main-medium mt-8'}>
						идентификатор заказа
					</p>
					<img src={imageDone} alt='' className={`${s.image} mt-15`} />
					<p className={'text text_type_main-default mt-15'}>
						Ваш заказ начали готовить
					</p>
					<p
						className={
							'text text_type_main-default text_color_inactive mt-2 mb-15'
						}>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};
