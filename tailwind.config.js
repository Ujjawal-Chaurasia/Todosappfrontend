/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/**/*.html',
  ],
  theme: {
      extend: {
        colors: {
          primary: 'black',
          secondary: 'white',
          'orange': '#ff7849',
        },
        fontFamily: {
          serif: ['serif'],
        },
        fontSize: {
          '2xl': '12.5rem',
        },
      },
  },
  plugins: [],
}

