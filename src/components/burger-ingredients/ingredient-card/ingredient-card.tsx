import s from './ingredient-card.module.scss';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../ingredients-group/ingredients-group';
import { useSelector } from '../../../services/hooks';

export const IngredientCard = ({
	...props
}: TIngredient): React.JSX.Element => {
	const location = useLocation();
	const ingredientId = props._id;
	const [, dragRef] = useDrag({
		type: props.type,
		item: { ...props },
	});
	const { selectedIngredients } = useSelector(
		(state) => state.burgerConstructor
	);
	const count = selectedIngredients.filter(
		(ingredient) => ingredient._id === props._id
	).length;

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}>
			<div
				className={s.card}
				ref={dragRef}
				data-testid={
					props.type === 'bun'
						? 'bun'
						: props.type === 'main'
						? 'main'
						: 'sauce'
				}>
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
		</Link>
	);
};
