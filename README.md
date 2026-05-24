# paulog11.github.io

Personal project catalog and portfolio hub, hosted on GitHub Pages. The landing page links to a collection of web apps built for fun, learning, and tooling.

## Landing Page

The root site is a dark three-column HUD layout — the center panel lists all projects, the left sidebar holds identity and contact links, and the right panel shows a technical readout for whichever project you hover over.

**Tech stack**
- Vue 3 (Composition API, `<script setup>`) + Vite 6
- Tailwind CSS 3 with a custom color palette and clip-path UI components
- VueUse (`@vueuse/core`) — keyboard navigation via `useMagicKeys`, filter persistence via `useLocalStorage`, entry animations via `@vueuse/motion`
- Radix Vue — accessible headless UI primitives
- Google Fonts: JetBrains Mono (interface), Shippori Mincho (display), DM Sans / DM Mono (body)
- Deployed via `npm run deploy` — Vite builds to `dist/`, output is committed directly (no CI build step)

**Features**
- Filter projects by category (language, games, maps, simulations, reading)
- `J` / `K` or arrow key navigation through the list
- Hover any project to see its stack, architecture patterns, and deploy status in the right panel
- Filter selection persists across page visits via `localStorage`

---

## Projects

### [Algorithm Lab](./projects/algo-lab/)
Canvas-based simulation lab with six tabbed visualizations: flocking boids, n-body gravity, the three-body problem (inspired by Liu Cixin's *The Three-Body Problem*), a Droplet Attack scenario, a Big Bang physical constants explorer, and a curvature drive simulation.

**Stack:** Vue 3, Vite, HTML5 Canvas 2D — no external physics or rendering libraries. All simulations are hand-rolled using `requestAnimationFrame` and a shared RK4 integrator.

---

### [Flip 7](./projects/ported-games/flip7/)
Multiplayer port of the press-your-luck card game. 2–5 players draw cards and race to 200 points while avoiding duplicate number cards. Includes special cards (Freeze, Flip Three, Second Chance) and modifier cards.

**Stack:** Vue 3, Pinia, Vite. Custom audio system — sounds are synthesized at runtime, no audio files.

---

### [Machi Koro](./projects/ported-games/machi-koro/)
Digital port of the dice-driven city-building board game. Supports 2–4 human or AI players, the base game, and both Harbors and Millionaire's Row expansions with a variable supply marketplace.

**Stack:** Vue 3, Pinia, Vite, pure CSS (no Tailwind). All audio is synthesized at runtime.

---

### [Venue Search](./projects/venue-search/)
Search and filter rentable event spaces in Tokyo from a curated static dataset. Filter by area, capacity, event type, budget, and amenities.

**Stack:** Vue 3, Vite, Tailwind CSS 3. Data is a static JSON file — no external API calls.

---

### [Reading Buddy](./projects/reading-buddy/)
Multi-book reading companion with two modes: **narrative** books unlock chapter-by-chapter character and plot details (currently *The Brothers Karamazov*), and **concept** books are freely browsable cultural guides (*The Japanese Mind*, *Japanese Culture*).

**Stack:** Vue 3, Vite, Tailwind CSS 3. Progress persisted in `localStorage`, no backend.

---

### [Japan History Map](./projects/japan-map/)
Interactive map with two views: 60 significant events in Japanese history (filterable by era and category), and Tokyo's train system with colored rail lines and clickable stations.

**Stack:** Vue 3, Vite, Leaflet (raw — no vue-leaflet wrapper). Includes a map language toggle (Japanese labels ↔ English/romanized).

---

### [The Right Word](./projects/right-word/)
Japanese language assistant — enter what you want to say in English, select a register (casual, polite, formal, or domain-specific), and get natural Japanese phrase suggestions with hiragana readings and politeness notes.

**Stack:** Vue 3, Vite, Anthropic Claude API (direct browser calls). Requires a personal Claude API key stored in `localStorage`.

---

### [Japanese Learning Dashboard](./projects/japandash/)
Widget-based dashboard of Japanese study tools: WaniKani SRS progress and vocab review (audio playback, matching quiz, pronunciation scoring), Jisho dictionary search, shadowing channel browser, onomatopoeia explorer, grammar reference, reading passages, and a Claude-powered conversation practice widget.

**Stack:** Vue 3, Vite, Tailwind CSS 3  
**APIs:** WaniKani API v2, Jisho API (via CORS proxy), Anthropic Claude Haiku (direct browser calls)  
Vocabulary data is cached in `localStorage` for 24 hours. Pronunciation scoring uses the browser Web Speech API.

---

### [Bible Hymn Learning](./projects/bible-hymn/)
Kids' interactive hymn learning app for "Before the Throne of God Above." Three tabs: karaoke mode with word-level audio sync, a static lyrics view with tappable vocabulary popups, and a fill-in-the-blank quiz with text-to-speech.

**Stack:** Vue 3 (loaded via CDN, no build step), Web Speech API. Single self-contained HTML file.

---

### [Profile](./projects/profile/)
Static portfolio and résumé page with a work history timeline, skills grid, and project links.

**Stack:** Plain HTML, CSS, vanilla JavaScript — no build step. Uses Intersection Observer for scroll-reveal animations.
