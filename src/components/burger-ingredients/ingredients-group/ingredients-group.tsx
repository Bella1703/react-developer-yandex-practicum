import s from './ingredients-group.module.scss';
import React from 'react';
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
	name: string;
	type: string;
	ingredients: Ingredient[];
}

export const IngredientsGroup: React.FC<BurgerIngredientsGroup> = ({
	name,
	ingredients,
}) => {
	return (
		<section className={s.container}>
			<h2 className={'text text_type_main-medium mt-10'}>{name}</h2>
			<ul className={`${s.list} pl-4 pr-4 mt-6`}>
				{ingredients.map((ingredient) => (
					<li key={ingredient._id}>
						<IngredientCard {...ingredient} />
					</li>
				))}
			</ul>
		</section>
	);
};
