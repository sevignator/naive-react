import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [],
  // This adds all Tailwind classes to the bundle, making them accessible from the browser.
  safelist: [
    {
      pattern: /.*/,
    },
  ],
};
