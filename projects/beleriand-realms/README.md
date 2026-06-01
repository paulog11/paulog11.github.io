# Beleriand Realms

A 2-player asymmetrical deckbuilder card game set in Tolkien's First Age, inspired by *Star Wars: The Deckbuilding Game*. One player commands the **Free Peoples**; the other commands **Morgoth's forces**. Both share a central market of six cards — the **Beleriand Row**.

## Premise

Each turn, players play cards from their hand to accumulate **resources** and **attack**, then spend them to acquire cards from the Beleriand Row or strike at the enemy. The row contains Free Peoples, Morgoth, and Neutral cards. Players attack opposing-faction cards to defeat them and claim rewards; Neutral cards can only be purchased with resources. Victory comes by destroying all of the opponent's strongholds.

The **Fate Track** (−10 to +10) shifts with certain card effects. Reaching ±7 flags dominance (visual feedback only — no mechanical effect yet).

## Factions

| Faction | Player | Starting Strongholds | Theme |
|---|---|---|---|
| Free Peoples | Player 1 | 7 bases: Gondolin (20), Menegroth (18), Nargothrond (16), and four 14-HP fortresses | Gold — heroes, rangers, lore |
| Morgoth | Player 2 | 3 bases: Angband (40), Utumno (35), Thangorodrim (28) | Crimson — troops, fell beasts, dark sorcery |
| Neutral | Either | — | Slate — wanderers, dwarves, ancient powers |

Only one stronghold per player is **active** (targetable) at a time. Each stronghold has an innate ability. When the active stronghold falls, its owner picks a replacement. Win by destroying **all** of the opponent's strongholds.

## Card Types

| Type | Description |
|---|---|
| **Troop** | Common units played from hand; discarded at end of turn |
| **Hero** | Unique named characters; one copy in the market deck |
| **Vanguard** | Powerful units with HP; deploy to the field, persist across turns, contribute attack each turn, and block the active stronghold until killed |

## Card Anatomy

Each card has:
- **Cost** — resources to acquire (purchasable cards) or attack needed to defeat it (opposing-faction cards)
- **Attack** — added to your pool when played from hand (or continuously for deployed Vanguards)
- **Resources** — added to your pool when played from hand
- **Fate Generation** — influences the Fate Track when the card is played or defeated
- **Effect** — an optional triggered ability

Effect types: `gainResources`, `gainAttack`, `drawCards`, `adjustFate`, `dealDamage`, `trash`.

## How to Play

Both players start with a **10-card starter deck** (7 resource cards, 2 attack cards, 1 fate card), drawing 5 each turn.

Each turn:
1. **Play cards** from your hand — they move to your In Play zone and add their attack/resource values to your pool.
2. **Assign attack**: click an in-play card or deployed Vanguard to select it as an attacker, then click a target — an opposing-faction card in the Beleriand Row, an enemy Vanguard, or the enemy's active stronghold (only reachable once all enemy Vanguards are cleared).
3. **Purchase**: buy Neutral or same-faction cards from the Beleriand Row by spending resources equal to their cost. Purchased cards go to your discard pile; the row refills automatically. The **Mercenary Builders** supply slot (10 copies, cost 2) is always available to both sides.
4. **End Turn**: click End Turn — your hand and in-play cards discard, your pools reset, you draw 5 new cards, and the turn passes.

Deployed **Vanguards** persist on the field across turns. At the start of your turn they add their attack to your pool. They can be killed by the opponent spending attack equal to their current HP.

The **Trash mechanic**: certain cards (Loremaster of Eregion, Iron-mask Inquisitor, Wandering Exile) let you permanently remove a card from your hand, in-play zone, or discard pile, thinning your deck.

## Running Locally

```bash
cd projects/beleriand-realms
npm install
npm run dev
```

Open `http://localhost:5173`. Press **?** for the Help reference or use the Tutorial via the Help modal.

## Building & Testing

```bash
npm run build        # type-check + vite build → dist/
npm run type-check   # TypeScript strict check only
npm test             # Vitest unit suite (combat, rules, store)
```

## Project Structure

```
beleriand-realms/
├── src/
│   ├── types/
│   │   └── game.ts                  # All enums, interfaces, discriminated unions
│   ├── data/
│   │   └── cardDatabase.ts          # 47 market cards + 6 starter templates + Mercenary supply
│   ├── stores/
│   │   └── game.ts                  # Pinia store — all reactive game state
│   ├── composables/
│   │   ├── useCombatEngine.ts       # Multi-target combat logic (Stronghold/Vanguard/MarketCard)
│   │   ├── useTutorial.ts           # Module-singleton tutorial walkthrough (9 steps)
│   │   ├── useAttackFx.ts           # Attack hit-flash animation state
│   │   ├── usePurchaseFx.ts         # Purchase card-flight animation queue
│   │   └── useSfx.ts                # Sound effects (click/play/attack/purchase/draw/shuffle)
│   ├── components/
│   │   ├── GameView.vue             # Full board layout; seeds game state in onMounted
│   │   ├── MarketRow.vue            # Beleriand Row with FLIP animations (smart)
│   │   ├── PlayingCard.vue          # Card display (dumb)
│   │   ├── Stronghold.vue           # Stronghold with health bar and hit-flash (dumb)
│   │   ├── StrongholdStack.vue      # Multi-base stacked display with active indicator
│   │   ├── FateTrack.vue            # Fate slider (dumb)
│   │   ├── HelpModal.vue            # Reference overlay + Tutorial entry point
│   │   ├── TutorialDrawer.vue       # Right-side sliding tutorial panel
│   │   ├── HitFlash.vue             # ⚔ glyph overlay on attack hit
│   │   └── PurchaseFlightLayer.vue  # Fixed overlay for card-flight-to-discard animation
│   ├── tests/
│   │   ├── combat.test.ts
│   │   ├── rules.test.ts
│   │   └── store.test.ts
│   └── App.vue                      # Root — renders <GameView />
├── tailwind.config.js               # Custom game color tokens
├── vite.config.ts
├── tsconfig.app.json                # strict: true, noUnusedLocals/Parameters
└── package.json
```
