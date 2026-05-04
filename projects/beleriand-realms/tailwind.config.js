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
        display:     ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:        ['"EB Garamond"', 'Georgia', 'serif'],
        inscription: ['"Cinzel"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        inscription: '0.18em',
      },
      boxShadow: {
        'torch':        '0 0 22px -4px rgba(201, 162, 39, 0.35)',
        'torch-crimson':'0 0 22px -4px rgba(155, 32, 32, 0.40)',
        'plaque':       'inset 0 1px 0 rgba(245,228,153,0.08), 0 1px 2px rgba(0,0,0,0.6)',
        'card-rest':    '0 1px 0 rgba(245,228,153,0.05), 0 6px 12px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'parchment-page': 'radial-gradient(ellipse at top, rgba(245,228,153,0.04), transparent 70%), linear-gradient(180deg, #221a0d 0%, #1a1209 100%)',
        'banner-fp':      'linear-gradient(180deg, #2a200a 0%, #1f1805 100%)',
        'banner-mg':      'linear-gradient(180deg, #2a0808 0%, #1f0505 100%)',
      },
    },
  },
  plugins: [],
}
