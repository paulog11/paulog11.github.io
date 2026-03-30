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

### Concept books (The Japanese Mind, Japanese Culture)
- `src/data/japanese-mind.js` — 27 cultural concepts, each with 4-step content
- `src/data/japanese-culture.js` — 8 religious/philosophical foundations (Shinto, Buddhism, Taoism, Zen, Confucianism, etc.)
- `src/composables/useConceptProgress.js` — exposes book data (no unlock gating)
- `src/components/ConceptApp.vue` — layout shell for concept books (sidebar + main)
- `src/components/ConceptTracker.vue` — sidebar list of all concepts
- `src/components/ConceptPage.vue` — landing grid when no concept selected; single ConceptCard when one is active
- `src/components/ConceptCard.vue` — renders one concept's 4 steps (summary, examples, cultural gap, trigger)

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

### Concept books
`{ id, type: 'concepts', title, author, coverEmoji, description, concepts: [{ id, title, japanese, subtitle, steps: { summary: { content }, examples: { items: [] }, culturalGap: { applicable, content }, trigger: { content } } }] }`

All concepts are available immediately. One concept displays at a time — clicking a concept in the sidebar or landing grid opens it.
