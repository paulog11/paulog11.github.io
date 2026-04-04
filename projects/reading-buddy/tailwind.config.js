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
          950: '#264E37',
          900: '#306140',
          800: '#3C7652',
          700: '#4A8C65',
          600: '#5BA679',
          500: '#72C091',
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
