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
          950: '#1A3A26',
          900: '#234D33',
          800: '#2D6142',
          700: '#3A7A55',
          600: '#4A9468',
          500: '#5DB07D',
        },
        silver: {
          100: '#F4F5F6',
          200: '#E2E4E7',
          300: '#C8CCD1',
          400: '#A8AEB6',
          500: '#8A929C',
        },
        gold: {
          400: '#D4A857',
          500: '#C49A3C',
        },
        page: '#FAF8F5',
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
