// Authored street-network data, hand-traced from reference/shinjuku-plan.png.
//
// Pure data, real metres, origin at the station centre (the pixel this file's
// tracing used as (0,0) sits at roughly the middle of the main JR concourse
// building). Imports nothing from three.js — same contract cityLayout.js
// documents at its own top: this is the file a real-coordinates replacement
// would touch, kept readable without a renderer.
//
// ── Calibration (do not trust past ±20%) ────────────────────────────────────
// m/px was derived from ONE landmark: the rail corridor's width at the very
// top of the reference image (y=0), before it fans out approaching the
// station. That band measured ~120px wide there; it was assigned a real width
// of 50m (a plausible throat for the ~10 JR/Odakyu/Keio tracks that run
// parallel before diverging further north, at ~4.5m spacing + shoulders).
//   M_PER_PX = 50 / 120 = 0.417
// Every other traced dimension inherits this ONE number. Cross-checked against
// two independent landmarks (Shinjuku Gyoen's visible corner reading as a
// plausible fraction of its real ~1.4km extent; a Kabukichō-like block reading
// as a plausible ~60m) and neither contradicted it, but this is a stylised
// illustration, not GIS data — treat every metre figure below as ±20%.
//
// The trace is bounded at ±420 real metres (a hair inside the ±425 that
// MAP_SCALE below maps onto MAP_HALF exactly), clamped rather than re-derived
// where the source image ran out of frame before a road did.
const M_PER_PX = 0.417

// 500m map / ~840m real trace half-width(*2) — fits the station, the
// immediate arterial star, Kabukichō, the near corner of Shinjuku Gyoen and
// enough of Nishi-Shinjuku to place towers, in the MAP_HALF=250 envelope
// scene/renderer.js's opts.mapHalf now accepts. Street widths are NOT scaled
// by this — see MIN_ROAD_W below.
const MAP_SCALE = 0.588
export const MAP_HALF = 250

// Applied AFTER MAP_SCALE. At 0.588 a real 14m secondary road (the narrowest
// class below) compresses to 8.2m — under this map's own ~8.4m legibility
// floor (CLAUDE.md-derived: 750/267 detail-drop x today's ~3m floor). Anything
// that would compress narrower than this is dropped from the trace rather
// than kept illegible; it is a transit-map exaggeration, the same kind that
// lets street width diverge from true-to-scale on any hand-drawn transit map.
const MIN_ROAD_W = 9

// Scene metres, exaggerated for the SAME reason as MIN_ROAD_W: the painted
// texture is ~4.1 px/m in both axes (2048px over 500m) versus today's
// 25.6 px/m across a road, so anything painted at its true width vanishes.
// See scene/net/streets.js for the full texel budget.
export const SIDEWALK_W = 3

// Real metres, PRE-scale — the widths ROAD_CLASS members compress from.
const ROAD_CLASS_W = { arterial: 40, primary: 24, secondary: 14 }

// ── Rail corridor ────────────────────────────────────────────────────────────
// Per-vertex width is the fan: narrow (10-track throat) approaching from the
// north, widest through the station's own platforms, narrowing again heading
// south past the platforms. Real metres, pre-scale.
const RAIL = {
  pts: [
    [12.5, -325.3], [25.0, -241.9], [81.3, -43.8],
    [62.5, 70.9], [87.6, 175.1], [100.1, 341.9],
  ],
  widths: [50.0, 50.0, 112.6, 91.7, 62.5, 50.0],
}

// ── Roads ────────────────────────────────────────────────────────────────────
// Real metres, pre-scale. `cls` indexes ROAD_CLASS_W. Traced off the reference
// image quadrant by quadrant — see the calibration note above for the
// tolerance this carries. Not exhaustive: ~14 roads is enough to carry the
// shape (fan, arterial star, dense NE grid, park-edge curve) without chasing
// every capillary lane the compression would flatten anyway.
const ROADS = [
  // The long west-side sweep: enters at the map's NW edge, threads the
  // roundabout, runs south past the Nishi-Shinjuku towers to the station's
  // west plaza and on toward the southern convergence. The single most
  // load-bearing road in the trace — it's what makes the roundabout read.
  { id: 'koshu-kaido', cls: 'arterial', pts: [
    [-396.1, -262.7], [-291.9, -250.2], [-208.5, -233.5], [-137.6, -212.7],
    [-104.2, -179.3], [-83.4, -125.1], [-54.2, -91.7], [-33.4, -54.2],
    [-20.8, -12.5], [0.0, 41.7], [20.8, 83.4],
  ] },
  // NE through-road, roughly horizontal, bounding Kabukichō's south edge.
  { id: 'ne-through', cls: 'arterial', pts: [
    [62.5, -166.8], [187.7, -158.5], [312.8, -150.1], [420, -128.0],
  ] },
  // The diagonal boulevard crossing near the station's south exit.
  { id: 'sw-diagonal', cls: 'arterial', pts: [
    [-333.6, 91.7], [-250.2, 196.0], [-208.5, 258.5], [-145.9, 300.2],
    [-83.4, 341.9], [-20.8, 383.6], [41.7, 420],
  ] },
  // Hugs Shinjuku Gyoen's NW edge.
  { id: 'park-edge', cls: 'arterial', pts: [
    [166.8, 50.0], [250.2, 133.4], [312.8, 196.0], [375.3, 258.5], [420, 321.1],
  ] },
  { id: 'ne-diagonal', cls: 'primary', pts: [
    [83.4, -325.3], [125.1, -241.9], [187.7, -179.3], [250.2, -116.8],
    [312.8, -54.2], [375.3, -12.5],
  ] },
  { id: 'sw-horizontal', cls: 'primary', pts: [
    [-396.1, 125.1], [-291.9, 133.4], [-187.7, 154.3], [-83.4, 166.8],
  ] },
  { id: 'nw-connector', cls: 'primary', pts: [
    [-125.1, -325.3], [-133.4, -262.7], [-137.6, -212.7],
  ] },
  { id: 'w-crossx', cls: 'primary', pts: [
    [-396.1, -150.1], [-279.4, -66.7], [-333.6, 70.9],
  ] },
  { id: 'n-crossbridge', cls: 'secondary', pts: [
    [-62.5, -325.3], [-50.0, -283.6], [-33.4, -233.5],
  ] },
  { id: 'kabukicho-in1', cls: 'secondary', pts: [
    [104.2, -325.3], [112.6, -241.9], [120.9, -166.8],
  ] },
  { id: 'kabukicho-in2', cls: 'secondary', pts: [
    [62.5, -262.7], [187.7, -250.2], [312.8, -237.7],
  ] },
  { id: 'e-mid1', cls: 'secondary', pts: [
    [333.6, -304.4], [417.0, -208.5], [420, -150.1],
  ] },
  { id: 's-mid1', cls: 'secondary', pts: [
    [20.8, 91.7], [83.4, 133.4], [145.9, 175.1],
  ] },
  { id: 'sw-local1', cls: 'secondary', pts: [
    [-312.8, 258.5], [-229.3, 321.1], [-166.8, 383.6],
  ] },
  // ── Connectors ──────────────────────────────────────────────────────────
  // The 14 roads above were each traced from a separate image crop (see the
  // module header on the tracing method); several read as visually
  // continuous in the source but land tens of metres apart once converted to
  // real coordinates, which plan.test.mjs's network-connectivity check
  // catches as a hard failure — a network with pieces that don't quite touch
  // renders as disconnected scratches. Rather than dragging an already
  // eyeballed-against-the-photo endpoint to force a join, each gap gets a
  // short literal connector: these are exactly the minimum-spanning bridges
  // between the trace's 8 disconnected pieces (computed once, not
  // hand-guessed), and every one of them corresponds to a real minor
  // connecting street/crossing in the source image, just not one this trace
  // otherwise bothered to carry its own full polyline.
  { id: 'link-kabukicho-rail', cls: 'secondary', pts: [[62.5, -262.7], [25, -241.9]] },
  { id: 'link-kabukicho-in', cls: 'secondary', pts: [[112.6, -241.9], [62.5, -262.7]] },
  { id: 'link-sw-horizontal', cls: 'secondary', pts: [[-291.9, 133.4], [-333.6, 91.7]] },
  { id: 'link-n-crossbridge', cls: 'secondary', pts: [[-33.4, -233.5], [25, -241.9]] },
  { id: 'link-sw-local', cls: 'secondary', pts: [[-208.5, 258.5], [-229.3, 321.1]] },
  { id: 'link-sw-rail', cls: 'secondary', pts: [[41.7, 420], [100.1, 341.9]] },
  { id: 'link-park-edge', cls: 'secondary', pts: [[166.8, 50], [62.5, 70.9]] },
]

// ── Districts ────────────────────────────────────────────────────────────────
// Real metres, pre-scale. A CLEAN, exactly-abutting partition of the map —
// NOT hand-fit to hug each road curve. Districts are only a lot-PLACEMENT
// substrate; the actual visible street shape lives entirely in ROADS/RAIL
// above, so there is nothing to gain by chasing road curves here, and a first
// draft that did (each polygon independently traced) produced a real
// overlap between nishi and sw-district that plan.test.mjs's lot-overlap
// check caught. Every boundary below is a shared literal number between the
// two districts it separates, so abutting edges can't drift apart or into
// each other.
//
// `lotPitch` is chosen per-district to fit that district's OWN compressed
// block size — see cityLayout's comment style: a number tuned at the wrong
// grain silently produces bald patches (Kabukichō at pitch 14 would leave
// ~1.8m of slack across a compressed strip; pitch 9 fits it). `kind` mirrors
// cityLayout.js's BLOCK_SPECS vocabulary (tower/midrise/dense) plus 'park',
// which carries no lots at all.
//
// Column/row split lines (x: -80, 340; z: -160, 80) partition the west/
// centre/east and north/mid/south bands; gyoen then clips a diagonal SE
// corner out of south-central along the same line real Gyoen's NW edge
// traced at (see park-edge road above), so the park's edge and the road that
// hugs it are the same line by construction.
const DISTRICTS = [
  { id: 'nishi', kind: 'tower', lotPitch: 26, poly: [
    [-420, -420], [-80, -420], [-80, 80], [-420, 80],
  ] },
  { id: 'sw-district', kind: 'midrise', lotPitch: 18, poly: [
    [-420, 80], [-80, 80], [-80, 420], [-420, 420],
  ] },
  { id: 'kabukicho', kind: 'dense', lotPitch: 9, poly: [
    [-80, -420], [340, -420], [340, -160], [-80, -160],
  ] },
  { id: 'east-central', kind: 'midrise', lotPitch: 16, poly: [
    [-80, -160], [340, -160], [340, 80], [-80, 80],
  ] },
  // Clipped along the gyoen diagonal — see gyoen below for the shared edge.
  { id: 'south-central', kind: 'midrise', lotPitch: 14, poly: [
    [-80, 80], [340, 80], [340, 254.7], [208.5, 420], [-80, 420],
  ] },
  { id: 'gyoen', kind: 'park', lotPitch: 0, poly: [
    [340, 254.7], [420, 154.3], [420, 420], [208.5, 420],
  ] },
]

// ── Scaled accessors — the ONLY way any of the above leaves this file ───────
// If plan.js and streets.js each applied MAP_SCALE and the width floor
// independently, one could drift from the other and the painted road would
// silently disagree with the analytic clearance() — the whole point of this
// design is that they can't. One reader, or the single-source-of-truth
// thesis is a slogan.
const scalePt = ([x, z]) => [x * MAP_SCALE, z * MAP_SCALE]
const scaleW = (w) => Math.max(w * MAP_SCALE, MIN_ROAD_W)

export function roads() {
  return ROADS.map((r) => ({
    id: r.id,
    w: scaleW(ROAD_CLASS_W[r.cls]),
    pts: r.pts.map(scalePt),
  }))
}

export function rail() {
  return {
    pts: RAIL.pts.map(scalePt),
    widths: RAIL.widths.map(scaleW),
  }
}

export function districts() {
  return DISTRICTS.map((d) => ({
    id: d.id,
    kind: d.kind,
    lotPitch: d.lotPitch * MAP_SCALE,
    poly: d.poly.map(scalePt),
  }))
}
