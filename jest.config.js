module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	transformIgnorePatterns: [
		'node_modules/(?!(your-esm-module|another-esm-module)/)',
	],
};
