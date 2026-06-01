# JapanDash — Deepening the Learning Experience (Future Plan)

> Roadmap for deepening the learning loop. Not yet implemented — captured for future work.

## Context

JapanDash delivers a lot of content but rarely **closes the learning loop**: several widgets stop at "mark as studied / completed" booleans, feedback is ephemeral, and there's no production-then-review cycle. For an intermediate learner whose priorities are **speaking, grammar, and listening**, the highest-value improvements are ones that make you *produce* language, get *corrected*, and *review over time* — not more content to passively consume.

The codebase already has the primitives to build this: a Claude wrapper (`claude-api.js`), mora-level scoring (`pronunciation.js`), TTS/STT throughout, a reactive `useLocalStorage` pattern, and a clean widget-registration model. This plan adds five learning features on top of a new **AI provider layer** that uses **Microsoft Azure AI as primary** (already paid for) with **Claude as fallback**.

### Decisions captured
- Build all four shortlisted ideas (#1 Mistake Journal, #2 Shadowing workflow, #3 Grammar drills, #4 Dictation) **plus** a new **Writing Journal** (#6: user writes a free-form entry, AI evaluates grammar + "naturalness").
- **Azure AI primary, Claude fallback.** Local/offline logic where feasible so features degrade gracefully without keys.

---

## Azure AI research findings (what to use, and why)

| Need | Azure service | Notes / browser support |
|---|---|---|
| Text generation + grading (drills, journal eval, mistake explanations) | **Azure OpenAI** (GPT-4o-mini) chat completions | REST: `POST https://{resource}.openai.azure.com/openai/deployments/{deployment}/chat/completions?api-version=...`, header `api-key:`. **Risk:** direct browser CORS can be blocked → mitigated by Claude fallback (browser-friendly via `anthropic-dangerous-direct-browser-access`). |
| Pronunciation scoring (shadowing self-check, vocab/reading) | **Azure Speech — Pronunciation Assessment** | ja-JP supported: **accuracy, fluency, completeness, per-phoneme (IPA)** scores. Prosody is en-US-only (skip for JA). Browser-native via `microsoft-cognitiveservices-speech-sdk` (`PronunciationAssessmentConfig` + mic). Big upgrade over `compareReading()`. |
| Optional: higher-quality TTS/STT | **Azure Speech — Neural TTS / STT** (ja-JP) | Better than Web Speech API; optional, Web Speech remains the fallback. |

**Conclusion:** Azure Speech SDK is browser-first and reliable → use it for all pronunciation/dictation scoring. Azure OpenAI may face CORS in-browser → use it when reachable, fall back to Claude. Web Speech API/`compareReading()` remain the no-key offline fallback.

Sources: [Pronunciation assessment how-to](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment), [Language learning with pronunciation assessment](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-learning-with-pronunciation-assessment), [JS PronunciationAssessmentConfig](https://learn.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/pronunciationassessmentconfig), [Azure OpenAI REST reference](https://learn.microsoft.com/en-us/azure/foundry/openai/reference), [speech-sdk JS samples](https://github.com/Azure-Samples/cognitive-services-speech-sdk).

---

## Phase 0 — Foundation: AI provider layer + Azure Speech + settings

**Goal:** one place that decides Azure-vs-Claude for text, and Azure-vs-WebSpeech for pronunciation, so every feature below just calls a helper.

1. **`src/services/ai-text.js`** (new) — `generateJSON({ system, messages, maxTokens })` that:
   - Tries **Azure OpenAI** if its creds exist (`japandash:azure-openai-endpoint`, `:azure-openai-key`, `:azure-openai-deployment`).
   - Falls back to **Claude** via existing `sendMessage()` in [claude-api.js](src/services/claude-api.js) (keep it as-is, just wrap it).
   - Returns parsed JSON, reusing the fenced-code-strip + `JSON.parse` pattern already in [useConversation.js:72-76](src/composables/useConversation.js#L72-L76) (extract that into a shared `parseJsonReply()` helper).
   - Refactor `useConversation.js` `send()` to call `ai-text.js` instead of `apiSend` directly, so conversation also benefits from Azure-primary.
2. **`src/services/azure-speech.js`** (new) — wraps `microsoft-cognitiveservices-speech-sdk` (add to `package.json`; note: ~MB-scale bundle, acceptable for a personal dashboard):
   - `assessPronunciation({ referenceText, lang: 'ja-JP' })` → `{ accuracy, fluency, completeness, words: [{ word, accuracy, phonemes }] }` using `PronunciationAssessmentConfig` + microphone `AudioConfig`.
   - Returns `null` if Azure Speech creds (`japandash:azure-speech-key`, `:azure-speech-region`) are absent → callers fall back to existing `compareReading()` from [pronunciation.js](src/utils/pronunciation.js).
3. **Settings panel** in [App.vue:31-70](src/App.vue#L31-L70) — add a collapsible "Azure AI" section with inputs for Speech key+region and OpenAI endpoint+key+deployment; persist via `useLocalStorage` and extend `saveSettings()` ([App.vue:121-125](src/App.vue#L121-L125)). Keep Anthropic key as the labelled fallback.

**Security note (document, don't block):** keys live in `localStorage` and are exposed in-browser — same tradeoff the app already accepts for the Anthropic key. Fine for personal use. If Azure-only-without-exposing-keys is ever wanted, add a tiny serverless proxy (out of scope; GitHub Pages is static).

---

## Phase 1 — Conversation "Mistake Journal" + adaptive practice  *(speaking + grammar)* ⭐ highest leverage

The Conversation widget already produces a `correction` string per turn ([useConversation.js:83](src/composables/useConversation.js#L83)) that currently flashes inline and is lost. Capture and recycle it.

1. **Capture:** in `useConversation.send()`, after building `reply`, if `reply.correction` is non-empty, append `{ id, userText, correction, scenarioId, level, ts, srs }` to a new store `japandash:mistake-log` (via `useLocalStorage`).
2. **Review (new widget `MistakeReviewWidget.vue`):** surfaces due mistakes as **active-recall** prompts ("You said: *X* — say it correctly"). User answers (typed or via STT), then reveals the correction. A lightweight **SM-2 / Leitner** scheduler (`src/utils/srs.js`, new) sets the next due date from a self-rated again/good/easy. This is the seed of the unified SRS in Phase 6.
3. **Adapt:** when building the conversation system prompt ([useConversation.js:15-30](src/composables/useConversation.js#L15-L30)), inject a short line listing the user's 3–5 most-recent recurring mistakes so the model naturally creates chances to re-practice them.
4. Register the new widget in [App.vue:104-113](src/App.vue#L104-L113) and the default order in `useWidgetLayout.js`.

*Method basis: output hypothesis + corrective feedback + error log + spaced repetition.*

---

## Phase 2 — Real shadowing workflow  *(listening + speaking)*

Replace the bare iframe ([ShadowingWidget.vue:50-56](src/components/widgets/ShadowingWidget.vue#L50-L56)) with the **YouTube IFrame Player API** and add structured practice.

1. **Player controls:** load the IFrame API, mount a `YT.Player`, and add: **playback speed** (0.75×/1×), **A–B loop** (set in/out points, auto-rewind), and **"replay last 5s"** (`seekTo(currentTime-5)`).
2. **Guided 4-step flow per video** (Arguelles method), replacing the single "completed" boolean in `useShadowing` with per-video step progress: (1) blind listen → (2) listen + read → (3) shadow aloud → (4) **record & compare**.
3. **Step 4 self-check:** record via `MediaRecorder` for playback, and — if the user supplies a reference line — score it through `azure-speech.js` `assessPronunciation()` (Phase 0), falling back to Web Speech + `compareReading()`.
4. Keep the existing channel/level/random UI; persist step state under the existing `japandash:shadowing-completed` key (extended shape) or a new `:shadowing-progress`.

*Method basis: shadowing + intensive/narrow listening.*

---

## Phase 3 — Grammar production drills  *(grammar + speaking)*

The Grammar widget is pure reference ([GrammarWidget.vue](src/components/widgets/GrammarWidget.vue)). Add a **Practice** mode beside "Browse/Daily".

1. New section that turns `currentPoint` into a production task: **cloze** (blank the pattern out of an example), **transformation** ("make this polite"), or **EN→JA** prompt.
2. Use `ai-text.js` (Phase 0) to **generate** a fresh exercise for the selected grammar point and **grade** the free-form answer with a one-line explanation. Accept spoken answers via existing STT.
3. **Offline fallback (no key):** auto-cloze from the point's own `examples[].ja` (blank the substring matching `pattern`), graded by string match — reuses existing data, no AI needed.
4. On a correct/"easy" answer, optionally enroll the point into the Phase 6 SRS instead of the current boolean `markStudied` ([GrammarWidget.vue:165-169](src/components/widgets/GrammarWidget.vue#L165-L169)).

*Method basis: active recall + output + i+1.*

---

## Phase 4 — Listening dictation mode  *(listening)*

A transcription drill that reuses TTS + scoring already in the codebase. Add as a section in [ReadingWidget.vue](src/components/widgets/ReadingWidget.vue) (or a small standalone widget).

1. Pull a sentence from existing banks — `reading-passages.js`, `grammar.js` examples, `onomatopoeia.js` examples — **no new content**.
2. Play it via TTS (`SpeechSynthesisUtterance({ lang:'ja-JP' })`, or Azure neural TTS if configured). User types what they heard.
3. Score with `compareReading()`/`toHiragana()` from [pronunciation.js](src/utils/pronunciation.js); show per-mora diff + reveal.
4. Progressive support: full speed → slow (`rate: 0.7`) → reveal answer.

*Method basis: dictation / transcription (classic intensive listening).*

---

## Phase 5 — Writing Journal with AI evaluation  *(writing → grammar/naturalness)*  — user-added idea

New widget `JournalWidget.vue`: a free-writing pad where the user composes a Japanese entry and the AI evaluates **grammar correctness + naturalness**.

1. Textarea + optional daily prompt (e.g., "今日は何をしましたか？"). Entries saved to `japandash:journal-entries`.
2. On submit, call `ai-text.js` with a system prompt that returns JSON: `{ corrected, naturalness: 1-5, notes: [{ original, suggestion, why }] }` — show a diff-style view (original vs. natural rewrite) with brief explanations.
3. Feed surfaced issues into the Phase 1 **Mistake Journal** store so writing mistakes join the same spaced review queue (shared `srs.js`).
4. Register widget in `App.vue` + `useWidgetLayout` default order.

*Method basis: written output + corrective feedback; pairs naturally with the mistake-review loop.*

---

## Phase 6 (optional, connective) — Unified SRS review hub  *(retention)*

Generalize `src/utils/srs.js` (from Phase 1) into one scheduler and a single **Review** surface that mixes item types: conversation mistakes (#1), grammar points (#3), dictation lines (#4), and journal corrections (#5). Replaces scattered "studied/completed" booleans with real due-date scheduling (SM-2-lite; FSRS is overkill for a personal app). Build **after** Phases 1–5 so it wraps existing stores rather than inventing new ones.

---

## Build order (recommended)

1. **Phase 0** (foundation — required by 1,3,5; speech by 2,4).
2. **Phase 1** (highest leverage; establishes `srs.js`).
3. **Phase 4** (cheapest, fully reuses existing utils).
4. **Phase 3**, then **Phase 5**, then **Phase 2** (most new surface area).
5. **Phase 6** last, optional.

Each phase is independently shippable.

---

## Verification

- **Run locally:** `npm install` (adds `microsoft-cognitiveservices-speech-sdk`) then `npm run dev`.
- **Phase 0:** with only an Anthropic key set, confirm conversation still works (Claude fallback). Add Azure OpenAI creds → confirm requests hit Azure (network tab shows `*.openai.azure.com`); if CORS-blocked, confirm automatic fallback to Claude with no UI error.
- **Phase 1:** hold a conversation, intentionally make a particle mistake (e.g., は/が), confirm a `mistake-log` entry is written (DevTools → Application → localStorage) and appears in the Mistake Review widget; answer a review and confirm SM-2 due-date update.
- **Phase 2:** confirm speed/loop/replay drive the YouTube player; record a line and confirm Azure pronunciation scores render (or Web Speech fallback when Azure key absent).
- **Phase 3:** generate a drill for an N4 point, answer right/wrong, confirm grading + explanation; with no key, confirm offline cloze works.
- **Phase 4:** play a dictation line, type a wrong answer, confirm per-mora diff + reveal.
- **Phase 5:** write an entry with a deliberate awkward phrasing, confirm corrected/naturalness/notes render and a mistake-log entry is created.
- **Cross-cutting:** verify each new widget drags/resizes/collapses via `WidgetFrame`, persists across reload, and degrades gracefully with no keys set.
- **Build:** `npm run build` succeeds and bundle still loads on the GitHub Pages relative-path setup.
