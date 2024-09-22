import {
	REGISTER,
	SIGN_IN,
	SIGN_OUT,
	GET_USER,
	SET_USER,
} from '../actions/user';
import { AuthResponseType } from '../types';

export type RegisterAction = {
	readonly type: typeof REGISTER;
	readonly response: AuthResponseType;
};
export type SignInAction = {
	readonly type: typeof SIGN_IN;
	readonly response: AuthResponseType;
};
export type SignOutAction = {
	readonly type: typeof SIGN_OUT;
};
export type GetUserAction = {
	readonly type: typeof GET_USER;
	readonly response: AuthResponseType;
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
