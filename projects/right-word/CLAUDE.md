# The Right Word (Japanese)

Japanese language assistant — uses Claude API to suggest natural phrases for what the user wants to say in English.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, custom CSS
- Anthropic Claude API (model: claude-sonnet-4-20250514, direct browser calls)
- Google Fonts: Noto Serif JP, DM Mono, Sora
- Testing: Vitest 2 + @vue/test-utils + happy-dom

## How It Works
1. User enters their Claude API key (stored in localStorage via `useApiKey`)
2. Selects context: casual, polite, formal, or domain-specific (taxi, shopping, restaurant)
3. Types what they want to say in English
4. App calls Claude API with a system prompt requesting 3-6 JSON phrase suggestions
5. Each suggestion: Japanese text, hiragana reading, English translation, register (politeness level), optional tip
6. Results render with color-coded register tags (casual=green, polite=blue, formal=red)

## Key Features
- "Show to someone" button — large overlay displaying results clearly for native speakers to read
- Context buttons for quick register switching
- Direct browser-to-API calls (requires `anthropic-dangerous-direct-browser-access: true` header)

## File Structure
```
src/
├── main.js
├── style.css               ← all custom CSS (paper/ink theme)
├── App.vue                 ← shell: wires composables to components
├── composables/
│   ├── useApiKey.js        ← localStorage persistence for API key
│   └── useTranslation.js   ← context state, Claude fetch, JSON parsing
└── components/
    ├── ApiKeyBar.vue       ← key input / saved indicator / clear
    ├── ContextBar.vue      ← six context toggle buttons
    ├── QueryInput.vue      ← textarea + translate button
    ├── ResultList.vue      ← results header + cards + loading/error states
    ├── ResultCard.vue      ← single phrase card
    └── ShowOverlay.vue     ← fullscreen overlay for showing to native speakers
```

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run test` — run Vitest unit tests (36 tests across 5 files)

## Tests
Tests live in `src/__tests__/`. Run with `npm run test`.

- `useApiKey.spec.js` — localStorage read/write/clear
- `useTranslation.spec.js` — API call, state transitions, error handling
- `ResultCard.spec.js` — register tag class mapping, note rendering
- `ApiKeyBar.spec.js` — conditional rendering, emits
- `ShowOverlay.spec.js` — visibility gate, close emit

## Legacy
`nihongo-assist.html` is the original single-file vanilla JS version. It is no longer linked from the landing page. The new entry point is `dist/index.html` (built output).
