import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../../services/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { IngredientsActionTypes } from '../../services/reducers/ingredients';

export interface BurgerIngredientsGroupType {
	name: string;
	type: string;
}
interface BurgerIngredientsType {
	groups: BurgerIngredientsGroupType[];
}
type AppDispatch = ThunkDispatch<RootState, void, IngredientsActionTypes>;

export const App = () => {
	const dispatch = useDispatch<AppDispatch>();
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

	useEffect(() => {
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
