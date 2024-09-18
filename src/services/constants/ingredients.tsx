import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';
import { TIngredient } from '../types';

export type TGetIngredientsAction = {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
};
export type TGetIngredientsSuccessAction = {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: TIngredient[];
};
export type TGetIngredientsFailedAction = {
	readonly type: typeof GET_INGREDIENTS_ERROR;
};
export type TIngredientsAction =
	| TGetIngredientsAction
	| TGetIngredientsSuccessAction
	| TGetIngredientsFailedAction;
