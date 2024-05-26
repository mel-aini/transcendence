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
        secondary: '#555363',
        third: '#E3BC4B',
        dark: '#2F2E39',
        bg: '#0C0D0F',
        white: '#FFFFFF',
        gray1: '#858585',
        gray2: '#313131',
        gray3: '#0C0D0F',
        gray4: '#222222',
        black: '#000000',
        invalid: '#E3BC4B'
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
        smh: {'raw': '(min-height: 800px)'}
      }
    },
  },
  plugins: [],
}
