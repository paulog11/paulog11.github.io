# JapanDash — Japanese Learning Dashboard

Widget-based Japanese language learning dashboard with API integrations and curated study content.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- Fonts: Shippori Mincho (display), Noto Sans JP + DM Sans (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `src/App.vue` — Dashboard shell with header, settings panel, CSS Grid widget layout
- `src/components/WidgetFrame.vue` — Shared "window" wrapper (title bar, traffic lights, collapse)
- `src/components/widgets/` — 7 widget components (WaniKani, Vocab, Jisho, Shadowing, Onomatopoeia, Grammar, Reading)
- `src/composables/` — Reactive state management (useWaniKani, useJisho, useShadowing, useLocalStorage)
- `src/services/` — API wrappers (wanikani-api.js, jisho-api.js)
- `src/data/` — Curated content (onomatopoeia.js, grammar.js, reading-passages.js, shadowing-channels.js)

## Commands
- `npm run dev` — local dev server
- `npm run build` — build to dist/

## Theme
Japanese-inspired warm palette: washi (#F7F3EC), koshi (#EDE9E0), sumi (#2C2C2C), ai (#2D4A7A indigo), beni (#C0503A vermillion), matcha (#5A7A52 green).

## APIs
- **WaniKani API v2**: Bearer token auth, stored in localStorage. Endpoints: user, summary, assignments, subjects (with `types`/`subject_ids` filters), level_progressions.
- **Jisho API**: Word search via `jisho.org/api/v1/search/words`. Uses CORS proxy (corsproxy.io).

## Vocab & Audio Widget (VocabWidget.vue)
Pulls the user's learned WaniKani vocabulary and plays pronunciation audio.

**Architecture:**
- `fetchLearnedVocabulary()` in `useWaniKani.js` — triggered lazily by `VocabWidget` via `watch(assignments.length)`, not in the main `refresh()` call
- Subject IDs are batched in chunks of ≤1000 and fetched via `Promise.all`
- Results are cached in localStorage for 24 hours (key: `japandash:wanikani-vocab-cache-v2`), keyed by userId
- Cache is pre-loaded into `learnedVocabulary` at startup so the widget renders immediately without waiting for the assignments API

**Merged `LearnedVocabItem` shape:**
```js
{ subjectId, srsStage, srsLabel, level, characters, primaryMeaning, meanings, primaryReading, readings,
  audios: [{ url, contentType, gender, voiceActorName, pronunciation }] }
```

**SRS labels:** stages 1–4 → apprentice, 5–6 → guru, 7 → master, 8 → enlightened, 9 → burned

**Audio playback:** prefers WaniKani CDN MP3 (female voice actor first), falls back to `SpeechSynthesisUtterance` (`lang: 'ja-JP'`, `rate: 0.9`)

**Listen Mode:** auto-advances through the filtered list with a 400ms pause between words; stops at end of list

## Context Sentences Modal (VocabWidget.vue)
Clicking the 📖 button on a vocab list row opens a `<Teleport to="body">` modal showing WaniKani's sample sentences for that word (Japanese + English pairs). Button only appears when `contextSentences.length > 0`. The `contextSentences` field is extracted in `mergeVocabItem()` from `sd.context_sentences` and stored in the cache.

## Vocab Matching Game (VocabWidget.vue)
"🎮 Quiz" button (visible when filtered list has ≥6 words) switches into game mode: two columns — Japanese characters (left) vs. shuffled English meanings (right). Tap one from each side to match. Correct match plays audio; mismatch flashes red for 500ms. `matched` is a reassigned `Set` to trigger Vue reactivity. "Play Again" picks a new random set of 6.

## Pronunciation Checker
Uses the browser Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`, Chrome/Edge only). Shared helpers in `src/utils/pronunciation.js`: `toHiragana()` (katakana→hiragana normalization) and `compareReading(expected, heard)` → `{ score, breakdown }`.

**VocabWidget detail panel:** "🎤 Record" listens for a single vocab word. Picks the best of up to 3 STT alternatives by score. Shows: score % (green ≥80%, amber 50–79%, red <50%), per-mora tile breakdown (green/red), and raw "Heard:" transcript. Clears when a different word is selected.

**ReadingWidget:** Collapsible "🎤 Pronunciation Practice" section between the passage and vocabulary list. Splits `content` on `。` into sentences for sentence-by-sentence practice. Shows score + "Heard:" transcript (no per-tile breakdown — sentences too long). Resets when switching passages. Both widgets: `recognizer?.stop()` in `onBeforeUnmount`.

## Onomatopoeia Widget
54 entries across three categories: giongo (environmental sounds), gitaigo (states/feelings), giseigo (human/animal sounds). Daily word is date-seeded (consistent all day). Related word navigation shows a breadcrumb (`← word`) with `jumpBack()` to return to the originating entry.

## Shadowing Widget
Channels: Speak Japanese Naturally, Japanese with Shun, Ken-san Okaeri Japanese, Akaneteki Japanese, Jiro Just Japanese. Video IDs in `shadowing-channels.js` are verified real YouTube video IDs (not fabricated). Do not add video IDs without confirming they exist on the channel.

## Adding Content
- Onomatopoeia: add entries to `src/data/onomatopoeia.js` — schema: `{ word, romaji, category, meaning, explanation, examples: [{ja, en}], related, level }`
- Grammar points: add to `src/data/grammar.js` with level, pattern, formation, examples
- Reading passages: add to `src/data/reading-passages.js` with vocabulary and comprehension questions
- Shadowing videos: add verified YouTube video IDs to channels in `src/data/shadowing-channels.js`

## localStorage Keys
All prefixed with `japandash:` — wanikani-key, wanikani-vocab-cache, jisho-recent, shadowing-completed, grammar-studied
