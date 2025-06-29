/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Add this fontFamily block
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // This is your default font
        display: ['Ethnocentric', 'sans-serif'], // This creates the 'font-display' utility
      },
    },
  },
  plugins: [],
};
