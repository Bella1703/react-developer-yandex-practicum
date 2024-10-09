const { placeOrderReducer, initialState } = require('./order');
const {
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_ERROR,
} = require('../actions/order');
describe('place order reducer', () => {
	it('should return the initial state', () => {
		expect(placeOrderReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle PLACE_ORDER_REQUEST action', () => {
		expect(
			placeOrderReducer(initialState, {
				type: PLACE_ORDER_REQUEST,
			})
		).toEqual({
			...initialState,
			isLoading: true,
			hasError: false,
		});
	});

	it('should handle PLACE_ORDER_SUCCESS action', () => {
		expect(
			placeOrderReducer(initialState, {
				type: PLACE_ORDER_SUCCESS,
				response: { response: 'response' },
			})
		).toEqual({
			...initialState,
			response: { response: 'response' },
			isLoading: false,
			hasError: false,
		});
	});

	it('should handle PLACE_ORDER_ERROR action', () => {
		expect(
			placeOrderReducer(initialState, {
				type: PLACE_ORDER_ERROR,
			})
		).toEqual({
			...initialState,
			isLoading: false,
			hasError: true,
		});
	});
});
