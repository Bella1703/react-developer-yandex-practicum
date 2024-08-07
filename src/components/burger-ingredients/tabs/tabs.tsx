import s from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect } from 'react';

import { BurgerIngredientsGroupType } from '../burger-ingredients';

interface TabsProps {
	burgerIngredientsGroups: BurgerIngredientsGroupType[];
	activeTabType: string;
}

export const Tabs: FC<TabsProps> = ({
	burgerIngredientsGroups,
	activeTabType,
}) => {
	const [current, setCurrent] = React.useState(activeTabType);

	useEffect(() => {
		setCurrent(activeTabType);
	}, [activeTabType]);

	return (
		<div className={`${s.tabs} mt-5`}>
			{burgerIngredientsGroups.map((group, index) => (
				<Tab
					key={index}
					value={group.type}
					active={current === group.type}
					onClick={() => setCurrent(group.type)}>
					{group.name}
				</Tab>
			))}
		</div>
	);
};
