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

## Reassessment of next steps for developer

Paulo asked how much of Phase 0 (Vercel project, DB, auth, AI proxy, speech token) from projects/japandash/FUTURE.md is implemented, and what his next steps are. The audit below answers that; the plan section lays out the remaining Phase 0 work in build order, adapted to what he actually has provisioned today: Vercel account ✓, Azure Speech ✓, Neon ✗, Azure OpenAI ✗. Consequence: /api/ai starts Claude-only (Azure-primary routing deferred until an Azure OpenAI resource exists).

Phase 0 status: ~25% — local foundation done, all server/production pieces not started
Phase 0 item	Status	Evidence
1. Vercel + DB scaffolding	Partial	Drizzle schema (db/schema.js: review_items, review_log, mistakes), drizzle.config.js, migration drizzle/0000_needy_hairball.sql all exist. But db/client.js is PGLite-only (commented Neon seam at lines 8–10); no vercel.json, no DATABASE_URL handling, no @neondatabase/serverless.
2. Auth	Not started	No /api/login, no jose, no requireAuth(), no passcode gate. The 4 review endpoints have // Production seam: add requireAuth() comments.
3. AI proxy /api/ai	Not started	useConversation.js still imports claude-api.js → direct browser calls to Anthropic with localStorage key. No Vercel AI SDK deps.
4. Speech token	Not started	azure-speech.js POSTs with raw Ocp-Apim-Subscription-Key from localStorage. No /api/speech-token.
5. Settings/key migration	Not started	App.vue settings panel still collects WaniKani/Anthropic/Azure keys into localStorage.
Already working beyond Phase 0: the Phase 1 SRS Mistake Journal is complete locally — api/review/{due,grade,mistakes,recent}.js (Vercel-handler-shaped), src/utils/srs.js (SM-2-lite), useReview.js, MistakeReviewWidget.vue, conversation-mistake capture, all running against PGLite via vite-plugin-dev-api.js in dev. This de-risks Phase 0: the handlers and schema deploy as-is once the platform pieces land.

Paulo's manual steps (only he can do these)
Create the Vercel project: import the repo, Root Directory = projects/japandash, build npm run build, output dist/.
Provision Neon via Vercel Marketplace (storage tab) → DATABASE_URL env var auto-injected.
Set remaining env vars in Vercel: ANTHROPIC_API_KEY, AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, APP_PASSCODE (choose one), SESSION_SECRET (random 32+ bytes).
(Later, optional) Provision Azure OpenAI to enable the Azure-primary/Claude-fallback routing from FUTURE.md.
Code work (in build order; implementable on approval)
Step 1 — Neon production seam in db/client.js
Add @neondatabase/serverless; when process.env.DATABASE_URL is set use drizzle-orm/neon-http, else keep PGLite (dev). Schema/migrations reused unchanged (the seam comment already marks the spot).
Migration against Neon via drizzle-kit migrate (add db:migrate script reading DATABASE_URL).
Step 2 — Auth
api/_lib/auth.js: requireAuth(req, res) verifying a signed JWT cookie (jose); api/login.js: passcode → cookie. Wire requireAuth into the 4 review endpoints at their marked seams.
SPA: small passcode gate (App.vue-level) that calls /api/login; skipped in dev.
Mirror new endpoints in vite-plugin-dev-api.js so dev keeps working.
Step 3 — AI proxy (Claude-only to start)
api/ai.js using Vercel AI SDK (ai + @ai-sdk/anthropic), generateObject + Zod schema matching the existing { ja, en, furigana, correction } contract.
Refactor useConversation.js (currently claude-api.js import, send at lines 66–76) to call /api/ai via the existing src/services/apiClient.js pattern; delete claude-api.js once unused.
Leave an obvious seam for @ai-sdk/azure primary when Azure OpenAI exists.
Step 4 — Speech token
api/speech-token.js: exchanges AZURE_SPEECH_KEY for a 10-minute token (POST https://{region}.api.cognitive.microsoft.com/sts/v1.0/issueToken).
Smallest change in azure-speech.js: keep the existing REST call but swap Ocp-Apim-Subscription-Key header for Authorization: Bearer <token> fetched from /api/speech-token (the STT REST API accepts token auth) — avoids adding the Speech SDK for now. Web Speech compareReading() fallback unchanged.
Step 5 — Settings cleanup
Remove Anthropic + Azure key inputs from the App.vue settings panel (keys now server-side). Keep the WaniKani key input — WK stays browser-side until Phase 7.
Step 6 — Deploy wiring
Verify Vercel build; then update the japandash card URL in the root App.vue apps array to the Vercel URL (per FUTURE.md, the committed dist/ is no longer needed for this project).
Verification (per FUTURE.md)
npm run dev: review endpoints + new login/ai/speech-token all work locally against PGLite.
Auth: wrong passcode → 401; correct passcode sets cookie and unlocks /api/*.
Conversation widget works through /api/ai with no Anthropic key in localStorage/network.
Pronunciation scoring works with no Azure key visible in browser devtools (only short-lived token).
Deliberate grammar mistake in conversation → row in Neon mistakes + review_items → appears in Mistake Review on a second device after passcode login (cross-device durability).
Vercel production build succeeds; landing card opens the deployed app.