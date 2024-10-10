const { ingredientsReducer, initialState } = require('./ingredients');
const {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} = require('../actions/ingredients');
describe('ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle GET_INGREDIENTS_REQUEST action', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_REQUEST,
			})
		).toEqual({
			...initialState,
			isLoading: true,
			hasError: false,
		});
	});

	it('should handle GET_INGREDIENTS_SUCCESS action', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: [1, 2, 3],
			})
		).toEqual({
			...initialState,
			ingredients: [...initialState.ingredients, 1, 2, 3],
			isLoading: false,
			hasError: false,
		});
	});

	it('should handle GET_INGREDIENTS_ERROR action', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_ERROR,
			})
		).toEqual({
			...initialState,
			isLoading: false,
			hasError: true,
		});
	});
});
