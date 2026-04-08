# Machi Koro

Digital port of the board game Machi Koro — build your city by buying establishments and landmarks before your opponents.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Pinia, Vite
- Pure CSS with CSS variables (no Tailwind)
- Custom synthesized audio (`src/audio.js`) — no audio files

## Game Rules
- 2–4 players (human or AI), first to complete all 4 landmarks wins
- Each turn: roll dice → collect income → buy one card/landmark (optional)
- Establishments activate on matching dice rolls, paying coins from bank or other players
- Card colors: Blue (anyone's turn), Green (your turn only), Red (steal from roller), Purple (your turn, from all players, max 1 each)
- Landmarks give permanent bonuses once built: Train Station (2 dice), Shopping Mall (+1 to cup/bread), Amusement Park (doubles = extra turn), Radio Tower (reroll once)

## Key Files
- `src/stores/game.js` — full game state machine: turn phases, income resolution, AI, win detection
- `src/constants.js` — ESTABLISHMENTS array (15 cards), LANDMARKS, supply counts, icon groups
- `src/cardUtils.js` — rendering helpers: type colors, icons, roll labels
- `src/components/App.vue` — screen router, toast, confetti, overlay mounts
- `src/components/GameScreen.vue` — main gameplay layout
- `src/components/TitleScreen.vue` — player setup

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`

## Notes
- `vite.config.js` uses `base: './'` for relative paths (served from subdirectory on GitHub Pages)
- `dist/` is the deployed static app, linked from the root landing page
- Income resolution order: Red cards first → Blue/Green → Purple
- Shopping Mall +1 bonus applies to the *card owner's* cup/bread cards
- Business Center cannot swap purple establishments
