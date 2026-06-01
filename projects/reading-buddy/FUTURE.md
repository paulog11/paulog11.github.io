# Reading Buddy — Future Improvements

## A. Core Learning Features

### A1. Personal Notes per Concept
A collapsible textarea at the bottom of every card (all three card types), auto-saved to localStorage under `reading-buddy-notes:[book.id]:[concept.id]`. A small dot indicator in the sidebar shows which concepts have notes.

**Why:** The gap between reading and owning an idea is reflection. A notes box makes this a journal as much as a reference.
**Effort:** Small — pure localStorage, no new component dependencies.

---

### A2. Concept Status Marking (Read / Review / Mastered)
A three-state toggle per concept: unmarked → "to review" → "done." Persisted in localStorage. The sidebar shows coloured dots next to concept names; the ConceptApp header shows a `14 / 33 done` counter.

**Why:** Concept books currently track zero progress. This gives the same orientation that narrative books get from chapter unlocking.
**Effort:** Small — single composable, badge on ConceptTracker entries.

---

### A3. Self-Test / Recall Mode
A "Test Yourself" toggle that hides key sections (e.g. The Argument and Objection on ApologeticsCard, summary on ConceptCard) and prompts you to recall before revealing. Not graded — pure flashcard-style flip.

**Why:** The biggest gap in the current app. You can read everything but have no mechanism to check what stuck.
**Effort:** Medium — a `testMode` boolean prop passed to each card; no external data needed.

---

### A4. Spaced Repetition Review Queue
Extends A2: log a last-reviewed timestamp per concept and surface a "3 due today" badge on BookSelector cards. A "Review Mode" cycles through due items in recall mode (A3). Uses a simple Leitner box (5 bins, doubling intervals per correct recall), fully client-side.

**Why:** Turns a reference app into a retention tool. Especially valuable for Japanese vocabulary/culture books and Lewis's arguments.
**Effort:** Medium — new `useReview.js` composable; no external API needed.

---

### A5. Cross-Book Global Search
A search input on the BookSelector landing page (Cmd/Ctrl+K) that queries across all books — concept titles, subtitles, summaries, and key quotes. Results grouped by book with a "Go to concept" link.

**Why:** Once you have 10+ books, navigation by memory breaks down. Global search makes the whole library feel connected.
**Effort:** Small — client-side only, all data is already in JS modules.

---

## B. UI / UX Improvements

### B1. Reading Progress Indicator in ConceptApp Header
Add a `14 / 33` counter and a thin progress bar beneath the header line, driven by concept status (A2).

**Effort:** Trivial once A2 exists.

---

### B2. Jump to Last Viewed on Book Open
Store the last-viewed concept ID in localStorage on navigation. Reopen the book and the sidebar auto-scrolls to and highlights where you left off.

**Why:** Currently reopening a book always lands at the full-grid; you have to re-find your place manually.
**Effort:** Small — one extra localStorage key per book.

---

### B3. Sidebar Grouping for Long Concept Lists
For books with 27+ concepts (Japanese Mind) or 33 chapters (Mere Christianity), group the sidebar by natural divisions (e.g. Book I / II / III / IV, detectable from the `Bk I · 1` short-label already in the data). Collapsed by default with expand toggle.

**Why:** A 33-item flat list requires scrolling and loses structure. Grouping makes navigation legible.
**Effort:** Small-Medium — add an optional `group` field to concept data; ConceptTracker renders `<details>` sections when groups exist.

---

### B4. Copy Quote Button
A small clipboard icon on Key Quote boxes and similar quote-like fields. One click copies to clipboard.

**Effort:** Trivial.

---

### B5. Keyboard Navigation Between Concepts
Arrow-Up / Arrow-Down to move between concepts in the sidebar; Enter to open; Escape to deselect.

**Effort:** Small.

---

## C. API Integrations

### C1. "Ask the Author" AI Chat — Claude API
An inline chat panel on each concept card powered by the Claude API. Each book gets a system prompt that grounds the model in the book's content and style:
- Mere Christianity: responds in Lewis's plain, direct argumentative style
- Japanese Mind / Culture books: helps apply the concept to situations you describe
- Brothers Karamazov: answers only from chapters you've unlocked (no spoilers)

The concept's own card content (summary, argument, examples) is injected into the system prompt automatically, anchoring responses to what the book actually says.

**Why:** Arguing with an AI version of Lewis's logic, or asking "how does this apply to my situation?", is a qualitatively different learning experience than passive reading. The highest-potential feature in this list.
**Effort:** Medium — Anthropic SDK (browser fetch to `api.anthropic.com`), API key in a settings panel. One `AskAuthor.vue` component reused across all card types. For public deployment, a small Vercel serverless proxy handles key security.

---

### C2. Bible Reference Tooltips — Scripture API
For theological books (Mere Christianity, Jesus for Japan, word-tsumi): detect `Matthew 5:48`-style references in card text and render them as hoverable tooltips that fetch and display the verse. Uses a public API (e.g. `bible-api.com` — free, no key required).

**Why:** Lewis alludes to Scripture constantly. Seeing the verse without leaving the app keeps the reader in flow.
**Effort:** Medium — a `BibleRef.vue` inline component + a simple fetch composable.

---

### C3. Cover Art from Open Library
Auto-fetch real cover images from the Open Library API (`openlibrary.org/api/books`) using title + author on first load, cached in localStorage. Replaces emoji placeholders on the BookSelector for books without a local cover image asset.

**Effort:** Small — one fetch composable; covers cached by book ID.

---

## D. Other Ideas

### D1. Character Relationship Graph (Brothers Karamazov)
The character data already includes typed relationships per chapter. Render these as an interactive SVG force-directed graph (6 nodes — no library needed) that grows as chapters are unlocked. Click a node to jump to that character's card.

**Why:** The Karamazov character web is the most cognitively demanding part of the book. A visual map helps enormously.
**Effort:** Medium — new `CharacterGraph.vue` using SVG + simple spring layout; all data already exists.

---

### D2. Export Notes to Markdown
A button that generates a `.md` file of your completed concepts, personal notes, and saved key quotes — downloaded via a Blob URL.

**Why:** Turns reading sessions into a durable personal document. Feeds Obsidian, Notion, etc.
**Effort:** Small — pure client-side string generation.

---

## Recommended Build Order

| # | Feature | Effort | Impact |
|---|---------|--------|--------|
| 1 | A2 + B1 — Concept status + progress bar | Small | Immediately visible |
| 2 | A1 — Personal notes | Small | High daily value |
| 3 | A3 — Self-test / recall mode | Medium | Transforms the learning loop |
| 4 | B3 — Sidebar grouping | Small | Quick win for long books |
| 5 | C1 — AI chat ("Ask the Author") | Medium | Differentiating killer feature |
| 6 | A4 — Spaced repetition queue | Medium | Builds on A2 + A3 |
| 7 | D1 — Character relationship graph | Medium | Narrative-book polish |
| 8 | C2 — Bible reference tooltips | Medium | Theological-book polish |
