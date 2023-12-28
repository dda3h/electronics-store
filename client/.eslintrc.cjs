module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		// 'react-hooks/exhaustive-deps': 'false',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'no-mixed-spaces-and-tabs': 'warn'
	}
}
