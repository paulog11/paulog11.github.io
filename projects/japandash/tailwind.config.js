/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif JP"', 'Georgia', 'serif'],
        body: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        // All palette colors are CSS-variable driven so light/dark both work
        // and all existing `bg-washi`, `text-sumi`, `border-koshi` etc. stay valid.
        washi:      'rgb(var(--washi)    / <alpha-value>)',
        koshi:      'rgb(var(--koshi)    / <alpha-value>)',
        surface:    'rgb(var(--surface)  / <alpha-value>)',
        sumi:       'rgb(var(--sumi)     / <alpha-value>)',
        usuzumi:    'rgb(var(--usuzumi)  / <alpha-value>)',
        ai:         'rgb(var(--ai)       / <alpha-value>)',
        'ai-light': 'rgb(var(--ai-light) / <alpha-value>)',
        beni:       'rgb(var(--beni)     / <alpha-value>)',
        matcha:     'rgb(var(--matcha)   / <alpha-value>)',
        kin:        'rgb(var(--kin)      / <alpha-value>)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Bento span classes — computed at runtime so JIT can't detect them statically
    'col-span-1', 'col-span-2',
    'md:col-span-2',
    'row-span-1', 'row-span-2',
    // Skill-area dot colors — also computed at runtime
    'bg-ai', 'bg-matcha', 'bg-beni', 'bg-kin', 'bg-usuzumi',
  ],
}
