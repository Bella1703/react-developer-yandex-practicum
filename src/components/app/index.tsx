import { useEffect } from 'react';
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

type AppDispatch = ThunkDispatch<RootState, void, IngredientsActionTypes>;

export const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, hasError } = useSelector(
		(state: RootState) => state.ingredients
	);

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
