/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        primary: '#16ABF8',
        secondary: '#F4F4F4',
        danger: '#ED4C5C',
      },
      textColor: {
        primary: '#111111',
        secondary: '#4A4A4A',
        dimmed: '#888888',
      },
    },
  },
  plugins: [],
};
