/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14FFEC',
        secondary: '#141619',
        third: '#14FF67',
        dark: '#2F2E39',
        bg: '#111215',
        white: '#FFFFFF',
        gray1: '#858585',
        gray2: '#313131',
        gray3: '#0C0D0F',
        gray4: '#222222',
        black: '#000000',
        invalid: '#ED4337',
        border: 'rgba(255, 255, 255, 0.1)',
        border2: 'rgba(255, 255, 255, 0.2)',
      },
      keyframes: {
        test: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'test': 'test 0.3s',
      },
      screens: {
        smh: {'raw': '(min-height: 800px)'},
        'mobile': '400px',
      },
      backgroundImage: {
        'login': "url('/famous-table-tennis-players.png')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'bottom': '0px 4px 4px 0px rgba(0, 0, 0, 0.5)',
        'right': '4px 0px 4px 0px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
