/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e8ebe8',
          200: '#d0d8d0',
          300: '#aebcae',
          400: '#869a86',
          500: '#667d66',
          600: '#506350',
          700: '#415041',
          800: '#354135',
          900: '#2d362d',
        },
        earth: {
          50: '#fdfbf7',
          100: '#fbf7ef',
          200: '#f5ebd9',
          300: '#ebd9b8',
          400: '#dfc093',
          500: '#d4a773',
          600: '#c68e59',
          700: '#a57245',
          800: '#865c3e',
          900: '#6d4c35',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
      }
    },
  },
  plugins: [],
}
