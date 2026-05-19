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
        tech: ['"JetBrains Mono"', '"Roboto Mono"', 'monospace'],
      },
      colors: {
        // Legacy palette
        ink:            '#0F1F3D',
        parchment:      '#F0F4FA',
        warm:           '#DDE5F2',
        muted:          '#4A5B7A',
        accent:         '#7A96B8',
        'accent-light': '#D8E4F0',
        // Mecha Command Center palette
        'mecha-bg':     '#1A1D24',
        'mecha-panel':  '#0B131A',
        'mecha-accent': '#FF7A00',
        'mecha-text':   '#F8F9FA',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'caret-blink': 'caretBlink 1s steps(1) infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'pulse-accent': 'pulseAccent 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        caretBlink: {
          '0%, 50%':      { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseAccent: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      backgroundImage: {
        'ledger': 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #DDE5F2 31px, #DDE5F2 32px)',
        'mecha-grid': 'linear-gradient(rgba(255,122,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.04) 1px, transparent 1px)',
        'mecha-scanlines': 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
      },
      backgroundSize: {
        'mecha-grid': '40px 40px',
      },
      boxShadow: {
        'mecha-glow': '0 0 12px rgba(255,122,0,0.25), 0 0 1px rgba(255,122,0,0.6)',
        'mecha-inset': 'inset 0 0 40px rgba(11,19,26,0.8)',
      },
    },
  },
  plugins: [],
}
