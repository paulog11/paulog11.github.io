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
      // Shinjuku at night. Mirrors scene/palette.js so the DOM fallback and the
      // 3D scene read as the same place.
      colors: {
        night:   '#070A12',  // sky / page background
        asphalt: '#0A0D15',  // wet street
        lantern: '#FFB347',  // warm accent (successor to the old mecha #FF7A00)
        kabuki:  '#FF2D55',  // Kabukichō red
        neon:    '#00E5FF',  // cold neon
        paper:   '#E8E3D8',  // body text
      },
    },
  },
  plugins: [],
}
