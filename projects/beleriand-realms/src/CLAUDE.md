# Beleriand Realms — src/

## Game Mechanics

### Factions
- **Free Peoples** (PlayerOne) — starts at Gondolin. Gold theme.
- **Morgoth** (PlayerTwo) — starts at Angband. Crimson theme.
- **Neutral** — market cards acquirable by either side. Cannot be attacked by either.

Faction assignment is immutable (`playerFactions` in the store). Cards carry their faction; this determines which player can attack them in the Beleriand Row.

### Resources and Attack
Each player accumulates `resources` and `attack` by playing cards from hand. Playing a card immediately adds its `resources` and `attack` values to the active player's pool. Resources are used to acquire market cards (not yet wired to the UI). Attack is spent through `useCombatEngine.executeAttack`.

### The Beleriand Row
A shared row of up to 6 visible cards drawn from `beleriandDeck`. Players attack opposing-faction cards (spending attack equal to the card's `cost`) to remove them and trigger any reward. A replacement is drawn from the deck automatically. Neutral cards cannot be attacked — acquire only.

### Fate Track
An integer from -10 (Morgoth dominance) to +10 (Free Peoples dominance). Clamped by `adjustFate` in the store. Displayed as a gradient slider by `FateTrack.vue`. Dominance thresholds trigger at ±7.

### Card Effects (`EffectReward` discriminated union)
| type | effect |
|---|---|
| `gainResources` | add `amount` to beneficiary's resource pool |
| `gainAttack` | add `amount` to beneficiary's attack pool |
| `drawCards` | draw `count` from beneficiary's deck |
| `adjustFate` | shift the fate track by `amount` (positive = toward Light) |
| `dealDamage` | subtract `amount` from the **opposing** stronghold's HP directly |

`dealDamage` direction: beneficiary is the attacker, opposing = their enemy's stronghold. Bypasses `executeAttack` to avoid recursion. Both the direct attack path and the card-effect path check for win condition after applying damage.

### Win Condition
Reducing the enemy Stronghold to 0 HP ends the game. `useCombatEngine` calls `store.declareWinner(faction)` after either damage path zeroes a stronghold. `GameState.winner` flips from `null` to the winning `Faction`, which triggers the Game Over modal in `GameView`.

### Turn Flow
`endTurn()` in the store performs four steps in order:
1. Move all `inPlay` and `hand` cards to `discard`
2. Reset `resources` and `attack` to 0
3. Draw 5 new cards (reshuffles `discard` into `deck` if exhausted)
4. Swap `activePlayer` to the other player

Turn phases (`TurnPhase` enum: `Start → Main → Resolution → End`) are defined but not yet used to gate actions; the enum exists for the future phase state machine.

### Tutorial System
A 9-step interactive walkthrough implemented as module-singleton state in `useTutorial.ts`. Steps are defined as an array with optional `highlightId` (matching a DOM element's `id`) and `actionPrompt` text. When a step changes, a `watch` at module scope removes the previous `.tutorial-highlight` class and applies it to the new target element. Two hook functions (`onCardPlayed`, `onTurnEnded`) let `GameView` auto-advance the tutorial when the player takes the prompted action.

---

## File Responsibilities

### `types/game.ts`
Canonical data layer. All enums (`Faction`, `CardType`, `TurnPhase`, `PlayerId`), all interfaces (`Card`, `Stronghold`, `PlayerState`, `GameState`), and all discriminated unions (`EffectReward`, `CombatEvent`, `CombatResult`). Nothing in this file has side effects. Import everything else from here.

`GameState` includes `winner: Faction | null` — null means game in progress, non-null means game over.

`FateTrackPosition` is a `number` alias (TypeScript has no ranged types). The invariant `-10 ≤ n ≤ 10` is enforced at runtime by `isValidFateTrackPosition` and the `adjustFate` clamp in the store.

### `data/cardDatabase.ts`
The 20-card roster exported as `CARD_DATABASE: readonly Card[]`. Cards are organized by faction and cost tier:
- **Free Peoples (10)**: Lembas Bread (1), Dúnedain Scout (1), Elven Archer (2), Gondolin Warrior (2), Phial of Light (3), Ranger of the North (3), Húrin of Dor-lómin (4), Círdan the Shipwright (5), Eagles of Manwë (5), Fingolfin (7)
- **Morgoth (8)**: Orc Soldier (1), Warg Rider (2), Cave-Troll (3), Dark Sorcerer (3), Gothmog (4), Ungoliant (5), Glaurung (6), Balrog of Morgoth (8)
- **Neutral (2)**: Wandering Ranger (2), Ancient Stone (1)

All five `EffectReward` types are represented. `dealDamage` on opposing-faction cards creates deliberate risk/reward: defeating Gothmog or Glaurung deals bonus damage to Angband; Morgoth defeating Fingolfin deals bonus damage to Gondolin. Dark Sorcerer's `adjustFate: -2` is a trap card — Free Peoples who defeat it shift fate toward Shadow.

### `stores/game.ts`
Pinia setup-syntax store. All reactive game state lives here:
- `players` — `Record<PlayerId, PlayerState>` (hand, deck, discard, inPlay, resources, attack)
- `beleriandRow` / `beleriandDeck` — shared market state
- `strongholds` — `Partial<Record<PlayerId, Stronghold>>` (partial because populated during setup, not at store init)
- `gameState` — `{ fateTrack, turnPhase, activePlayer, winner }`
- `playerFactions` — immutable faction assignment (plain object, not ref)

Actions:
- `drawCards(playerId, count)` — reshuffles discard into deck when exhausted
- `gainResources(playerId, amount)` / `gainAttack(playerId, amount)` — increment pools
- `adjustFate(amount)` — clamps to ±10
- `declareWinner(faction)` — sets `gameState.winner`; called by combat engine when a stronghold reaches 0 HP
- `endTurn()` — discards inPlay + hand, resets pools, draws 5, swaps activePlayer

### `composables/useCombatEngine.ts`
Stateless composable. Calls `useGameStore()` once internally. Exports `{ executeAttack }`.

`executeAttack(attackerId, targetType, targetId, attackAmount)` validates: amount > 0, player has enough attack, then dispatches to:
- `attackStronghold` — validates not self-targeting, subtracts HP, emits `StrongholdDamaged` / `StrongholdDestroyed`, calls `store.declareWinner` if health reaches 0
- `attackMarketCard` — validates opposing faction (Neutral = invalid), attack ≥ card cost, splices from `beleriandRow`, triggers `applyReward`, refills from `beleriandDeck`

`applyReward` handles all five `EffectReward` types. The `dealDamage` branch directly mutates `stronghold.currentHealth` and calls `store.declareWinner` if it reaches 0 — does NOT call `executeAttack` (avoids recursion).

Module-scope helpers take `store` as a parameter so they're testable without repeated `useGameStore()` calls.

### `composables/useTutorial.ts`
Module-singleton composable (refs declared at module scope, shared across all call sites). Owns the 9-step tutorial definition and DOM highlight logic.

State: `isActive: Ref<boolean>`, `currentIndex: Ref<number>`. Two module-level watchers keep the DOM in sync: when `currentIndex` changes, the old `.tutorial-highlight` class is removed and applied to `document.getElementById(step.highlightId)`. When `isActive` goes false, all highlights are cleared.

Hook functions called by `GameView`:
- `onCardPlayed()` — if active and on the "Your Hand" step, auto-advances after 500ms
- `onTurnEnded()` — if active and on the last step, auto-closes after 400ms

### `components/GameView.vue`
Smart board component. Owns the three-zone layout (`h-screen flex flex-col`) and seeds the entire initial game state in `onMounted`. Integrates all other components.

**Element IDs** (used by tutorial highlight system):
| id | element |
|---|---|
| `enemy-stronghold` | Angband wrapper (top zone) |
| `fate-track` | `<FateTrack>` component |
| `in-play-zone` | in-play section (middle zone, `v-if`) |
| `beleriand-row` | `<MarketRow>` component |
| `player-stronghold` | Gondolin wrapper (bottom zone) |
| `player-pool` | attack + resource counters (bottom zone) |
| `player-hand` | hand scroll area (bottom zone) |
| `end-turn-btn` | End Turn button (bottom zone) |

**Key interactions:**
- `playCard(c)` — removes from hand, pushes to inPlay, adds resources/attack, calls `onCardPlayed()`
- `handleEndTurn()` — calls `store.endTurn()` then `onTurnEnded()`
- Help `?` button (top bar) → sets `showHelp = true` → mounts `<HelpModal>`
- Game Over modal — `v-if="store.gameState.winner !== null"`, faction-themed, reloads page

### `components/HelpModal.vue`
Dialog overlay. Four content sections: Card Symbols (cost circle, ⚔, ◈, ✦), Card Types (2×2 grid), Factions (gold/crimson/slate), and Fate Track explanation. Click-outside-to-close. Footer "▶ Start Tutorial" button closes the modal then calls `useTutorial().start()` via `nextTick`.

### `components/TutorialDrawer.vue`
Fixed 288px right-side panel. Uses `useTutorial()` (same singleton state). Shows step title, body, an optional gold "Your turn" action prompt box, a progress bar, and Prev/Next/Finish navigation. Slides in/out with `transform: translateX(100%)` transition.

### `components/MarketRow.vue`
Smart component. Reads `beleriandRow` and `beleriandDeck` via `storeToRefs`. Emits `select(card)` upward (combat wiring pending). Empty slot indicators are rendered **outside** the `<TransitionGroup>` so they don't participate in FLIP calculations.

`leave-active { position: absolute }` is the critical FLIP rule: it removes the departing card from flex flow so siblings can animate to their new positions.

### `components/PlayingCard.vue`
Dumb. Props: `card: Card`, `faceDown?: boolean`. Emits: `click(card)`. Fixed `w-40 h-60` frame. Faction-colored border driven by a `factionMeta` computed. Bottom row shows ⚔ attack (red), ◈ resources (gold), ✦ fate (slate, hidden if 0). `faceDown` renders a solid overlay with a 🌑 glyph.

### `components/Stronghold.vue`
Dumb. Props: `stronghold: Stronghold`, `isTarget?: boolean`. Emits: `target(id)`. Health bar width = `(currentHealth/maxHealth)*100%` with color transitions at 50%/25% (green → yellow → red). `isTarget` adds a red ring and ⚔ pip badge. Destroyed state renders an overlay.

### `components/FateTrack.vue`
Dumb. Props: `fateTrack: FateTrackPosition`. Renders a `linear-gradient` bar (crimson left → gold right). Marker position = `((fateTrack + 10) / 20) * 100%` with a 500ms CSS transition. Inner dot color switches on sign. Ticks at −10, −5, 0, +5, +10. `dominance` computed triggers at ±7.

### `style.css`
Tailwind base layer. Also defines `.tutorial-highlight` — a global (non-scoped) class applied via JS `classList`. Renders a pulsing gold `outline` + `box-shadow` animation (1.8s, ease-in-out). Must be non-scoped because it is added by `useTutorial.ts` imperatively via `document.getElementById(...).classList.add(...)`.
