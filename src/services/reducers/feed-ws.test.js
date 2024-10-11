const { feedWsReducer, initialState } = require('./feed-ws');
const {
	FEED_WS_CONNECTION_SUCCESS,
	FEED_WS_CONNECTION_CLOSED,
	FEED_WS_CONNECTION_ERROR,
	FEED_WS_GET_MESSAGE,
} = require('../actions/feed-ws');
describe('feed ws reducer', () => {
	it('should return the initial state', () => {
		expect(feedWsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle FEED_WS_CONNECTION_SUCCESS action', () => {
		expect(
			feedWsReducer(initialState, {
				type: FEED_WS_CONNECTION_SUCCESS,
			})
		).toEqual({
			...initialState,
			error: undefined,
			feedWsConnected: true,
		});
	});

	it('should handle FEED_WS_CONNECTION_ERROR action', () => {
		const mockEvent = new Event('error');
		expect(
			feedWsReducer(initialState, {
				type: FEED_WS_CONNECTION_ERROR,
				payload: mockEvent,
			})
		).toEqual({
			...initialState,
			error: mockEvent,
			feedWsConnected: false,
		});
	});

	it('should handle FEED_WS_CONNECTION_CLOSED action', () => {
		expect(
			feedWsReducer(initialState, {
				type: FEED_WS_CONNECTION_CLOSED,
			})
		).toEqual({
			...initialState,
			error: undefined,
			feedWsConnected: false,
		});
	});

	it('should handle FEED_WS_GET_MESSAGE action', () => {
		expect(
			feedWsReducer(initialState, {
				type: FEED_WS_GET_MESSAGE,
				payload: { message: 'message' },
			})
		).toEqual({
			...initialState,
			error: undefined,
			feedWsMessage: { message: 'message' },
		});
	});
});
