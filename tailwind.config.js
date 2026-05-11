/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Shippori Mincho"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        ink:     '#0F1F3D',
        parchment: '#F0F4FA',
        warm:    '#DDE5F2',
        muted:   '#4A5B7A',
        accent:  '#7A96B8',
        'accent-light': '#D8E4F0',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'caret-blink': 'caretBlink 1s steps(1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        caretBlink: {
          '0%, 50%':  { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'ledger': 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #DDE5F2 31px, #DDE5F2 32px)',
      },
    },
  },
  plugins: [],
}
