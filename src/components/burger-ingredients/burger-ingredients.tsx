import s from './burger-ingredients.module.scss';
import React from 'react';
import { Tabs } from './tabs/tabs';
import { BurgerIngredientsGroupType, IngredientType } from '../app';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

interface BurgerIngredientsProps {
	burgerIngredientsData: IngredientType[];
	burgerIngredientsGroups: BurgerIngredientsGroupType[];
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
	burgerIngredientsData,
	burgerIngredientsGroups,
}) => {
	return (
		<section className={s.container}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<Tabs burgerIngredientsGroups={burgerIngredientsGroups} />
			<ul className={`${s.list} custom-scroll`}>
				{burgerIngredientsGroups.map((group, index) => (
					<li key={index}>
						{burgerIngredientsData && (
							<IngredientsGroup
								name={group.name}
								type={group.type}
								ingredients={burgerIngredientsData.filter(
									(item: { type: string }) => item.type === group.type
								)}
							/>
						)}
					</li>
				))}
			</ul>
		</section>
	);
};
