/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },

    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      dark: '#111111',
      primary: '#16ABF8',
      gray: {
        100: '#F4F4F4',
        200: '#E5E5E5',
        300: '#C7C7C7',
        400: '#C4C4C4',
        500: '#A4A4A4',
        600: '#888888',
        700: '#4A4A4A',
      },
      red: '#ED4C5C',
      orange: '#F8A541',
      green: '#00A790',
      blue: '#428BC1',
      purple: '#8942C1',
    },
  },
  plugins: [],
};
