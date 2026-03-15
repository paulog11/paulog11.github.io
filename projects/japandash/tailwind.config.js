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
        washi: '#F7F3EC',
        koshi: '#EDE9E0',
        sumi: '#2C2C2C',
        usuzumi: '#8A8580',
        ai: '#2D4A7A',
        'ai-light': '#D6E0EF',
        beni: '#C0503A',
        matcha: '#5A7A52',
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
