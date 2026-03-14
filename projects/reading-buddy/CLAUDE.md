# Reading Buddy

Reading companion app with progressive character reveals. Tracks books with chapter-by-chapter unlocking of character profiles, relationships, and key events.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 5, Tailwind CSS 3
- Fonts: Playfair Display (serif headings), Source Sans 3 (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `src/data/brothers-karamazov.js` — book data: characters, chapters, per-chapter character details
- `src/composables/useBookProgress.js` — state management, localStorage persistence, character accumulation
- `src/components/CharacterCard.vue` — individual character profile card
- `src/components/CharacterGrid.vue` — responsive grid of character cards
- `src/components/ChapterTracker.vue` — sidebar chapter list with unlock controls
- `src/components/BookPage.vue` — main content area composing grid + unlock button
- `src/App.vue` — layout shell wiring everything together

## Commands
- `npm run dev` — local dev server
- `npm run build` — build to dist/

## Adding a New Book
1. Create `src/data/book-slug.js` following the schema in `brothers-karamazov.js`
2. Import it in `App.vue` and pass to `useBookProgress()`

## Data Schema
Each book file exports: `{ id, title, author, characters: { [key]: { name, shortName, epithet } }, books: [{ id, title, chapters: [{ id, title, introduces: [keys], characterDetails: { [key]: { description, traits, relationships, events } } }] }] }`

Characters accumulate details as chapters unlock. Sequential unlock only — no skipping chapters.
