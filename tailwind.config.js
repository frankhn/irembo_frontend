/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [require("daisyui")],
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	daisyui: {
		themes: ['nord'],
		darkTheme: "dark",
		base: true,
		styled: true,
		utils: true,
		prefix: "",
		logs: true,
		themeRoot: ":root",
	},
};
