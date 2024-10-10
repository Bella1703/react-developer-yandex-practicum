const { ordersWsReducer, initialState } = require('./orders-ws');
const {
	ORDERS_WS_CONNECTION_SUCCESS,
	ORDERS_WS_CONNECTION_ERROR,
	ORDERS_WS_CONNECTION_CLOSED,
	ORDERS_WS_GET_MESSAGE,
} = require('../actions/orders-ws');
describe('orders ws reducer', () => {
	it('should return the initial state', () => {
		expect(ordersWsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle ORDERS_WS_CONNECTION_SUCCESS action', () => {
		expect(
			ordersWsReducer(initialState, {
				type: ORDERS_WS_CONNECTION_SUCCESS,
			})
		).toEqual({
			...initialState,
			error: undefined,
			orderWsConnected: true,
		});
	});

	it('should handle ORDERS_WS_CONNECTION_ERROR action', () => {
		const mockEvent = new Event('error');
		expect(
			ordersWsReducer(initialState, {
				type: ORDERS_WS_CONNECTION_ERROR,
				payload: mockEvent,
			})
		).toEqual({
			...initialState,
			error: mockEvent,
			orderWsConnected: false,
		});
	});

	it('should handle ORDERS_WS_CONNECTION_CLOSED action', () => {
		expect(
			ordersWsReducer(initialState, {
				type: ORDERS_WS_CONNECTION_CLOSED,
			})
		).toEqual({
			...initialState,
			error: undefined,
			orderWsConnected: false,
		});
	});

	it('should handle ORDERS_WS_GET_MESSAGE action', () => {
		expect(
			ordersWsReducer(initialState, {
				type: ORDERS_WS_GET_MESSAGE,
				payload: { message: 'message' },
			})
		).toEqual({
			...initialState,
			error: undefined,
			orderWsMessage: { message: 'message' },
		});
	});
});
