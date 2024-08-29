import { OrderResponseType } from '../services/actions/order';
import { IngredientsResponseType } from '../services/actions/ingredients';
import { AuthResponseType } from '../services/actions/user';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (
	res: IngredientsResponseType | OrderResponseType | AuthResponseType
) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: string, options?: RequestInit) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const refreshToken = () => {
	return fetch(`${BASE_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

export const requestWithRefresh = async (
	endpoint: string,
	options: RequestInit
) => {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, options);
		return await checkResponse(res);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...options.headers,
				authorization: refreshData.accessToken,
			};
			const res = await fetch(endpoint, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
