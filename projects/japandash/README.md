# JapanDash

A widget-based Japanese learning dashboard with API integrations, curated study content, and pronunciation practice. Organized into four skill zones with drag-to-reorder tiles, focus mode, light/dark theme, and learning path filters.

Part of the [paulog.github.io](../../) GitHub Pages site, served from `projects/japandash/`.

---

## Screenshots

<!-- Add screenshots by dropping images into docs/screenshots/ -->
![Dashboard](docs/screenshots/dashboard.png)
![Focus Mode](docs/screenshots/focus-mode.png)

---

## Features

### Track

**WaniKani Progress**
Displays your WaniKani level, username, pending review and lesson counts, an SRS distribution pie chart (Apprentice → Burned), and an upcoming review schedule. Requires a WaniKani API token.

**SRS Mistake Journal**
Active-recall drills built from grammar mistakes captured during AI Conversation practice. Each session shows what you said, prompts you to recall the correction, then lets you self-rate with Again / Hard / Good / Easy. Supports mic input for spoken recall.

---

### Input

**Vocabulary**
Your full learned WaniKani vocabulary list with SRS-stage filtering, word search, and context sentences (📖). Practice modes: Matching Game (tap Japanese ↔ English pairs, 6 words, audio feedback), Listen Mode (auto-plays through the filtered list), and Pronunciation Checker (records a single word, returns a score with per-mora tile breakdown — green/red). Cached locally for 24 hours.

**Shadowing**
Curated YouTube channels (N5–N1) with a structured four-step practice workflow:
1. **Blind Listen** — watch without reading
2. **Listen + Read** — set A–B loop points, replay at 0.75× or 1×
3. **Shadow Aloud** — mimic the speaker at reduced speed
4. **Record & Compare** — type the target phrase, record yourself, get a pronunciation score

Scoring uses Azure Speech Pronunciation Assessment if a key is configured; otherwise falls back to Web Speech API with mora-level comparison.

**Reading**
Passages at various JLPT levels with furigana in three modes (Show / Hover / Hide). A collapsible pronunciation practice section splits each passage into sentences for one-at-a-time recording. Each passage includes a vocabulary list.

**Grammar**
Curated grammar points across N5–N1. A date-seeded daily card shows the pattern, meaning, and formation rules with example sentences. Browse mode lets you cycle through points within a level. Furigana toggle on all examples.

---

### Output

**AI Conversation**
Live Japanese conversation practice powered by Claude Haiku. Five scenarios: Free Chat, Café Order, Train Station, Self-Introduction, Hobby Talk. JLPT level pills (N5–N1) adjust difficulty. Features: furigana toggle (show/hover/hide), English translation toggle, TTS playback on each assistant message, mic input, and amber correction callouts when Claude spots a grammar mistake. Mistakes are queued into the SRS Mistake Journal automatically. Requires an Anthropic API key.

---

### Reference

**Jisho Dictionary**
Real-time word search via the Jisho API. Results show readings, JLPT level tags, common-word badges, and expandable definitions with part-of-speech. Recent searches appear when the box is empty.

**Onomatopoeia**
54 entries across three categories — giongo (environmental sounds), gitaigo (states/feelings), giseigo (human/animal sounds). A date-seeded daily word keeps each session fresh. Related words are cross-linked with breadcrumb navigation.

---

## Tech Stack

- **Frontend:** Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- **Fonts:** Noto Serif JP (display), Noto Sans JP + DM Sans (body), DM Mono (mono)
- **State:** Vue composables + `localStorage` (all keys prefixed `japandash:`)
- **Build output:** `dist/` (relative paths, GitHub Pages compatible)

| API | Used for | Key required |
|-----|----------|-------------|
| WaniKani v2 | Progress, vocab, SRS data | Yes (in-app settings) |
| Jisho | Dictionary search | No (CORS proxy) |
| Anthropic Claude | AI Conversation widget | Yes (in-app settings) |
| Azure Speech | Pronunciation scoring | Optional (in-app settings) |
| Web Speech API | STT/TTS fallback, pronunciation | No (browser-native) |
| YouTube IFrame | Shadowing video player | No |

---

## Getting Started

```bash
npm install
npm run dev      # dev server at localhost:5173
npm run build    # outputs to dist/
```

### API Keys

The following features work with no configuration: Jisho search, Grammar, Onomatopoeia, Reading, Shadowing (with Web Speech fallback).

Keys are entered in the in-app settings panel (⚙ icon) and stored in your browser's localStorage — nothing is sent to a server.

| Key | Where to get it | Enables |
|-----|----------------|---------|
| WaniKani API token | wanikani.com → Settings → API Tokens | WaniKani widget, Vocabulary widget |
| Anthropic API key | console.anthropic.com | AI Conversation widget |
| Azure Speech key + region | Azure portal → Speech resource | Full pronunciation scoring in Shadowing & Vocabulary |

---

## Roadmap

See [FUTURE.md](FUTURE.md) for the planned migration to Vercel with server-side AI calls, Neon Postgres persistence for long-term progress tracking, and a unified SRS hub.

For architecture and implementation details, see [CLAUDE.md](CLAUDE.md).
