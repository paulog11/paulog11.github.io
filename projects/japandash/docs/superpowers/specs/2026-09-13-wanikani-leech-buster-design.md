# WaniKani Leech Buster — Design Spec

**Date:** 2026-09-13
**Status:** Approved, pending implementation plan
**Scope:** `projects/japandash/` only

## Problem

WaniKani "leeches" — vocab/kanji the user keeps getting wrong on WK's own SRS —
never come back into view once they're past the initial learning stages.
JapanDash has no visibility into *which* items are leeches (it never calls
WK's review-statistics endpoint) and no mechanism to give a leech extra,
targeted practice.

## Goal

A new "Leech Buster" feature that:
1. Identifies real leeches from WaniKani's own review history (not a proxy).
2. Generates an example sentence for a leech on demand, so the learner meets
   it in context instead of drilling the bare word/kanji.
3. Feeds that sentence into a real spaced-repetition queue so it keeps coming
   back until it's no longer a leech — not a one-off, throwaway display.

## Non-goals (explicitly out of scope for this pass)

- Configurable leech thresholds via a settings UI — thresholds are fixed
  constants in code.
- Fetching WaniKani's `amalgamation_subject_ids` to pick example words for a
  leech kanji — Claude selects a real word containing the kanji itself.
- Any "un-leech" detection beyond what naturally happens as WK's own
  `percentage_correct` improves over time.
- A settings toggle for vocab-only vs. vocab+kanji — both are in scope from
  the start.

## Existing infrastructure this reuses

JapanDash already has more built than its `CLAUDE.md` documents, and this
design leans on it instead of duplicating it:

- **A generic SRS backend** (Postgres via PGlite locally / Neon in
  production): `db/schema.js`'s `reviewItems` table, `src/utils/srs.js`
  (SM-2-lite scheduler), and `api/review/{due,grade}.js`. It already powers
  Mistake Review end to end. `reviewItems.type` is commented
  `'mistake' | 'grammar' | 'vocab' | 'dictation' | 'journal'` — `'vocab'` was
  anticipated but never implemented. **No schema migration is needed.**
- **Claude API access**: `src/services/claude-api.js`'s `sendMessage`, already
  used by `useConversation.js` with the same "system prompt asks for strict
  JSON, parse with a fallback" pattern this design reuses.
- **WaniKani API client**: `src/services/wanikani-api.js` fetches
  `user`/`summary`/`assignments`/`subjects` but never
  `/v2/review_statistics` — the endpoint that actually carries per-subject
  correct/incorrect counts. Assignments' `srs_stage` alone cannot identify a
  leech (it shows current position, not wrong-answer history).

## Architecture

```
WaniKani /v2/review_statistics ──┐
                                  ├─▶ useWaniKani.fetchLeeches() ──▶ LeechWidget (leech list)
WaniKani /v2/subjects (join) ────┘                                        │
                                                                  "Generate sentence"
                                                                            │
                                                                            ▼
                                                          Claude API (claude-api.js, reused)
                                                                            │
                                                                  "Add to practice"
                                                                            │
                                                                            ▼
                                                     POST /api/review/leech (new, mirrors
                                                     api/review/mistakes.js) ──▶ review_items
                                                     row, type: 'vocab'
                                                                            │
                                                     GET /api/review/due?type=vocab (due.js
                                                     gets an optional type filter)
                                                                            │
                                                                            ▼
                                                     LeechWidget practice section
                                                     (useReview('vocab'), reused as-is)
                                                                            │
                                                     POST /api/review/grade (reused
                                                     unchanged) ──▶ src/utils/srs.js
                                                     reschedules the item
```

## 1. Leech detection

### `src/services/wanikani-api.js`

Add `fetchReviewStatistics(token)`:

```js
export async function fetchReviewStatistics(token) {
  const items = []
  let url = `${BASE_URL}/review_statistics`
  while (url) {
    const data = await fetchJSON(url, token)
    items.push(...data.data)
    url = data.pages?.next_url || null
  }
  return items
}
```

Same pagination shape as the existing `fetchSubjects`/`fetchAllAssignments`.
Each returned item's `.data` carries: `subject_id`, `subject_type`,
`percentage_correct`, `meaning_correct`, `meaning_incorrect`,
`reading_correct`, `reading_incorrect`, `hidden`.

### `src/composables/useWaniKani.js`

Add state mirroring the existing `learnedVocabulary`/`reviewKanji` pattern
exactly (same 24h cache-then-refetch shape):

```js
const leechCache = useLocalStorage('japandash:wanikani-leech-cache-v1', null)
const leeches = ref(leechCache.value?.items ?? [])
const leechLoading = ref(false)
const leechError = ref(null)
```

`fetchLeeches(forceRefresh)`:

1. Respect the 24h cache exactly like `fetchLearnedVocabulary` does
   (same `cached.userId === user.value?.username` + timestamp check).
2. Call `fetchReviewStatistics(apiKey.value)`.
3. Filter:
   ```js
   const LEECH_PCT_THRESHOLD = 80   // percentage_correct below this
   const LEECH_MIN_ATTEMPTS = 4     // total answers must be at least this

   function isLeech(stat) {
     const d = stat.data
     if (d.hidden) return false
     const total = d.meaning_correct + d.meaning_incorrect + d.reading_correct + d.reading_incorrect
     return d.percentage_correct < LEECH_PCT_THRESHOLD && total >= LEECH_MIN_ATTEMPTS
   }
   ```
4. Join to subject data. Reuse `learnedVocabulary`/`reviewKanji` if already
   populated (fast path — no extra request); for any leech subject IDs not
   found there, fetch just those via `fetchSubjects(apiKey.value, { subject_ids: ids.join(','), types: 'vocabulary,kanji' })`.
5. Tag each leech with `weakAxis`:
   ```js
   function weakAxis(d) {
     if (d.reading_incorrect > d.meaning_incorrect) return 'reading'
     if (d.meaning_incorrect > d.reading_incorrect) return 'meaning'
     return 'both'
   }
   ```
6. Sort ascending by `percentage_correct` (worst first).
7. Cache and return, same shape as `mergeVocabItem`/`mergeKanjiItem` plus
   `{ percentageCorrect, weakAxis, subjectType }`.

Export `leeches`, `leechLoading`, `leechError`, `fetchLeeches` from the
composable's return object.

### Self-check

`isLeech`/`weakAxis` are the one piece of non-trivial new pure logic here.
Leave a small `console.assert`-based self-check next to their definitions in
`useWaniKani.js`, gated behind `if (import.meta.env.DEV)` so it never runs in
the production build (this project has no test framework or `npm test`
script to hook into instead). Cover: below-threshold + enough attempts →
leech; above threshold → not a leech; below threshold but too few attempts →
not a leech; reading-heavy vs. meaning-heavy → correct `weakAxis`.

## 2. Sentence generation

No new service file — reuses `claude-api.js`'s `sendMessage` directly, same
call shape `useConversation.js` uses (`system` with `cache_control`,
`messages` array, JSON-with-fallback parsing).

Prompt shape (built inline in the widget or a small local helper, not a new
composable — this is a single request/response, not stateful like
conversation history):

- Inputs: `characters`, `primaryMeaning`, `primaryReading`, `subjectType`,
  `weakAxis`.
- For `subjectType === 'kanji'`, the prompt asks Claude to build the sentence
  around a real word that contains the kanji (Claude has this knowledge
  natively — no need to fetch WK's `amalgamation_subject_ids`).
- For `weakAxis === 'reading'`, ask for a sentence where surrounding context
  doesn't give the reading away (so recall is actually tested); symmetric
  for `'meaning'`.
- Requested response shape — identical field names to what
  `ConversationWidget`/`ReadingWidget` already render, so the same
  `renderFurigana`-style helper works unmodified:
  ```json
  { "ja": "...", "en": "...", "furigana": [{ "word": "...", "reading": "..." }] }
  ```

Failure handling: inline error + retry scoped to that one leech row: a failed
generation must not block the rest of the leech list from being usable.

## 3. SRS persistence (backend)

### `db/schema.js`

No changes. `reviewItems.type = 'vocab'` and its existing `jsonb('payload')`
column cover this without a migration.

### New `api/review/leech.js`

Mirrors `api/review/mistakes.js`'s shape, minus the `mistakes` table insert
(that table is conversation-mistake-specific and doesn't apply here):

```js
// POST /api/review/leech
// Body: { subjectId, subjectType, characters, meaning, reading, sentence, weakAxis }
import { db } from '../../db/client.js'
import { reviewItems } from '../../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { subjectId, subjectType, characters, meaning, reading, sentence, weakAxis } = req.body ?? {}
  if (!subjectId || !characters || !sentence) {
    return res.status(400).json({ error: 'subjectId, characters, and sentence required' })
  }

  const payload = { context: { subjectId, subjectType, characters, meaning, reading, sentence, weakAxis } }
  const [item] = await db.insert(reviewItems).values({ type: 'vocab', payload }).returning()

  return res.status(201).json({ item })
}
```

### `api/review/due.js` — required fix, not optional polish

Once `type: 'vocab'` rows exist, the current unfiltered query would return
them to **any** caller of `GET /api/review/due`, including
`MistakeReviewWidget`'s existing call. That widget reads
`payload.context.userText`/`.correction`, which a vocab payload doesn't have
— it would render blank/broken cards. Add an optional `type` query param:

```js
const type = req.query?.type
const conditions = [lte(reviewItems.due, now), eq(reviewItems.suspended, false)]
if (type) conditions.push(eq(reviewItems.type, type))
// ...where(and(...conditions))
```

Backward compatible: omitting `type` keeps today's behavior for any other
caller, but both real callers will now pass one explicitly (see below).

### `src/services/apiClient.js`

```js
due: (limit = 20, type) =>
  request('GET', '/api/review/due', { query: type ? { limit, type } : { limit } }),

addLeech: (body) =>
  request('POST', '/api/review/leech', { body }),
```

### `src/composables/useReview.js`

Accept a `type` argument and thread it through to `reviewApi.due`:

```js
export function useReview(type) {
  // ...
  async function loadDue() {
    // ...
    const data = await reviewApi.due(30, type)
    // ...
  }
  // ...
}
```

`MistakeReviewWidget.vue` changes its call site to `useReview('mistake')`.
`grade()`/`src/utils/srs.js` are untouched — scheduling logic doesn't care
what `type` an item is.

### Dedup

Client-side only: an in-memory `Set` of subject IDs added to the queue this
session, used to hide/disable "Add to practice" after use. No new endpoint,
no persistence. A missed dedup (e.g., across a page reload) produces at
worst one redundant practice card — not worth a query round-trip to prevent.

## 4. Frontend UI

### New `src/components/widgets/LeechWidget.vue`

Same shape as existing widgets: `WidgetFrame` wrapper, compact tile vs.
`focused` slot, same Tailwind class conventions as `VocabWidget.vue`.

**Compact tile:** leech count + worst offender (lowest `percentageCorrect`)
preview, matching `VocabWidget`'s compact-tile density.

**Focused view — two sections in one widget** (this widget owns the whole
identify → generate → practice loop, the same way `VocabWidget` already owns
browse/game/pronunciation as internal modes rather than being split into
three widgets):

1. **Leech list**: `characters`, `reading`, `meaning`, `percentageCorrect`,
   a `weakAxis` badge, WK `level`. Each row has a "✍️ Generate sentence"
   button → inline preview card (ja/en/furigana rendered the same way
   `ConversationWidget` renders its replies) → "➕ Add to practice" button
   that calls `reviewApi.addLeech(...)` and marks that subject ID
   added-this-session.
2. **Leech Practice**: `useReview('vocab')`. A cloze-style card — the
   generated sentence with the target word/kanji visually emphasized,
   meaning/reading hidden until reveal — then the same 4-button
   Again/Hard/Good/Easy self-rate UI `MistakeReviewWidget.vue` already has
   (visually and behaviorally identical, just a different prompt-card body).
   The "correct answer" revealed is always the **leech's own** meaning/reading
   (`payload.context.meaning`/`.reading`, from WK subject data) — for a kanji
   leech this is the kanji's own reading/meaning, not the carrier word's, even
   though the carrier word is what appears in the sentence. The carrier word
   itself is only ever context, never the thing being graded.

### Registration

- `src/App.vue`: import `LeechWidget`, add `leech: LeechWidget` to
  `widgetComponents`, add an entry to `WIDGET_LABELS` (icon suggestion: 🩸).
- `src/composables/useWidgetLayout.js`: add `leech: { area: 'track', size: 'large' }`
  to `WIDGET_META` (grouped with `wanikani`/`kanji`/`review` in the "Track"
  zone), and append `'leech'` to `DEFAULT_ORDER`.

## Error handling / edge cases

| Case | Behavior |
|---|---|
| No WaniKani key | Same empty state as `VocabWidget` ("Add WaniKani key in Settings") |
| No Anthropic key | "Generate sentence" disabled/hinted, same as `ConversationWidget`'s gating |
| `review_statistics` fetch fails | Same retry-button pattern as `wk.vocabError` |
| Sentence generation fails for one leech | Inline error + retry scoped to that row only |
| Zero leeches found | Empty state: "No leeches right now 🎉" |

## Testing / verification

This project has no test framework and no `npm test` script for either the
frontend or the `api/`/`db/` backend — `npm run dev` plus manual exercise is
the established verification method here. Before calling this done:

1. `npm run dev`, confirm the Leech widget loads leeches from a real WK key.
2. Generate a sentence for one vocab leech and one kanji leech, confirm both
   render correctly (furigana, translation).
3. Add one to practice, confirm it does **not** appear in Mistake Review's
   queue and **does** appear in Leech Practice.
4. Grade it through all four ratings across repeated visits (or by adjusting
   `due` manually in `.pglite`) to confirm `src/utils/srs.js` reschedules it
   correctly — this path is unchanged code, but the new caller needs to be
   confirmed to hit it correctly.
5. Confirm `MistakeReviewWidget` still works unmodified after the `due.js`
   filter change (regression check on the required fix in section 3).

## File-by-file change summary

| File | Change |
|---|---|
| `src/services/wanikani-api.js` | Add `fetchReviewStatistics` |
| `src/composables/useWaniKani.js` | Add `leeches`/`leechLoading`/`leechError`/`fetchLeeches` + `isLeech`/`weakAxis` helpers + self-check |
| `src/services/claude-api.js` | No change — reused as-is |
| `api/review/leech.js` | **New** — mirrors `api/review/mistakes.js` |
| `api/review/due.js` | Add optional `type` query filter |
| `src/services/apiClient.js` | `due()` takes a `type` param; add `addLeech()` |
| `src/composables/useReview.js` | Accept a `type` argument |
| `src/components/widgets/MistakeReviewWidget.vue` | Call `useReview('mistake')` |
| `src/components/widgets/LeechWidget.vue` | **New** |
| `src/App.vue` | Register `LeechWidget` |
| `src/composables/useWidgetLayout.js` | Add `leech` to `WIDGET_META`/`DEFAULT_ORDER` |
| `db/schema.js` | No change |
