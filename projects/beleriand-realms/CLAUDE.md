# Beleriand Realms

A 2-player asymmetrical deckbuilder card game set in Tolkien's First Age. One player commands the **Free Peoples** (Gondolin), the other commands **Morgoth's forces** (Angband). Both players share a central market row called the **Beleriand Row**.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Pinia, TypeScript (strict mode)
- Vite 6, Tailwind CSS 3
- `base: './'` for GitHub Pages compatibility; output to `dist/`

## Key Files
- `src/types/game.ts` — all enums, interfaces, and discriminated union types (canonical data layer)
- `src/stores/game.ts` — Pinia setup-syntax store (`useGameStore`), all reactive game state
- `src/composables/useCombatEngine.ts` — multi-target combat logic composable
- `src/components/GameView.vue` — full board layout, seeds game state in `onMounted`
- `src/components/MarketRow.vue` — smart market row connected to store, FLIP animations
- `src/components/PlayingCard.vue` — dumb card display component
- `src/components/Stronghold.vue` — dumb stronghold display with health bar
- `src/components/FateTrack.vue` — dumb fate slider showing light vs. shadow dominance
- `src/App.vue` — root entry, just renders `<GameView />`

## Commands
- `npm run dev` — local dev server
- `npm run build` — type-check (`vue-tsc --noEmit`) + Vite build to `dist/`
- `npm run type-check` — TypeScript strict-mode check only

## Deploy
Same pattern as the root site: build outputs to `dist/`. The parent `npm run deploy` copies built assets up to the root for GitHub Pages. Always use relative paths.

## Game Color Tokens (tailwind.config.js)
- `free-peoples` (DEFAULT / light / dark / bg) — gold tones (#C9A227)
- `morgoth` (DEFAULT / light / dark / bg) — crimson tones (#9B2020)
- `neutral` (DEFAULT / light) — slate tones
- `parchment`, `card-bg`, `card-border`, `ink`, `muted` — UI chrome

## Subproject Docs
- [src/CLAUDE.md](src/CLAUDE.md) — game mechanics and per-file responsibilities
