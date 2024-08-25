import styles from './form-page.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../services/reducers';
import { getUser, updateUser } from '../services/actions/user';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

export function Profile() {
	const dispatch: AppThunkDispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { email, name } = useSelector((state: RootState) => state.user);
	const [emailState, setEmailState] = React.useState(email);
	const [nameState, setNameState] = React.useState(name);
	const [password, setPassword] = React.useState('');
	const [showButtons, setShowButtons] = React.useState(false);

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
		setEmailState(email);
		setNameState(name);
	}, [email, name]);

	useEffect(() => {
		(emailState !== email || nameState !== name || password) &&
		!document.querySelector('.input__error')
			? setShowButtons(true)
			: setShowButtons(false);
	}, [email, emailState, name, nameState, password]);

	const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!document.querySelector('.input__error')) {
			if (accessToken) {
				await dispatch(
					updateUser(
						{
							token: accessToken,
							user: {
								email: emailState,
								password: password,
								name: nameState,
							},
						},
						(hasError) => {
							if (hasError) {
								alert('Что-то пошло не так, попробуйте еще раз');
							} else {
								setShowButtons(false);
								setPassword('');
							}
						}
					)
				);
			}
		}
	};

	const handleResetChanges = () => {
		setNameState(name);
		setEmailState(email);
		setPassword('');
	};

	return (
		<form className={styles.profileForm} onSubmit={(e) => handleUpdateUser(e)}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setNameState(e.target.value)}
				onBlur={onInputBlur}
				value={nameState}
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
				onChange={(e) => setEmailState(e.target.value)}
				value={emailState}
				name={'email'}
				isIcon={true}
				extraClass='mt-6'
				placeholder={'Логин'}
			/>
			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
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
}
