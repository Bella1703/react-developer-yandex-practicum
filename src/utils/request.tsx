import { OrderResponseType } from '../services/actions/order';
import { IngredientsResponseType } from '../services/actions/ingredients';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: IngredientsResponseType | OrderResponseType) => {
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
