# Flip 7

Multiplayer card game — press your luck, draw cards, avoid duplicates, race to 200 points.

## Tech Stack
- Vue 3 (Composition API), Pinia (state management), Vite
- Custom audio system (`src/audio.js`)

## Game Rules
- 2-5 players, target score: 200 points
- Each round: dealer deals 1 card each, then players take turns drawing
- Duplicate number card = bust (lose round's points)
- Special cards: Freeze (lock hand), Flip Three (draw 3 at once), Second Chance (survive one bust)
- Modifier cards: +2, +4, +6, +8, +10, x2 — boost hand score
- Flip 7 bonus: collect all 7 unique number cards (0-6) for +15 instant points, ends round

## Key Files
- `src/stores/game.js` — full game state machine (~636 lines): turns, dealing, scoring, special card logic
- `src/constants.js` — deck composition (79 number + 6 modifier + 9 action = 94 cards)
- `src/components/App.vue` — main wrapper (confetti, toasts, screen routing)
- `src/components/GameScreen.vue` — active gameplay UI
- `src/components/TitleScreen.vue` — player setup

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`

## Notes
- `vite.config.js` uses `base: './'` for relative paths (served from subdirectory on GitHub Pages)
- `dist/` is the deployed static app, linked from the root landing page
