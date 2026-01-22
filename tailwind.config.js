/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main saffron
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        sandalwood: {
          50: '#fdf4e3',
          100: '#fae8c1',
          200: '#f5d193',
          300: '#eeb862',
          400: '#e6a03a', // Main sandalwood
          500: '#d18b2a',
          600: '#b67223',
          700: '#955720',
          800: '#7a461d',
          900: '#663b1a',
        },
        parchment: {
          50: '#faf9f6',
          100: '#f4f2ed',
          200: '#e8e3d9',
          300: '#d9d1c1',
          400: '#c7bcab', // Main parchment
          500: '#b8a992',
          600: '#a5957f',
          700: '#887a67',
          800: '#6f6354',
          900: '#5a5046',
        }
      },
      fontFamily: {
        'devanagari': ['Mukta', 'sans-serif'],
        'preeti': ['Preeti', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
