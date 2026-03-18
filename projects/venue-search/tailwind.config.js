/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Shippori Mincho"', 'Georgia', 'serif'],
        body: ['"Noto Sans JP"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        paper: '#F5F2ED',
        sand: '#EAE6DE',
        ink: '#2C2C2C',
        muted: '#8A8580',
        steel: '#4A6670',
        'steel-light': '#D4DFE3',
        accent: '#3B6B8A',
        'accent-light': '#D8E8F0',
        warm: '#C0503A',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
