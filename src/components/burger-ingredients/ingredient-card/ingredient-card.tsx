import s from './ingredient-card.module.scss';
import React, { FC, useState } from 'react';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../modal/modal';
import { Ingredient } from '../ingredients-group/ingredients-group';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/reducers';
import { GET_INGREDIENT_DETAILS } from '../../../services/actions/ingredient-details';

export const IngredientCard: FC<Ingredient> = ({ ...props }) => {
	const [modalState, setModalState] = useState(false);
	const { ingredients } = useSelector((state: RootState) => state.ingredients);
	const dispatch = useDispatch();
	const handleOpenModal = () => {
		dispatch({
			type: GET_INGREDIENT_DETAILS,
			ingredients: ingredients,
			id: props._id,
		});
		setModalState(true);
	};
	const handleCloseModal = () => {
		setModalState(false);
	};
	const [, dragRef] = useDrag({
		type: props.type,
		item: { ...props },
	});
	const { selectedIngredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);
	const count = selectedIngredients.filter(
		(ingredient) => ingredient._id === props._id
	).length;

	return (
		<>
			<div className={s.card} onClick={handleOpenModal} ref={dragRef}>
				{count > 0 && (
					<Counter count={count} size='default' extraClass={s.counter} />
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
					<IngredientDetails />
				</Modal>
			)}
		</>
	);
};
