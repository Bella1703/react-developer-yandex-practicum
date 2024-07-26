import { useEffect, useState } from 'react';
import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

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

interface StateType {
	ingredientsData: IngredientType[] | null;
	ingredientsGroups: BurgerIngredientsGroupType[];
	loading: boolean;
}

export const App = () => {
	const [error, setError] = useState();
	const [state, setState] = useState<StateType>({
		ingredientsData: null,
		ingredientsGroups: [
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
	const burgerIngredients = state.ingredientsData
		? state.ingredientsData.filter(
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
	const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';
	useEffect(() => {
		const getIngredientsData = async () => {
			try {
				setState({ ...state, loading: true });
				const res = await fetch(apiUrl);
				const data = await res.json();
				setState({
					...state,
					ingredientsData: data.data,
					loading: false,
				});
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
				{error ? (
					<p className={'text text_type_main-large'}>
						Что-то пошло не так. Перезагрузите страницу.
					</p>
				) : state.ingredientsData === null ? (
					<p className={'text text_type_main-large'}>Загрузка данных...</p>
				) : (
					<>
						<BurgerIngredients
							burgerIngredientsData={state.ingredientsData}
							burgerIngredientsGroups={state.ingredientsGroups}
						/>
						<BurgerConstructor burgerIngredients={burgerIngredients} />
					</>
				)}
			</div>
		</>
	);
};
