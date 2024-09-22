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
export type AuthResponseType = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
};
export type RegisterFormType = {
	email: string;
	password: string;
	name: string;
};
export type LoginFormType = {
	email: string;
	password: string;
};
export type TokenType = {
	token: string;
};
export type UpdateUserFormType = {
	token: string;
	user: {
		email?: string;
		password?: string;
		name?: string;
	};
};
