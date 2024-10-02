import styles from './form-page.module.scss';
import React, { useEffect, useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { getUser, register } from '../services/actions/user';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';

export const Register = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('accessToken');
	const inputRef = useRef<HTMLInputElement>(null);
	const { values, handleChange } = useForm();
	const { email } = useSelector((state) => state.user);

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

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			values.email &&
			values.password &&
			values.name &&
			!document.querySelector('.input__error')
		) {
			dispatch(
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
};
