import s from './ingredient-details.module.scss';
import React, { FC } from 'react';
import { Ingredient } from '../burger-ingredients/ingredients-group/ingredients-group';

export const IngredientDetails: FC<Ingredient> = ({ ...props }) => {
	return (
		<div className={s.content}>
			<img src={props.image} alt={props.name} className={s.image} />
			<p className={'text text_type_main-medium mt-7'}>{props.name}</p>
			<ul className={`${s.details} mt-8`}>
				<li>
					<p className={'text text_type_main-default text_color_inactive'}>
						Калории,ккал
					</p>
					<p
						className={
							'text text_type_digits-default text_color_inactive mt-2'
						}>
						{props.calories}
					</p>
				</li>
				<li>
					<p className={'text text_type_main-default text_color_inactive'}>
						Белки, г
					</p>
					<p
						className={
							'text text_type_digits-default text_color_inactive mt-2'
						}>
						{props.proteins}
					</p>
				</li>
				<li>
					<p className={'text text_type_main-default text_color_inactive'}>
						Жиры, г
					</p>
					<p
						className={
							'text text_type_digits-default text_color_inactive mt-2'
						}>
						{props.fat}
					</p>
				</li>
				<li>
					<p className={'text text_type_main-default text_color_inactive'}>
						Углеводы, г
					</p>
					<p
						className={
							'text text_type_digits-default text_color_inactive mt-2'
						}>
						{props.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};
