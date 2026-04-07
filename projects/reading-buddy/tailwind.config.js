/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        forest: {
          950: '#F0E9DC',
          900: '#E6DDD0',
          800: '#D9CFC0',
          700: '#C4B9A8',
          600: '#B0A492',
          500: '#8B7355',
        },
        silver: {
          100: '#1C1108',
          200: '#2E2014',
          300: '#4A3525',
          400: '#7A6152',
          500: '#9C8878',
        },
        gold: {
          400: '#8B4513',
          500: '#6B3410',
        },
        page: '#F0E9DC',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
