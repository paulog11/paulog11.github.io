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
- `spike/` — standalone harnesses. Vite only builds `index.html`, so these never ship. `city`, `perf`, `board` and `stage` all load clean; `alley` was deleted (superseded by `city`). Each sets `window.__ready`, and `city`/`perf`/`board` expose `window.__stage`
- `test/scene.test.mjs` — the committed browser suite (`npm test`). Plain `node:test` + `playwright`, no `@playwright/test` and no config file; it spawns and tears down its own dev server and restores `index.html` afterwards
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
- **Picking is occlusion-aware.** `hitTest` rejects a hit when an opaque mesh is
  nearer, so putting any opaque geometry in front of a pick target silently makes
  it unclickable — this is how 6 of the departure board's 9 rows died behind the
  station's own deck. Transparent meshes are skipped on purpose (halos, light
  pools, rain are meant to be clicked through), so a new decal must be
  `transparent: true` or it will start blocking clicks. Without this the reverse
  bug applies: hit boxes are as tall as their buildings, and 26% of the frame's
  clickable area used to select a project you could not see.
- The renderer draws at a **fraction of CSS resolution** (`RES_SCALE`) and the browser upscales it; `canvas[data-scene] { image-rendering: pixelated }` in `style.css` is what turns that from "blurry" into the intended look. The two belong together.
- The frame loop is **capped to 30 fps**, not on-demand — rain, the train, steam and flicker animate continuously, so there is no idle state. True on-demand rendering is the `prefers-reduced-motion` path only.
- **The frame cap needs `FRAME_SLACK_MS`.** `setAnimationLoop` fires on the display's cadence (16.67 ms at 60 Hz). Two ticks is 33.33 ms — *exactly* `1000/30` — so a naive `now - lastFrame < 1000/TARGET_FPS` loses to jitter and waits a third tick, capping at **20 fps, not 30**. This shipped broken once. Don't "simplify" the slack away.
- `createSignTexture` takes a **string** colour. Canvas2D silently ignores an invalid `fillStyle`, so a palette number used to render black-on-black; the function now coerces, but prefer strings.
- `prefers-reduced-motion` must produce a perceptually static frame — including CSS animations, which need `motion-safe:`.

## Measuring the Scene (both metrics are easy to get wrong)

Two traps have each produced a confidently wrong number in this repo:

- **Draw calls:** you MUST set `renderer.info.autoReset = false`, then `reset()`,
  then `render()`, then read. `info.render` clears on *every* `render()` call, so
  a naive read reports only the last pass.
- **Frame rate:** do NOT time `requestAnimationFrame`. It fires at display rate
  whether or not the frame renders, so it reports ~60 fps regardless of the cap —
  this is exactly what hid the 20-fps bug above. Time `stage.onFrame` callbacks
  instead; they run only on frames that actually render.
- **Measure on `spike/perf.html`, not `spike/city.html`.** city.html omits scenery
  and ambient and under-reports by ~81 draw calls.
- **The camera only ever sees a building's +X and +Z faces**, because its
  azimuth is fixed at 45°. So ground detail is visible SOUTH and EAST of a mass
  and permanently hidden north and west of it. A plaza was once built around
  都庁's "open border" — which was its north and west edges — and measured
  afterwards at 1.3 m visible to the east, 0.0 m to the south, and 16.4 m
  hidden. Six lamp posts and a painted plaza rendered every frame and not one
  pixel of any of it could be seen. Check which side of the building the ground
  is on before detailing it.
- **A landmark's height must be reckoned from the building, not from its group
  anchor.** `lotGroupCenter()` gives the anchor; per-building offsets (towers.js's
  `NO1_DX/DZ`) then push the mass away from it, and since `screenY` falls as
  `x+z` rises, doing the sum at the anchor overstates height by ~1.7 screen
  units. That error once "proved" a height that shipped level with the filler it
  was meant to clear.
- **Adding a lot to a landmark's `lots` moves the whole landmark**, because
  `lotGroupCenter()` is the mean of the claimed lots. 都庁 claims six and
  subtracts the resulting anchor shift back out of its local offsets
  (`ANCHOR_DX/DZ`) so the buildings stay put. Claiming a lot also skips its
  `rng()` call in `fillerBuildings()`, which reshuffles every filler after it —
  the layout stays deterministic, but it is not the same layout.
- **Looking at anything near ground level is not a matter of aiming the camera
  down.** `clampPan()` pins `controls.target.y` to `TARGET_Y` (~23 m) on *every*
  tick, so a pivot you set at a low object's own height is silently reverted
  before the next frame. Pan in x/z only, and to centre something low, aim along
  the sightline through it at the height clampPan will force: any point on that
  ray projects to the same screen position under an orthographic camera. Two
  separate sessions have lost time rediscovering this.

Current baseline for the full scene (regress against these):

| Draw calls | Triangles | Programs | Textures | Frame median |
|---:|---:|---:|---:|---:|
| 163 | 13,356 | 21 | 65 | 33.3 ms (30 fps) |

**The scene is daytime, not night.** It was converted from a fixed night
setting: `renderer.js`'s `addNightLighting` (blue moonlight) became
`addDaylight` (warm sun + sky ambient), the equirect sky/fog went from black
to blue, `palette.js`'s `ASPHALT` and `street.js`'s `GROUND_COLOR` went from
dark/wet to dry daytime tones, and rain and the Golden Gai neon-flicker
(`ambient.js`) are gone entirely — both are night tropes with no daytime
equivalent. Ground light pools — the fake light-spill decals in
`street.js` (`scatterPools`), `station.js` (`buildLightPools`) and
`towers.js`'s plaza texture — are gone too, which is most of why the baseline
above dropped so far below the old 244/10,820/22/66 figure; that old number
was a different (night) scene and is not a regression target. Neon signage
(the 9 project signs, departure board, Golden Gai lanterns, konbini/kōban
signage) stays lit — real signage runs in daylight too — but office-window
and facade emissive glow (`station.js`, `towers.js`, `blocks.js`) was dimmed
well below its night values so buildings don't look like they're glowing at
noon. If night ever comes back, it needs its own pass across all of these,
not just the sky.

**The station was rebuilt from a podium-on-a-viaduct to an at-grade rail
corridor** (barrel-vault canopies, 3 cross-decks, catenary, 2 standing trains —
see `station.js`'s header). `STATION.cell` (a single block) became
`STATION.cells` (the whole centre column, 3 blocks) in `cityLayout.js`; the old
`STATION.viaductY` is gone along with the 8.5m viaduct it named. This landed
within a few draw calls of the prior baseline (244/10,954/22/68) by coincidence,
not because little changed — the deletions (podium, roof deck, portals, piers,
the flat canopy) funded the additions almost exactly. Do not treat that
near-equality as license to skip re-measuring after touching `station.js`.

**`transparent: true` costs a shader program.** It is part of three.js's program
cache key, so the plaza (`towers.js`) — the scene's only transparent *mapped
Lambert* — compiles its own. Flipping that one flag moves the scene between 21
and 22 programs with nothing else changed. It can't be dropped: the transparency
is what makes `hitTest` click through the decal and `outline.js` skip it.

**This baseline includes the departure board; earlier figures did not.**
`spike/perf.html` never built the board, so every draw-call number recorded
before this line understated the scene. Do not compare across that boundary — the
older "254 / 18,520" was a *bigger* scene measured *without* the board.

**Triangles jumped 10,656 -> 14,256 for the sidewalk/tree/crosswalk reskin**
(`scene/street.js`). The sidewalk band and zebra crosswalks are repainted
textures, not new geometry — the entire increase is ~90 low-poly street trees,
merged into 2 draw calls via `mergeGeometries`. Calls only ticked 161 -> 163
and programs held flat at 21, since the trees' plain `MeshLambertMaterial` has
no map/emissiveMap/transparent flag and reused an already-compiled program.
A follow-up pass dropped that to **13,356**: the tree trunk
`CylinderGeometry` defaulted to closed caps, but both are permanently
invisible (the bottom faces into the ground, the top is buried inside the
canopy), so `openEnded: true` cuts each trunk from 20 to 10 triangles —
~900 triangles off across all 90 trees, with zero visual difference.

`npm test` asserts these as ceilings with headroom. Come in far under and you
should ratchet `BUDGET` in `test/scene.test.mjs` down; there is no value in slack
a regression can hide inside.

## Commands
- `npm run dev` — local dev server
- `npm test` — layout invariants + the browser suite (`test/scene.test.mjs`).
  Spawns its own dev server on port 5199 and restores `index.html` when done, so
  it leaves the working tree clean
- `npm run deploy` — build + copy dist output to root for GitHub Pages
- `node scene/cityLayout.test.mjs` — layout invariants alone, no browser needed

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

`cityLayout.js` owns **three** placement tables, all with the same lot-claiming
contract, and `fillerBuildings()` skips every lot any of them claims:

| Table | For | Shape |
|---|---|---|
| `PROJECT_SITES` | the 9 clickable buildings | one `lot` |
| `LANDMARK_SITES` | 都庁, Cocoon | a `lots` **array** — a complex needs several |
| `SCENERY_SITES` | konbini, kōban, vending | one `lot` + a `ry` yaw |

Anything placed on the grid should claim a lot rather than take free-floating
coordinates: the gap between the outermost filler footprint and a block edge is
0.6 m, so "just inside the block edge" collides and needs re-checking on every
layout change. A lot cannot collide, and the test enforces it.

Pick a free lot; `node scene/cityLayout.test.mjs` fails if you collide with
another project, a landmark, scenery, the station, or Golden Gai:
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
