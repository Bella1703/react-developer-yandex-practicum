import s from './ingredient-details.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

export const IngredientDetails = () => {
	const { ingredientDetails } = useSelector(
		(state: RootState) => state.ingredientDetails
	);
	return (
		ingredientDetails && (
			<div className={s.content}>
				<img
					src={ingredientDetails.image}
					alt={ingredientDetails.name}
					className={s.image}
				/>
				<p className={'text text_type_main-medium mt-7'}>
					{ingredientDetails.name}
				</p>
				<ul className={`${s.details} mt-8`}>
					<li>
						<p className={'text text_type_main-default text_color_inactive'}>
							Калории,ккал
						</p>
						<p
							className={
								'text text_type_digits-default text_color_inactive mt-2'
							}>
							{ingredientDetails.calories}
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
							{ingredientDetails.proteins}
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
							{ingredientDetails.fat}
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
							{ingredientDetails.carbohydrates}
						</p>
					</li>
				</ul>
			</div>
		)
	);
};
