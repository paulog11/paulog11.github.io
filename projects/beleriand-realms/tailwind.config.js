/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        // Faction
        'free-peoples': {
          DEFAULT: '#C9A227',
          light:   '#F5E499',
          dark:    '#7A6010',
          bg:      '#1f1805',
        },
        morgoth: {
          DEFAULT: '#9B2020',
          light:   '#E87070',
          dark:    '#4A0A0A',
          bg:      '#1f0505',
        },
        neutral: {
          DEFAULT: '#8A8078',
          light:   '#C8C0B0',
          dark:    '#4A4540',
          bg:      '#1a1810',
        },
        // Board
        parchment: '#1a1209',
        'card-bg':  '#221a0d',
        'card-border': '#3d2f14',
        ink:        '#e8d9b5',
        muted:      '#9e8d6f',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body:    ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
