import { useEffect, useState } from 'react';
import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
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
}
interface BurgerIngredientsType {
	data: IngredientType[] | null;
	groups: BurgerIngredientsGroupType[];
	loading: boolean;
}

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [error, setError] = useState();
	const [burgerIngredients, setBurgerIngredients] =
		useState<BurgerIngredientsType>({
			data: null,
			groups: [
				{
					name: 'Булки',
					type: 'bun',
				},
				{
					name: 'Соусы',
					type: 'sauce',
				},
				{
					name: 'Начинки',
					type: 'main',
				},
			],
			loading: true,
		});
	const selectedIngredients = burgerIngredients.data
		? burgerIngredients.data.filter(
				(ingredient) =>
					ingredient._id === '643d69a5c3f7b9001cfa093c' ||
					ingredient._id === '643d69a5c3f7b9001cfa0944' ||
					ingredient._id === '643d69a5c3f7b9001cfa093f' ||
					ingredient._id === '643d69a5c3f7b9001cfa0947' ||
					ingredient._id === '643d69a5c3f7b9001cfa0948' ||
					ingredient._id === '643d69a5c3f7b9001cfa094a' ||
					ingredient._id === '643d69a5c3f7b9001cfa0946'
		  )
		: [];
	useEffect(() => {
		const getIngredientsData = async () => {
			try {
				setBurgerIngredients({ ...burgerIngredients, loading: true });
				const res = await fetch(apiUrl);
				if (!res.ok) {
					throw new Error('Ответ сети был не ok.');
				}
				const data = await res.json();
				setBurgerIngredients((prevState) => ({
					...prevState,
					data: data.data,
					loading: false,
				}));
			} catch (err: any) {
				setError(err);
			}
		};
		getIngredientsData();
	}, []);

	return (
		<>
			<AppHeader />
			<div className={s.container}>
				{error && (
					<p className={'text text_type_main-large'}>
						Что-то пошло не так. Перезагрузите страницу.
					</p>
				)}
				{!error && burgerIngredients.data === null && (
					<p className={'text text_type_main-large'}>Загрузка данных...</p>
				)}
				{!error && burgerIngredients.data !== null && (
					<>
						<BurgerIngredients
							burgerIngredientsData={burgerIngredients.data}
							burgerIngredientsGroups={burgerIngredients.groups}
						/>
						<BurgerConstructor selectedIngredients={selectedIngredients} />
					</>
				)}
			</div>
		</>
	);
};
