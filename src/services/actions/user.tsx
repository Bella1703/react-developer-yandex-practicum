import { request, requestWithRefresh } from '../../utils/request';
import { TAppDispatch, TAppThunk } from '../reducers';
import {
	RegisterFormType,
	AuthResponseType,
	LoginFormType,
	TokenType,
	UpdateUserFormType,
} from '../types';
export const REGISTER = 'REGISTER' as const;
export const SIGN_IN = 'SIGN_IN' as const;
export const SIGN_OUT = 'SIGN_OUT' as const;
export const GET_USER = 'GET_USER' as const;
export const SET_USER = 'SET_USER' as const;

export const register =
	(form: RegisterFormType, callback: (hasError: boolean) => void): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			const data = await request('auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			localStorage.setItem(
				'accessToken',
				(data as AuthResponseType).accessToken
			);
			localStorage.setItem(
				'refreshToken',
				(data as AuthResponseType).refreshToken
			);
			dispatch({
				type: REGISTER,
				response: data as AuthResponseType,
			});
			callback(false);
		} catch (error) {
			callback(true);
		}
	};
export const signIn =
	(form: LoginFormType, callback: (hasError: boolean) => void): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			const data = await request('auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			localStorage.setItem(
				'accessToken',
				(data as AuthResponseType).accessToken
			);
			localStorage.setItem(
				'refreshToken',
				(data as AuthResponseType).refreshToken
			);
			dispatch({
				type: SIGN_IN,
				response: data as AuthResponseType,
			});
			callback(false);
		} catch (error) {
			callback(true);
		}
	};

export const signOut =
	(token: TokenType, callback: (hasError: boolean) => void): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			await request('auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(token),
			});
			dispatch({
				type: SIGN_OUT,
			});
			callback(false);
		} catch (error) {
			callback(true);
		}
	};

export const getUser =
	(token: string, callback: (hasError: boolean) => void): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			const data = await request('auth/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});
			dispatch({
				type: GET_USER,
				response: data as AuthResponseType,
			});
			callback(false);
		} catch (err) {
			callback(true);
		}
	};

export const updateUser =
	(
		form: UpdateUserFormType,
		callback: (hasError: boolean) => void
	): TAppThunk =>
	async (dispatch: TAppDispatch) => {
		try {
			const data = await requestWithRefresh('auth/user', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: form.token,
				},
				body: JSON.stringify(form.user),
			});
			dispatch({
				type: SET_USER,
				response: data as AuthResponseType,
			});
			callback(false);
		} catch (error) {
			callback(true);
		}
	};
