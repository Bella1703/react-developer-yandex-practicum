import s from './ingredient-details.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TRootState } from '../../services/reducers';
import { GET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

export const IngredientDetails = (): React.JSX.Element | null => {
	const dispatch = useDispatch();
	const location = useLocation();
	const background = location.state?.background;
	const { ingredients } = useSelector((state: TRootState) => state.ingredients);
	const { ingredientDetails } = useSelector(
		(state: TRootState) => state.ingredientDetails
	);

	useEffect(() => {
		ingredients &&
			dispatch({
				type: GET_INGREDIENT_DETAILS,
				ingredients: ingredients,
				id: location.pathname.split('/')[2],
			});
	}, [ingredients]);

	return (
		ingredientDetails && (
			<div className={`${s.content} ${background ? '' : 'mt-30'}`}>
				<p className={'text text_type_main-large'}>Детали ингредиента</p>
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
