import s from './home.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThunkDispatch } from 'redux-thunk';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { getIngredients } from '../services/actions/ingredients';
import { RootState } from '../services/reducers';
import { IngredientsActionTypes } from '../services/reducers/ingredients';

type AppDispatch = ThunkDispatch<RootState, void, IngredientsActionTypes>;

export function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, hasError } = useSelector(
		(state: RootState) => state.ingredients
	);
	useEffect(() => {
		dispatch(getIngredients());
	}, []);

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
}
