import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from "../../services/reducers";

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
	groups: BurgerIngredientsGroupType[];
}

export const App = () => {
	const dispatch = useDispatch();
	const { ingredients, isLoading, hasError } = useSelector(
		(state: RootState) => state.ingredients
	);
	const [burgerIngredients] = useState<BurgerIngredientsType>({
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
	});
	const selectedIngredients = ingredients
		? ingredients.filter(
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
		// @ts-ignore
		dispatch(getIngredients());
	}, []);

	return (
		<>
			<AppHeader />
			<div className={s.container}>
				{hasError && (
					<p className={'text text_type_main-large'}>
						Что-то пошло не так. Перезагрузите страницу.
					</p>
				)}
				{isLoading && (
					<p className={'text text_type_main-large'}>Загрузка данных...</p>
				)}
				{!hasError && ingredients && (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients
							burgerIngredientsData={ingredients}
							burgerIngredientsGroups={burgerIngredients.groups}
						/>
						<BurgerConstructor />
					</DndProvider>
				)}
			</div>
		</>
	);
};
