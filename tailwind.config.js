import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [],

  // Add all Tailwind class to bundle to make them accessible from the browser.
  safelist: [
    {
      pattern: /.*/,
    },
  ],
};
