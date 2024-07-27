import s from './ingredient-card.module.scss';
import React, { FC, useState } from 'react';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../modal/modal';
import { Ingredient } from '../ingredients-group/ingredients-group';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';

export const IngredientCard: FC<Ingredient> = ({ ...props }) => {
	const [modalState, setModalState] = useState(false);
	const handleOpenModal = () => {
		setModalState(true);
	};
	const handleCloseModal = () => {
		setModalState(false);
	};

	return (
		<>
			<div className={s.card} onClick={handleOpenModal}>
				{props.price === 1255 && (
					<Counter count={1} size='default' extraClass={s.counter} />
				)}
				<img src={props.image} alt={props.name} className={s.image} />
				<div className={s.price}>
					<p className={'text text_type_digits-default'}>{props.price}</p>
					<CurrencyIcon type='primary' />
				</div>

				<p className={'text text_type_main-default'}>{props.name}</p>
			</div>
			{modalState && (
				<Modal title={'Детали ингредиента'} onClose={handleCloseModal}>
					<IngredientDetails {...props} />
				</Modal>
			)}
		</>
	);
};
