const { userReducer, initialState } = require('./user');
const {
	REGISTER,
	SIGN_IN,
	SIGN_OUT,
	GET_USER,
	SET_USER,
} = require('../actions/user');

describe('user reducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle REGISTER action', () => {
		expect(
			userReducer(initialState, {
				type: REGISTER,
				response: {
					user: {
						email: 'email',
						name: 'name',
					},
				},
			})
		).toEqual({
			...initialState,
			email: 'email',
			name: 'name',
		});
	});

	it('should handle SIGN_IN action', () => {
		expect(
			userReducer(initialState, {
				type: SIGN_IN,
				response: {
					user: {
						email: 'email',
						name: 'name',
					},
				},
			})
		).toEqual({
			...initialState,
			email: 'email',
			name: 'name',
		});
	});

	it('should handle SIGN_OUT action', () => {
		global.localStorage = {
			removeItem: jest.fn(),
		};

		expect(
			userReducer(initialState, {
				type: SIGN_OUT,
			})
		).toEqual({
			...initialState,
			email: '',
			name: '',
		});
	});

	it('should handle GET_USER action', () => {
		expect(
			userReducer(initialState, {
				type: GET_USER,
				response: {
					user: {
						email: 'email',
						name: 'name',
					},
				},
			})
		).toEqual({
			...initialState,
			email: 'email',
			name: 'name',
		});
	});

	it('should handle SET_USER action with user data', () => {
		expect(
			userReducer(
				{
					email: 'email_1',
					name: 'name_1',
				},
				{
					type: SET_USER,
					response: {
						user: {
							email: 'email_2',
							name: 'name_2',
						},
					},
				}
			)
		).toEqual({
			...initialState,
			email: 'email_2',
			name: 'name_2',
		});
	});

	it('should handle SET_USER action without user data', () => {
		expect(
			userReducer(
				{
					email: 'email_1',
					name: 'name_1',
				},
				{
					type: SET_USER,
					response: {
						user: {},
					},
				}
			)
		).toEqual({
			...initialState,
			email: 'email_1',
			name: 'name_1',
		});
	});
});
