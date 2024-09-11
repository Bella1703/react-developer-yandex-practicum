import styles from './form-page.module.scss';
import React, { useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, signIn } from '../services/actions/user';
import { TRootState } from '../services/reducers';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { TAppDispatch } from '../components/app';

export const Login = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: TAppDispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const from = location.state?.from?.pathname || '/';
	const { email } = useSelector((state: TRootState) => state.user);
	const { values, handleChange } = useForm();

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

	const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			values.email &&
			values.password &&
			!document.querySelector('.input__error')
		) {
			await dispatch(
				signIn(
					{
						email: values.email,
						password: values.password,
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
					onChange={(e) => handleChange(e)}
					value={values.email}
					name={'email'}
					isIcon={false}
					extraClass='mt-6'
				/>
				<PasswordInput
					onChange={(e) => handleChange(e)}
					value={values.password}
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
};
