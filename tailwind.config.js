/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html',
    './**/*.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#211c5f',
        secondary: '#4b476c',
        lightblue: '#59afe0',
        yellowcolor: '#f5da5b',
        grey: '#c8cdd5',
      },
    },
  },
  plugins: [],
}

