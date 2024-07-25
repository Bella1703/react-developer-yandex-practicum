import { useState } from 'react';
import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { burgerIngredientsData } from '../../../utils/data.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export interface IngredientType {
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

export interface BurgerIngredientsGroupType {
	name: string;
	type: string;
	ingredients: IngredientType[];
}

export const App = () => {
	const [burgerIngredientsGroups] = useState<BurgerIngredientsGroupType[]>([
		{
			name: 'Булки',
			type: 'bun',
			ingredients: burgerIngredientsData.filter((item) => item.type === 'bun'),
		},
		{
			name: 'Соусы',
			type: 'sauce',
			ingredients: burgerIngredientsData.filter(
				(item) => item.type === 'sauce'
			),
		},
		{
			name: 'Начинки',
			type: 'main',
			ingredients: burgerIngredientsData.filter((item) => item.type === 'main'),
		},
	]);

	const burgerIngredients = burgerIngredientsData.filter(
		(ingredient) =>
			ingredient._id === '60666c42cc7b410027a1a9b1' ||
			ingredient._id === '60666c42cc7b410027a1a9b9' ||
			ingredient._id === '60666c42cc7b410027a1a9b4' ||
			ingredient._id === '60666c42cc7b410027a1a9bc' ||
			ingredient._id === '60666c42cc7b410027a1a9bb' ||
			ingredient._id === '60666c42cc7b410027a1a9ba' ||
			ingredient._id === '60666c42cc7b410027a1a9b3' ||
			ingredient._id === '60666c42cc7b410027a1a9bf'
	);

	return (
		<>
			<AppHeader />
			<div className={s.container}>
				<BurgerIngredients burgerIngredientsGroups={burgerIngredientsGroups} />
				<BurgerConstructor burgerIngredients={burgerIngredients} />
			</div>
		</>
	);
};
