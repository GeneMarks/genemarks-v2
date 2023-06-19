/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#95959d',
          200: '#36363a',
          300: '#27272a',
          400: '#1a1a1c',
          500: '#151517',
          600: '#111112',
        },
        'secondary': {
          100: '#ff8989',
          200: '#ff4141',
          300: '#c74c4c',
        },
      },
      maxWidth: {
        'default': '76rem',
      },
      width: {
        'default': '76rem',
      },
    },
    fontFamily: {
      body: 'Poppins',
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
  ]
};

module.exports = config;