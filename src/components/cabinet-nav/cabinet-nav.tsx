import s from './cabinet-nav.module.scss';
import React from 'react';
import { useDispatch } from '../../services/hooks';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/actions/user';

export const CabinetNav = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const handleSignOut = async () => {
		const token = localStorage.getItem('refreshToken');
		if (token) {
			dispatch(
				signOut(
					{
						token: token,
					},
					(hasError) => {
						if (hasError) {
							alert('Что-то пошло не так, попробуйте еще раз');
						}
					}
				)
			);
		}
	};

	return (
		<div className={s.cabinetNav}>
			<NavLink
				to={'/profile'}
				className={({ isActive }) =>
					isActive
						? 'text text_type_main-medium'
						: 'text text_type_main-medium text_color_inactive'
				}
				end>
				Профиль
			</NavLink>
			<NavLink
				to={'/profile/orders'}
				className={({ isActive }) =>
					isActive
						? 'text text_type_main-medium'
						: 'text text_type_main-medium text_color_inactive'
				}>
				История заказов
			</NavLink>
			<button
				className={'text text_type_main-medium text_color_inactive'}
				onClick={handleSignOut}>
				Выход
			</button>
			<p className='text text_type_main-default text_color_inactive mt-20'>
				В этом разделе вы можете изменить свои персональные данные
			</p>
		</div>
	);
};
