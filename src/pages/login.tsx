import styles from './form-page.module.scss';
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getUser, signIn } from '../services/actions/user';
import { RootState } from '../services/reducers';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export function Login() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: AppThunkDispatch = useDispatch();
	const from = location.state?.from?.pathname || '/';
	const [enteredEmail, setEnteredEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { email } = useSelector((state: RootState) => state.user);
	const accessToken = localStorage.getItem('accessToken');

	useEffect(() => {
		const checkUser = async () => {
			if (email) {
				navigate(from, { replace: true });
			} else if (accessToken) {
				await dispatch(getUser(accessToken, () => {}));
			}
		};
		checkUser();
	}, [email]);

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (enteredEmail && password && !document.querySelector('.input__error')) {
			await dispatch(
				signIn(
					{
						email: enteredEmail,
						password: password,
					},
					(hasError) => {
						if (hasError) {
							alert('Что-то пошло не так, попробуйте еще раз');
						} else {
							navigate(from, { replace: true });
						}
					}
				)
			);
		}
	};

	return (
		<div className={`${styles.container} ${styles.formContainer}`}>
			<h1 className='text text_type_main-medium'>Вход</h1>
			<form onSubmit={(e) => handleSignIn(e)}>
				<EmailInput
					onChange={(e) => setEnteredEmail(e.target.value)}
					value={enteredEmail}
					name={'email'}
					isIcon={false}
					extraClass='mt-6'
				/>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass='mt-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Войти
				</Button>
			</form>
			<div className={styles.linkBlock}>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					Вы — новый пользователь?&nbsp;
					<Link to={'/register'}>Зарегистрироваться</Link>
				</p>

				<p className='text text_type_main-default text_color_inactive mt-4'>
					Забыли пароль?&nbsp;
					<Link to={'/forgot-password'}>Восстановить пароль</Link>
				</p>
			</div>
		</div>
	);
}
