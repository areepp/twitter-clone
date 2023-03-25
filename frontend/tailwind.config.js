/** @type {import('tailwindcss').Config} */
const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '460px',
      ...screens,
    },
    extend: {
      colors: {
        'primary-blue': '#1d9bf0',
        'dark-gray': '#536471',
      },
    },
  },
  plugins: [],
}
