# Reading Buddy

Multi-book reading companion. Supports two book types: **narrative** (progressive character reveals with chapter-by-chapter unlocking) and **concepts** (standalone cultural concepts browsable in any order).

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 5, Tailwind CSS 3
- Fonts: Playfair Display (serif headings), Source Sans 3 (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Architecture
App.vue is a thin shell that renders a BookSelector landing screen, then delegates to a type-specific sub-app based on `book.type`:
- `type: 'narrative'` → NarrativeApp (Brothers Karamazov)
- `type: 'concepts'` → ConceptApp (The Japanese Mind, Japanese Culture, and 7 other concept books)

This avoids conditional composable calls — each sub-app calls its own composable internally.

Both sub-apps render inside a shared `AppShell` (header + collapsible sidebar + main), and concept cards are built from shared primitives — see below.

## Key Files

### Shared
- `src/App.vue` — shell: BookSelector → NarrativeApp | ConceptApp
- `src/components/BookSelector.vue` — landing screen with book cards
- `src/components/AppShell.vue` — header/sidebar/main layout shell used by both NarrativeApp and ConceptApp; owns the mobile sidebar toggle + slide transition. Slots: `header-actions`, `sidebar`, default (main content)
- `src/components/BookCover.vue` — cover image (from `coverImages`) with `coverEmoji` fallback; `size: 'sm' | 'lg'`. Used by BookSelector, BookPage, ConceptPage

### Narrative books (Brothers Karamazov)
- `src/data/brothers-karamazov.js` — book data: characters, chapters (Books I–VI), per-chapter character details + timeline data
- `src/composables/useBookProgress.js` — sequential unlock, localStorage persistence, character accumulation
- `src/components/NarrativeApp.vue` — composable + AppShell wiring for narrative books (Reset UI goes in the `header-actions` slot)
- `src/components/ChapterTracker.vue` — sidebar chapter list with unlock controls
- `src/components/BookPage.vue` — main content: character grid, timeline toggle, unlock button
- `src/components/CharacterCard.vue` / `CharacterGrid.vue` — character profiles
- `src/components/BrothersTimeline.vue` — parallel timelines for Dmitri/Ivan/Alyosha (Karamazov-specific; hardcodes the three brothers' keys)

### Concept books (The Japanese Mind, Japanese Culture, A History of Japan, Mere Christianity, and others)
- `src/data/japanese-mind.js` — 27 cultural concepts, each with 4-step content
- `src/data/japanese-culture.js` — 8 religious/philosophical foundations (Shinto, Buddhism, Taoism, Zen, Confucianism, etc.)
- `src/data/chrysanthemum-sword.js` — Ruth Benedict's study of Japanese culture (13 concepts)
- `src/data/gospel-human-contexts.js` — anthropological missions framework (10 concepts)
- `src/data/jesus-for-japan.js` — bridging Christianity and Japanese culture (7 concepts)
- `src/data/multiplying-churches.js` — church multiplication in Japan (7 concepts)
- `src/data/word-tsumi.js` — the word "tsumi" in Japanese Bible translation (8 concepts)
- `src/data/history-japan.js` — 15 concepts, `cardType: 'history'`
- `src/data/mere-christianity.js` — 33 chapters (one per chapter, Books I–IV), `cardType: 'apologetics'`
- `src/composables/useConceptProgress.js` — exposes book data (no unlock gating)
- `src/components/ConceptApp.vue` — composable + AppShell wiring for concept books
- `src/components/ConceptTracker.vue` — sidebar list of all concepts
- `src/components/ConceptPage.vue` — landing grid when no concept selected; dispatches to the correct card by `book.cardType`
- `src/components/ConceptCard.vue` — default card: summary, examples, cultural gap (conditional), trigger, comments box (heading from `book.commentsLabel`, defaults to "Notes")
- `src/components/HistoryCard.vue` — `cardType: 'history'` card: summary, key figures, key terms, historical significance
- `src/components/ApologeticsCard.vue` — `cardType: 'apologetics'` card: summary, examples, the argument, objection & response, key quote
- `src/components/CardFrame.vue`, `CardSection.vue`, `CardCallout.vue`, `CardParagraphs.vue`, `CardBulletList.vue` — shared presentational primitives the three card components above are built from (container/header, section heading, left-border callout, `\n\n`-split paragraphs, bulleted list)

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
`{ id, type: 'concepts', commentsLabel?, title, author, coverEmoji, description, concepts: [{ id, title, label, subtitle, steps: { summary: { content }, examples: { items: [] }, culturalGap: { applicable, content }, trigger: { content } } }] }`

`commentsLabel` sets the heading on the comments box in ConceptCard (defaults to `'Notes'`).

### Concept books — history cardType (HistoryCard)
Set `cardType: 'history'` on the book object. Each concept uses: `steps: { summary: { content }, keyFigures: { items: [{ name, role }] }, keyTerms: { items: [{ term, reading, definition }] }, significance: { content } }`

### Concept books — apologetics cardType (ApologeticsCard)
Set `cardType: 'apologetics'` on the book object. Optionally set `typeLabel` to override the "Cultural Guide" label on the BookSelector (e.g. `typeLabel: 'Apologetics'`). Each concept uses: `steps: { summary: { content }, examples: { items: [] }, argument: { content }, objection: { challenge, response }, quote: { content } }`

### `label` field
Every concept has a `label` field rendered as a small mono tag next to its title (sidebar, landing grid, card header). It's a generic short-label/locator slot — a Japanese term (`甘え`), a kanji+romaji gloss, or a chapter locator (`'Bk I · 1'` in Mere Christianity).

All concepts are available immediately. One concept displays at a time — clicking a concept in the sidebar or landing grid opens it.
