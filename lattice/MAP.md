# MAP: what stands where in the Shinjuku sandbox

A lookup for agents who need to change a place. The truth is in `src/layout.ts` (data) and the sprite files (art); this file is the index to them. **If you edit `DISTRICTS`, `LANDMARKS`, `ENTRANCES`, `LOW_ZONES`, `DECKS`, `BRIDGES` or `TRAINS`, update this file** (`npm run check` fails if a landmark id or an entrance's coordinates are missing from it).

## 1. Units and directions

| Unit | Size | Notes |
|---|---|---|
| **tile** | ~10 m | `gx` east-west, `gy` north-south. All placement tables are in tiles. |
| **lot** | 2×2 tiles | every building stands on one (or on a rect of them, for landmarks) |
| **block** | 10×10 tiles | tiles 0-1 are street (west and north edges), tiles 2-9 are 4×4 lots. Block `(bx,by)` covers `gx = bx*10 .. bx*10+9`, `gy = by*10 .. by*10+9`. |
| **ward** | 160×160 tiles = 16×16 blocks | `W = 160` |

- **Compass:** `+gx` is EAST (screen down-right), `+gy` is SOUTH (screen down-left). North is the top-right edge of the screen diamond; west is the top-left.
- **Streets** are `g % 10` in {0, 1}, in both axes: two tiles wide, with car lanes at +0.4 and +1.6.
- **The camera sees only the `+gx` and `+gy` faces** of anything. A building on a lot's `+gx` or `+gy` side hides everything of it below its own roofline. This decided several placements below (§6).
- **Opening frame:** 都庁 top-left, Cocoon centre, the station bottom-right, Isetan bottom-right corner, the west entrance pylons between them.

## 2. The ward at block resolution

Cell = `district` + `landmark` + `entrance count`. Row = `by`, column = `bx`. Generated from the data.

```
      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
 0  F.. F.. F.. F.. F.. F.. F.. R.. R.. F.. O.. O.. O.. O.. F.. F..
 1  F.. F.. N.. N.. N.. N.. F.. R.. R.. O.. O.. O.. O.. O.. O.. F..
 2  F.. N.. N.. N.. N.. N.. F.. R.. R.. KU. K.. K.. K.. K.. K.. F..
 3  F.. N.. N.. N.. N.. N.. N.. R.. R.. K.. K.. KH. K.. K.. K.. F..
 4  F.. N.. N.. N.. N.. N.. N.. R.. R.. K.1 Kg. K.. K.. KY. K.. F..
 5  F.. N.. N.. N.. N.. N.. N.. R.. R.. E.1 E.. E.. E.. E.. E.. F..
 6  F.. N.. N.. N.. N.. N.. NC1 R.. R.. E.1 E.1 E.1 E.. E.. E.. F..
 7  F.. N.. N.. NT. N.. N.1 N.1 R.. R.. E.1 EI. E.. E.. E.. E.. F..
 8  F.. N.. N.. N.. N.. N.1 N.1 R.. R.. E.1 S.. S.. G.. G.. G.. G..
 9  F.. N.. N.. N.. N.. N.. S.1 R.. R.. S.. S.. S.. G.. G.. G.. G..
10  F.. F.. N.. N.. N.. S.. S.. R.. R.. S.. S.. G.. G.. G.. G.. G..
11  F.. F.. F.. S.. S.. S.. S.. R.. R.. S.. S.. G.. G.. G.. G.. G..
12  F.. F.. F.. S.. S.. S.. S.. R.. R.. S.. S.. G.. G.. G.. G.. G..
13  F.. F.. F.. F.. S.. S.. S.. R.. R.. S.. S.. S.. G.. G.. G.. F..
14  F.. F.. F.. F.. F.. F.. S.. R.. R.. S.. S.. S.. F.. F.. F.. F..
15  F.. F.. F.. F.. F.. F.. F.. R.. R.. F.. F.. F.. F.. F.. F.. F..
```

Landmark letters: **T** 都庁 · **C** Cocoon · **U** 区役所 · **H** TOHO · **g** 一番街 gate · **Y** Golden Gai · **I** Isetan. A digit is the number of subway entrances in that block.

## 3. Districts

| Code | Name | Blocks | Tiles | What stands there | Art (`defForLot` in `sprites.ts`) |
|---|---|---|---|---|---|
| `N` | Nishi-Shinjuku towers | bx 1-6, by 1-10 | gx 10-69, gy 10-109 | 6-11 storey offices on 4×4-tile tower sites (1 lot in 4), 都庁, Cocoon, 6 west entrances | `OFFICE` |
| `K` | Kabukichō | bx 9-14, by 2-4 | gx 90-149, gy 20-49 | 3-7 storey neon "pencil" buildings, 4 landmarks, 1 entrance | `ZAKKYO` 85%, `MIDRISE` 15% |
| `O` | Shin-Okubo (north of K) | bx 9-14, by 0-1 | gx 90-149, gy 0-19 | 2-5 storey pink Korea-Town shopfronts | `OKUBO` 85% (`shopping.ts`), else `NEIGHBOUR` |
| `E` | 3-chōme shopping (south of K, east of the station) | bx 9-14, by 5-8 | gx 90-149, gy 50-89 | retail 2-5 storeys, Isetan, 6 east entrances | `SHOP` 45% (`shopping.ts`), then `MIDRISE` 60% / `ZAKKYO` 40% of the rest |
| `S` | south | bx 3-11, by 8-14 | gx 30-119, gy 80-149 | plain low-mid blocks, no landmarks | `MIDRISE` 50% / `NEIGHBOUR` 50% |
| `G` | Gyoen (park) | bx 11-15, by 8-13 | gx 110-159, gy 80-139 | tree groves, no bare lots | `GROVE`; terrain painted `leaf` |
| `R` | rail corridor | bx 7-8, all by | gx 70-89 | the station and tracks (§5) | nothing is built on `R` lots |
| `F` | fringe residential | edges | map border | 1-4 storey concrete blocks | `NEIGHBOUR` |

`districtAtTile(gx, gy)` answers for the whole block, street tiles included.

## 4. Landmarks (`LANDMARKS` in `layout.ts`)

Each claims every lot it touches. Footprint `w×d` must equal what `landmarkDef(id)` declares, because the depth sorter gets those numbers.

| `id` | Name | Tiles (gx, gy) | Size | Block | Art |
|---|---|---|---|---|---|
| `tocho` | 東京都庁舎 | 32-39, 72-79 | 8×8 | (3,7) | `landmarks.ts` |
| `cocoon` | コクーンタワー | 66-69, 66-69 | 4×4 | (6,6) | `landmarks.ts` (drawn in `animate`, not massing) |
| `kuyakusho` | 新宿区役所 (ward office) | 92-97, 22-25 | 6×4 | (9,2) | `kabukicho.ts` |
| `toho` | TOHOシネマズ新宿 (Godzilla head) | 112-115, 34-37 | 4×4 | (11,3) | `kabukicho.ts` |
| `ichibangai` | 歌舞伎町一番街 gate | 102-103, 48-49 | 2×2 | (10,4) | `kabukicho.ts` |
| `goldengai` | ゴールデン街 | 132-135, 44-47 | 4×4 | (13,4) | `kabukicho.ts` |
| `isetan` | 伊勢丹 | 102-109, 74-79 | 8×6 | (10,7) | `shopping.ts` (`ISETAN`) |

Registry: `landmarkDef(id)` in `landmarks.ts` merges `BY_ID`, `KABUKICHO_DEFS` and `ISETAN`; it throws on an id with no art. Each landmark's `label` becomes a DOM name plate (`addPlate` in `main.ts`).

## 5. The station (rail corridor `gx 72-89`, full height of the ward)

Frontage streets stay streets at gx 70-71 (west) and 90-91 (east). There is **no** street at gx 80 (avenue 8): it is inside the corridor.

| Piece | Where | Notes |
|---|---|---|
| **Track columns** | gx 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89 | 12 tracks |
| **Platform columns** | gx 73, 76, 79, 82, 85, 88 | 6 island platforms, one tile wide |
| **Decks** (cross-concourses, span the corridor) | north `gy 62-64`; **concourse 新宿駅 `gy 74-78`** (green name plate); south `gy 88-91` | `DECKS`. Trains pass under them (cars hidden). |
| **Bridges** (road bridges over the corridor) | `gy 100-101`, the east-west street south of the canopies | `BRIDGES`; art `station.ts` `bridge()`. Slab on piers at the platform columns, clear of the trains (underside 1.3 storeys). **Test piece: open ends, no ramps, no traffic crosses.** Trains are hidden beneath it like a deck (`carVisible`). |
| **Platform canopies** | one per platform column, `gy 56-97` minus the decks | `STATION_PIECES`; art `station.ts` `canopy()` |
| **Trains** (`TRAINS`) | gx 74 S, 77 N, 80 S, 83 N, 86 S, 89 N (S/N = direction of travel) | 4-7 cars each. Stop 9 s on the platform south of the concourse (gy 79-87). |

**Why the trains are on 74/77/80/83/86/89:** every one has a platform to its WEST. A canopy east of a train is nearer the camera, sorts after it and hides it. Do not move a train to a column without a west platform (`check.mjs` asserts it).

## 6. Subway entrances (`ENTRANCES`; art `entrances.ts`)

Each claims ONE lot (2×2) and is a plaza with a stair hood and a lit line pylon (letters: M Marunouchi red · F Fukutoshin brown · S Toei Shinjuku green · E Oedo magenta). **Line-to-location assignment is illustrative, not surveyed.** They get no name plate.

| Side | gx,gy | line | Block |
|---|---|---|---|
| West | `68,62` | marunouchi | (6,6) |
| West | `68,72` | oedo | (6,7) |
| West | `68,82` | shinjuku | (6,8) |
| West | `68,92` | marunouchi | (6,9) |
| West | `58,72` | oedo | (5,7) |
| West | `58,82` | shinjuku | (5,8) |
| East | `98,48` | oedo | (9,4) |
| East | `98,58` | marunouchi | (9,5) |
| East | `98,68` | shinjuku | (9,6) |
| East | `98,78` | marunouchi | (9,7) |
| East | `98,88` | fukutoshin | (9,8) |
| East | `108,68` | fukutoshin | (10,6) |
| East | `118,68` | shinjuku | (11,6) |

**Every east entrance is its block's SE-corner lot** (gx and gy both ≡ 8 mod 10), so what stands in front of it (+gx, +gy) is a street, not a building. Mid-block they were buried: a neighbour hides everything below its roofline and a 3.4-storey pylon cleared only the top third. `check.mjs` enforces this for the east side. The west ones are mid-block and were reported readable in screenshots; that was not investigated further.

## 7. Height caps, so landmarks can be seen (`LOW_ZONES` in `layout.ts`)

Filler in these tile rects is capped (`levelCap`), because the camera looks from the south-east and filler on a landmark's `+gx`/`+gy` side hides it.

| Rect (gx, gy; half-open) | Max level | Protects |
|---|---|---|
| 130-143, 42-55 | 2 | ゴールデン街 (132,44), was invisible behind 5-storey filler |
| 92-105, 26-31 | 3 | 新宿区役所 (92,22): podium and forecourt |

If you add a landmark and it vanishes behind filler, add a zone here before redrawing the art.

## 8. People and vehicles

- **Buses:** 8 of the 64 vehicles (`isBus(i) = (i & 7) === 3` in `main.ts`), on avenues `BUS_AVENUE = [8,7,7,9,5,10,6,11]` (station frontages, concourse cross-streets, Isetan, the 一番街 street). Art `drawBus` in `sprites.ts`.
- **Crowds** (`CROWDS` at the end of `layout.ts`, art `crowd.ts`): street-margin strips only, no sidewalks. `frontage-w` / `frontage-e` (gx 70 / 90, gy 64-92), four zebras at gy 69.2 and 82.1, `isetan-s` (gy 80-81, gx 98-112), `isetan-w` (gx 100-101, gy 70-84), `ichibangai-s` (gy 50-51, gx 92-116), `ichibangai-w` (gx 100-101, gy 40-58), plus 6 people per entrance walking mouth ↔ street (`entranceWalk`).
- `window.__lattice.cars` exposes the vehicle arrays so a look can follow a bus.

## 9. Which file draws what

| File | Owns |
|---|---|
| `layout.ts` | ALL placement data and pure arithmetic (no canvas). Start here. |
| `sprites.ts` | palette (day and night stop sets: add a slot to BOTH), filler sprites `ZAKKYO` `MIDRISE` `OFFICE` `NEIGHBOUR` `GROVE`, `defForLot`, `drawCar`, `drawBus` |
| `landmarks.ts` | 都庁, Cocoon, and the `landmarkDef` registry |
| `kabukicho.ts` | 区役所, TOHO, 一番街, Golden Gai |
| `shopping.ts` | Isetan, `SHOP`, `OKUBO`, `shoppingDefFor` |
| `entrances.ts` | subway entrances (`entranceDef(line)`) |
| `station.ts` | canopies, decks, train cars, rail ground (`paintRail`) |
| `crowd.ts` | pedestrians |
| `main.ts` | boot, camera, sorter fill (`fillFrame`), name plates, traffic, trains' per-frame wiring |
| `tools/check.mjs` | `npm run check`: layout/landmark/entrance/train/crowd invariants, no browser |
| `tools/perf.mjs` | `npm run perf`: frame-cost guard (headless software rendering) |
| `tools/look.mjs` | screenshot + `--eval` harness |

## 10. How to look at a place

Dev server: `npm run dev` (port 5173). In the browser console:

```js
const go = (x, y, z) => { const c = __lattice.camera; c.zoomAt(z / c.zoom, c.viewW / 2, c.viewH / 2); c.centerOnTile(x, y); };
go(115, 35, 0.5)   // Kabukichō
```

`?day=8` makes the day 8 s long (dark at ~4 s). For screenshots, `node tools/look.mjs http://localhost:5173/ --out DIR --size 1280x800 --settle 3000 --at "<the same expression>"`. `--at` silently fails if Vite hot-reloads mid-capture (the frame is then just the opening view): check `camera.zoom` with `--eval`.

## 11. Rules that bit people on this map

- A sprite's `massing` reads no palette (slot names or raw colours only); `animate` may only draw where nothing of its own sprite stands in front. See the header of `landmarks.ts`.
- A landmark's footprint in `LANDMARKS` and the sprite's `w×d` must match, and it must be lot-aligned and inside ONE block.
- A moving thing must never overlap a deck in the sorter footprint (a cycle); hide it instead.
- `localhost` perf numbers are software-rendered and noisy (±0.3 ms). `npm run perf` is a regression guard, not a GPU measurement.

## 12. Not modelled

Real street names (Yasukuni-dōri, Kōshū-kaidō, Shinjuku-dōri), Seibu-Shinjuku station, Hanazono shrine, Takashimaya, Studio Alta, the elevated expressway and the curved rail bundle (skipped by decision: the lot grid is orthogonal). Don't assume any of them exists at a coordinate.
