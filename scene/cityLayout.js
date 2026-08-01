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
//   row 0 [西新宿]   [北口広場]    [歌舞伎町]
//   row 1 [高層ビル]  ** STATION ** [伊勢丹]
//   row 2 [南新宿]   [サザン]      [ゴールデン街]
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

/** Centre of lot `j` (0..2) within a block, relative to the block centre. */
export const lotOffset = (j) => (j - 1) * LOT_PITCH

/** World centre of a lot. `cell` and `lot` are both [row, col]. */
export function lotCenter([row, col], [lotRow, lotCol]) {
  return {
    x: blockCenter(col) + lotOffset(lotCol),
    z: blockCenter(row) + lotOffset(lotRow),
  }
}

/** Street centre-lines, in both axes. 4 lines bounding 3 blocks. */
export const STREET_LINES = [-1, 0, 1, 2].map((i) => i * BLOCK_PITCH - BLOCK_PITCH / 2)

// ── The station ──────────────────────────────────────────────────────────────
// Occupies the whole centre block. The tracks run north-south (along Z) across
// the entire map and pass through it, which is what makes the station read as a
// station rather than a big shed — and gives ambient.js's train a real route.
export const STATION = {
  cell: [1, 1],
  w: BLOCK - 2,          // 44 — sits inside its block, roads pass either side
  d: BLOCK - 2,
  h: 13,                 // concourse roof height
  trackAxis: 'z',
  trackCount: 6,
  viaductY: 8.5,         // deck height; streets pass under
}

// ── Project sites ────────────────────────────────────────────────────────────
// The nine clickable buildings. Chosen ONCE and written down — never randomised
// at runtime, because a project that moves between page loads makes the site
// unnavigable and breaks any link anyone shares.
//
// `id` matches an entry in App.vue's `apps` array, which stays the single source
// of truth for titles, URLs and status. If an id here has no match there, the
// site is skipped rather than rendering a nameless building.
//
// Spread over 7 of the 8 non-station blocks. [2][2] is Golden Gai — scenery
// only, deliberately not clickable.
export const PROJECT_SITES = [
  { id: 'algo-lab',            cell: [0, 0], lot: [1, 1], h: 30 },
  { id: 'flip7',               cell: [0, 1], lot: [0, 1], h: 22 },
  { id: 'machi-koro',          cell: [0, 2], lot: [1, 2], h: 20 },
  { id: 'venue-search',        cell: [1, 0], lot: [1, 0], h: 34 },
  { id: 'reading-buddy',       cell: [1, 2], lot: [1, 2], h: 24 },
  { id: 'japan-map',           cell: [2, 0], lot: [1, 1], h: 26 },
  { id: 'right-word-japanese', cell: [2, 1], lot: [2, 1], h: 18 },
  { id: 'japanese-dashboard',  cell: [0, 0], lot: [2, 2], h: 24 },
  { id: 'bible-hymn-kids',     cell: [2, 0], lot: [0, 0], h: 20 },
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
export const LANDMARK_SITES = [
  // 都庁: ~20m-square base at 40m compressed doesn't fit a 14m lot, so it
  // claims a 2x2 group (avoiding lot [1,0], which venue-search already owns).
  { id: 'tocho', cell: [1, 0], lots: [[0, 1], [0, 2], [1, 1], [1, 2]], h: 40 },
  // Cocoon's base stays under 11m even at full compressed height, so one lot
  // is enough — same footprint budget as an ordinary project building.
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
export const SCENERY_SITES = [
  { id: 'konbini', cell: [1, 2], lot: [2, 0], ry: 0 },          // south edge, east block
  { id: 'koban',   cell: [2, 1], lot: [0, 0], ry: 0 },          // by the station's south exit
  { id: 'vending', cell: [0, 1], lot: [2, 2], ry: 0 },          // north of the station
  { id: 'vending', cell: [2, 0], lot: [0, 2], ry: -Math.PI / 2 },
]

// ── Block character ──────────────────────────────────────────────────────────
// Drives the filler generator below. `fill` is the fraction of free lots that
// get a building — leaving gaps reads as car parks and side lanes, and costs
// nothing to render.
const BLOCK_SPECS = [
  { cell: [0, 0], kind: 'tower',   height: [28, 44], fill: 0.7 },
  { cell: [0, 1], kind: 'midrise', height: [14, 24], fill: 0.6 },
  { cell: [0, 2], kind: 'midrise', height: [16, 28], fill: 0.9 },  // Kabukichō: dense
  { cell: [1, 0], kind: 'tower',   height: [26, 42], fill: 0.7 },
  { cell: [1, 2], kind: 'midrise', height: [18, 30], fill: 0.8 },
  { cell: [2, 0], kind: 'midrise', height: [16, 26], fill: 0.6 },
  { cell: [2, 1], kind: 'midrise', height: [14, 22], fill: 0.6 },
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
        const w = LOT * (0.62 + rng() * 0.3)
        const d = LOT * (0.62 + rng() * 0.3)
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
