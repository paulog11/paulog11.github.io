# Beleriand Realms

A 2-player asymmetrical deckbuilder card game set in Tolkien's First Age, inspired by *Star Wars: The Deckbuilding Game*. One player commands the **Free Peoples** defending Gondolin; the other commands **Morgoth's forces** from Angband.

## Premise

The fate of Beleriand hangs in the balance. Each turn, players play cards from their hand to accumulate **resources** and **attack**, then spend them to acquire cards from the central **Beleriand Row** or strike at their opponent's stronghold. The row is a shared market of six cards drawn from a common deck — cards bearing Free Peoples, Morgoth, or Neutral allegiances. Players attack opposing-faction cards to remove them and claim their rewards, while also threatening the enemy stronghold directly.

Victory is tracked on the **Fate Track** — a −10 to +10 slider that shifts with certain card effects and abilities. Push it far enough toward your side to gain a dominance advantage, or destroy the enemy stronghold outright to win.

## Factions

| Faction | Player | Stronghold | Theme |
|---|---|---|---|
| Free Peoples | Player 1 | Gondolin (30 HP) | Gold — characters, artifacts, lore |
| Morgoth | Player 2 | Angband (30 HP) | Crimson — brutes, dark sorcery, terror |
| Neutral | Either | — | Slate — wanderers, ancient relics |

## Card Types

- **Character** — combat and resource units; the backbone of both decks
- **Champion** — high-cost, high-impact heroes and lieutenants (cost ≥ 4)
- **Artifact** — resource-generating equipment with passive bonuses
- **Great Beast** — Morgoth's massive creatures (Balrogs, fell beasts)

## Card Anatomy

Each card has:
- **Cost** — attack needed to defeat it in the Beleriand Row, or resources to acquire it (acquiring not yet implemented)
- **Attack** — added to your pool when played from hand
- **Resources** — added to your pool when played from hand
- **Fate Generation** — passive influence on the Fate Track (positive for Free Peoples, negative for Morgoth)
- **Effect** — optional triggered ability that fires when the card is played or defeated

## How to Play (Current Prototype)

1. Click any card in your hand (bottom row) to play it — it moves to your **In Play** zone and its attack/resource values are added to your pool.
2. Watch the **Beleriand Row** (center) for opposing-faction cards. Combat wiring is in progress — market card selection is currently logged to the console.
3. The **Fate Track** shifts as card effects fire. At ±7 one side has dominance.
4. The opponent's hand is shown face-down (fanned) at the top. Their stronghold (Angband, 24/30 HP in the seed) is displayed top-left.

Turn advancement and full combat UI are coming in the next slice.

## Running Locally

```bash
cd projects/beleriand-realms
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Building

```bash
npm run build
```

This runs `vue-tsc --noEmit` (strict TypeScript check) followed by `vite build`. Output goes to `dist/`.

## Project Structure

```
beleriand-realms/
├── src/
│   ├── types/
│   │   └── game.ts              # All enums, interfaces, discriminated unions
│   ├── stores/
│   │   └── game.ts              # Pinia store — all reactive game state
│   ├── composables/
│   │   └── useCombatEngine.ts   # Multi-target combat logic
│   ├── components/
│   │   ├── GameView.vue         # Full board layout (smart, seeds game state)
│   │   ├── MarketRow.vue        # Beleriand Row with FLIP animations (smart)
│   │   ├── PlayingCard.vue      # Card display (dumb)
│   │   ├── Stronghold.vue       # Stronghold with health bar (dumb)
│   │   └── FateTrack.vue        # Fate slider (dumb)
│   └── App.vue                  # Root — renders <GameView />
├── tailwind.config.js           # Custom game color tokens
├── vite.config.js
├── tsconfig.app.json            # strict: true, noUnusedLocals/Parameters
└── package.json
```
