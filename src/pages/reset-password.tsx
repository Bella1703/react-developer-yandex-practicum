import styles from './form-page.module.scss';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { request } from '../utils/request';
import { RootState } from '../services/reducers';
import { getUser } from '../services/actions/user';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export function ResetPassword() {
	const dispatch: AppThunkDispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('accessToken');
	const tokenRef = React.useRef<HTMLInputElement>(null);
	const [password, setPassword] = React.useState('');
	const [token, setToken] = React.useState('');
	const { email } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const checkUser = async () => {
			if (email) {
				navigate('/', { replace: true });
			} else if (accessToken) {
				await dispatch(getUser(accessToken, () => {}));
			}
		};
		checkUser();
	}, [email]);

	const onIconClick = () => {
		setTimeout(() => {
			if (tokenRef.current) {
				tokenRef.current.focus();
			}
		}, 0);
		alert('Icon Click Callback');
	};
	const saveNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password && !document.querySelector('.input__error')) {
			try {
				await request('password-reset/reset', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ password: password, token: token }),
				});
				navigate('/login');
			} catch (error) {
				alert('Что-то пошло не так, попробуйте еще');
			}
		}
	};

	return (
		<div className={`${styles.container} ${styles.formContainer}`}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
			<form onSubmit={(e) => saveNewPassword(e)}>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass='mt-6'
					placeholder={'Введите новый пароль'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={(e) => setToken(e.target.value)}
					value={token}
					name={'name'}
					error={false}
					ref={tokenRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Сохранить
				</Button>
			</form>
			<div className={styles.linkBlock}>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					Вспомнили пароль?&nbsp;
					<Link to={'/login'}>Войти</Link>
				</p>
			</div>
		</div>
	);
}
