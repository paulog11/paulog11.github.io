# Phase 1 — SRS-backed Conversation Mistake Journal (local-dev implementation)

> Detailed build plan for Phase 1 of [FUTURE.md](../FUTURE.md). **Local development first** — Phase 0 (Vercel/Neon/passcode) is skipped; production is a documented seam at the end.
> Paths below are relative to `projects/japandash/`.

## Scope & key insight

Phase 1 turns the conversation `correction` (currently emitted per turn and thrown away — [useConversation.js:83](../src/composables/useConversation.js#L83)) into durable, spaced-review material.

**It needs no AI and no auth.** The correction already comes from the existing browser→Claude path, and the review widget is *self-rated* (Again/Hard/Good/Easy), not AI-graded. So Phase 1 fully decouples from Phase 0: the conversation widget keeps its current behavior; we only add a thin local API, a local DB, an SRS scheduler, and the review UI.

**Local stack (confirmed):** Vite dev middleware for `/api` · PGlite (in-process Postgres) + Drizzle · dedicated SM-2-lite scheduler. PGlite uses the **same Postgres dialect as Neon**, and Vercel already serves an `api/` directory in production — so the schema and the handler files port to production essentially unchanged.

---

## Dependencies & tooling

Add to `package.json`:
- **dependencies:** `drizzle-orm`, `@electric-sql/pglite`
- **devDependencies:** `drizzle-kit` (and `@types/node` if we add any TS)
- *(optional)* `zod` for request-body validation — nice-to-have, can defer.

Scripts:
- `"db:generate": "drizzle-kit generate"` — generate SQL migrations from the schema.
- `"db:studio": "drizzle-kit studio"` — optional inspector.
- Migrations are **applied automatically at dev-server startup** by the API plugin (below), so `npm run dev` stays the single command.

`.gitignore`: add `.pglite/` (local DB data dir). **Commit** the generated `drizzle/` migrations.

---

## Database (Drizzle / Postgres dialect)

### `db/schema.ts` — Phase 1 subset only
Define just the three tables Phase 1 needs (other FUTURE.md tables come with their phases):

- **`review_items`** — `id` serial PK · `userId` text default `'local'` · `type` text (`'mistake'`) · `payload` jsonb · `due` timestamptz default now() · `intervalDays` real default 0 · `ease` real default 2.5 · `reps` int default 0 · `lapses` int default 0 · `suspended` bool default false · `createdAt`/`updatedAt` timestamptz.
- **`review_log`** — `id` serial PK · `itemId` int → review_items.id · `rating` text (`again|hard|good|easy`) · `reviewedAt` timestamptz default now() · `elapsedMs` int null.
- **`mistakes`** — `id` serial PK · `userId` text default `'local'` · `userText` text · `correction` text · `source` text default `'conversation'` · `scenario` text · `level` text · `reviewItemId` int → review_items.id · `createdAt` timestamptz.

`payload` shape for a mistake item: `{ context: { userText, correction, scenario, level } }` — the widget builds the recall prompt from `userText` and reveals `correction`.

### `db/client.js` — env-aware singleton (production seam baked in)
```
// if process.env.DATABASE_URL → Neon (drizzle-orm/neon-http)   ← production later
// else → PGlite at ./.pglite (drizzle-orm/pglite)              ← local dev now
export const db = /* drizzle(...) singleton */
export async function runMigrations() // drizzle migrate from ./drizzle
```
This is the *only* place that changes for production: set `DATABASE_URL`, install the Neon driver. Schema, migrations, and handlers are untouched.

### `drizzle.config.ts`
`dialect: 'postgresql'`, `schema: './db/schema.ts'`, `out: './drizzle'`. Run `npm run db:generate` once after writing the schema.

---

## SRS scheduler — `src/utils/srs.js`

Pure, framework-free function reused by the grade handler (and later by other phases):

```
nextSchedule(item, rating, now = Date.now()) → { due, intervalDays, ease, reps, lapses }
```
SM-2-lite (FSRS later), `MIN_EASE = 1.3`, `DAY = 86400000`:
- **again** → `reps=0`, `lapses+1`, `ease=max(MIN_EASE, ease-0.2)`, `intervalDays=0`, `due = now + 10min`.
- **hard** → `ease=max(MIN_EASE, ease-0.15)`, `intervalDays = reps===0 ? 1 : max(1, intervalDays*1.2)`, `reps+1`, `due = now + intervalDays*DAY`.
- **good** → `intervalDays = reps===0 ? 1 : reps===1 ? 3 : round(intervalDays*ease)`, `reps+1`, `due = now + intervalDays*DAY`.
- **easy** → `ease += 0.15`, `intervalDays = reps===0 ? 2 : round(intervalDays*ease*1.3)`, `reps+1`, `due = now + intervalDays*DAY`.

Keep it in `src/utils/` (next to `pronunciation.js`) so the frontend can also import constants if needed; the handler imports it server-side.

---

## API layer

### Handlers — `api/review/*.js` (Vercel-shaped, run locally via the plugin)
Author each as `export default async function handler(req, res)` using `res.status(n).json(obj)` (the dev plugin shims these onto Node's res so the **same files deploy to Vercel** under root dir `projects/japandash`). Flat routes (no dynamic path segments, to keep dev routing and Vercel routing trivial):

- **`POST /api/review/mistakes`** — body `{ userText, correction, scenario, level }`. In one transaction: insert `review_items` (`type:'mistake'`, `payload:{context}`, `due:now`) → insert `mistakes` with `reviewItemId` → `201 { item }`.
- **`GET /api/review/due?limit=20`** — `select … where suspended=false and due<=now() order by due asc limit` → `{ items, count }`.
- **`POST /api/review/grade`** — body `{ itemId, rating, elapsedMs? }`. Load item → `nextSchedule()` → update item (`due,intervalDays,ease,reps,lapses,updatedAt`) → insert `review_log` → `{ item }`.
- **`GET /api/review/recent?limit=5`** — recent distinct corrections from `mistakes` for prompt adaptation → `{ mistakes: [{ userText, correction }] }`.

A shared `api/_db.js` (or import from `db/client.js`) gives handlers the `db`. Leave a one-line `// requireAuth(req,res)` comment at the top of each as the production seam.

### Dev middleware — Vite plugin in `vite.config.js`
Add a `devApi()` plugin:
```
configureServer(server) {
  await runMigrations()                       // PGlite + drizzle, at boot
  server.middlewares.use(async (req, res, next) => {
    if (!req.url.startsWith('/api/')) return next()
    // 1. parse JSON body, 2. shim res.status()/res.json(),
    // 3. match METHOD + path to a handler in api/review/*, 4. call it
  })
}
```
A small route table maps `METHOD /api/review/<x>` → the corresponding `api/review/<x>.js` import. Same-origin, so no CORS. Build (`vite build`) is unaffected — the plugin only hooks `configureServer` (dev).

---

## Frontend

### `src/services/apiClient.js`
Thin `fetch` wrapper + a `reviewApi` object: `captureMistake(m)`, `due(limit)`, `grade(itemId, rating, elapsedMs)`, `recent(limit)`. Throws on non-2xx.

### Capture hook — `src/composables/useConversation.js`
In `send()`, after `reply` is built ([useConversation.js:78-87](../src/composables/useConversation.js#L78-L87)), if `reply.correction` is non-empty:
```
reviewApi.captureMistake({
  userText,                       // the message that was corrected (send()'s arg)
  correction: reply.correction,
  scenario: scenarioId.value,
  level: level.value,
}).catch(() => {})                // fire-and-forget; never block the chat
```

### Prompt adaptation — `src/composables/useConversation.js`
- Add a `recentMistakes` ref; load it via `reviewApi.recent()` on mount and when the scenario changes.
- Extend `buildSystemPrompt(scenario, level, recentMistakes)` ([useConversation.js:15-30](../src/composables/useConversation.js#L15-L30)) to append, when the list is non-empty:
  > "The learner has recently been corrected on: <short list>. Where it fits naturally, gently create opportunities to use these again."
  Keep ≤5 items, one short line — don't derail the persona.

### Review widget — `src/components/widgets/MistakeReviewWidget.vue`
Wrapped in `WidgetFrame` (title "Mistake Review", icon e.g. `直`). A `src/composables/useReview.js` holds `dueItems`, `index`, `current`, `loadDue()`, `grade(rating)`. UI states:
- **Loading** → spinner via WidgetFrame.
- **Empty** → "何もありません 🎉 — nothing due" + count reviewed today.
- **Reviewing** → progress `(i/total)`; prompt "You said: «`userText`»"; a text input + optional 🎤 (reuse the `SpeechRecognition` `lang:'ja-JP'` pattern already in ConversationWidget/VocabWidget); **Show answer** reveals `correction`; then four buttons **Again / Hard / Good / Easy** → `grade(rating)` → advance. `loadDue()` on mount.

### Widget registration
- `src/App.vue` — import `MistakeReviewWidget`, add `review: MistakeReviewWidget` to `widgetComponents` ([App.vue:104-113](../src/App.vue#L104-L113)).
- `src/composables/useWidgetLayout.js` — add `'review'` to `DEFAULT_ORDER` (e.g. after `'conversation'`) and `review: { colSpan: 1, height: null }` to `DEFAULT_CONFIG`. **Note:** the `saved.order.length === DEFAULT_ORDER.length` guard ([useWidgetLayout.js:29-31](../src/composables/useWidgetLayout.js#L29-L31)) means existing saved layouts reset to the new default once the count changes — expected and harmless.

---

## Build order (local)

1. Deps + `drizzle.config.ts` + `db/schema.ts` + `db/client.js` → `npm run db:generate`.
2. `devApi()` plugin + `api/review/due.js` → `npm run dev` boots, migrations apply, `GET /api/review/due` returns `{items:[],count:0}`.
3. `src/utils/srs.js` + `api/review/{mistakes,grade,recent}.js`.
4. `apiClient.js` + `useReview.js`.
5. Capture hook in `useConversation.js`.
6. `MistakeReviewWidget.vue` + registration (App.vue + useWidgetLayout.js).
7. Prompt adaptation.

Each step is runnable/verifiable on its own.

---

## Verification (local, end-to-end)

- `npm run dev` starts Vite, applies migrations, and `.pglite/` is created.
- In Conversation, send a message with a deliberate particle mistake (e.g. は/が) → DevTools Network shows `POST /api/review/mistakes` `201`; `npm run db:studio` (or `GET /api/review/due`) shows a `mistakes` row **and** a `review_items` row.
- Mistake Review widget shows **1 due** → start, reveal, rate **Good** → item `due` advances days out, a `review_log` row is written, widget shows **0 due**.
- Rate **Again** on another item → it returns in ~10 minutes (`due ≈ now+10m`).
- **Durability:** reload the page → due items persist (PGlite file survives), proving the localStorage-fragility problem is solved locally.
- **Adaptation:** after capturing a few mistakes, start a new conversation turn → the system prompt includes the "recently corrected on…" line (log it or inspect the request).
- `vite build` still succeeds (the API plugin is dev-only).

---

## Production later (seams already in place)

- **API:** the `api/review/*.js` files are already Vercel-shaped — under root dir `projects/japandash`, Vercel serves them as functions with no change. The Vite plugin is dev-only.
- **DB:** `db/client.js` switches to Neon when `DATABASE_URL` is set; schema + `drizzle/` migrations are reused as-is.
- **Auth:** replace the `// requireAuth(req,res)` seam with the Phase 0 passcode check.
- **AI:** conversation still uses the browser→Claude path; route it through `/api/ai` when Phase 0 lands.
