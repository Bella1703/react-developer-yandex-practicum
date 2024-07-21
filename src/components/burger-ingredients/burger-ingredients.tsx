import s from './burger-ingredients.module.scss';
import React from 'react';
import { Tabs } from './tabs/tabs';
import { BurgerIngredientsGroupType } from '../../app';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

interface BurgerIngredientsProps {
	burgerIngredientsGroups: BurgerIngredientsGroupType[];
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
	burgerIngredientsGroups,
}) => {
	return (
		<section className={s.container}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<Tabs burgerIngredientsGroups={burgerIngredientsGroups} />
			<ul className={`${s.list} custom-scroll`}>
				{burgerIngredientsGroups.map((group, index) => (
					<li key={index}>
						<IngredientsGroup
							name={group.name}
							type={group.type}
							ingredients={group.ingredients}
						/>
					</li>
				))}
			</ul>
		</section>
	);
};
