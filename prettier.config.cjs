/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	semi: true,
	tabWidth: 2,
	trailingComma: 'none',
	singleQuote: true,
	useTabs: true,
	jsxSingleQuote: true
};
