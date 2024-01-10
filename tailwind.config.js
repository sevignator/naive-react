import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      gray: colors.slate,
    },
  },
  plugins: [],
};
