import { OrderResponseType } from '../services/actions/order';
import { IngredientsResponseType } from '../services/actions/ingredients';
import { TAuthResponse } from '../services/types';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	const err = await res.json();
	return await Promise.reject(err);
};

const checkSuccess = (
	res: IngredientsResponseType | OrderResponseType | TAuthResponse
) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = async (endpoint: string, options?: RequestInit) => {
	const res = await fetch(`${BASE_URL}${endpoint}`, options);
	const res_1 = await checkResponse(res);
	return checkSuccess(res_1);
};

export const refreshToken = async () => {
	const res = await fetch(`${BASE_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
	const refreshData = await checkResponse(res);
	if (!refreshData.success) {
		return Promise.reject(refreshData);
	}
	localStorage.setItem('refreshToken', refreshData.refreshToken);
	localStorage.setItem('accessToken', refreshData.accessToken);
	return refreshData;
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
