import styles from './form-page.module.scss';
import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { getUser, updateUser } from '../services/actions/user';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';

export const Profile = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const inputRef = useRef<HTMLInputElement>(null);
	const { email, name } = useSelector((state) => state.user);
	const { values, handleChange, setValues } = useForm({
		email: email,
		name: name,
	});
	const [showButtons, setShowButtons] = useState(false);

	const onEditIconClick = () => {
		if (!inputRef.current) return;
		inputRef.current.removeAttribute('disabled');
		inputRef.current.focus();
	};
	const onInputBlur = () => {
		if (!inputRef.current) return;
		inputRef.current.setAttribute('disabled', 'true');
	};
	useEffect(() => {
		const getUserData = async () => {
			if (!email && !name) {
				if (accessToken) {
					await dispatch(
						getUser(accessToken, (hasError) => {
							if (hasError) {
								alert('Что-то пошло не так, попробуйте еще раз');
							}
						})
					);
				}
			}
		};
		getUserData();
	}, []);

	useEffect(() => {
		setValues({ ...values, email: email });
		setValues({ ...values, name: name });
	}, [email, name]);

	useEffect(() => {
		(values.email !== email || values.name !== name || values.password) &&
		!document.querySelector('.input__error')
			? setShowButtons(true)
			: setShowButtons(false);
	}, [email, values.email, name, values.name, values.password]);

	const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!document.querySelector('.input__error')) {
			if (accessToken) {
				dispatch(
					updateUser(
						{
							token: accessToken,
							user: {
								email: values.email,
								password: values.password,
								name: values.name
							}
						},
						(hasError) => {
							if (hasError) {
								alert("Что-то пошло не так, попробуйте еще раз");
							} else {
								setShowButtons(false);
								setValues({ ...values, password: "" });
							}
						}
					)
				);
			}
		}
	};

	const handleResetChanges = () => {
		setValues({ ...values, email: email, name: name, password: '' });
	};

	return (
		<form className={styles.profileForm} onSubmit={(e) => handleUpdateUser(e)}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => handleChange(e)}
				onBlur={onInputBlur}
				value={values.name}
				name={'name'}
				error={false}
				ref={inputRef}
				onIconClick={onEditIconClick}
				errorText={'Ошибка'}
				size={'default'}
				icon={'EditIcon'}
				disabled
			/>
			<EmailInput
				onChange={(e) => handleChange(e)}
				value={values.email}
				name={'email'}
				isIcon={true}
				extraClass='mt-6'
				placeholder={'Логин'}
			/>
			<PasswordInput
				onChange={(e) => handleChange(e)}
				value={values.password}
				name={'password'}
				icon='EditIcon'
				extraClass='mt-6'
			/>
			{showButtons && (
				<>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass='mt-6'
						onClick={handleResetChanges}>
						Отмена
					</Button>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mt-6'>
						Сохранить
					</Button>
				</>
			)}
		</form>
	);
};
