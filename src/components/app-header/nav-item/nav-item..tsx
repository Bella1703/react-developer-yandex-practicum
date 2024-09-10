import React, { useEffect, useState } from 'react';
import s from './nav-item.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { TNavItem } from '../app-header';

export const NavItem = ({
	Component,
	text,
	link,
}: TNavItem): React.JSX.Element => {
	const [isActiveLink, setIsActiveLink] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (link === '/' && location.pathname === '/') {
			setIsActiveLink(true);
		} else if (
			link !== '/' &&
			location.pathname.startsWith(link) &&
			location.pathname !== '/'
		) {
			setIsActiveLink(true);
		} else {
			setIsActiveLink(false);
		}
	}, [location.pathname, link]);

	return (
		<li className={`${s.menuItem} pl-5 pr-5 pb-4 pt-4`}>
			<NavLink to={link}>
				<Component type={isActiveLink ? 'primary' : 'secondary'} />
				<span
					className={`text text_type_main-default ${
						isActiveLink ? 'active' : 'text_color_inactive'
					}`}>
					{text}
				</span>
			</NavLink>
		</li>
	);
};
