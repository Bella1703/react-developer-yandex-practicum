import styles from './form-page.module.scss';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getUser, register } from '../services/actions/user';
import { RootState } from '../services/reducers';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export function Register() {
	const dispatch: AppThunkDispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('accessToken');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { values, handleChange } = useForm();
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

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			values.email &&
			values.password &&
			values.name &&
			!document.querySelector('.input__error')
		) {
			await dispatch(
				register(
					{
						email: values.email,
						password: values.password,
						name: values.name,
					},
					(hasError) => {
						if (!hasError) {
							navigate('/');
						} else {
							alert('Что-то пошло не так, попробуйте еще раз');
						}
					}
				)
			);
		}
	};

	return (
		<div className={`${styles.container} ${styles.formContainer}`}>
			<h1 className='text text_type_main-medium'>Регистрация</h1>
			<form onSubmit={(e) => handleRegister(e)}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => handleChange(e)}
					value={values.name}
					name={'name'}
					error={false}
					ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-6'
				/>
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
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.linkBlock}>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					Уже зарегистрированы?&nbsp;
					<Link to={'/login'}>Войти</Link>
				</p>
			</div>
		</div>
	);
}
