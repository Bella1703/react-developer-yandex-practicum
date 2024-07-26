import s from './burger-constructor.module.scss';
import React, { useState } from 'react';
import { IngredientType } from '../../app';
import {
	ConstructorElement,
	Button,
	DragIcon,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';

interface BurgerConstructorProps {
	burgerIngredients: IngredientType[];
}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
	burgerIngredients,
}) => {
	const burgerBun = burgerIngredients.find(
		(ingredient) => ingredient.type === 'bun'
	);
	const [modalState, setModalState] = useState(false);
	const handleOpenModal = () => {
		setModalState(true);
	};
	const handleCloseModal = () => {
		setModalState(false);
	};
	return (
		<section className={`${s.container} pl-4 pr-4`}>
			{burgerBun && (
				<ConstructorElement
					text={burgerBun.name + ' (верх)'}
					price={burgerBun.price}
					thumbnail={burgerBun.image}
					type='top'
					isLocked={true}
					extraClass={'ml-8'}
				/>
			)}
			<ul className={`${s.ingredients} custom-scroll mt-4 mb-4`}>
				{burgerIngredients.map(
					(ingredient) =>
						ingredient.type !== 'bun' && (
							<li key={ingredient._id} className={s.ingredientsItem}>
								<DragIcon type='primary' />
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
									extraClass={'ml-2'}
								/>
							</li>
						)
				)}
			</ul>
			{burgerBun && (
				<ConstructorElement
					text={burgerBun.name + ' (низ)'}
					price={burgerBun.price}
					thumbnail={burgerBun.image}
					type='bottom'
					isLocked={true}
					extraClass={'ml-8'}
				/>
			)}
			<div className={`${s.footer} mt-10 pr-8`}>
				<div className={`${s.sum} text text_type_digits-medium`}>
					610
					<CurrencyIcon type='primary' />
				</div>
				<Button
					onClick={handleOpenModal}
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
