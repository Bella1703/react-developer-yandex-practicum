import s from './burger-ingredients.module.scss';
import React, { useRef, useState } from 'react';
import { Tabs } from './tabs/tabs';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/reducers';

export type TBurgerIngredientsGroup = {
	name: string;
	type: string;
};

export const BurgerIngredients = (): React.JSX.Element => {
	const tabsRef = useRef<HTMLDivElement | null>(null);
	const groupTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
	const [burgerIngredientsGroups] = useState<TBurgerIngredientsGroup[]>([
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
	]);
	const [activeTabType, setActiveTabType] = useState(
		burgerIngredientsGroups[0].type
	);
	const { ingredients } = useSelector((state: TRootState) => state.ingredients);

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
						{ingredients && (
							<section>
								<h2
									ref={(el) => (groupTitleRefs.current[index] = el)}
									className={'text text_type_main-medium mt-10'}>
									{group.name}
								</h2>
								<IngredientsGroup
									type={group.type}
									ingredients={ingredients.filter(
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
