import s from './home.module.scss';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { TRootState } from '../services/reducers';
import React from 'react';

export const Home = (): React.JSX.Element => {
	const { isLoading, hasError } = useSelector(
		(state: TRootState) => state.ingredients
	);

	return (
		<>
			<div className={s.container}>
				{hasError && (
					<p className={'text text_type_main-large'}>
						Что-то пошло не так. Перезагрузите страницу.
					</p>
				)}
				{isLoading && (
					<p className={'text text_type_main-large'}>Загрузка данных...</p>
				)}
				{!hasError && !isLoading && (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				)}
			</div>
		</>
	);
};
