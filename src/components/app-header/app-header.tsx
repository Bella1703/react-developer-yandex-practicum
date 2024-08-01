import s from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavItem } from './nav-item/nav-item.';
import React, { useState } from 'react';

interface navItem {
	component: React.ComponentType<{
		type: 'primary' | 'secondary' | 'error' | 'success';
	}>;
	type: 'primary' | 'secondary' | 'error' | 'success';
	text: string;
}

export const AppHeader = () => {
	const [navItems] = useState<navItem[]>([
		{ component: BurgerIcon, type: 'primary', text: 'Конструктор' },
		{ component: ListIcon, type: 'secondary', text: 'Лента заказов' },
		{ component: ProfileIcon, type: 'secondary', text: 'Личный кабинет' },
	]);

	return (
		<header className={s.header}>
			<div className={`${s.container} pb-4 pt-4`}>
				<div className={`${s.logoWrapper} pb-1 pt-1`}>
					<Logo />
				</div>
				<nav className={s.nav}>
					<ul className={s.navList}>
						{navItems.map((item, index) => (
							<NavItem
								key={index}
								Component={item.component}
								text={item.text}
								type={item.type}
							/>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
