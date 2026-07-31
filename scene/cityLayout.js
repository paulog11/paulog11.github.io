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
