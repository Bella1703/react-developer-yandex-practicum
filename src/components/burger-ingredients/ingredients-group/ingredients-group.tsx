import s from './ingredients-group.module.scss';
import React, { FC } from 'react';
import { IngredientCard } from '../ingredient-card/ingredient-card';

export interface Ingredient {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface BurgerIngredientsGroup {
	type: string;
	ingredients: Ingredient[];
}

export const IngredientsGroup: FC<BurgerIngredientsGroup> = ({
	ingredients,
}) => {
	return (
		<ul className={`${s.list} pl-4 pr-4 mt-6`}>
			{ingredients.map((ingredient) => (
				<li key={ingredient._id}>
					<IngredientCard {...ingredient} />
				</li>
			))}
		</ul>
	);
};
