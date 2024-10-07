const {
	burgerConstructorReducer,
	initialState,
} = require('./burger-constructor');
const {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REPLACE_BUN,
	CLEAR_CONSTRUCTOR,
	MOVE_INGREDIENT,
} = require('../actions/burger-constructor');

describe('burger-constructor reducer', () => {
	it('should return the initial state', () => {
		expect(burgerConstructorReducer(undefined, {})).toEqual(
			initialState
		);
	});

	it('should handle ADD_INGREDIENT action', () => {
		expect(
			burgerConstructorReducer(initialState, {
				type: ADD_INGREDIENT,
				payload: {
					id: 'id',
				},
			})
		).toEqual({
			...initialState,
			selectedIngredients: [
				...initialState.selectedIngredients,
				{
					id: 'id',
				},
			],
		});
	});

	it('should handle REMOVE_INGREDIENT action', () => {
		expect(
			burgerConstructorReducer(
				{
					...initialState,
					selectedIngredients: [{ uuid: 'uuid' }],
				},
				{
					type: REMOVE_INGREDIENT,
					ingredient: {
						uuid: 'uuid',
					},
				}
			)
		).toEqual({
			...initialState,
			selectedIngredients: [],
		});
	});

	it('should handle REPLACE_BUN action', () => {
		expect(
			burgerConstructorReducer(
				{ ...initialState, bun: { id_1: 'id_1' } },
				{
					type: REPLACE_BUN,
					bun: { id_2: 'id_2' },
				}
			)
		).toEqual({
			...initialState,
			bun: { id_2: 'id_2' },
		});
	});

	it('should handle CLEAR_CONSTRUCTOR action', () => {
		expect(
			burgerConstructorReducer(
				{
					...initialState,
					bun: { id_1: 'id_1' },
					selectedIngredients: [{ id_2: 'id_2' }],
				},
				{
					type: CLEAR_CONSTRUCTOR,
				}
			)
		).toEqual(initialState);
	});

	it('should handle MOVE_INGREDIENT action', () => {
		expect(
			burgerConstructorReducer(
				{
					...initialState,
					selectedIngredients: [
						{ id_1: 'id_1' },
						{ id_2: 'id_2' },
						{ id_3: 'id_3' },
					],
				},
				{
					type: MOVE_INGREDIENT,
					dragIndex: 0,
					hoverIndex: 2,
				}
			)
		).toEqual({
			...initialState,
			selectedIngredients: [
				{ id_2: 'id_2' },
				{ id_3: 'id_3' },
				{ id_1: 'id_1' },
			],
		});
	});
});
