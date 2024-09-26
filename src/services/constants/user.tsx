import {
	REGISTER,
	SIGN_IN,
	SIGN_OUT,
	GET_USER,
	SET_USER,
} from '../actions/user';
import { TAuthResponse } from '../types';

export type RegisterAction = {
	readonly type: typeof REGISTER;
	readonly response: TAuthResponse;
};
export type SignInAction = {
	readonly type: typeof SIGN_IN;
	readonly response: TAuthResponse;
};
export type SignOutAction = {
	readonly type: typeof SIGN_OUT;
};
export type GetUserAction = {
	readonly type: typeof GET_USER;
	readonly response: TAuthResponse;
};
export type SetUserAction = {
	readonly type: typeof SET_USER;
	readonly response: {
		user: {
			email: string;
			name: string;
		};
	};
};
export type TUserAction =
	| RegisterAction
	| SignInAction
	| SignOutAction
	| GetUserAction
	| SetUserAction;
