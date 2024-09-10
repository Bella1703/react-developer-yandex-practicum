import s from './burger-constructor-ingredient.module.scss';
import React, { useRef } from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { TBurgerIngredient } from '../../../services/reducers/burger-constructor';
import { MOVE_INGREDIENT } from '../../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux';

type TBurgerConstructorIngredient = {
	ingredient: TBurgerIngredient;
	handleRemoveIngredient: (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>,
		ingredient: TBurgerIngredient
	) => void;
	index: number;
};

type DragItem = {
	id: string;
	index: number;
	type: string;
};

export const BurgerConstructorIngredient = ({
	ingredient,
	index,
	handleRemoveIngredient,
}: TBurgerConstructorIngredient): React.JSX.Element => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLLIElement>(null);
	const [, drop] = useDrop<DragItem>({
		accept: 'card',
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				hoverBoundingRect &&
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY =
				hoverBoundingRect &&
				clientOffset &&
				clientOffset.y - hoverBoundingRect.top;
			if (
				dragIndex < hoverIndex &&
				hoverClientY &&
				hoverMiddleY &&
				hoverClientY < hoverMiddleY
			) {
				return;
			}
			if (
				dragIndex > hoverIndex &&
				hoverClientY &&
				hoverMiddleY &&
				hoverClientY > hoverMiddleY
			) {
				return;
			}
			dispatch({
				type: MOVE_INGREDIENT,
				dragIndex,
				hoverIndex,
			});
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => {
			return { id: ingredient.uuid, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<li
			className={s.ingredientsItem}
			onClick={(e) => handleRemoveIngredient(e, ingredient)}
			ref={ref}
			style={{ opacity }}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				extraClass={'ml-2'}
			/>
		</li>
	);
};
