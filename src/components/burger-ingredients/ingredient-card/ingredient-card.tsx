import s from './ingredient-card.module.scss';
import React from 'react';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

export interface IngredientCardType {
	text: string;
	price: number;
	thumbnail: string;
}

export const IngredientCard: React.FC<IngredientCardType> = ({
	text,
	price,
	thumbnail,
}) => {
	return (
		<div className={s.card}>
			{price === 1255 && (
				<Counter count={1} size='default' extraClass={s.counter} />
			)}
			<img src={thumbnail} alt={text} className={s.image} />
			<div className={s.price}>
				<p className={'text text_type_digits-default'}>{price}</p>
				<CurrencyIcon type='primary' />
			</div>

			<p className={'text text_type_main-default'}>{text}</p>
		</div>
	);
};
