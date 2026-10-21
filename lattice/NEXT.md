# NEXT: Shinjuku lattice sandbox

State as of 2026-10-20: phase 1 (buildings) is built but **uncommitted** on `shinjuku-landing`.
`npm run check` and `npm run build` pass. The plan that produced it is
`~/.claude/plans/using-the-existing-working-golden-pine.md`.

Effort: **S** is under an hour, **M** is a session, **L** is multi-session.

## 0. Housekeeping first

- **Commit phase 1.** `lattice/` has 4 deleted files, 2 new ones (`src/station.ts`, `src/landmarks.ts`) and edits to the rest. (S)
- **Stop committing screenshots.** Commit `3cef2b4` added `.look-build/`, `.look-night/` and `.look-save/`. `lattice/.gitignore` only ignores `.look/` and `dist/`. Add `.look*/`; removing the already-tracked ones is a delete, so ask first. (S)
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
