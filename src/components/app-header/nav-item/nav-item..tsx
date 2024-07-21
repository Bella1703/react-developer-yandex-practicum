import React from 'react';
import s from './nav-item.module.scss';

interface NavItemProps {
	Component: React.ComponentType<{
		type: 'primary' | 'secondary' | 'error' | 'success';
	}>;
	type: 'primary' | 'secondary' | 'error' | 'success';
	text: string;
}

export const NavItem: React.FC<NavItemProps> = ({ Component, type, text }) => {
	return (
		<li className={`${s.menuItem} pl-5 pr-5 pb-4 pt-4`}>
			<Component type={type} />
			<span
				className={`text text_type_main-default ${
					type === 'secondary' ? 'text_color_inactive' : ''
				}`}>
				{text}
			</span>
		</li>
	);
};
