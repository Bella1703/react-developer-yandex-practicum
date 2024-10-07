const {
	ingredientDetailsReducer,
	initialState,
} = require('./ingredient-details');
const { GET_INGREDIENT_DETAILS } = require('../actions/ingredient-details');
describe('ingredient details reducer', () => {
	it('should return the initial state', () => {
		expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle GET_INGREDIENT_DETAILS action with existing id', () => {
		expect(
			ingredientDetailsReducer(initialState, {
				type: GET_INGREDIENT_DETAILS,
				ingredients: [{ _id: 'id_1' }, { _id: 'id_2' }, { _id: 'id_3' }],
				id: 'id_2',
			})
		).toEqual({
			...initialState,
			ingredientDetails: { _id: 'id_2' },
		});
	});

	it('should handle GET_INGREDIENT_DETAILS action with non-existent id', () => {
		expect(
			ingredientDetailsReducer(initialState, {
				type: GET_INGREDIENT_DETAILS,
				ingredients: [{ _id: 'id_1' }, { _id: 'id_2' }, { _id: 'id_3' }],
				id: 'id_4',
			})
		).toEqual({
			...initialState,
			ingredientDetails: null,
		});
	});
});
