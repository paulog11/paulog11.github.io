# JapanDash — Vercel Migration + Persistence + Deeper Learning Loop (Future Plan)

> Roadmap for turning JapanDash into a durable, server-backed language-acquisition tool. Not yet implemented — captured for future work. **Supersedes** the earlier static/GitHub-Pages version of this plan.

## Context

JapanDash is currently a static Vue 3 + Vite SPA served as a sub-path of the `paulog.github.io` GitHub Pages site, with all state in `localStorage` and API keys called directly from the browser. The goal now is to make it a **real, durable source of long-term language-acquisition progress** — which means leaving the static/GitHub-Pages model for a **Vercel-hosted app with a lightweight backend and a database**, then layering on the production/feedback/review learning features.

The frontend SPA is kept as-is (no Nuxt rewrite). We wrap it with thin Vercel Serverless Functions and a Postgres database. This also resolves the Azure OpenAI browser-CORS risk and the `localStorage`-fragility problem in one move, since AI calls and progress data both move server-side.

### Decisions captured
- **Host on Vercel**, leave GitHub Pages. Keep the existing Vue 3 + Vite SPA; **no Nuxt** — a lightweight backend instead.
- **Persistence is a priority** for long-term study; progress must survive cache-clears and sync across devices.
- **Database:** Neon Postgres + Drizzle ORM.
- **Auth:** single passcode → signed httpOnly cookie.
- **AI routing:** Vercel AI SDK, **Azure OpenAI primary, Claude fallback**.
- **Learning features:** #1 Conversation Mistake Journal, #2 Shadowing workflow, #3 Grammar production drills, #4 Listening dictation, #5 Writing Journal (AI grades grammar + naturalness). The unified SRS hub (#6) is now **foundational**, not optional.

---

## Azure AI research findings (still applies, now server-side)

| Need | Service | Notes |
|---|---|---|
| Text generation + grading | **Azure OpenAI** (GPT-4o-mini) via Vercel AI SDK `@ai-sdk/azure`, **Claude fallback** via `@ai-sdk/anthropic` | Called **server-side** from `/api`, so the previous browser-CORS risk is gone entirely; keys are Vercel env vars. Use `generateObject` + Zod for structured drill/journal grading (replaces manual JSON parsing). |
| Pronunciation scoring (ja-JP) | **Azure Speech — Pronunciation Assessment** | ja-JP supports accuracy/fluency/completeness/per-phoneme (IPA); prosody is en-US-only (skip). Stays in the **browser** via `microsoft-cognitiveservices-speech-sdk`, but authed with a **short-lived token** from `/api/speech-token` (Speech key never reaches the client). Falls back to Web Speech + `compareReading()`. |
| Optional better TTS/STT | Azure Speech Neural TTS/STT (ja-JP) | Optional; Web Speech API remains fallback. |

Sources: [Pronunciation assessment how-to](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment), [JS PronunciationAssessmentConfig](https://learn.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/pronunciationassessmentconfig), [Azure OpenAI REST reference](https://learn.microsoft.com/en-us/azure/foundry/openai/reference), [Vercel AI SDK providers](https://ai-sdk.dev/providers/ai-sdk-providers).

---

## Target architecture

```
Browser (Vue 3 + Vite SPA, unchanged components)
  │  passcode login → httpOnly session cookie
  ▼
Vercel Serverless Functions  (/api/*)
  ├─ /api/login            passcode → signed JWT cookie (jose)
  ├─ /api/ai               Vercel AI SDK: Azure OpenAI primary → Claude fallback
  ├─ /api/speech-token     mints short-lived Azure Speech token
  ├─ /api/review           SRS items + review logging
  ├─ /api/journal          journal entries + AI evaluation
  └─ /api/sync             read/write per-feature progress
  ▼
Neon Postgres  (Drizzle ORM)   ← durable, queryable progress
```

- **Frontend:** keep the Vite SPA and every existing widget/composable. Add an `apiClient` wrapper and a passcode gate; swap learning-progress reads/writes from `localStorage` to `/api`.
- **Backend:** plain Vercel functions (Node runtime). No framework; add Hono only if routing grows.
- **DB:** Neon serverless Postgres via `@neondatabase/serverless` (HTTP driver) + Drizzle schema/migrations (`drizzle-kit`).
- **Auth:** `APP_PASSCODE` env var; `/api/login` verifies it and sets a signed httpOnly cookie; a shared `requireAuth()` helper guards protected routes; SPA shows a passcode screen when unauthenticated.
- **AI:** all model calls server-side via Vercel AI SDK; Azure primary, Claude fallback in one place.

### Deployment / relationship to the parent site
- Add a Vercel project with **Root Directory = `projects/japandash`** (monorepo subdirectory build) — keeps everything in the same git repo; Vercel builds only this folder. Set env vars (Azure OpenAI, Azure Speech, Anthropic, Neon `DATABASE_URL`, `APP_PASSCODE`, `SESSION_SECRET`) in Vercel.
- Update the landing-page card in the root `App.vue` `apps` array so japandash's `url` points to the Vercel deployment (e.g. `https://japandash.vercel.app`) instead of `./projects/japandash/dist/index.html`. The committed `dist/` build is no longer needed for this project.
- WaniKani stays browser-friendly; optionally move WaniKani + Jisho calls server-side later to hide the WK token and drop the flaky Jisho CORS proxy ([jisho-api.js](src/services/jisho-api.js)).

---

## Data model (Drizzle / Postgres) — the progress engine

Start minimal (`review_items` + `review_log`), grow as features land:

- **`review_items`** — unified SRS row for every reviewable thing. Fields: `id`, `type` (`mistake` | `grammar` | `vocab` | `dictation` | `journal`), `payload` (jsonb: prompt/answer/context), `due`, `interval`, `ease`, `reps`, `lapses`, `created_at`, `updated_at`. The FSRS/SM-2 backbone.
- **`review_log`** — one row per review event: `item_id`, `rating` (again/hard/good/easy), `reviewed_at`, `elapsed_ms`. Powers analytics + future FSRS optimization.
- **`mistakes`** — conversation/journal corrections: `user_text`, `correction`, `source`, `scenario`, `level`, `ts` (also enrolled into `review_items`).
- **`journal_entries`** — `prompt`, `entry`, `corrected`, `naturalness`, `notes` (jsonb), `ts`.
- **`shadowing_progress`** — `video_id`, `step` (1–4), `recording_url?`, `last_scores` (jsonb).
- **`settings`** — levels, preferences, conversation scenario/level/history.
- **`saved_words`** — word bank from Jisho/WaniKani lookups: `word`, `reading`, `meaning`, `jlpt`, `source`, `wk_subject_id?`, `saved_at` (each also enrolled into `review_items` as `type:'vocab'`).
- **`wk_cache`** — server-side mirror of WaniKani `subjects` + `assignments` (jsonb) with an `updated_after` cursor for incremental sync; replaces the 24h localStorage vocab cache.
- **`wk_snapshots`** — daily snapshot of WaniKani summary/level/SRS counts for charting progress over time (feeds the Phase 6 dashboard).
- **`dict_cache`** — cached Jisho lookups: `query` → `results` (jsonb), `fetched_at`.

A small **`srs.ts`** (server-side; SM-2-lite, FSRS later) computes next `due`/`interval`/`ease` from a rating.

---

## Phase 0 — Foundation: Vercel project, DB, auth, AI proxy

1. **Vercel + DB scaffolding:** add `vercel.json` if needed; provision **Neon** (Vercel Marketplace) → `DATABASE_URL`. Add Drizzle schema (`db/schema.ts`) for the tables above + `drizzle.config.ts`; generate the initial migration.
2. **Auth:** `/api/login` (passcode → signed cookie via `jose`), `requireAuth()` helper, and a passcode gate component in the SPA. Add `APP_PASSCODE` + `SESSION_SECRET` env vars.
3. **AI proxy (`/api/ai`):** Vercel AI SDK with `@ai-sdk/azure` (primary) and `@ai-sdk/anthropic` (fallback). Expose `generateJSON({ system, messages, schema })` using `generateObject` + Zod. Refactor [useConversation.js:66-76](src/composables/useConversation.js#L66-L76) to call `/api/ai` instead of `claude-api.js` directly.
4. **Speech token (`/api/speech-token`):** server exchanges Azure Speech key → short-lived token; new `src/services/azure-speech.js` uses the browser SDK with `fromAuthorizationToken`, exposing `assessPronunciation({ referenceText, lang:'ja-JP' })` → `{ accuracy, fluency, completeness, words[] }`; returns `null` when unconfigured so callers fall back to `compareReading()` ([pronunciation.js](src/utils/pronunciation.js)).
5. **Settings + key migration:** keys move to Vercel env vars; the [App.vue settings panel](src/App.vue#L31-L70) drops the raw key inputs (keep only user-facing prefs). Add a one-time "import my localStorage progress" on first authenticated load (optional, nice-to-have).

---

## Phase 1 — SRS-backed Conversation Mistake Journal *(speaking + grammar)* ⭐

The Conversation widget already emits a `correction` per turn ([useConversation.js:83](src/composables/useConversation.js#L83)) that's currently lost.
1. **Capture:** on each reply with a non-empty `correction`, POST to `/api/review` → insert a `mistakes` row **and** a `review_items` row (`type:'mistake'`).
2. **Review widget (`MistakeReviewWidget.vue`):** pulls due items from `/api/review`, shows active-recall prompts ("You said *X* — say it correctly"), accepts typed/STT answers, then reveals the fix; the self-rating updates the schedule via server `srs.ts`.
3. **Adapt:** inject the user's recent recurring mistakes into the conversation system prompt ([useConversation.js:15-30](src/composables/useConversation.js#L15-L30)) so the model re-surfaces them naturally.

*Method basis: output hypothesis + corrective feedback + error log + spaced repetition.*

---

## Phase 2 — Real shadowing workflow *(listening + speaking)*

Replace the bare iframe ([ShadowingWidget.vue:50-56](src/components/widgets/ShadowingWidget.vue#L50-L56)) with the **YouTube IFrame Player API**: playback speed (0.75×/1×), A–B loop, "replay last 5s." Add a guided 4-step flow per video (blind listen → listen+read → shadow aloud → **record & compare**), persisted in `shadowing_progress`. Step 4 records via `MediaRecorder` and scores through `azure-speech.js` (token-authed), falling back to Web Speech + `compareReading()`. Optional: store recordings in Vercel Blob.

*Method basis: shadowing + intensive/narrow listening.*

---

## Phase 3 — Grammar production drills *(grammar + speaking)*

Add a **Practice** mode to the reference-only [GrammarWidget.vue](src/components/widgets/GrammarWidget.vue): cloze / transformation / EN→JA. `/api/ai` (`generateObject`) creates a fresh exercise for the selected point and grades the free-form (typed or spoken) answer with a one-line explanation. **Offline/no-AI fallback:** auto-cloze from the point's own `examples[].ja`. Correct answers enroll the point into `review_items` (`type:'grammar'`) instead of the old boolean `markStudied` ([GrammarWidget.vue:165-169](src/components/widgets/GrammarWidget.vue#L165-L169)).

*Method basis: active recall + output + i+1.*

---

## Phase 4 — Listening dictation *(listening)*

A transcription drill (section in [ReadingWidget.vue](src/components/widgets/ReadingWidget.vue) or a small widget) sourcing sentences from existing banks (`reading-passages.js`, `grammar.js`, `onomatopoeia.js`) — no new content. Play via TTS (Web Speech, or Azure neural TTS), user types what they heard, score with `compareReading()`/`toHiragana()` ([pronunciation.js](src/utils/pronunciation.js)); full speed → slow (`rate:0.7`) → reveal. Missed lines can enroll into `review_items` (`type:'dictation'`).

*Method basis: dictation / transcription (intensive listening).*

---

## Phase 5 — Writing Journal with AI evaluation *(writing → grammar/naturalness)*

New `JournalWidget.vue`: a free-writing pad (optional daily prompt) saved to `journal_entries`. On submit, `/api/journal` calls `/api/ai` returning `{ corrected, naturalness:1-5, notes:[{original,suggestion,why}] }`, shown as a diff (original vs. natural rewrite) with explanations. Surfaced issues feed the same `mistakes`/`review_items` queue.

*Method basis: written output + corrective feedback; pairs with the mistake-review loop.*

---

## Phase 6 — Progress dashboard (folds in once data exists)

With `review_items` + `review_log` populated, add a small **Progress** surface: reviews due, streak, retention rate, items learned over time, weakest grammar points — queries over the log. This is what makes the app a "real source of acquisition progress," and it comes mostly free once Phases 0–1 persist data.

---

## Phase 7 — WaniKani & Jisho, server-backed *(reliability + capture into the learning loop)*

Now that there's a backend + DB, both integrations move server-side. The proxy/caching half slots in **alongside Phase 0**; the word-bank/SRS half depends on `review_items` (**after Phase 1**). All endpoints sit behind the existing passcode `requireAuth()`.

**WaniKani**
1. **Proxy (`/api/wanikani`):** server holds the WK token (env var / encrypted in `settings`) — no Bearer token in the browser. [useWaniKani.js](src/composables/useWaniKani.js) and [wanikani-api.js](src/services/wanikani-api.js) point at `/api/wanikani` but keep their reactive interface, so [WaniKaniWidget.vue](src/components/widgets/WaniKaniWidget.vue) / [VocabWidget.vue](src/components/widgets/VocabWidget.vue) barely change.
2. **Durable incremental sync:** mirror subjects + assignments into `wk_cache`, refreshing with WaniKani's `updated_after` parameter instead of re-fetching everything every 24h — faster, cross-device, survives cache-clear. The existing `mergeVocabItem()` logic is reused server-side.
3. **Progress history:** a daily `wk_snapshots` row (optional Vercel Cron) lets the Phase 6 dashboard chart level-ups / burns / accuracy over months — data the WK API alone doesn't expose in queryable form.
4. **Cross-reference:** expose each vocab item's WK SRS stage so Jisho results and drills can show "you already know this (Guru)".

**Jisho**
1. **Proxy (`/api/jisho`):** server fetches jisho.org directly — **removes the flaky third-party CORS proxies** (allorigins/corsproxy) in [jisho-api.js](src/services/jisho-api.js). Cache results in `dict_cache`. [useJisho.js](src/composables/useJisho.js) points at `/api/jisho`; recent searches persist server-side and sync across devices.
2. **Word bank → SRS (the key win):** a ⭐ "save" action on any Jisho result writes to `saved_words` **and** enrolls it into `review_items` (`type:'vocab'`), turning ad-hoc lookups into sentence-mined review/dictation/drill material instead of throwaway "recent searches." Optionally tag saved words with their WK stage from WaniKani step 4.

*Method basis: server-side reliability + caching; sentence mining (capturing real lookups into spaced review).*

---

## Build order

1. **Phase 0** (Vercel + Neon + auth + AI proxy + Speech token) — everything depends on it. Land the **Phase 7 WaniKani/Jisho proxies + caching** here too (server plumbing).
2. **Phase 1** (mistake journal; exercises the full SRS path end-to-end), then the **Phase 7 word-bank → SRS** half once `review_items` exists.
3. **Phase 4** (cheap, reuses utils) → **Phase 3** → **Phase 5** → **Phase 2** (most new surface area).
4. **Phase 6** once logs have data.

Each phase is independently shippable.

---

## Verification

- **DB:** `drizzle-kit` migration applies to Neon; can insert/query a `review_items` row from a function locally (`vercel dev`).
- **Auth:** wrong passcode rejected; correct passcode sets cookie and unlocks `/api/*`; protected routes 401 without cookie.
- **Phase 0 AI:** `/api/ai` returns structured output from **Azure**; kill Azure creds → confirm automatic **Claude fallback**; conversation widget still works against `/api/ai`.
- **Speech:** `/api/speech-token` returns a token; browser pronunciation assessment renders ja-JP scores; no token → Web Speech fallback.
- **Phase 1:** make a deliberate particle mistake in conversation → a `mistakes` + `review_items` row is written (query DB); it appears in the review widget; rating it updates `due`/`interval` and writes a `review_log` row.
- **Phases 3–5:** drills/journal grade via Azure (fallback to Claude / offline cloze); items enroll into `review_items`.
- **Phase 7:** Jisho search works with the third-party CORS proxy removed (network shows `/api/jisho`); WaniKani loads via `/api/wanikani` with no token in the browser; a second sync only fetches changed items (`updated_after`); starring a Jisho word creates `saved_words` + a `review_items` row that then appears in review.
- **Cross-device:** log in on a second browser/device with the passcode → same due items and history appear (proves durability + sync).
- **Deploy:** Vercel build with Root Directory `projects/japandash` succeeds; landing-page card links to the Vercel URL; `npm run build` clean.
