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
- `scene/cityLayout.js` — **the single source of truth for where everything stands.** Pure data + maths, imports nothing from three.js. A 3×3 lattice of blocks separated by streets; each block subdivides into a 3×3 lattice of lots; a building occupies one lot. Moving a building is a two-integer edit. Replace *this* file when real Shinjuku coordinates arrive — never hard-code positions in the geometry modules. `node scene/cityLayout.test.mjs` checks its invariants without a browser
- `scene/` — the 3D scene, one module per concern: `renderer` (camera, picking, quality tier), `palette`, `signTexture`, `cityLayout`, `street` (the road network), `blocks` (filler buildings), `station` (新宿駅, the centrepiece), `projectBuilding` (the 9 clickable ones), `lightPool`, `towers` (都庁 + Cocoon), `alley` (Golden Gai scenery), `ambient`, `departureBoard`, `konbini`, `streetFurniture`, `props`
- `spike/` — standalone harnesses the Playwright suites drive (`city`, `alley`, `board`, `stage`, `perf`). Vite only builds `index.html`, so these never ship
- `main.js` / `style.css` — Vue entry point and global Tailwind styles
- `index.source.html` — permanent Vite entry template (references `./main.js`); never overwritten by deploy
- `index.html` — at rest this is the built output for GitHub Pages; `predev`/`prebuild` hooks restore it from `index.source.html` before Vite runs
- `vite.config.js` — Vite config with `base: './'`
- `tailwind.config.js` — night palette (night/asphalt/lantern/kabuki/neon/paper), mirroring `scene/palette.js`

## Material Policy (the rule the whole scene is built on)
The scene is deliberately cheap to render, because the retro isometric look and
the low-GPU look are the same thing. Breaking these puts the cost straight back.

| Use | Material |
|---|---|
| Signs, neon, halos, light pools, hit boxes | `MeshBasicMaterial` — **unlit**; the texture *is* the output |
| Facades, roads, structures, props | `MeshLambertMaterial` — supports `map`, `emissive`, `emissiveMap` |
| Anything at all | ~~`MeshStandardMaterial`~~ — **banned** |

- **No `metalness`, no `roughness`, anywhere.** No `PointLight`/`SpotLight` either.
- **`MeshBasicMaterial` has no `emissive` property.** Setting one does nothing and fails silently — a hover effect on a Basic material must change `color`.
- **There is no bloom pass and no tone mapping** (`NoToneMapping`). Anything that should glow must *be* bright in its own colour or texture, and colours clip rather than roll off — don't blow things out to white.
- **There is no `scene.environment`.** Nothing may rely on reflections. Wet asphalt is painted into the road texture, not produced by gloss.
- Ground light-spill is faked with additive `MeshBasicMaterial` radial-gradient decals (`scene/lightPool.js`), never with real lights.

## Scene Constraints (non-obvious, cost real time to learn)
- **1 world unit = 1 metre.** The map is a 178 m square centred on the station. Landmark towers still use *compressed* geometry — an orthographic camera has no distance falloff, so a literal 243 m 都庁 would tower off-frame.
- Screen position under this camera (azimuth 45°, elevation 22°) is `screenX = 0.707(x − z)`, `screenY = 0.927y − 0.265(x + z)`. **Depth pushes objects up the frame**, so anything far back is high on screen before its own height counts. Derive placement from these; don't fit constants to one camera position.
- **`FRUSTUM = 145`** is not a taste value — it is what makes all four map corners fit at zoom 1. Detail comes from the zoom range (0.95–5), which is the scene's only LOD mechanism.
- At zoom 1 there are **~4.8 px per metre** on a 700 px-tall viewport. Anything finer than ~3 m is invisible — put that detail in a texture, not in geometry.
- **Emissive materials illuminate nothing** in three.js.
- The renderer draws at a **fraction of CSS resolution** (`RES_SCALE`) and the browser upscales it; `canvas[data-scene] { image-rendering: pixelated }` in `style.css` is what turns that from "blurry" into the intended look. The two belong together.
- The frame loop is **capped to 30 fps**, not on-demand — rain, the train, steam and flicker animate continuously, so there is no idle state. True on-demand rendering is the `prefers-reduced-motion` path only.
- `createSignTexture` takes a **string** colour. Canvas2D silently ignores an invalid `fillStyle`, so a palette number used to render black-on-black; the function now coerces, but prefer strings.
- `prefers-reduced-motion` must produce a perceptually static frame — including CSS animations, which need `motion-safe:`.

## Commands
- `npm run dev` — local dev server
- `npm run deploy` — build + copy dist output to root for GitHub Pages

## Deploy Workflow
`npm run deploy` does: restore `index.source.html` → `vite build` → clean old hashed assets → copy `dist/assets/*` to `assets/` → copy `dist/index.html` to root. Built assets are committed to git (no CI build step). Always use relative paths.

**Important:** `index.source.html` is the canonical Vite entry. The `predev`/`prebuild`/`deploy` scripts all restore `index.html` from it before Vite runs. Do NOT manually edit `index.html` — edit `index.source.html` instead.

## Adding a New Project
Two edits, because a project needs both an identity and a street address.

**1. Append to the `apps` array in `App.vue`** — the single source of truth for
what a project *is*. The departure board grows a row and the accessible fallback
list grows an entry from this alone:
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

**2. Add a site to `PROJECT_SITES` in `scene/cityLayout.js`** — where it *stands*.
Pick a free lot; `node scene/cityLayout.test.mjs` fails if you collide with
another project, the station, or Golden Gai:
```js
{ id: 'my-app', cell: [0, 1], lot: [2, 0], h: 22 }
```
A project with no site simply doesn't get a building (it stays on the board and
in the fallback list); a site with no matching `id` is skipped with a warning
rather than rendering a nameless building.

URLs are relative (`./projects/<name>/dist/index.html`) for GitHub Pages.

**Keep `title` short — one word or two.** It is rendered onto a neon sign, and
a title over ~12 characters is *wrapped* onto two lines by `splitTitle`, not
shrunk. Wrapping drops the glyphs from 70% to 55% of the sign canvas, i.e. from
10.9 to 8.6 CSS px at zoom 1 — a 27% legibility cost. See the measured budget
comment at the top of `projectBuilding.js` before changing anything about sign
size; enlarging the sign is not the fix (the aspect is locked at 4:1, so a
legible-at-zoom-1 sign would be 28 m wide on a 14 m lot).

## Subprojects
- `projects/algo-lab/` — algorithm simulation lab ([CLAUDE.md](projects/algo-lab/CLAUDE.md))
- `projects/beleriand-realms/` — 2-player asymmetrical deckbuilder (Tolkien First Age) ([CLAUDE.md](projects/beleriand-realms/CLAUDE.md))
- `projects/ported-games/flip7/` — Flip 7 card game ([CLAUDE.md](projects/ported-games/flip7/CLAUDE.md))
- `projects/profile/` — static portfolio page ([CLAUDE.md](projects/profile/CLAUDE.md))
- `projects/right-word/` — Japanese language assistant ([CLAUDE.md](projects/right-word/CLAUDE.md))
- `projects/venue-search/` — Tokyo venue search ([CLAUDE.md](projects/venue-search/CLAUDE.md))
