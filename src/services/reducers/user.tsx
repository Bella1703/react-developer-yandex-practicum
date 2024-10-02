import {
	REGISTER,
	SIGN_IN,
	SIGN_OUT,
	GET_USER,
	SET_USER,
} from '../actions/user';
import { TUserAction } from '../constants/user';

export type TUserState = {
	email: string;
	name: string;
};
const initialState: TUserState = {
	email: '',
	name: '',
};

export const userReducer = (
	state: TUserState = initialState,
	action: TUserAction
): TUserState => {
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
