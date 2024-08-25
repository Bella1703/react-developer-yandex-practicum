import styles from './form-page.module.scss';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { request } from '../utils/request';
import { RootState } from '../services/reducers';
import { getUser } from '../services/actions/user';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export function ForgotPassword() {
	const dispatch: AppThunkDispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('accessToken');
	const emailInputRef = useRef(null);
	const [enteredEmail, setEnteredEmail] = React.useState('');
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

	const recoverPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (enteredEmail && !document.querySelector('.input__error')) {
			try {
				await request('password-reset', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: enteredEmail }),
				});
				// navigate('/reset-password');
				navigate('/reset-password', { state: { forgotPassword: true } });
			} catch (error) {
				alert('Что-то пошло не так, попробуйте еще');
			}
		}
	};

	return (
		<div className={`${styles.container} ${styles.formContainer}`}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
			<form onSubmit={(e) => recoverPassword(e)}>
				<div ref={emailInputRef}>
					<EmailInput
						onChange={(e) => setEnteredEmail(e.target.value)}
						value={enteredEmail}
						name={'email'}
						isIcon={false}
						extraClass='mt-6'
						placeholder='Укажите e-mail'
					/>
				</div>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Восстановить
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
