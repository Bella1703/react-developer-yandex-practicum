import s from './app-header.module.scss';
import React, { useState, ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './nav-item/nav-item.';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export type TNavItem = {
	Component: ComponentType<{
		type: 'primary' | 'secondary' | 'error' | 'success';
	}>;
	text: string;
	link: string;
};

export const AppHeader = (): React.JSX.Element => {
	const [navItems] = useState<Array<TNavItem>>([
		{ Component: BurgerIcon, text: 'Конструктор', link: '/' },
		{ Component: ListIcon, text: 'Лента заказов', link: '/order-feed' },
		{ Component: ProfileIcon, text: 'Личный кабинет', link: '/profile' },
	]);

	return (
		<header className={s.header}>
			<div className={`${s.container} pb-4 pt-4`}>
				<Link to={'/'} className={`${s.logoWrapper} pb-1 pt-1`}>
					<Logo />
				</Link>
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
