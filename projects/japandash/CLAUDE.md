# JapanDash — Japanese Learning Dashboard

Widget-based Japanese language learning dashboard with API integrations and curated study content.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- Fonts: Shippori Mincho (display), Noto Sans JP + DM Sans (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `src/App.vue` — Dashboard shell with header, settings panel, CSS Grid widget layout
- `src/components/WidgetFrame.vue` — Shared "window" wrapper (title bar, traffic lights, collapse)
- `src/components/widgets/` — 6 widget components (WaniKani, Jisho, Shadowing, Onomatopoeia, Grammar, Reading)
- `src/composables/` — Reactive state management (useWaniKani, useJisho, useShadowing, useLocalStorage)
- `src/services/` — API wrappers (wanikani-api.js, jisho-api.js)
- `src/data/` — Curated content (onomatopoeia.js, grammar.js, reading-passages.js, shadowing-channels.js)

## Commands
- `npm run dev` — local dev server
- `npm run build` — build to dist/

## Theme
Japanese-inspired warm palette: washi (#F7F3EC), koshi (#EDE9E0), sumi (#2C2C2C), ai (#2D4A7A indigo), beni (#C0503A vermillion), matcha (#5A7A52 green).

## APIs
- **WaniKani API v2**: Bearer token auth, stored in localStorage. Endpoints: user, summary, assignments, level_progressions.
- **Jisho API**: Word search via `jisho.org/api/v1/search/words`. Uses CORS proxy (corsproxy.io).

## Adding Content
- Onomatopoeia: add entries to `src/data/onomatopoeia.js` following the existing schema
- Grammar points: add to `src/data/grammar.js` with level, pattern, formation, examples
- Reading passages: add to `src/data/reading-passages.js` with vocabulary and comprehension questions
- Shadowing videos: add YouTube video IDs to channels in `src/data/shadowing-channels.js`

## localStorage Keys
All prefixed with `japandash:` — wanikani-key, jisho-recent, shadowing-completed, grammar-studied
