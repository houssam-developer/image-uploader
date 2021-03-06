const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Poppins', ...defaultTheme.fontFamily.sans]
		},
		extend: {},
	},
	plugins: [],
}
