import s from './burger-constructor.module.scss';
import React, { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
	ConstructorElement,
	Button,
	DragIcon,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerIngredientType } from '../../services/reducers/burger-constructor';
import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
} from '../../services/actions/burger-constructor';
import { RootState } from '../../services/reducers';
import { placeOrder } from '../../services/actions/order';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export const BurgerConstructor = () => {
	const dispatch: AppThunkDispatch = useDispatch();
	const { bun, selectedIngredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);
	const [modalState, setModalState] = useState(false);
	const handleOpenModal = () => {
		setModalState(true);
	};
	const handleCloseModal = () => {
		setModalState(false);
	};
	const [, topBunDropTarget] = useDrop({
		accept: ['bun'],
		drop(bun) {
			dispatch({
				type: REPLACE_BUN,
				bun,
			});
		},
	});
	const [, bottomBunDropTarget] = useDrop({
		accept: ['bun'],
		drop(bun) {
			dispatch({
				type: REPLACE_BUN,
				bun,
			});
		},
	});
	const [, ingredientDropTarget] = useDrop({
		accept: ['main', 'sauce'],
		drop(ingredient) {
			dispatch({
				type: ADD_INGREDIENT,
				ingredient,
			});
		},
	});

	const handleRemoveIngredient = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>,
		ingredient: BurgerIngredientType
	) => {
		if (e.target instanceof SVGElement) {
			dispatch({
				type: REMOVE_INGREDIENT,
				ingredient,
			});
		}
	};

	const totalPrice = useMemo(() => {
		const bunPrice = (bun?.price ?? 0) * 2;
		const ingredientsPrice = selectedIngredients.reduce(
			(sum, ingredient) => sum + (ingredient.price ?? 0),
			0
		);
		return bunPrice + ingredientsPrice;
	}, [bun, selectedIngredients]);

	const handlePlaceOrder = () => {
		if (!bun || selectedIngredients.length === 0) {
			return false;
		}
		dispatch(
			placeOrder([
				bun._id,
				...selectedIngredients.map((ingredient) => ingredient._id),
				bun._id,
			])
		);
		handleOpenModal();
	};

	return (
		<section className={`${s.container} pl-4 pr-4`}>
			<div
				ref={topBunDropTarget}
				className={bun ? '' : `${s.placeholder} ${s.placeholderTopBun}`}>
				{bun && (
					<ConstructorElement
						text={bun.name + ' (верх)'}
						price={bun.price}
						thumbnail={bun.image}
						type='top'
						isLocked={true}
						extraClass={'ml-8'}
					/>
				)}
			</div>

			<div
				ref={ingredientDropTarget}
				className={
					selectedIngredients.length === 0
						? `${s.placeholder} ${s.placeholderIngredient}`
						: ''
				}>
				<ul className={`${s.ingredients} custom-scroll mt-4`}>
					{selectedIngredients.map((ingredient) => (
						<li
							key={ingredient.uuid}
							className={s.ingredientsItem}
							onClick={(e) => handleRemoveIngredient(e, ingredient)}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
								extraClass={'ml-2'}
							/>
						</li>
					))}
				</ul>
			</div>

			<div
				ref={bottomBunDropTarget}
				className={
					bun ? 'mt-4' : `${s.placeholder} ${s.placeholderBottomBun} mt-4`
				}>
				{bun && (
					<ConstructorElement
						text={bun.name + ' (низ)'}
						price={bun.price}
						thumbnail={bun.image}
						type='bottom'
						isLocked={true}
						extraClass={'ml-8'}
					/>
				)}
			</div>

			<div className={`${s.footer} mt-10 pr-8`}>
				<div className={`${s.sum} text text_type_digits-medium`}>
					{totalPrice}
					<CurrencyIcon type='primary' />
				</div>
				<Button
					onClick={handlePlaceOrder}
					htmlType='button'
					type='primary'
					size='large'>
					Оформить заказ
				</Button>
				{modalState && (
					<Modal title={''} onClose={handleCloseModal}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
};
