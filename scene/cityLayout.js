// Single source of truth for where everything in the city stands.
//
// Pure data + geometry maths. Imports nothing from three.js on purpose: this is
// the file that gets replaced when real Shinjuku coordinates arrive, and it must
// be readable and editable without knowing anything about the renderer.
//
// Model: a 3x3 lattice of BLOCKS separated by streets. Each block is subdivided
// into a 3x3 lattice of LOTS. A building occupies exactly one lot. That is the
// whole placement system — tile-based, like the 90s isometric games this is
// imitating, and it means "move a building" is a two-integer edit.
//
//        col 0        col 1        col 2
//   row 0 [西新宿]   ** STATION **  [歌舞伎町]     (north pedestrian deck)
//   row 1 [高層ビル]  ** STATION ** [伊勢丹]        (main concourse)
//   row 2 [南新宿]   ** STATION **  [ゴールデン街]  (Southern Terrace)
//
// Everything is in scene metres, centred on the station at the origin.
// NOTE: the district assignments above are COMPRESSED and partly invented.
// Real Shinjuku has Golden Gai north-east by Kabukichō, not south-east; it sits
// at [2][2] here for composition. Replace this file, not the geometry modules.

export const BLOCK = 46          // block edge, metres
export const STREET = 10         // street width, metres
export const BLOCK_PITCH = BLOCK + STREET   // 56

export const LOT = 14            // building footprint budget inside a block
export const LOT_PITCH = 16      // 3 * 14 + 2 * 2 gap = 46 = BLOCK

/** Half-extent of the whole map: 3 blocks + 4 streets = 178m across. */
export const MAP_HALF = (3 * BLOCK + 4 * STREET) / 2   // 89

/** Centre of block `i` (0..2) along one axis. */
export const blockCenter = (i) => (i - 1) * BLOCK_PITCH

// ── The diamond cell ─────────────────────────────────────────────────────────
// [2,0] gets a 45°-rotated "diamond" treatment. Only the lot LATTICE scales
// down here — never rotate a lot/building position, that reopens the overlap
// risk an earlier draft of this plan ran into. Rotation is rendering-only
// (street.js's kerb/paving geometry, a separate task) and consumes
// DIAMOND_OUTER_SIDE below; this file never rotates anything.
export const DIAMOND_CELL = [2, 0]
export const DIAMOND_LOT_SCALE = 0.5   // BLOCK/2=23m local size, LOT'=7m, LOT_PITCH'=8m
// Largest 45°-rotated square whose own diagonal is BLOCK (so its corners just
// touch the cell's own edge midpoints) — rendering-only, consumed by street.js.
export const DIAMOND_OUTER_SIDE = BLOCK * Math.SQRT1_2   // ≈32.53m

/** Centre of lot `j` (0..2) within a block, relative to the block centre.
 * `cell` is optional and only scales the lattice down for DIAMOND_CELL —
 * every other caller omits it and gets the normal 1x scale. */
export function lotOffset(j, cell) {
  const scale = (cell && String(cell) === String(DIAMOND_CELL)) ? DIAMOND_LOT_SCALE : 1
  return (j - 1) * LOT_PITCH * scale
}

/** World centre of a lot. `cell` and `lot` are both [row, col]. */
export function lotCenter([row, col], [lotRow, lotCol]) {
  return {
    x: blockCenter(col) + lotOffset(lotCol, [row, col]),
    z: blockCenter(row) + lotOffset(lotRow, [row, col]),
  }
}

/** Street centre-lines, in both axes. 4 lines bounding 3 blocks. */
export const STREET_LINES = [-1, 0, 1, 2].map((i) => i * BLOCK_PITCH - BLOCK_PITCH / 2)

// ── The station ──────────────────────────────────────────────────────────────
// Occupies the WHOLE CENTRE COLUMN — cells [0,1], [1,1], [2,1] — not just the
// middle block. This is the elongated-along-the-tracks arrangement the real
// station has; STATION.cells replaces the old single STATION.cell.
//
// The tracks run north-south (along Z) in an open CORRIDOR at grade, not on a
// viaduct: RAIL_Y is the railhead height, and the four E-W streets (which sit
// at y=0, see street.js) become road bridges over the corridor for free.
// Concourse buildings are cross-decks bridging the corridor, not a podium
// standing IN it — see station.js's header for why the old podium had to go.
export const STATION = {
  cells: [[0, 1], [1, 1], [2, 1]],
  trackAxis: 'z',
  trackCount: 6,
}

// Corridor: the centre column's width (BLOCK) less a 2m retaining wall each
// side. Verified against the lot lattice: lotOffset(±1) = ±16, LOT = 14, so
// the outermost lots span [-23,-9] and [9,23] — CORRIDOR_W/2 = 21 consumes
// them exactly.
export const CORRIDOR_W = BLOCK - 4   // 42

// Vertical stack, all independent constants — none derived from another, so a
// mistake in one can't silently propagate the way the old viaductY math did
// through station.js's PODIUM_H/DECK_TOP chain.
export const TRENCH_FLOOR_Y = -1.0
export const RAIL_Y = -0.8            // railhead; ambient.js's train rides this
export const PLATFORM_Y = 0.3         // platform top — ABOVE grade on purpose,
                                       // so the canopy vaults spring above the
                                       // ground plane rather than out of a hole

// Six tracks, three islands — reusing the exact spacing the old viaduct used
// (TRACK_SPACING 3.2, centred), so every gap between adjacent tracks is 3.2m.
// Islands sit in three of the five gaps; the other two are through-gaps with
// no platform. Envelope is 16m wide, well inside the 42m corridor.
export const TRACK_SPACING = 3.2
export const PLATFORM_XS = [-6.4, 0, 6.4]     // island centres
export const PLATFORM_W = 2.4

// Cross-decks bridging the corridor. z-spans are all inside their own block
// (STREET_LINES sit at z=±28,±84 with STREET=10, so a block's usable z-range
// stops 2m short of ±23/±79) and reach up to y=14 — taller than the old 13m
// roofline, so the complex keeps its silhouette even though the vaults
// themselves (see station.js) are much lower.
export const CROSS_DECKS = [
  { id: 'north',    z: [-58, -46], y: [6, 9] },
  { id: 'concourse', z: [6, 21],   y: [6, 14] },
  { id: 'southern', z: [36, 58],   y: [6, 12] },
]

// ── Project sites ────────────────────────────────────────────────────────────
// The nine clickable buildings. Chosen ONCE and written down — never randomised
// at runtime, because a project that moves between page loads makes the site
// unnavigable and breaks any link anyone shares.
//
// `id` matches an entry in App.vue's `apps` array, which stays the single source
// of truth for titles, URLs and status. If an id here has no match there, the
// site is skipped rather than rendering a nameless building.
//
// Spread over the 6 non-station, non-Golden-Gai blocks. [2][2] is Golden
// Gai — scenery only, deliberately not clickable.
//
// `flip7` and `right-word-japanese` used to stand at [0,1] and [2,1] — the
// station now occupies the whole centre COLUMN (STATION.cells), so both were
// evicted and relocated below to free lots elsewhere. `right-word-japanese`
// specifically took [1,2]'s OUTER lot (col 2, away from the corridor) rather
// than an inner one, on purpose — it leaves [1,2]'s whole inner column free
// for the flank buildings STATION_FLANK_SITES claims below.
//
// `japan-map` and `bible-hymn-kids` used to stand at [2,0] — that cell became
// the DIAMOND_CELL (see below), whose scaled-down lattice is filler-only, so
// both were relocated to free lots at [0,0]. `bible-hymn-kids` kept its old
// relative lot ([0,0]); `japan-map`'s old relative lot ([1,1]) is algo-lab's,
// so it took [1,0] instead.
export const PROJECT_SITES = [
  { id: 'algo-lab',            cell: [0, 0], lot: [1, 1], h: 30 },
  { id: 'flip7',               cell: [0, 2], lot: [0, 0], h: 22 },
  { id: 'machi-koro',          cell: [0, 2], lot: [1, 2], h: 20 },
  { id: 'venue-search',        cell: [1, 0], lot: [1, 0], h: 34 },
  { id: 'reading-buddy',       cell: [1, 2], lot: [1, 2], h: 24 },
  { id: 'japan-map',           cell: [0, 0], lot: [1, 0], h: 26 },
  { id: 'right-word-japanese', cell: [1, 2], lot: [2, 2], h: 18 },
  { id: 'japanese-dashboard',  cell: [0, 0], lot: [2, 2], h: 24 },
  { id: 'bible-hymn-kids',     cell: [0, 0], lot: [0, 0], h: 20 },
]

/** Centre of a GROUP of lots — the mean of each lot's own centre. Only needed
 * for footprints too big for one lot (see LANDMARK_SITES below); a one-lot
 * group reduces to lotCenter() exactly. */
export function lotGroupCenter(cell, lots) {
  const centers = lots.map((lot) => lotCenter(cell, lot))
  return {
    x: centers.reduce((s, c) => s + c.x, 0) / centers.length,
    z: centers.reduce((s, c) => s + c.z, 0) / centers.length,
  }
}

// ── Landmark sites ───────────────────────────────────────────────────────────
// The two hero towers (都庁 and the Cocoon) — backdrop, never clickable.
// Real 都庁 and Cocoon stand in 西新宿, west of the station: column 0 in this
// grid. Both [0][0] and [1][0] are column 0, but [1][0] is the one labelled
// 高層ビル (skyscraper district) in the header table above — the literal
// high-rise district, and it sits at the station's own row, matching how the
// real towers stand due west of Shinjuku Station rather than off to a corner.
// [0][0] keeps its plain 西新宿 label and its existing filler/project mix.
//
// A ~35-45m compressed landmark has a footprint bigger than one 14m LOT (see
// towers.js's TOCHO_SPIKE_H / COCOON_SPIKE_H scaling), so `lots` lists every
// lot the building claims — plural, the way PROJECT_SITES' singular `lot`
// can't express. fillerBuildings() below and cityLayout.test.mjs both key off
// this list so nothing else is generated inside the footprint.
//
// `h` is the ROOFLINE HEIGHT ONLY. It does not set the footprint: towers.js
// scales 都庁 non-uniformly, freezing the plan at its own TOCHO_PLAN_H so the
// podium keeps the width that was verified to clear venue-search. Raising `h`
// here therefore cannot reintroduce a collision — see towers.js's header.
export const LANDMARK_SITES = [
  // 都庁 is a complex, not one tower: No.1 (twin-tower), No.2, and the low
  // Assembly Building need room for three distinct masses around a plaza, so
  // this claims a 6-lot group (the full north sub-row [0,0]-[0,2], plus
  // [1,1]-[1,2] of the middle sub-row avoiding lot [1,0] which venue-search
  // already owns, plus [2,2]).
  //
  // [2,2] was added to fix a real bug, not for room. The Assembly Building is
  // positioned by a hard-coded local offset in towers.js that lands it at world
  // (-40, 15) — on lot [2,2], which nothing claimed — so fillerBuildings() had
  // generated a 38.3m filler tower at (-40, 16), standing INSIDE the Assembly
  // Building. The test below could not catch it because the Assembly took
  // free-floating coordinates instead of claiming a lot, which is exactly the
  // failure mode this file's header warns about. Claiming the lot both evicts
  // the filler and extends the plaza onto the only side of the complex the
  // camera can actually see (see towers.js's createPlaza).
  //
  // NOTE: `lots` also feeds lotGroupCenter(), so adding one moved 都庁's anchor
  // by (+2.13, +4.27). towers.js subtracts exactly that from its local offsets,
  // so every world position is unchanged — if you add another lot here, do the
  // same there or the whole complex will slide.
  //
  // 67m, not the 40m this used to be, because at 40m 都庁 was NOT the tallest
  // thing on screen — BLOCK_SPECS below gives filler towers up to 44m, and
  // depth pushes objects up the frame, so the tallest of them (h=43.1 at
  // -72,-72) projects to screenY 78.1 while 都庁's mast tip reached 75.7. A
  // hero landmark the skyline hides is not a hero landmark. See towers.js's
  // header for the full derivation and why 55m and 60m both fail it.
  { id: 'tocho', cell: [1, 0], lots: [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2]], h: 67 },
  // Cocoon's base stays under 11m even at full compressed height, so one lot
  // is enough — same footprint budget as an ordinary project building.
  //
  // Left at 34m when 都庁 went to 60m, so the pair no longer holds the real
  // 243:204 height ratio (that would want ~50m here) and the Cocoon reads
  // squatter than life. Deliberate: only 都庁 was in scope. Restoring the
  // ratio is this one number.
  { id: 'cocoon', cell: [1, 0], lots: [[2, 1]], h: 34 },
]

// ── Street scenery ───────────────────────────────────────────────────────────
// Konbini, kōban and vending banks. Scenery only — never clickable, even though
// their modules still return a `hit` mesh from when they were interactive.
//
// These get LOTS rather than free-floating street coordinates, for the same
// reason projects and landmarks do: a lot cannot collide with anything, whereas
// "just inside the block edge" is a 0.6 m margin against the outermost filler
// footprint and would need re-checking on every layout change. They sit on edge
// lots so they read as street-facing, and each is far smaller than the 14 m lot
// budget (konbini 7×5.5, kōban 4×4, a vending bank ~3.3×0.75).
//
// `ry` is a yaw in radians. The modules all build their frontage facing +Z, and
// this camera (azimuth 45°) sees the +X and +Z faces, so ry: 0 keeps a shopfront
// visible; -Math.PI/2 turns it to face +X for a corner.
// `koban` and the first `vending` used to stand at [2,1] and [0,1] — both now
// inside STATION.cells — and were relocated to free lots.
// The second `vending` and `koban` used to stand at [2,0] — that cell became
// the DIAMOND_CELL (see above), whose scaled-down lattice is filler-only, so
// both were relocated to [0,0], keeping their old relative lot ([2,1] and
// [0,2] respectively, both free there) and unchanged `ry`.
export const SCENERY_SITES = [
  { id: 'konbini', cell: [1, 2], lot: [2, 0], ry: 0 },          // south edge, east block
  { id: 'koban',   cell: [0, 0], lot: [2, 1], ry: 0 },
  { id: 'vending', cell: [0, 2], lot: [2, 2], ry: 0 },
  { id: 'vending', cell: [0, 0], lot: [0, 2], ry: -Math.PI / 2 },
]

// ── Station flank buildings ──────────────────────────────────────────────────
// Retail slabs hard against the corridor's east edge — [1,2]'s inner lot
// column (col 0), left free by right-word-japanese taking the outer lot
// instead (see PROJECT_SITES). Only 2 of that column's 3 lots are actually
// free: konbini (SCENERY_SITES) already owns [2,0]. There is no equivalent
// room on the WEST flank either: 都庁 (LANDMARK_SITES below) already claims
// [1,0]'s entire inner column plus two more lots, leaving that block exactly
// one free lot, on its OUTER edge — nowhere near the corridor. So this is
// deliberately east-only, and deliberately 2 buildings, not 3.
//
// Rendered by fillerBuildings() below (same InstancedMesh as ordinary filler,
// zero extra draw calls) rather than through PROJECT_SITES/SCENERY_SITES,
// since these are plain scenery with no id-lookup or interactivity story.
export const STATION_FLANK_SITES = [
  { cell: [1, 2], lot: [0, 0], w: 11, d: 8, h: 20 },
  { cell: [1, 2], lot: [1, 0], w: 11, d: 8, h: 22 },
]

// ── Block character ──────────────────────────────────────────────────────────
// Drives the filler generator below. `fill` is the fraction of free lots that
// get a building — leaving gaps reads as car parks and side lanes, and costs
// nothing to render.
// [0,1] and [2,1] used to be plain midrise blocks; both are now inside
// STATION.cells (the station occupies the whole centre column) and have no
// entry here, so fillerBuildings() below generates nothing on them.
const BLOCK_SPECS = [
  { cell: [0, 0], kind: 'tower',   height: [28, 44], fill: 0.7 },
  { cell: [0, 2], kind: 'midrise', height: [16, 28], fill: 0.9 },  // Kabukichō: dense
  { cell: [1, 0], kind: 'tower',   height: [26, 42], fill: 0.7 },
  { cell: [1, 2], kind: 'midrise', height: [18, 30], fill: 0.8 },
  { cell: [2, 0], kind: 'midrise', height: [16, 26], fill: 0.6 },
  { cell: [2, 2], kind: 'goldengai', height: [6, 9], fill: 1.0 }, // scenery block
]

/** The Golden Gai block is built by its own module, not the filler generator. */
export const GOLDEN_GAI_CELL = [2, 2]

// Deterministic LCG — same idiom as street.js / ambient.js, so layout is stable
// across reloads and screenshots are comparable.
function makeRng(seed) {
  let s = seed
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
}

/**
 * Filler buildings: everything that is not the station, a project, or Golden Gai.
 * Returns plain records — no three.js — so blocks.js can instance them and tests
 * can assert on them without a renderer.
 */
export function fillerBuildings() {
  const rng = makeRng(19910714)
  const out = []
  const claimed = new Set(
    PROJECT_SITES.map((p) => `${p.cell}|${p.lot}`),
  )
  for (const site of LANDMARK_SITES) {
    for (const lot of site.lots) claimed.add(`${site.cell}|${lot}`)
  }
  for (const site of SCENERY_SITES) claimed.add(`${site.cell}|${site.lot}`)
  for (const site of STATION_FLANK_SITES) claimed.add(`${site.cell}|${site.lot}`)

  // Flank buildings are hand-placed, not RNG'd — deterministic like every
  // other named site, and claiming their lots above still reshuffles the RNG
  // draw for every ordinary filler lot after them, exactly as claiming any
  // other site's lot does.
  for (const site of STATION_FLANK_SITES) {
    const { x, z } = lotCenter(site.cell, site.lot)
    out.push({ x, z, w: site.w, d: site.d, h: site.h, kind: 'midrise', ry: 0 })
  }

  for (const spec of BLOCK_SPECS) {
    if (String(spec.cell) === String(GOLDEN_GAI_CELL)) continue
    for (let lotRow = 0; lotRow < 3; lotRow++) {
      for (let lotCol = 0; lotCol < 3; lotCol++) {
        const key = `${spec.cell}|${[lotRow, lotCol]}`
        if (claimed.has(key)) continue
        if (rng() > spec.fill) continue

        const { x, z } = lotCenter(spec.cell, [lotRow, lotCol])
        const [hMin, hMax] = spec.height
        // Footprints stay inside the lot so buildings never bleed into a street.
        // DIAMOND_CELL's lattice is scaled down (see lotOffset), so its lots
        // need the scaled budget too, or filler would bleed past the shrunk lot.
        const cellLotSize = String(spec.cell) === String(DIAMOND_CELL) ? LOT * DIAMOND_LOT_SCALE : LOT
        const w = cellLotSize * (0.62 + rng() * 0.3)
        const d = cellLotSize * (0.62 + rng() * 0.3)
        out.push({
          x, z, w, d,
          h: hMin + rng() * (hMax - hMin),
          kind: spec.kind,
          // Small yaw so a block doesn't read as a perfect stamp. Kept tiny:
          // the isometric look depends on walls landing near 45 degrees.
          ry: (rng() - 0.5) * 0.08,
        })
      }
    }
  }
  return out
}
