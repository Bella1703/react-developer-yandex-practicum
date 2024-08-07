import s from './burger-ingredients.module.scss';
import React, { FC, useRef, useState } from 'react';
import { Tabs } from './tabs/tabs';
import { BurgerIngredientsGroupType, IngredientType } from '../app';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

interface BurgerIngredientsProps {
	burgerIngredientsData: IngredientType[];
	burgerIngredientsGroups: BurgerIngredientsGroupType[];
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
	burgerIngredientsData,
	burgerIngredientsGroups,
}) => {
	const [activeTabType, setActiveTabType] = useState(
		burgerIngredientsGroups[0].type
	);
	const tabsRef = useRef<HTMLDivElement | null>(null);
	const groupTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

	const onIngredientsScroll = () => {
		if (!tabsRef.current) {
			return;
		}
		const tabsBottom =
			tabsRef.current && tabsRef.current.getBoundingClientRect().bottom;
		let minDifference = Infinity;
		let activeTabIndex = 0;

		groupTitleRefs.current.forEach((ref, index) => {
			if (ref) {
				const groupTitleTop = ref.getBoundingClientRect().top;
				const difference = Math.abs(tabsBottom - groupTitleTop);
				if (difference < minDifference) {
					minDifference = difference;
					activeTabIndex = index;
				}
			}
		});
		setActiveTabType(burgerIngredientsGroups[activeTabIndex].type);
	};

	return (
		<section className={s.container}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<div ref={tabsRef}>
				<Tabs
					burgerIngredientsGroups={burgerIngredientsGroups}
					activeTabType={activeTabType}
				/>
			</div>
			<ul onScroll={onIngredientsScroll} className={`${s.list} custom-scroll`}>
				{burgerIngredientsGroups.map((group, index) => (
					<li key={index}>
						{burgerIngredientsData && (
							<section>
								<h2
									ref={(el) => (groupTitleRefs.current[index] = el)}
									className={'text text_type_main-medium mt-10'}>
									{group.name}
								</h2>
								<IngredientsGroup
									type={group.type}
									ingredients={burgerIngredientsData.filter(
										(item) => item.type === group.type
									)}
								/>
							</section>
						)}
					</li>
				))}
			</ul>
		</section>
	);
};
