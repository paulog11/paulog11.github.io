1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

# Paulo's GitHub Pages Site

Personal website hosted at GitHub Pages. Vue 3 landing page at root links to subprojects under `projects/`.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3, three.js
- Fonts: Shippori Mincho (display **and** the Japanese signage drawn onto canvas textures), DM Sans (body), DM Mono (the departure board). All three are load-bearing — don't drop one because the DOM seems not to use it.
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `App.vue` — owns the `apps` array (single source of truth for every project) and dispatches scene clicks
- `components/ShinjukuScene.vue` — the Vue↔three boundary: builds the scene, registers pick targets, falls back on WebGL failure
- `components/ProjectList.vue` — accessible `<ul>` fallback, rendered *inside* the `<canvas>`. This is what screen readers and crawlers see, so it is not a stub
- `scene/` — the 3D scene, one module per concern: `renderer` (camera, bloom, picking, quality tier), `palette`, `signTexture`, `alley` (the 9 project stalls), `street`, `towers` (都庁 + Cocoon), `crowd`, `ambient`, `departureBoard`, `konbini`, `streetFurniture`, `props`
- `spike/` — standalone harnesses the Playwright suites drive (`alley`, `board`, `stage`, `scene`, `perf`). Vite only builds `index.html`, so these never ship
- `main.js` / `style.css` — Vue entry point and global Tailwind styles
- `index.source.html` — permanent Vite entry template (references `./main.js`); never overwritten by deploy
- `index.html` — at rest this is the built output for GitHub Pages; `predev`/`prebuild` hooks restore it from `index.source.html` before Vite runs
- `vite.config.js` — Vite config with `base: './'`
- `tailwind.config.js` — night palette (night/asphalt/lantern/kabuki/neon/paper), mirroring `scene/palette.js`

## Scene Constraints (non-obvious, cost real time to learn)
- **1 world unit = 1 metre** at street level. Backdrop towers use *compressed* geometry — an orthographic camera has no distance falloff, so a literal 243 m 都庁 would be nine times the screen height.
- Screen position under this camera (azimuth 45°, elevation 22°) is `screenX = 0.707(x − z)`, `screenY = 0.927y − 0.265(x + z)`. **Depth pushes objects up the frame**, so anything far back is high on screen before its own height counts. Derive placement from these; don't fit constants to one camera position — the camera pans ±24 m.
- **Emissive materials illuminate nothing** in three.js. Light spilling onto the street comes from real `PointLight`s on the shopfronts.
- **A metallic material with no `scene.environment` renders pure black** — it has no diffuse and nothing to reflect.
- A bloom pass runs downstream. Over-bright emissive plus bloom has destroyed the image several times; keep emissive restrained and verify by looking at a render.
- `createSignTexture` takes a **string** colour. Canvas2D silently ignores an invalid `fillStyle`, so a palette number used to render black-on-black; the function now coerces, but prefer strings.
- `prefers-reduced-motion` must produce a perceptually static frame — including CSS animations, which need `motion-safe:`.

## Commands
- `npm run dev` — local dev server
- `npm run deploy` — build + copy dist output to root for GitHub Pages

## Deploy Workflow
`npm run deploy` does: restore `index.source.html` → `vite build` → clean old hashed assets → copy `dist/assets/*` to `assets/` → copy `dist/index.html` to root. Built assets are committed to git (no CI build step). Always use relative paths.

**Important:** `index.source.html` is the canonical Vite entry. The `predev`/`prebuild`/`deploy` scripts all restore `index.html` from it before Vite runs. Do NOT manually edit `index.html` — edit `index.source.html` instead.

## Adding a New Project
Append to the `apps` array in `App.vue` — nothing else. The alley grows one stall,
the departure board grows one row, and the fallback list grows one entry:
```js
{
  id: 'my-app', indexNumber: 10, title: 'My App',
  tagline: 'short line under the title',
  description: 'Longer sentence for the fallback list and SEO.',
  category: 'games',            // language | games | maps | simulations | reading
  year: '2026',
  tools: ['vue', 'vite'],
  status: 'live',               // live | WIP | coming-soon
  url: './projects/my-app/dist/index.html',
  github: '',
}
```
URLs are relative (`./projects/<name>/dist/index.html`) for GitHub Pages. Keep
`title` short — it is rendered onto a neon sign roughly 3 m wide, and long titles
shrink to fit rather than wrap.

## Subprojects
- `projects/algo-lab/` — algorithm simulation lab ([CLAUDE.md](projects/algo-lab/CLAUDE.md))
- `projects/beleriand-realms/` — 2-player asymmetrical deckbuilder (Tolkien First Age) ([CLAUDE.md](projects/beleriand-realms/CLAUDE.md))
- `projects/ported-games/flip7/` — Flip 7 card game ([CLAUDE.md](projects/ported-games/flip7/CLAUDE.md))
- `projects/profile/` — static portfolio page ([CLAUDE.md](projects/profile/CLAUDE.md))
- `projects/right-word/` — Japanese language assistant ([CLAUDE.md](projects/right-word/CLAUDE.md))
- `projects/venue-search/` — Tokyo venue search ([CLAUDE.md](projects/venue-search/CLAUDE.md))
