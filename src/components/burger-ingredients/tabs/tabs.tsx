import s from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';

import { BurgerIngredientsGroupType } from '../../app';

interface TabsProps {
	burgerIngredientsGroups: BurgerIngredientsGroupType[];
}

export const Tabs: FC<TabsProps> = ({ burgerIngredientsGroups }) => {
	const [current, setCurrent] = React.useState('buns');

	return (
		<div className={`${s.tabs} mt-5`}>
			{burgerIngredientsGroups.map((group, index) => (
				<Tab
					key={index}
					value={group.type}
					active={current === group.type}
					onClick={setCurrent}>
					{group.name}
				</Tab>
			))}
		</div>
	);
};
