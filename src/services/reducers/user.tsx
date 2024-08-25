import {
	REGISTER,
	SIGN_IN,
	SIGN_OUT,
	GET_USER,
	SET_USER,
	AuthResponseType,
} from '../actions/user';

interface RegisterAction {
	type: typeof REGISTER;
	response: AuthResponseType;
}
interface SignInAction {
	type: typeof SIGN_IN;
	response: AuthResponseType;
}
interface SignOutAction {
	type: typeof SIGN_OUT;
}
interface GetUserAction {
	type: typeof GET_USER;
	response: AuthResponseType;
}
interface SetUserAction {
	type: typeof SET_USER;
	response: {
		user: {
			email: string;
			name: string;
		};
	};
}
export type UserActionTypes =
	| RegisterAction
	| SignInAction
	| SignOutAction
	| GetUserAction
	| SetUserAction;
export interface UserStateTypes {
	email: string;
	name: string;
}
const initialState: UserStateTypes = {
	email: '',
	name: '',
};

export const userReducer = (
	state = initialState,
	action: UserActionTypes
): UserStateTypes => {
	switch (action.type) {
		case REGISTER: {
			return {
				email: action.response.user.email,
				name: action.response.user.name,
			};
		}
		case SIGN_IN: {
			return {
				email: action.response.user.email,
				name: action.response.user.name,
			};
		}
		case SIGN_OUT: {
			localStorage.removeItem('accessToken');
			return {
				email: '',
				name: '',
			};
		}
		case GET_USER: {
			return {
				email: action.response.user.email,
				name: action.response.user.name,
			};
		}
		case SET_USER: {
			return {
				...state,
				email: action.response.user.email
					? action.response.user.email
					: state.email,
				name: action.response.user.name
					? action.response.user.name
					: state.name,
			};
		}
		default: {
			return state;
		}
	}
};
