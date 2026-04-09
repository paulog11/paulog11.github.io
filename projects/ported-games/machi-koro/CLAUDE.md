# Machi Koro

Digital port of the board game Machi Koro — build your city by buying establishments and landmarks before your opponents.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Pinia, Vite
- Pure CSS with CSS variables (no Tailwind)
- Custom synthesized audio (`src/audio.js`) — no audio files

## Game Rules
- 2–4 players (human or AI), first to complete all landmarks wins
- Each turn: roll dice → collect income → buy one card/landmark (optional)
- Establishments activate on matching dice rolls, paying coins from bank or other players
- Card colors: Blue (anyone's turn), Green (your turn only), Red (steal from roller), Purple (your turn, from all players, max 1 each)
- Landmarks give permanent bonuses once built (base game + expansions — see below)

## Expansions (Harbors + Millionaire's Row)
Implemented from CSV data. 4 complex interactive cards were intentionally skipped: Demolition Co., Moving Company, Renovation Co., Exhibit Hall.

### New Landmarks (7 total, first to build all wins)
- **City Hall** (free) — if you have 0 coins at start of buy phase, gain 1
- **Harbor** (💰2) — when dice total ≥ 10, optionally add +2 to the roll
- **Airport** (💰30) — gain 10 coins at end of turn if you bought nothing

### New Establishments (19 cards)
| Card | Roll | Effect |
|---|---|---|
| Sushi Bar | 1 | Red — steal 3 from roller if you have Harbor |
| French Restaurant | 3 | Red — steal 5 from roller if they have ≥2 landmarks |
| Flower Orchard | 4 | Blue — 1 from bank |
| Flower Shop | 6 | Green — 1 per flower (🌸) card you own |
| Food Warehouse | 7 | Green — 2 per cup (☕) card you own |
| Winery | 9 | Green — 6 per grape (🍇) card you own; **renovates** all your Wineries after firing |
| Soda Bottling Plant | 11 | Blue — 1 per cup (☕) card any player owns |
| Vineyard | 7 | Blue — 3 from bank |
| Mackerel Boat | 8 | Blue — 2 from bank (boat icon) |
| Tuna Boat | 12 | Blue — roll 2d6 internally, collect that many coins from bank |
| Member's Club | 12 | Red — steal ALL coins from roller if they have ≥3 landmarks |
| Loan Office | 0 | Green — gain 5 on buy; lose 2 on roll 2 (negative income) |
| Sushi Bar, Farmers Market, etc. | various | see constants.js |

> Full list in `src/constants.js` ESTABLISHMENTS array.

### Variable Supply Rule
- All cards shuffled into a single deck at game start (`buildShuffledDeck()` in `constants.js`)
- Marketplace shows exactly 10 unique visible stacks (drawn from deck)
- When the last card of a stack is bought, deck draws continue until 10 unique stacks are restored
- Duplicates stack on existing marketplace piles

### Special Mechanics
- **Winery renovation**: after Winery fires, all your Winery copies flip face-down permanently (deactivated, tracked in `player.renovatedCards`)
- **Harbor prompt**: fires after reroll decision but before income — `turnPhase: 'harbor_prompt'`
- **Tech Startup**: auto-invests 1 coin/copy at end of turn; collects invested total + same from each opponent on roll 10
- **Park**: on roll 11, redistributes all players' coins equally (remainder to bank)
- **Publisher**: on your turn, collect 1/cup or 1/bread card from each opponent
- **Tax Office**: on your turn, any opponent with ≥2 coins pays you half (rounded down)

## Key Files
- `src/stores/game.js` — full game state machine: turn phases, income resolution, AI, win detection
- `src/constants.js` — ESTABLISHMENTS array (34 cards), LANDMARKS (7), `buildShuffledDeck()`, icon groups
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
- Purple order: Stadium → TV Station → Business Center → Tech Startup → Park → Publisher → Tax Office
- Shopping Mall +1 bonus applies to the *card owner's* cup/bread cards
- Business Center cannot swap purple establishments
- `resolveRemainingPurples(activeIdx, total, estIds)` — helper called after TV Station / Business Center overlays resolve to continue remaining purples
- AI sorts unbuilt landmarks by cost ascending (City Hall at cost 0 always grabbed first); limited to 1 Loan Office
