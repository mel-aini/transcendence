/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5E4AE3',
        secondary: '#555363',
        third: '#E3BC4B',
        dark: '#2F2E39',
        bg: '#1E1E1E',
        white: '#FFFFFF',
        gray1: '#858585',
        gray2: '#313131',
        gray3: '#1E1E1E',
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
