import s from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavItem } from './nav-item/nav-item.';
import React, { useState } from 'react';

export interface NavItemTypes {
	Component: React.ComponentType<{
		type: 'primary' | 'secondary' | 'error' | 'success';
	}>;
	text: string;
	link: string;
}

export const AppHeader = () => {
	const [navItems] = useState<NavItemTypes[]>([
		{ Component: BurgerIcon, text: 'Конструктор', link: '/' },
		{ Component: ListIcon, text: 'Лента заказов', link: '/unknown' },
		{ Component: ProfileIcon, text: 'Личный кабинет', link: '/profile' },
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
								Component={item.Component}
								text={item.text}
								link={item.link}
							/>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
