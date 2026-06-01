# Beleriand Realms

A 2-player asymmetrical deckbuilder card game set in Tolkien's First Age. One player commands the **Free Peoples**, the other commands **Morgoth's forces**. Both players share a central market row called the **Beleriand Row**.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Pinia, TypeScript (strict mode)
- Vite 6, Tailwind CSS 3
- `base: './'` for GitHub Pages compatibility; output to `dist/`

## Commands
- `npm run dev` — local dev server
- `npm run build` — type-check (`vue-tsc --noEmit`) + Vite build to `dist/`
- `npm run type-check` — TypeScript strict-mode check only
- `npm test` — Vitest unit suite (combat / rules / store)

## Key Files

### Data
- `src/types/game.ts` — all enums, interfaces, and discriminated union types (canonical data layer)
- `src/data/cardDatabase.ts` — **47 market cards** (18 Free Peoples, 18 Morgoth, 11 Neutral) + 6 starter templates (3 per side) + Mercenary Builders supply; covers all six `EffectReward` types

### State
- `src/stores/game.ts` — Pinia setup-syntax store (`useGameStore`), all reactive game state

  Actions: `drawCards`, `gainResources`, `gainAttack`, `markAttackAssigned`, `applyMarketDamage`, `adjustFate`, `purchaseCard`, `purchaseMercenary`, `applyCardEffect`, `deployVanguard`, `damageVanguard`, `trashCard`, `declareWinner`, `findStrongholdById`, `checkWinCondition`, `setActiveStronghold`, `endTurn`

### Logic
- `src/composables/useCombatEngine.ts` — multi-target combat (`executeAttack`); dispatches to Stronghold / Vanguard / MarketCard paths; calls `checkWinCondition` in all damage paths
- `src/composables/useTutorial.ts` — module-singleton tutorial state; 9-step interactive walkthrough, DOM highlight via `classList`
- `src/composables/useSfx.ts` — sound effects: `click`, `play`, `attack`, `purchase`, `draw`, `shuffle`
- `src/composables/useAttackFx.ts` — module-singleton attack hit-flash: `triggerHit(targetId, faction)`, `currentHit` ref
- `src/composables/usePurchaseFx.ts` — module-singleton purchase card-flight queue: `flyToDiscard(card, fromRect, toRect)`, `flights` ref

### Components
- `src/components/GameView.vue` — full board layout; seeds all game state in `onMounted`; manages pre-game base selection, base-choice modal, trash modal, game-over modal
- `src/components/MarketRow.vue` — smart market row connected to store; FLIP animations; handles purchase and attack-assignment click paths
- `src/components/PlayingCard.vue` — dumb card display (cost, ⚔ attack, ◈ resources, ✦ fate, ability text, optional Vanguard HP bar)
- `src/components/Stronghold.vue` — dumb stronghold display with animated health bar and hit-flash overlay
- `src/components/StrongholdStack.vue` — stacked multi-base display; only the active base is shown prominently on top
- `src/components/FateTrack.vue` — dumb fate slider showing light vs. shadow dominance
- `src/components/HelpModal.vue` — dialog with card symbol reference and "Start Tutorial" entry point
- `src/components/TutorialDrawer.vue` — right-side sliding drawer; step navigation, progress bar, action prompts
- `src/components/HitFlash.vue` — dumb `⚔` overlay; `{ active, faction }` props; CSS keyframe via `style.css`
- `src/components/PurchaseFlightLayer.vue` — fixed pointer-events-none overlay; renders ghost `<PlayingCard>` clones flying from market to discard

### Styles
- `src/style.css` — Tailwind base + global `.tutorial-highlight` pulse animation + `@keyframes attack-flash` (both non-scoped; applied via JS `classList` or inline `style` prop)

## Multi-Stronghold Model
`strongholds: Partial<Record<PlayerId, Stronghold[]>>` — each player has an array of bases. `gameState.activeStrongholdId[playerId]` tracks the currently targetable one. When it falls, `pendingBaseChoice` is set and a modal blocks play until the owner picks a new active base. Win condition: all bases destroyed.

## Game Color Tokens (tailwind.config.js)
- `free-peoples` (DEFAULT / light / dark / bg) — gold tones (#C9A227)
- `morgoth` (DEFAULT / light / dark / bg) — crimson tones (#9B2020)
- `neutral` (DEFAULT / light / dark / bg) — slate tones
- `parchment`, `card-bg`, `card-border`, `ink`, `muted` — UI chrome

## Subproject Docs
- [src/CLAUDE.md](src/CLAUDE.md) — game mechanics and per-file responsibilities
