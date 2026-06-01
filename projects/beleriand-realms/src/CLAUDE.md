# Beleriand Realms — src/

## Game Mechanics

### Factions
- **Free Peoples** (PlayerOne) — Gold theme.
- **Morgoth** (PlayerTwo) — Crimson theme.
- **Neutral** — acquirable by either side. Cannot be attacked.

Faction assignment is immutable (`playerFactions` in the store). Cards carry their faction; this determines which player can attack them in the Beleriand Row.

### Resources and Attack
Each player accumulates `resources` and `attack` by playing cards from hand. Playing a card immediately adds its `resources` and `attack` values to the active player's pool. Resources are used to acquire market cards. Attack is spent through `useCombatEngine.executeAttack` or contributed automatically by deployed Vanguards at the start of each turn.

### The Beleriand Row
A shared row of up to 6 visible cards drawn from `beleriandDeck`. Players can:
- **Purchase** same-faction or Neutral cards by spending resources equal to the card's `cost`.
- **Attack** opposing-faction non-Vanguard cards by spending attack equal to accumulated `marketDamage` reaching `cost`. Damage is turn-scoped and cumulative — a card can be hit multiple times in one turn.

When a card leaves the row (purchased or defeated), a replacement is drawn from the deck automatically. The **Mercenary Builders** supply slot (10 copies, cost 2, `gainResources +2`) is always available beside the row.

### Vanguards
Cards with `category: CardCategory.Vanguard` deploy to the field when played rather than going to the in-play zone. Deployed Vanguards:
- Persist across turns until their HP reaches 0.
- Add their `card.attack` to the owner's pool at the start of each of the owner's turns.
- Must be cleared before the opponent can attack the active stronghold.
- Drop to discard when killed (`damageVanguard` in the store).

Vanguard cards in the Beleriand Row cannot be attacked — they can only be purchased with resources.

### Strongholds
Each player has **multiple strongholds** (`Stronghold[]` per player). Only one is **active** (targetable) at a time, tracked by `gameState.activeStrongholdId[playerId]`.

Players choose their starting active stronghold before play begins (pre-game modal). When the active stronghold's HP reaches 0, `checkWinCondition` sets `pendingBaseChoice` and a modal blocks further action until the owning player picks a new active base from their surviving ones.

**Win condition**: destroy **all** of the opponent's strongholds (`checkWinCondition` fires after every damage event; win triggers when `destroyed >= bases.length`).

Free Peoples strongholds (7): Gondolin (20 HP), Menegroth (18), Nargothrond (16), Barad Eithel / Pass of Aglon / Vinyamar / Himring (14 each).
Morgoth strongholds (3): Angband (40 HP), Utumno (35), Thangorodrim (28).

Each stronghold has an `innateAbility` text. Only Gondolin's "draw 1 card when a Hero is played" is currently wired (`triggerGondolinIfEligible` in `GameView.vue`).

### Fate Track
An integer from -10 (Morgoth dominance) to +10 (Free Peoples dominance). Clamped by `adjustFate` in the store. Displayed as a gradient slider by `FateTrack.vue`. Dominance is flagged at ±7 (visual indicator only — no mechanical effect yet).

### Card Effects (`EffectReward` discriminated union)
| type | effect |
|---|---|
| `gainResources` | add `amount` to beneficiary's resource pool |
| `gainAttack` | add `amount` to beneficiary's attack pool |
| `drawCards` | draw `count` from beneficiary's deck |
| `adjustFate` | shift the fate track by `amount` (positive = toward Light) |
| `dealDamage` | deal `amount` to the **opposing** side's first living Vanguard; if none, hits the active stronghold |
| `trash` | set `gameState.pendingTrash = playerId`; a modal lets the player permanently remove a card from hand / inPlay / discard |

When a card is **played from hand**, `applyCardEffect` in the store handles the reward for the playing player. When a market card is **defeated**, `applyReward` in `useCombatEngine.ts` handles the reward for the attacker (the beneficiary).

### Turn Flow
`endTurn()` in the store:
1. Discard all `inPlay` and `hand` cards (vanguards **persist** on the field)
2. Reset `resources`, `attack`, `attackAssigned` to 0 / empty
3. Reset `marketDamage` to `{}`
4. Draw 5 new cards (reshuffles `discard` into `deck` if exhausted)
5. Swap `activePlayer` to the other player
6. Add the new active player's Vanguard attack contributions to their pool

`activePlayer` starts as `PlayerOne` (Free Peoples moves first).

Turn phases (`TurnPhase` enum: `Start → Main → Resolution → End`) are defined but not yet used to gate actions.

### Tutorial System
A 9-step interactive walkthrough implemented as module-singleton state in `useTutorial.ts`. Steps are defined as an array with optional `highlightId` (matching a DOM element's `id`) and `actionPrompt` text. When a step changes, a `watch` at module scope removes the previous `.tutorial-highlight` class and applies it to the new target element. Two hook functions (`onCardPlayed`, `onTurnEnded`) let `GameView` auto-advance the tutorial when the player takes the prompted action.

---

## File Responsibilities

### `types/game.ts`
Canonical data layer. All enums (`Faction`, `CardCategory`, `TurnPhase`, `PlayerId`), all interfaces (`Card`, `VanguardInstance`, `Stronghold`, `PlayerState`, `GameState`), and all discriminated unions (`EffectReward`, `CombatEvent`, `CombatResult`). Nothing in this file has side effects.

- `GameState` includes `winner: Faction | null`, `marketDamage: Record<string, number>`, `basesDestroyed: Record<PlayerId, number>`, `activeStrongholdId: Record<PlayerId, string | null>`, `pendingBaseChoice: PlayerId | null`, `pendingTrash: PlayerId | null`.
- `PlayerState` includes `vanguards: VanguardInstance[]` and `attackAssigned: Set<string>`.
- `FateTrackPosition` is a `number` alias. The invariant `-10 ≤ n ≤ 10` is enforced at runtime by `isValidFateTrackPosition` and the `adjustFate` clamp in the store.

### `data/cardDatabase.ts`
Exports:
- `FREE_PEOPLES_STARTER` / `MORGOTH_STARTER` — 3-card starter templates each (resource Troop, attack Troop, fate Troop). `GameView.makeStarterDeck` expands each into a 10-card deck with unique id suffixes.
- `MERCENARY_BUILDERS` — always-available Neutral supply card (cost 2, +2 resources).
- `MERCENARY_BUILDERS_SUPPLY = 10` — initial supply count.
- `CARD_DATABASE: readonly Card[]` — **47 market cards**: 18 Free Peoples, 18 Morgoth, 11 Neutral, costs 1–8, all six `EffectReward` types represented. Vanguard cards have `hp?: number`.

Roster highlights: Fingolfin (FP Vanguard 7, hp 6), Túrin Turambar (FP Vanguard 8, hp 7); Balrog of Morgoth (Vanguard 8, hp 8), Ancalagon the Black (Vanguard 7, hp 10); Ungoliant (Neutral Vanguard 6, hp 6). Dark Sorcerer's `adjustFate: -2` is a trap card. Neutral Vanguards (Ungoliant) can be acquired and block their owner's stronghold.

### `stores/game.ts`
Pinia setup-syntax store. All reactive game state lives here:
- `players` — `Record<PlayerId, PlayerState>` (hand, deck, discard, inPlay, vanguards, resources, attack, attackAssigned)
- `beleriandRow` / `beleriandDeck` — shared market state
- `mercenarySupply` — count of Mercenary Builders remaining
- `strongholds` — `Partial<Record<PlayerId, Stronghold[]>>`
- `gameState` — `{ fateTrack, turnPhase, activePlayer, winner, marketDamage, basesDestroyed, activeStrongholdId, pendingBaseChoice, pendingTrash }`
- `playerFactions` — immutable faction assignment (plain object, not ref)

### `composables/useCombatEngine.ts`
Stateless composable. Calls `useGameStore()` once internally. Exports `{ executeAttack }`.

`executeAttack(attackerId, cardId, targetType, targetId, attackAmount)` validates amount > 0, the card hasn't already been assigned (`attackAssigned`), and the player has sufficient attack. Dispatches to:
- `attackStronghold` — validates not self-targeting, only active stronghold reachable, no living enemy Vanguards; subtracts HP; calls `checkWinCondition`.
- `attackVanguard` — validates opposing faction ownership; calls `store.damageVanguard`.
- `attackMarketCard` — validates opposing faction, not a Vanguard category; calls `applyMarketDamage`; if total damage ≥ cost, splices card, triggers `applyReward`, refills row.

`applyReward` handles all six `EffectReward` types. The `dealDamage` branch targets the first living enemy Vanguard if any, else the active stronghold — does NOT call `executeAttack` (avoids recursion). Calls `triggerHit` from `useAttackFx` on every successful damage path.

### `composables/useTutorial.ts`
Module-singleton composable (refs declared at module scope). Owns the 9-step tutorial definition and DOM highlight logic.

State: `isActive: Ref<boolean>`, `currentIndex: Ref<number>`. Module-level watchers sync the DOM. Hook functions: `onCardPlayed()`, `onTurnEnded()`.

### `composables/useSfx.ts`
`playSfx(name)` — plays sound effects: `click`, `play`, `attack`, `purchase`, `draw`, `shuffle`. Called from `PlayingCard`, `useCombatEngine`, and the store.

### `composables/useAttackFx.ts`
Module-singleton. `triggerHit(targetId, faction)` sets `currentHit` (with `key: Date.now()`) and auto-clears after 500 ms. Components read `currentHit` to conditionally render `<HitFlash>`.

### `composables/usePurchaseFx.ts`
Module-singleton. `flyToDiscard(card, fromRect, toRect)` pushes a `FlightEntry` onto the `flights` array and removes it after 750 ms. `PurchaseFlightLayer` reads `flights` to render card-flight animations.

### `components/GameView.vue`
Smart board component. Owns the three-zone layout and seeds all initial game state in `onMounted`:
- Builds 3 Morgoth strongholds and 7 Free Peoples strongholds.
- Builds 10-card starter decks via `makeStarterDeck`, deals 5 to each hand.
- Shuffles `CARD_DATABASE` into the Beleriand deck, deals 6 to the row.

**Modals**: pre-game stronghold selection (z-50), trash card (z-40), base-choice after stronghold falls (z-40), game-over (z-50), Help (fade).

**Element IDs** (tutorial highlight targets): `enemy-stronghold`, `fate-track`, `in-play-zone`, `beleriand-row`, `player-stronghold`, `player-pool`, `player-hand`, `end-turn-btn`, `player-discard-pile`.

**Key interactions**:
- `playCard(c)` — removes from hand, gainResources/gainAttack, applyCardEffect, deploy Vanguard or push to inPlay, `triggerGondolinIfEligible`.
- `handleEndTurn()` — calls `store.endTurn()` then `onTurnEnded()`.
- `handleStrongholdTarget` / `handleVanguardTarget` / `handleMarketAttack` — route to `executeAttack` with the selected attacker id and amount.

### `components/MarketRow.vue`
Smart component. Reads `beleriandRow`, `beleriandDeck`, `mercenarySupply`, `players`, `gameState` via `storeToRefs`. Emits `attack(card)` upward.

Click handling: in attack-selection mode, forwards valid attack targets; in normal mode, calls `store.purchaseCard` and `flyToDiscard` with `getBoundingClientRect()` coords on success.

FLIP animations: `<TransitionGroup name="market-card">` with `leave-active { position: absolute }` so departing cards don't affect flex layout.

### `components/PlayingCard.vue`
Dumb. Props: `card: Card`, `faceDown?: boolean`, `vanguardHp?: number`. Emits: `click(card)`. Fixed `w-40 h-60` frame. Shows ⚔ attack, ◈ resources, ✦ fate (hidden if 0). Optional HP bar when `vanguardHp` is defined and `card.hp` exists. `faceDown` renders a 🌑 overlay.

### `components/Stronghold.vue`
Dumb. Props: `stronghold: Stronghold`, `isActive?: boolean`, `isTarget?: boolean`. Emits: `target(id)`. Health bar with color transitions at 50%/25%. `isActive` adds a gold ring and "· Active" badge. `isTarget` adds a red ring and ⚔ badge. Destroyed state renders a grayscale overlay. Renders `<HitFlash>` matching on `stronghold.id`.

### `components/StrongholdStack.vue`
Smart display of a player's full base array. Shows a stacked pile of face-down cards behind the active base on top. Exposes click-to-target when `isEnemy && selectingAttacker`.

### `components/HitFlash.vue`
Dumb. Props: `active: boolean`, `faction: Faction`. Renders an absolutely-positioned `⚔` glyph playing `@keyframes attack-flash` (450 ms, scale 0.6→1.1→0.9, fade in/out) when `active` is true. Color: gold for Free Peoples, crimson for Morgoth.

### `components/PurchaseFlightLayer.vue`
Fixed `z-30` pointer-events-none overlay. Watches `flights` from `usePurchaseFx`; on each new entry, renders a `<PlayingCard>` clone at the source rect and on `nextTick` transitions it to the destination rect (scale 0.28, fade out, 600 ms).

### `components/FateTrack.vue`
Dumb. Props: `fateTrack: FateTrackPosition`. `linear-gradient` bar (crimson ← → gold). Marker position = `((fateTrack + 10) / 20) * 100%` with a 500 ms CSS transition. Ticks at −10, −5, 0, +5, +10. `dominance` computed triggers at ±7.

### `components/HelpModal.vue`
Dialog overlay. Four sections: Card Symbols, Card Types, Factions, Fate Track. Click-outside-to-close. "▶ Start Tutorial" closes the modal then calls `useTutorial().start()` via `nextTick`.

### `components/TutorialDrawer.vue`
Fixed 288px right-side panel. Uses `useTutorial()` (same singleton state). Shows step title, body, optional action prompt, progress bar, and Prev/Next/Finish navigation.

### `style.css`
Tailwind base layer. Defines two global animations (non-scoped, applied via JS or inline style):
- `.tutorial-highlight` — pulsing gold `outline` + `box-shadow` (1.8s, ease-in-out).
- `@keyframes attack-flash` — scale 0.6→1.1→0.95→0.9 with fade (used by `HitFlash.vue`).
