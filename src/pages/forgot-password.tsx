import styles from './form-page.module.scss';
import React, { useEffect, useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { request } from '../utils/request';
import { getUser } from '../services/actions/user';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';

export const ForgotPassword = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('accessToken');
	const emailInputRef = useRef(null);
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

	const recoverPassword = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (values.email && !document.querySelector('.input__error')) {
			try {
				await request('password-reset', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: values.email }),
				});
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
						onChange={(e) => handleChange(e)}
						value={values.email}
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
};
