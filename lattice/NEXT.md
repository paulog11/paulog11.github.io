# NEXT: Shinjuku lattice sandbox

**Start with `MAP.md`**: what stands where (districts, landmarks, entrances, the station, height caps), which file draws it, and how to look at it.

State as of 2026-10-21: phase 1 (buildings) is committed. The section 3 work below is built but
**uncommitted** on `shinjuku-landing`. `npm run check`, `npm run build` and `npm run perf` pass.
`npm run perf` is a headless, software-rendered regression guard, not a real-GPU measurement. The plan
for phase 1 was `~/.claude/plans/using-the-existing-working-golden-pine.md`.
`HANDOFF-crowds-buses.md` and `HANDOFF-review-pending.md` are finished and can be deleted.

Effort: **S** is under an hour, **M** is a session, **L** is multi-session.

## 0. Housekeeping first

- **Commit the section 3 work.** Nothing from it is committed yet. (S)
- ~~**Stop committing screenshots.**~~ Done: `.gitignore` has `.look*/` and the three tracked folders are untracked (the `git rm --cached` is staged; files are still on disk).
- **Plates against real gestures.** Drag-pan and pinch were never exercised with the name plates in the page. The plates are `pointer-events: none`, and only that CSS was checked. Verify by hand. (S)

## 1. Known problems from phase 1

| Problem | Why it happens | Fix | Effort |
|---|---|---|---|
| About 40% slower than before: 10.2 ms/frame (was 7.3), 28 fps against the 30 cap | ZAKKYO costs about 2.5× the old fringe building, and K is 85% ZAKKYO | Measure in a real GPU browser first (the 10 ms was headless, software-rendered, on a loaded machine). Then cheapen ZAKKYO or lower its share | S to measure, M to fix |
| Phone portrait cuts the scene off | The cluster is about 2050 world units wide, 500 px needs zoom ≤ 0.24, and `minZoom` is 0.30 | Lower `minZoom`, or add a portrait-specific opening rect. Test at 390×844; this was only worked out by arithmetic | S |
| Gyoen reads as park blocks, not one garden | The street grid still runs through it | Draw G street tiles as lawn and keep cars out of G (about 10 lines in `main.ts`) | S |
| 新宿駅 sign unreadable at the opening zoom (about 8 px tall) | The sign is world-space text | Readable from zoom ~0.7. The DOM plate covers the opening, so this only matters if plates go away | S |
| Kabukichō night pools look like confetti | Soft ellipses in every sign colour at similar radius | Fewer and tighter pools, or one tinted wash per block | S |

## 2. Art that doesn't read yet

- **Nishi towers are stubby** next to the reference: 6–11 storeys, capped by the camera fence in `main.ts` (`TALLEST_FILLER`). Taller towers need a taller fence, which lets the camera park in the sky, so it is a trade-off. (M)
- **ZAKKYO reads as one building in many lots.** The two towers are close in height with a 0.05-tile gap. Widen the gap or push the heights apart. (S)
- **Trees are flat-topped cylinders.** Fine at the opening zoom, visible when zoomed in. (S)
- **Station decks are solid boxes**, so trains don't visibly pass beneath. Only 4 trains stand on 12 tracks (placement is in `layout.ts`), and the deck roofs are much simpler than the reference's layered concourse. (M)
- **The 都庁 slot isn't see-through.** The engine has no transparency, so the slot shows a shaded leg face or whatever filler is behind it. Moving the filler or lightening the leg face helps. (S)
- **Cocoon is slim** (about 3.5:1), because its height is fixed relative to 都庁. Revisit if 都庁 gets taller. (S)

## 3. More Shinjuku (the plan's "out of scope", in rough value order)

**Status, 2026-10-21** (the original list is kept below for the reasoning):
- **3.1 Moving trains: done.** 6 runs, one per track, per-car so they slide under the decks, each stops at the platform south of the concourse. The runs are on tracks 74/77/80/83/86/89 on purpose: a canopy east of a train sorts after it and hides it, so every train has a platform to its west.
- **3.2 Kabukichō landmarks: done** (`src/kabukicho.ts`): 区役所, TOHO with the Godzilla head, the 一番街 gate, Golden Gai. The map was re-carved to make room: Shin-Okubo (`O`, rows 0-1) is north of Kabukichō (rows 2-4), shopping (`E`) south. Golden Gai and 区役所 needed `LOW_ZONES` in `layout.ts`: filler on their +gx/+gy sides hid them. Still weak: the gate is small, night pools read as flat discs, the head is boxes with no jaw.
- **3.3 伊勢丹: done** (`src/shopping.ts`), now flush with its block's south edge (102,74). Also new: `SHOP` filler for `E` and `OKUBO` filler for `O`.
- **3.4 Cocoon: done**, moved to (66,66), north-west of the station. The old note here said the reference puts it south-west; the reference image puts it north-west.
- **3.5 Crowds and buses: done** (`src/crowd.ts`, `drawBus` in `sprites.ts`, `CROWDS` at the end of `layout.ts`). 8 of the 64 vehicles are buses. People walk the street margins, the station frontages, outside 伊勢丹, the 一番街 approach, and in and out of every entrance. They are drawn in the terrain pass as world-scaled marks (the first version capped them at 2-4 px and they read as dust beside 200 px towers), heads from zoom 1.1, with a share that grows with zoom. Cost, paired A/B over 4 rounds (software rendering): +0.10 ms opening, +0.13 ms station, +0.13 ms at a zoom-1.0 frontage. Seen in frames: buses day and night on both axes, crowds at zoom 1.0 day and night. At the opening zoom they show only as a faint stipple along the concourse. The check asserts were negative-tested (a strip in the rail corridor, on a lot, and over a car lane each fail). `window.__lattice.cars` exposes the vehicle arrays so a look can follow a bus. Not covered: night cost, real GPU, phone portrait.
- **3.6 Expressway and curved rail: skipped by decision.**
- **New: 13 subway entrances** (`ENTRANCES`): lot-claiming plazas with a stair hood and a lit line sign (M/F/S/E). The east ones are block SE-corner lots because anything mid-block was buried by the lots in front. Line assignments are illustrative, not surveyed.
- **Open question:** the Kabukichō agent reported a ~19 ms/frame cliff in `--disable-gpu` software rendering that the Kabukichō view sat just under, and that it never traced which edit moved the view off it. Night in software is ~33 ms regardless of art. Check on a real GPU before trusting any of these numbers.

1. **Moving trains on the corridor.** The corridor already has tracks, platforms and 4 parked trains; the cars use a pure function of (index, time), so trains can too. This is the cheapest way to get "something moves" at the station. (M)
2. **Kabukichō landmarks:** TOHO Cinemas with the Godzilla head, the 一番街 gate, 新宿区役所 and Golden Gai. Recipes exist in `scene/` (`alley.js`, `konbini.js`, `streetFurniture.js`). (M each)
3. **伊勢丹** with its blue wordmark, as a multi-lot sprite in the east. (M)
4. **Reposition Cocoon.** The reference puts it south-west of the station, but the real building is west/north-west. Moving it is a one-line `LANDMARKS` edit, and `tools/check.mjs` flags a bad spot. (S)
5. **Crowds and buses.** The reference has dense pedestrians. Same trick as the cars: positions as a function of (index, time). Cost needs measuring first. (M)
6. **Elevated expressway and the curved rail bundle.** The lot grid is orthogonal, so this means a new road system, not a tweak. Probably not worth it for a sandbox. (L)

## 4. Quality and safety nets

- **Frame-cost regression test.** `look.mjs --eval` already reads `loop.stats`. Add an `npm run perf` that fails past a budget, like the three.js suite's `BUDGET`. (S)
- **A golden-frame test** with the kit's recording surface, which runs in Node with no browser, so a sprite change shows up as a changed digest. (M)
- **Remove dead exports** once nothing needs them (e.g. check `DISTRICTS` helpers and unused `layout.ts` exports). (S)

## 5. Where this goes (decision needed)

It was scoped as a **throwaway sandbox**: no deploy, no polish budget. Two decisions would change what is worth building:

- **Replace the three.js homepage?** Then the 9 clickable project buildings, the departure board and the screen-reader fallback all have to be ported, and layout has to reserve lots for them. This is the biggest scope change. (L)
- **Ship it as a standalone page** linked from the landing page? Then the phone-portrait and performance items above stop being optional. (M)
