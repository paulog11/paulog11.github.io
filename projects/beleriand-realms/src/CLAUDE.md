# Beleriand Realms — src/

## Game Mechanics

### Factions
- **Free Peoples** (PlayerOne) — starts at Gondolin. Gold theme.
- **Morgoth** (PlayerTwo) — starts at Angband. Crimson theme.
- **Neutral** — market cards acquirable by either side. Cannot be attacked by either.

Faction assignment is immutable (`playerFactions` in the store). Cards carry their faction; this determines which player can attack them in the Beleriand Row.

### Resources and Attack
Each player accumulates `resources` and `attack` by playing cards from hand. Playing a card immediately adds its `resources` and `attack` values to the active player's pool. Resources are used to acquire market cards (not yet wired). Attack is spent through `useCombatEngine.executeAttack`.

### The Beleriand Row
A shared row of up to 6 visible cards drawn from `beleriandDeck`. Cards belong to one of the three factions. Players attack opposing-faction cards (spending attack equal to the card's `cost`) to remove them and trigger any reward. A replacement is drawn from the deck automatically.

### Fate Track
An integer from -10 (Morgoth dominance) to +10 (Free Peoples dominance). Clamped by `adjustFate` in the store. Displayed as a gradient slider by `FateTrack.vue`. Dominance thresholds trigger at ±7.

### Card Effects (`EffectReward` discriminated union)
| type | effect |
|---|---|
| `gainResources` | add `amount` to beneficiary's resource pool |
| `gainAttack` | add `amount` to beneficiary's attack pool |
| `drawCards` | draw `count` from beneficiary's deck |
| `adjustFate` | shift the fate track by `amount` |
| `dealDamage` | subtract `amount` from the opposing stronghold's HP directly |

`dealDamage` bypasses `executeAttack` to avoid recursion.

### Strongholds
Each player has one stronghold (`Partial<Record<PlayerId, Stronghold>>`). Populated during game setup in `GameView.onMounted`. Health bar transitions through green → yellow → red at 50%/25% thresholds.

### Turn Phases (`TurnPhase`)
`Start → Main → Resolution → End`. The enum is defined; turn advancement is not yet wired into the UI (next slice).

---

## File Responsibilities

### `types/game.ts`
Canonical data layer. All enums (`Faction`, `CardType`, `TurnPhase`, `PlayerId`), all interfaces (`Card`, `Stronghold`, `PlayerState`, `GameState`), and all discriminated unions (`EffectReward`, `CombatEvent`, `CombatResult`). Nothing in this file has side effects. Import everything else from here.

`FateTrackPosition` is a `number` alias (TypeScript has no ranged types). The invariant `-10 ≤ n ≤ 10` is enforced at runtime by `isValidFateTrackPosition` and the `adjustFate` clamp in the store.

### `stores/game.ts`
Pinia setup-syntax store. All reactive game state lives here:
- `players` — `Record<PlayerId, PlayerState>` (hand, deck, discard, inPlay, resources, attack)
- `beleriandRow` / `beleriandDeck` — shared market state
- `strongholds` — `Partial<Record<PlayerId, Stronghold>>` (partial because set during setup, not at store init)
- `gameState` — `{ fateTrack, turnPhase, activePlayer }`
- `playerFactions` — immutable faction assignment (plain object, not ref)

Actions: `drawCards` (reshuffles discard when deck is empty), `gainResources`, `gainAttack`, `adjustFate` (clamps to ±10).

### `composables/useCombatEngine.ts`
Stateless composable. Calls `useGameStore()` once internally. Exports `{ executeAttack }`.

`executeAttack(attackerId, targetType, targetId, attackAmount)` validates: amount > 0, player has enough attack, then dispatches to:
- `attackStronghold` — validates not self-targeting, subtracts HP, emits `StrongholdDamaged` / `StrongholdDestroyed`
- `attackMarketCard` — validates opposing faction (Neutral = invalid), attack ≥ card cost, splices from `beleriandRow`, triggers reward, refills from `beleriandDeck`

Module-scope helpers take `store` as a parameter so they're testable without repeated `useGameStore()` calls.

### `components/GameView.vue`
Smart board component. Owns the three-zone layout (`h-screen flex flex-col`) and seeds the entire initial game state in `onMounted`. Imports and connects all other components.

`playCard(c)` — removes card from `p1.hand`, pushes to `p1.inPlay`, calls `gainResources` + `gainAttack`. Coordinated by two `<TransitionGroup>` animations: `play-from-hand` (card departs hand) and `arrive-to-play` (card enters in-play zone with 120ms delay).

Scaled in-play cards use a fixed `120×180px overflow:hidden` wrapper around a `160×240px` div with `scale(0.75)` — this collapses the layout footprint while keeping the card content full-resolution.

### `components/MarketRow.vue`
Smart component. Reads `beleriandRow` and `beleriandDeck` via `storeToRefs`. Emits `select(card)` upward (combat wiring pending). Empty slot indicators are rendered **outside** the `<TransitionGroup>` so they don't participate in FLIP calculations.

`leave-active { position: absolute }` is the critical FLIP rule: it removes the departing card from flex flow so siblings can animate to their new positions.

### `components/PlayingCard.vue`
Dumb. Props: `card: Card`, `faceDown?: boolean`. Emits: `click(card)`. Fixed `w-40 h-60` frame. Faction-colored border driven by a `factionMeta` computed. `faceDown` renders a solid overlay with a 🌑 glyph.

### `components/Stronghold.vue`
Dumb. Props: `stronghold: Stronghold`, `isTarget?: boolean`. Emits: `target(id)`. Health bar width = `(currentHealth/maxHealth)*100%` with color transitions at 50%/25%. `isTarget` adds a red ring and ⚔ pip badge. Destroyed state renders an overlay.

### `components/FateTrack.vue`
Dumb. Props: `fateTrack: FateTrackPosition`. Renders a `linear-gradient` bar (crimson left → gold right). Marker position = `((fateTrack + 10) / 20) * 100%` with a 500ms CSS transition. Inner dot color switches on sign. Ticks at −10, −5, 0, +5, +10. `dominance` computed triggers at ±7.
