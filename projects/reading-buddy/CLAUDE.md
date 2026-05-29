# Reading Buddy

Multi-book reading companion. Supports two book types: **narrative** (progressive character reveals with chapter-by-chapter unlocking) and **concepts** (standalone cultural concepts browsable in any order).

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 5, Tailwind CSS 3
- Fonts: Playfair Display (serif headings), Source Sans 3 (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Architecture
App.vue is a thin shell that renders a BookSelector landing screen, then delegates to a type-specific sub-app based on `book.type`:
- `type: 'narrative'` → NarrativeApp (Brothers Karamazov)
- `type: 'concepts'` → ConceptApp (The Japanese Mind, Japanese Culture)

This avoids conditional composable calls — each sub-app calls its own composable internally.

## Key Files

### Shared
- `src/App.vue` — shell: BookSelector → NarrativeApp | ConceptApp
- `src/components/BookSelector.vue` — landing screen with book cards

### Narrative books (Brothers Karamazov)
- `src/data/brothers-karamazov.js` — book data: characters, chapters (Books I–VI), per-chapter character details + timeline data
- `src/composables/useBookProgress.js` — sequential unlock, localStorage persistence, character accumulation
- `src/components/NarrativeApp.vue` — layout shell for narrative books
- `src/components/ChapterTracker.vue` — sidebar chapter list with unlock controls
- `src/components/BookPage.vue` — main content: character grid, timeline toggle, unlock button
- `src/components/CharacterCard.vue` / `CharacterGrid.vue` — character profiles
- `src/components/BrothersTimeline.vue` — parallel timelines for Dmitri/Ivan/Alyosha

### Concept books (The Japanese Mind, Japanese Culture, etc.)
- `src/data/japanese-mind.js` — 27 cultural concepts, each with 4-step content
- `src/data/japanese-culture.js` — 8 religious/philosophical foundations (Shinto, Buddhism, Taoism, Zen, Confucianism, etc.)
- `src/data/mere-christianity.js` — 33 chapters (one per chapter, Books I–IV), `cardType: 'apologetics'`
- `src/composables/useConceptProgress.js` — exposes book data (no unlock gating)
- `src/components/ConceptApp.vue` — layout shell for concept books (sidebar + main)
- `src/components/ConceptTracker.vue` — sidebar list of all concepts
- `src/components/ConceptPage.vue` — landing grid when no concept selected; dispatches to the correct card by `book.cardType`
- `src/components/ConceptCard.vue` — default card: summary, examples, cultural gap (conditional), trigger, FM Japan 25 Comments
- `src/components/HistoryCard.vue` — `cardType: 'history'` card: summary, key figures, key terms, historical significance
- `src/components/ApologeticsCard.vue` — `cardType: 'apologetics'` card: summary, examples, the argument, objection & response, key quote

## Commands
- `npm run dev` — local dev server
- `npm run build` — build to dist/

## Adding a New Book
1. Create `src/data/book-slug.js` with a `type` field (`'narrative'` or `'concepts'`)
2. Import it in `App.vue` and add to the `BOOKS` array
3. If it's a new type, create a new sub-app component and add a `v-else-if` branch in App.vue

## Data Schemas

### Narrative books
`{ id, type: 'narrative', title, author, coverEmoji, description, characters: { [key]: { name, shortName, epithet } }, books: [{ id, title, chapters: [{ id, title, introduces: [keys], characterDetails: { [key]: { description, traits, relationships, events, timeline } } }] }] }`

Characters accumulate details as chapters unlock. Sequential unlock only — no skipping.

### Concept books (default — ConceptCard)
`{ id, type: 'concepts', title, author, coverEmoji, description, concepts: [{ id, title, japanese, subtitle, steps: { summary: { content }, examples: { items: [] }, culturalGap: { applicable, content }, trigger: { content } } }] }`

### Concept books — history cardType (HistoryCard)
Set `cardType: 'history'` on the book object. Each concept uses: `steps: { summary: { content }, keyFigures: { items: [{ name, role }] }, keyTerms: { items: [{ term, reading, definition }] }, significance: { content } }`

### Concept books — apologetics cardType (ApologeticsCard)
Set `cardType: 'apologetics'` on the book object. Optionally set `typeLabel` to override the "Cultural Guide" label on the BookSelector (e.g. `typeLabel: 'Apologetics'`). The `japanese` field doubles as a generic short-label/locator slot (e.g. `'Bk I · 1'`). Each concept uses: `steps: { summary: { content }, examples: { items: [] }, argument: { content }, objection: { challenge, response }, quote: { content } }`

All concepts are available immediately. One concept displays at a time — clicking a concept in the sidebar or landing grid opens it.
