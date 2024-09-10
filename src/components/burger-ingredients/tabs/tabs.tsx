import s from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';

import { TBurgerIngredientsGroup } from '../burger-ingredients';

type TTabsProps = {
	burgerIngredientsGroups: TBurgerIngredientsGroup[];
	activeTabType: string;
};

export const Tabs = ({
	burgerIngredientsGroups,
	activeTabType,
}: TTabsProps): React.JSX.Element => {
	const [current, setCurrent] = useState(activeTabType);

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
