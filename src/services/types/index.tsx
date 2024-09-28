export type TIngredient = {
	readonly _id: string;
	readonly name: string;
	readonly type: string;
	readonly proteins: number;
	readonly fat: number;
	readonly carbohydrates: number;
	readonly calories: number;
	readonly price: number;
	readonly image: string;
	readonly image_mobile: string;
	readonly image_large: string;
	readonly __v: number;
};
export type TBurgerIngredient = TIngredient & {
	uuid: string;
};
export type TAuthResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
};
export type TRegisterForm = {
	email: string;
	password: string;
	name: string;
};
export type TLoginForm = {
	email: string;
	password: string;
};
export type TToken = {
	token: string;
};
export type TUpdateUserForm = {
	token: string;
	user: {
		email?: string;
		password?: string;
		name?: string;
	};
};
export type TWsMessage = {
	success: boolean;
	orders: Array<TOrder>;
	total: number;
	totalToday: number;
	message: string
};

export type TOrder = {
	ingredients: Array<string>;
	_id: string;
	name: string;
	status: 'created' | 'pending' | 'done';
	number: number;
	createdAt: string;
	updatedAt: string;
};
