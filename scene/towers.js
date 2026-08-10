import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  LANDMARK_SITES, lotGroupCenter, lotCenter, blockCenter, BLOCK, LOT_PITCH,
} from './cityLayout.js'
import { WARM } from './palette.js'

// The two hero landmarks, built as BACKDROP inside the city grid. Position and
// height are table-driven from cityLayout.js's LANDMARK_SITES — see that file
// for why they stand at cell [1,0] — not hard-coded here.
//
// Both are modelled in "spike units" (1 unit = 5 m, matching spike/tocho.html)
// at their real proportions, then the whole group is scaled by
// LANDMARK_SITES[i].h / <real height in spike units>. An orthographic camera
// gives no distance falloff, so a literally-scaled 243 m tower would be nine
// times the screen height — the compression IS the forced perspective.
//
// ── 都庁 scales NON-UNIFORMLY, and that is load-bearing ──────────────────────
// Height and footprint are decoupled: `tocho.scale.set(sxz, sy, sxz)`, where
// sxz is frozen at TOCHO_PLAN_H/TOCHO_SPIKE_H and only sy tracks the site's
// `h`. This is not a stylistic choice — a uniform setScalar() couples them, so
// raising the roofline from 40 m to 60 m would ALSO grow the podium from 31.3 m
// to 47 m world width, and the NO1_DX/DZ comment below records that a ~37 m
// podium already does not fit the ~35 m gap against venue-search. Freezing the
// plan keeps every footprint, offset and lot claim bit-identical to the version
// that was verified collision-free, so cityLayout.test.mjs needs no re-checking
// when `h` moves. It also reads *closer* to the reference, where 都庁 is
// markedly slender relative to its base.
//
// ── Why 67 m, worked through the projection (not a taste number) ────────────
//   screenY = 0.927y - 0.265(x+z)                         (CLAUDE.md / renderer.js)
//
// MEASURE FROM THE TOWER, NOT FROM THE GROUP ANCHOR. This is the trap: the
// anchor is lotGroupCenter() of the claimed lots, but NO1_DX/DZ then push No.1
// away from it toward +X/+Z — and larger x+z means LOWER on screen. Doing this
// sum at the anchor overstates the tower's height by 1.7 screen units and is
// how an earlier pass "proved" a height that turned out to sit level with the
// filler it was supposed to clear. No.1 stands at world (-49.92, -5.98), so its
// ground level projects to -0.265*(-55.90) = 14.8.
//
// The binding constraint is NOT the frame top, it is the filler towers. Depth
// pushes objects up the frame, so the tallest rival on screen is a back-corner
// filler — measured, not assumed: h=43.1 at (-72,-72), projecting to 78.1.
// At the old h=40 this tower's mast tip reached only 75.7, i.e. the "hero
// landmark" sat BELOW an anonymous filler behind it.
//
//   h    roofline   mast tip   lead over rival   frame headroom
//   60     70.4       79.4          +1.3              14.4
//   67     76.9       86.9          +8.8               6.9
//   70     79.7       90.1         +12.0               3.7
//
// 60 is a tie, not a win. 70 finally lifts the ROOFLINE itself over the rival
// but leaves only 3.7 of headroom. 67 gives the crowns and masts an unambiguous
// 8.8-unit lead with 6.9 still in hand, and that is the trade taken.
//
// The frame ceiling: renderer.js's resize() computes
// frustum = max(CONTENT_H, CONTENT_W/aspect) with CONTENT_H=145; the smallest
// that ever gets is 145 itself, on wide screens where CONTENT_H binds — the
// worst case across every aspect ratio. The frame is centred on CONTENT_CY=21.3,
// so the frame top sits at 21.3 + 145/2 = 93.8.
const TOCHO_SPIKE_H = 48.6    // 243 real metres / 5 metres-per-spike-unit
// The plan scale 都庁 is frozen at, in the same "site.h" units — i.e. the
// footprint is the one a 40 m uniform build produced. See the header above:
// this exists so LANDMARK_SITES' `h` can move without moving any footprint.
const TOCHO_PLAN_H = 40
const COCOON_SPIKE_H = 40.8   // 204 real metres / 5 metres-per-spike-unit
const COCOON_R = 6.6           // Cocoon's lathe radius; shared with latticeTexture()

let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

// Facade palette, read off the reference render
// (shinjuku-tokyo-metro-building-night.png) and then worked BACKWARDS through
// this scene's lighting, because those are rendered values and these are
// albedos. renderer.js lights with AmbientLight(0x4a5578, 2.2) +
// DirectionalLight(0xc2d2f0, 1.8), which is roughly 1.4x in linear on a lit
// face, so an albedo lands about 40% brighter than it reads here.
//
// The important part is the INVERSION. The reference's 都庁 is a DARK mass
// carrying many warm windows. This file used to do the opposite — a #565f70
// mass with #b9c0cc piers, i.e. bright concrete — and the windows then had to
// out-shout their own background, which is exactly why the old render read as
// gold speckle rather than a building. Darkening the mass is what lets the
// window bands carry the read, and the "abandoned slab" failure the old comment
// warned about is avoided by lighting whole FLOORS instead (see below), not by
// brightening the concrete.
//
// The first pass at this over-corrected: derived straight from the reference's
// rendered values it came out so dark that 都庁 read as the DIMMEST tower on
// screen, behind ordinary filler blocks, where the reference has it plainly
// lit. These are one step back up from that — still a dark mass, but no longer
// darker than its neighbours.
const GLASS    = '#6f8fae'   // curtain wall, daytime sky-reflective blue-glass
const PIER     = '#9aa3b0'   // granite pier, daylight stone
const SPANDREL = '#82a0ba'   // floor-slab edge: LIGHTER than the glass, as in
                             // the reference. The old rgba(0,0,0,0.55) band was
                             // darker than its own background and vanished.

/**
 * Tange's facade: granite piers, dark glass, and floors that light as a unit.
 * Returns separate colour and emissive canvases so only the glass glows.
 *
 * `lit` is the fraction of FLOORS that are occupied, not of individual cells.
 * That change is the whole point: per-cell randomness at 3-6 columns is
 * indistinguishable from noise, and noise is what the old render looked like.
 * Deciding per floor and then lighting ~80% of that floor produces the
 * horizontal banding that is the reference's actual signature, and it survives
 * mipmapping — a band is many pixels tall, a lone window is one.
 */
function facade(cols, rows, { lit = 0.6, pxCol = 24, pxRow = 14 } = {}) {
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g]  = mk()
  const [cEmi, ge] = mk()

  g.fillStyle = GLASS;   g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000'; ge.fillRect(0, 0, w, h)

  // Floor-slab edges go down BEFORE the piers, so the piers paint over them and
  // stay unbroken full-height lines. Drawn after, they would cut every pier
  // once per floor — and at 3 columns the piers are the entire vertical read.
  g.fillStyle = SPANDREL
  for (let j = 0; j < rows; j++) g.fillRect(0, j * pxRow, w, 2)

  // Occupancy decided per floor, once, before any cell is drawn.
  const floorLit = Array.from({ length: rows }, () => rnd() < lit)

  // EVERY bay is glazed. The previous rule made a pier consume a whole bay,
  // which on a 3-column tower leg meant pier/glass/pier — 67% concrete against
  // the reference's ~40%, and each leg read as a dark slab with one lit stripe
  // rather than as a glazed tower. A pier is a mullion BETWEEN bays, not a bay
  // of its own, so it is drawn afterwards as a line on the bay boundary.
  for (let i = 0; i < cols; i++) {
    const x = i * pxCol
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      // A lit floor is mostly on; a dark floor keeps a few stragglers so the
      // banding reads as an office block rather than a striped texture.
      if (!(floorLit[j] ? rnd() < 0.8 : rnd() < 0.1)) continue
      const warm = rnd()
      // Reference windows are overwhelmingly warm; the cool fraction drops from
      // 18% to 8% so the tower stops reading blue-speckled.
      const col = warm > 0.92 ? '#a8cfe8' : warm > 0.3 ? '#e8c88a' : '#f2e3c4'
      g.fillStyle = col;  g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
      ge.fillStyle = col; ge.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
    }
  }

  // Piers, on both outer edges and every third boundary. Both edges matter more
  // than the interior rhythm at these column counts: a pier at each edge is
  // what says "tower with corner columns" rather than "slab". Holds at 3
  // boundaries (0,3), 6 (0,3,6) and 16 (0,3,6,9,12,15,16) alike — where two
  // land a single bay apart at an edge they simply read as one thicker corner
  // column, which is correct.
  const pierW = Math.max(3, Math.round(pxCol * 0.45))
  for (let i = 0; i <= cols; i++) {
    if (i % 3 !== 0 && i !== cols) continue
    const x = Math.min(Math.max(i * pxCol - pierW / 2, 0), w - pierW)
    g.fillStyle = PIER
    g.fillRect(x, 0, pierW, h)
    g.fillStyle = 'rgba(0,0,0,0.3)'
    g.fillRect(x + pierW - 2, 0, 2, h)
  }

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/** The Cocoon's woven diagonal lattice — a texture, not geometry.
 * `scale` (cocoonSite.h / COCOON_SPIKE_H) is the same landmark-compression
 * factor towers.js applies everywhere else: a fixed pixel pitch on this canvas
 * has the same "detailed enough for the uncompressed building, mush after
 * compression" problem texturedSlabMaterial() has, so the weave pitch and lit-
 * cell pitch are derived from the FINAL world circumference/height instead of
 * hardcoded, targeting ~3m per feature like the tower facades. */
function latticeTexture(scale) {
  const w = 512, h = 1024
  const worldH = COCOON_SPIKE_H * scale                          // == cocoonSite.h exactly
  const worldCirc = Math.PI * (COCOON_R + COCOON_R * 0.68) * scale // widest ring (elliptical)
  const cellPitch = Math.round(3.0 * (h / worldH))
  const lineSpacing = Math.round(3.0 * (w / worldCirc))

  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  const e = document.createElement('canvas')
  e.width = w; e.height = h
  const ge = e.getContext('2d')

  g.fillStyle = '#4a5566'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  // Lit cells behind the lattice.
  for (let y = 0; y < h; y += cellPitch) {
    for (let x = 0; x < w; x += cellPitch) {
      if (rnd() > 0.34) continue
      const col = rnd() > 0.5 ? '#cfe6f5' : '#e8d4a8'
      const inset = cellPitch * 0.15
      g.fillStyle = col;  g.fillRect(x + inset, y + inset, cellPitch - inset * 2, cellPitch - inset * 2)
      ge.fillStyle = col; ge.fillRect(x + inset, y + inset, cellPitch - inset * 2, cellPitch - inset * 2)
    }
  }

  // The weave: two sets of diagonals, drawn on both canvases so the white
  // ribs glow faintly the way the real building's lighting picks them out.
  for (const dir of [1, -1]) {
    for (let i = -h; i < w + h; i += lineSpacing) {
      for (const [ctx, style, width] of [[g, '#dfe6f0', 5], [ge, '#41505f', 5]]) {
        ctx.strokeStyle = style
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + dir * h, h)
        ctx.stroke()
      }
    }
  }

  const tex = (cv) => Object.assign(new THREE.CanvasTexture(cv), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(c), emissiveMap: tex(e) }
}

// Bay module, MEASURED off the reference render rather than picked. An
// autocorrelation of a luminance scanline across the shaft's right face (140 px
// wide) peaks at a 7 px pier pitch; the reference building is ~910 px tall for
// 243 m, i.e. 3.74 px/m, so its bay module is ~1.9 m and its floor bands ~3.8 m.
// Those are the real building's numbers, which is why matching them is what
// moves this from "recognisable" to "identical".
//
// This used to be 3.0 m on BOTH axes, cited to CLAUDE.md's "anything finer than
// ~3 m is invisible". That rule is about GEOMETRY. A mipmapped, anisotropy-8
// texture carries more, and the 3 m figure was collapsing the shaft to 4 columns
// and each leg to 3 — too few for any rhythm to exist, which is the actual root
// cause of the old speckled read. At the scene's ~4.4 CSS px per metre a 1.9 m
// bay is ~8 CSS px, ~6 device px after RES_SCALE 0.75: resolvable. It takes the
// podium from 10 columns to 16 and the shaft from 4 to 6.
const BAY_M = 1.9
const FLOOR_M = 4.0

/** A facade texture sized to match a `w x h` slab, as a ready-to-use material.
 * Takes BOTH of createTowers()'s scale factors, because 都庁 is scaled
 * non-uniformly (see the header): bay counts come from the FINAL WORLD SIZE the
 * slab renders at, and that is `w * sxz` across and `h * sy` up — one combined
 * `scale` would size one of the two axes wrong. */
function texturedSlabMaterial(w, h, sxz, sy, opts = {}) {
  const { map, emissiveMap } = facade(
    Math.max(3, Math.round((w * sxz) / BAY_M)),
    Math.max(3, Math.round((h * sy) / FLOOR_M)),
    opts,
  )
  return new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.15,
  })
}

/**
 * The 45F observatory band — the single highest-payoff detail in the reference,
 * where it is by far the brightest element on each tower and the thing the eye
 * locks onto. At the scene's ~4.4 CSS px per metre this band is ~14 px tall,
 * which is enough to read as a lit box with a dark motif in it.
 *
 * MeshBasicMaterial, per the material policy: there is no bloom pass and no
 * tone mapping, so anything that should glow has to BE bright in its own
 * texture rather than be lit into brightness. Colours clip rather than roll
 * off, so this stays a warm cream and never goes to white.
 */
function crownTexture() {
  const w = 96, h = 32
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')

  g.fillStyle = '#f0d49a'; g.fillRect(0, 0, w, h)
  // Dark sill and head, so the band reads as a glazed storey rather than a
  // floating rectangle of colour.
  g.fillStyle = '#4a4030'
  g.fillRect(0, 0, w, 3)
  g.fillRect(0, h - 4, w, 4)
  // Mullions.
  g.fillStyle = 'rgba(74,64,48,0.55)'
  for (let x = 6; x < w; x += 12) g.fillRect(x, 3, 2, h - 7)
  // The round motif the reference paints into the middle of the deck.
  g.fillStyle = '#8a6c44'
  g.beginPath()
  g.arc(w / 2, h / 2, 7, 0, Math.PI * 2)
  g.fill()

  return Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
}

/** Clones a geometry with a transform baked in, ready for mergeGeometries.
 * Same idiom as station.js's posed()/mergedMesh(). */
function posed(geo, { x = 0, y = 0, z = 0 } = {}) {
  return geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z))
}

function mergedMesh(geoms, material) {
  return new THREE.Mesh(mergeGeometries(geoms), material)
}

/**
 * The 都庁 complex: No.1 (243m, twin-tower bifurcation), No.2 (163m), and the
 * low semicircular Assembly Building (41m) around a plaza. `sxz`/`sy` are the
 * group's two scale factors (see the header — the plan is frozen while the
 * height moves), threaded down to every texturedSlabMaterial() call so bay
 * density is derived once, not recomputed per-piece (see that function).
 */
function createTocho(sxz, sy) {
  const g = new THREE.Group()
  const U = 1 / 5
  const PODIUM_H = 33 * U, SPLIT_Y = 169 * U, TOP_Y = 243 * U

  // No.1 sits centred in its own group by default (local 0,0), but the group's
  // anchor (cityLayout.js's lotGroupCenter of tocho's lots) sits only ~19m
  // from venue-search's fixed building at world (-72,0). A podium widened to a
  // literal 3x the spire's width (45 local, ~37m world) does not fit in the
  // ~35m gap between venue-search and this block's own east edge no matter how
  // it's shifted — the two constraints are mutually exclusive (verified by
  // bounding-box arithmetic, not eyeballed). NO1_DX/DZ nudge the whole tower
  // toward the block's open centre, and the podium is widened as far as that
  // gap actually allows (2.5x, not the full 3x) — short of the brief's literal
  // number, but real: any wider collides with venue-search or the street.
  //
  // ANCHOR_DX/DZ then undo the anchor move that claiming lot [2,2] caused.
  // lotGroupCenter() is the mean of the claimed lots, so growing the claim from
  // 5 lots to 6 shifted 都庁's anchor by (+2.13, +4.27) world — which would have
  // slid the entire complex, including the podium clearance argued above, off
  // the positions that were verified collision-free. Dividing that world shift
  // by sxz gives the local correction, and it is subtracted from every local
  // offset in this function so all three masses stay exactly where they were.
  // The claim moved; the buildings did not.
  const ANCHOR_DX = 2.592, ANCHOR_DZ = 5.184     // (2.1333, 4.2667) / sxz
  const NO1_DX = 3.5 - ANCHOR_DX, NO1_DZ = 4.4 - ANCHOR_DZ

  // No.1: podium and spire base are unique footprints, so each stays its own
  // mesh — nothing else shares their size to merge with.
  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(38, PODIUM_H, 34),
    // The podium wing is the widest surface in the complex and was the noisiest
    // part of the old render; at BAY_M it carries 16 columns instead of 10.
    // `lit` is high because the reference's podium reads as a continuous lit
    // colonnade, and on a 3-row slab a low fraction rounds down to nothing.
    texturedSlabMaterial(38, PODIUM_H, sxz, sy, { lit: 0.7 }),
  )
  podium.position.set(NO1_DX, PODIUM_H / 2, NO1_DZ)
  g.add(podium)

  const spireH = SPLIT_Y - PODIUM_H
  const spire = new THREE.Mesh(
    new THREE.BoxGeometry(15, spireH, 15),
    texturedSlabMaterial(15, spireH, sxz, sy),
  )
  spire.position.set(NO1_DX, PODIUM_H + spireH / 2, NO1_DZ)
  g.add(spire)

  // Everything on No.1 that is plain stone rather than glazing collects into
  // ONE array and gets merged into ONE mesh at the end: the four corner
  // mullions, the shoulder collar at the bifurcation, and the two machine-room
  // caps. They were three separate flat-colour materials at very close values
  // (0x3c4256 / 0x6a7286), which is three draw calls to say one thing — and
  // folding them into one is what pays for the observatory band's draw call, so
  // this whole pass stays draw-call-neutral.
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x4a5166 })
  const stoneGeos = []

  // Corner mullions. Plain stone, not a facade texture: these are structural
  // columns with no glazing on them, and at 2.14m world width a facade texture
  // clamps to its 3-column minimum anyway — so the texture was inventing
  // windows the real building does not have, and costing two canvases to do it.
  const cornerH = spireH + 1.0
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    stoneGeos.push(posed(new THREE.BoxGeometry(2.6, cornerH, 2.6),
      { x: NO1_DX + sx * 6.3, y: PODIUM_H + cornerH / 2, z: NO1_DZ + sz * 6.3 }))
  }

  // The signature: one mass rising from the podium that bifurcates into twin
  // towers at floor 33 of 48 — mirrored geometry, one shared texture, one
  // merged mesh. This is what makes it identifiable.
  //
  // Reproportioned from 5.25 x 12 to 6.5 x 8. The old plan aspect was 2.3:1,
  // which at this scale read as a pair of fins rather than a pair of towers;
  // the real building's towers are close to square. 6.5 wide at +/-4.25 puts
  // their outer faces at +/-7.5 — flush with the shaft's own edge, so they rise
  // from its corners the way the reference's do — and leaves a 2.0 slot between
  // them. Being shallower than the shaft (8 against 15) also leaves a roof
  // setback around their base, which the reference has.
  //
  // A side effect worth knowing: BoxGeometry maps 0..1 UV onto every face, so a
  // texture sized for the box's WIDTH is stretched across its DEPTH faces by
  // w/d — and this camera sees both (+X and +Z at azimuth 45). The old legs
  // stretched by 2.3x; these stretch by 1.23x, so this change quietly reduces a
  // pre-existing distortion rather than adding one. The shaft is deliberately
  // left square at 15 x 15 for the same reason: making it 15 x 8 to match the
  // reference's wider-than-deep base would have introduced a 1.9x stretch
  // across its two visible faces, which costs more than the plan aspect buys.
  const LEG_W = 6.5, LEG_D = 8, LEG_X = 4.25
  const legH = TOP_Y - SPLIT_Y
  const legMat = texturedSlabMaterial(LEG_W, legH, sxz, sy)
  const legGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(LEG_W, legH, LEG_D),
      { x: NO1_DX + sx * LEG_X, y: SPLIT_Y + legH / 2, z: NO1_DZ }))
  g.add(mergedMesh(legGeos, legMat))

  // The observatory band, at the top of each tower. One shared texture, two
  // boxes, one merged mesh — the only draw call this whole pass adds. It
  // oversails the leg by 0.8 so it reads as a distinct band with its own edge
  // rather than a stripe painted on the tower.
  //
  // The oversail is pushed entirely OUTWARD (centre at LEG_X + 0.4, not LEG_X),
  // which is the whole reason this is worth a comment: centred, the two bands
  // grew inward too and closed the 2.0 slot between the towers down to 1.2,
  // and the pair stopped reading as twin towers at all — it read as one mass
  // with a notch cut in it. The slot IS the silhouette here, so nothing is
  // allowed to encroach on it.
  const crownH = 2.6, crownOver = 0.8
  const crownMat = new THREE.MeshBasicMaterial({ map: crownTexture() })
  const crownGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(LEG_W + crownOver, crownH, LEG_D + crownOver),
      { x: NO1_DX + sx * (LEG_X + crownOver / 2), y: TOP_Y - crownH / 2, z: NO1_DZ }))
  g.add(mergedMesh(crownGeos, crownMat))

  // Machine-room caps: inset from the leg, and dark against the lit band right
  // beneath them — that contrast is what makes the band read. (The reference
  // greebles these; at ~1.5px here that would only add mush, so they stay
  // plain.) Plus the shoulder collar: a short full-width band at the
  // bifurcation so the mass visibly continues before the slot opens. The
  // reference chamfers that transition; a stepped collar reads the same at this
  // scale and needs no rotated-frustum geometry to build it.
  // Both of these deliberately avoid landing a face exactly on a neighbour's.
  // The cap sits 0.2 DOWN into the crown so its underside is buried rather than
  // coplanar with the crown's top, and the collar is 0.4 proud of the legs on
  // every side rather than flush at their +/-7.5 outer faces. Coplanar faces
  // z-fight, and it reads as flicker on exactly the two silhouette edges this
  // pass exists to create. Being proud also makes the collar read as a cornice,
  // which is what the reference has there.
  for (const sx of [-1, 1]) {
    stoneGeos.push(posed(new THREE.BoxGeometry(LEG_W - 1.5, 1.6, LEG_D - 1.6),
      { x: NO1_DX + sx * LEG_X, y: TOP_Y + 0.6, z: NO1_DZ }))
  }
  stoneGeos.push(posed(new THREE.BoxGeometry(15.4, 1.6, LEG_D + 0.4),
    { x: NO1_DX, y: SPLIT_Y + 0.8, z: NO1_DZ }))
  g.add(mergedMesh(stoneGeos, stoneMat))

  // Antenna masts: same treatment.
  const mastMat = new THREE.MeshLambertMaterial({ color: 0x7a8394 })
  const mastGeos = [-1, 1].map((sx) =>
    posed(new THREE.CylinderGeometry(0.12, 0.2, 6, 6),
      { x: NO1_DX + sx * LEG_X, y: TOP_Y + 1.6 + 3, z: NO1_DZ }))
  g.add(mergedMesh(mastGeos, mastMat))

  // Aircraft-warning lights: unlit, self-lit red, all merged into one mesh.
  // Six now rather than two — the reference dots them around the setback
  // corners, not just the apex, and they are the only pure-saturated colour on
  // the whole complex, so they carry disproportionate recognisability for their
  // size. Segments drop from (10,10) to (6,4) because at 1-2px on screen the
  // silhouette of a sphere is invisible; that pays for the four extra lights
  // roughly twice over in triangles.
  const warnMat = new THREE.MeshBasicMaterial({ color: 0xff2b2b })
  const warnGeos = []
  for (const sx of [-1, 1]) {
    warnGeos.push(posed(new THREE.SphereGeometry(0.34, 6, 4),
      { x: NO1_DX + sx * LEG_X, y: TOP_Y + 1.6 + 6.2, z: NO1_DZ }))
    for (const sz of [-1, 1]) {
      warnGeos.push(posed(new THREE.SphereGeometry(0.3, 6, 4), {
        x: NO1_DX + sx * (LEG_X + LEG_W / 2),
        y: TOP_Y,
        z: NO1_DZ + sz * (LEG_D / 2),
      }))
    }
  }
  g.add(mergedMesh(warnGeos, warnMat))

  // No.2 Building — a plainer single slab in the newly-claimed lot [0,0], real
  // 163m compresses through the same U/scale chain to ~27m. One mesh, one
  // draw call: no podium or roof detail of its own, since nothing in the
  // brief asks for one and the pair reads fine as "tall twin-towered one,
  // shorter plain one." Position is a LOCAL offset — everything in this group
  // is scaled before rendering, so a target WORLD position has to be divided by
  // the scale to land there (site world centre - group anchor, over scale);
  // this lands on lot [0,0]'s own centre, clear of both venue-search and No.1's
  // podium (verified by bounding-box arithmetic). These stay valid across the
  // height change precisely BECAUSE the plan scale is frozen: x/z divide by
  // `sxz`, which no longer moves when LANDMARK_SITES' `h` does.
  const noTwoH = 163 * U
  const noTwo = new THREE.Mesh(
    new THREE.BoxGeometry(12, noTwoH, 10),
    texturedSlabMaterial(12, noTwoH, sxz, sy),
  )
  noTwo.position.set(-23.33 - ANCHOR_DX, noTwoH / 2, -7.78 - ANCHOR_DZ)
  g.add(noTwo)

  // Assembly Building (都議会議事堂) — low and semicircular, the piece that
  // makes the group read as a complex rather than a lone tower. A half-drum
  // gives the curved frontage from geometry directly, real 41m compresses to
  // ~7m; radius kept to 7 (not a rounder 9) because the gap between No.1's
  // podium and Cocoon to its south-east is only ~15m — verified to clear both
  // with margin at this size. thetaStart is centred on the (+X,+Z) bisector —
  // this camera's azimuth is fixed at 45 degrees (renderer.js), so the curved
  // face always points at it and the two flat cut ends CylinderGeometry
  // leaves open on a partial sweep land on the far side, out of view, with no
  // extra geometry needed to cap them.
  const assemblyH = 41 * U
  const assembly = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7, assemblyH, 16, 1, false, -Math.PI / 4, Math.PI),
    new THREE.MeshLambertMaterial({ color: 0x565f70 }),
  )
  assembly.position.set(15.55 - ANCHOR_DX, assemblyH / 2, 29.89 - ANCHOR_DZ)
  g.add(assembly)

  return g
}

/** Mode Gakuen Cocoon Tower — 204 m. The lattice is a texture, not geometry.
 * `scale` is cocoonSite.h / COCOON_SPIKE_H, threaded to latticeTexture() so its
 * weave pitch is derived from the final compressed size (see that function). */
function createCocoon(scale) {
  const g = new THREE.Group()
  const H = 204 / 5          // spike units
  const R = COCOON_R          // the real Cocoon is squat; too slim reads as a tube

  // Elliptical cocoon: narrow at the base, bulging at mid-height, tapering to
  // a rounded crown.
  const profile = [
    [0.52, 0], [0.74, 0.08], [0.92, 0.22], [1.0, 0.42],
    [0.97, 0.6], [0.86, 0.78], [0.62, 0.93], [0.3, 1.0],
  ].map(([rf, hf]) => new THREE.Vector2(rf * R, hf * H))

  const { map, emissiveMap } = latticeTexture(scale)
  const body = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 28),
    new THREE.MeshLambertMaterial({
      map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.12,
    }),
  )
  body.scale.z = 0.68        // elliptical in plan, not circular
  g.add(body)

  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(13, 2.4, 10),
    new THREE.MeshLambertMaterial({ color: 0x2a2f3a }),
  )
  podium.position.y = 1.2
  g.add(podium)

  return g
}

// ── The plaza ────────────────────────────────────────────────────────────────
// 都庁 stands on a paved civic precinct, not on the same asphalt as the
// commercial blocks, and in the reference that ground plane does a lot of the
// work of marking the complex as a landmark before you have read a single
// window. It is one merged quad set and one canvas.
//
// Height: street.js puts its ground at y=-0.04 and the tops of its kerbs at
// 0.16, so 0.02 sits above the ground it must hide and below the kerb it must
// not poke through.
const PLAZA_Y = 0.02

// Lamp positions as fractions of the plaza's own bounding box, shared by the
// posts and by the spill painted under them so the two cannot drift apart.
//
// They are ALL in the plaza's south-east quadrant, and that is the whole point.
// This camera's azimuth is fixed at 45 degrees (renderer.js), so it only ever
// sees a building's +X and +Z faces — which means ground is only visible SOUTH
// and EAST of a mass, and everything north or west of one is permanently behind
// it. The first version of these spots was spread around the plaza's "open
// border", which is its north and west edges; measured afterwards, the podium
// left 1.3m of plaza visible to the east, 0.0m to the south, and hid all 16.4m
// of the rest. Six lamps and a painted plaza rendered, and not one pixel of any
// of it could be seen. Claiming lot [2,2] opened up 15m of plaza south of the
// podium, and these sit in it, clear of the Assembly Building's own drum.
const LAMP_SPOTS = [
  [0.70, 0.71], [0.98, 0.71], [0.68, 0.83],
  [0.70, 0.95], [0.98, 0.95], [0.84, 0.99],
]

/** Paving, joints, planting and lamp spill — all painted, none of it geometry.
 * Same reasoning street.js uses for wet asphalt: at ~4.4 CSS px per metre a
 * kerbed planter is 2 px, so it belongs in a texture. `w`/`d` are the plaza's
 * world extents, used to keep the joint grid at a real 4 m pitch rather than a
 * pitch that changes with the plaza's size.
 *
 * Returns an emissiveMap as well as a map, and that is a cost decision, not a
 * decorative one. A Lambert carrying `map` alone is a shader variant nothing
 * else in this scene uses, so it compiled a 22nd program — landing exactly on
 * the ceiling test/scene.test.mjs asserts, with no headroom left. Matching the
 * map+emissiveMap shape that street.js and the facades already use puts it back
 * on an existing program, and the emissive channel is what the lamp spill
 * wanted anyway. */
function plazaTexture(w, d) {
  const px = 11                                    // canvas pixels per metre
  const cw = Math.round(w * px), ch = Math.round(d * px)
  const c = document.createElement('canvas')
  c.width = cw; c.height = ch
  const g = c.getContext('2d')
  const e = document.createElement('canvas')
  e.width = cw; e.height = ch
  const ge = e.getContext('2d')
  ge.fillStyle = '#000'; ge.fillRect(0, 0, cw, ch)

  // Lighter than street.js's GROUND_COLOR/ASPHALT, which is the entire point —
  // the precinct has to be legible as a different (paved-stone) surface from a
  // long way out.
  g.fillStyle = '#a09a8c'; g.fillRect(0, 0, cw, ch)

  g.fillStyle = '#b0aa9a'
  for (let x = 0; x < cw; x += 4 * px) g.fillRect(x, 0, 1, ch)
  for (let y = 0; y < ch; y += 4 * px) g.fillRect(0, y, cw, 1)

  // Planting and water, in the SOUTH-EAST quadrant only — see LAMP_SPOTS for
  // why: at a fixed 45-degree azimuth the camera only sees ground south and
  // east of a mass, and detail painted anywhere else is behind the podium
  // forever. Positioned in fractions of the canvas so they follow the plaza if
  // its lots change.
  g.fillStyle = '#2d4a3a'
  g.fillRect(0.66 * cw, 0.94 * ch, 0.34 * cw, 0.06 * ch)
  g.fillRect(0.955 * cw, 0.66 * ch, 0.045 * cw, 0.34 * ch)

  g.fillStyle = '#1b2540'
  g.strokeStyle = '#69749a'; g.lineWidth = 1
  for (const [ux, uy, uw, uh] of [[0.69, 0.735, 0.10, 0.045],
                                  [0.69, 0.885, 0.10, 0.045]]) {
    g.fillRect(ux * cw, uy * ch, uw * cw, uh * ch)
    g.strokeRect(ux * cw, uy * ch, uw * cw, uh * ch)
  }

  // Daytime plaza: no lamp-spill glow on the paving. Lamp posts themselves
  // (createPlazaLamps) still stand, just unlit; ge stays a plain black
  // canvas, so the emissiveMap contributes nothing.

  const tex = (cv) => Object.assign(new THREE.CanvasTexture(cv), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(c), emissiveMap: tex(e) }
}

/**
 * The plaza, built in WORLD space from the site's own claimed lots.
 *
 * cityLayout.js is the single source of truth for where things stand, so this
 * derives its extent from `site.lots` rather than hard-coding a rectangle that
 * would silently rot the first time a lot moved. Each lot contributes a
 * LOT_PITCH quad CLIPPED to its block: at LOT_PITCH neighbouring quads share an
 * edge exactly, so the interior tiles seamlessly with no gaps and no overlap to
 * z-fight, and the clip stops the outermost ones spilling the 1 m into the
 * street that an unclipped LOT_PITCH quad would (LOT_PITCH*3 is 48 against a
 * 46 m block).
 */
function createPlaza(site) {
  const bx = blockCenter(site.cell[1]), bz = blockCenter(site.cell[0])
  const half = BLOCK / 2, lh = LOT_PITCH / 2
  const rects = site.lots.map((lot) => {
    const c = lotCenter(site.cell, lot)
    return {
      x0: Math.max(c.x - lh, bx - half), x1: Math.min(c.x + lh, bx + half),
      z0: Math.max(c.z - lh, bz - half), z1: Math.min(c.z + lh, bz + half),
    }
  })
  const bb = {
    x0: Math.min(...rects.map((r) => r.x0)), x1: Math.max(...rects.map((r) => r.x1)),
    z0: Math.min(...rects.map((r) => r.z0)), z1: Math.max(...rects.map((r) => r.z1)),
  }
  const spanX = bb.x1 - bb.x0, spanZ = bb.z1 - bb.z0

  const geos = rects.map((r) => {
    const geo = new THREE.PlaneGeometry(r.x1 - r.x0, r.z1 - r.z0)
    geo.rotateX(-Math.PI / 2)
    geo.translate((r.x0 + r.x1) / 2, 0, (r.z0 + r.z1) / 2)
    // UV from WORLD position across the whole plaza, so the paving, planting and
    // pools are one continuous painting instead of the same tile stamped five
    // times. Must run after translate(), when positions are already world.
    const uv = geo.attributes.uv, pos = geo.attributes.position
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (pos.getX(i) - bb.x0) / spanX, (pos.getZ(i) - bb.z0) / spanZ)
    }
    return geo
  })

  const { map, emissiveMap } = plazaTexture(spanX, spanZ)
  const mesh = new THREE.Mesh(mergeGeometries(geos), new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.5,
    // Required, not cosmetic: renderer.js's hitTest and outline.js both treat
    // `transparent` as "not a solid form", which is what stops this decal
    // blocking clicks on anything behind it and stops the contour pass drawing
    // a hard rectangle around it. Opacity stays 1 — it is opaque paving.
    //
    // It costs a shader program: `transparent` is part of three.js's program
    // cache key, so this is the scene's only transparent mapped Lambert and
    // compiles its own. Measured, not assumed — flipping this one flag moves
    // the scene between 21 and 22 programs. 22 is exactly the ceiling
    // test/scene.test.mjs asserts, so that ceiling now has no headroom.
    transparent: true,
  }))
  mesh.position.y = PLAZA_Y
  return mesh
}

/** Plaza lamps: unlit bright posts, one merged mesh, standing on LAMP_SPOTS.
 * Their spill is painted into the plaza texture rather than lit, per the
 * material policy — and lightPool.js is deliberately not used here because it
 * returns one mesh per pool, so six lamps would be six draw calls. */
function createPlazaLamps(site) {
  const bx = blockCenter(site.cell[1]), bz = blockCenter(site.cell[0])
  const half = BLOCK / 2, lh = LOT_PITCH / 2
  const cs = site.lots.map((lot) => lotCenter(site.cell, lot))
  const x0 = Math.max(Math.min(...cs.map((c) => c.x)) - lh, bx - half)
  const x1 = Math.min(Math.max(...cs.map((c) => c.x)) + lh, bx + half)
  const z0 = Math.max(Math.min(...cs.map((c) => c.z)) - lh, bz - half)
  const z1 = Math.min(Math.max(...cs.map((c) => c.z)) + lh, bz + half)

  const geos = LAMP_SPOTS.map(([ux, uz]) =>
    posed(new THREE.BoxGeometry(0.5, 4.5, 0.5), {
      x: x0 + ux * (x1 - x0), y: 2.25, z: z0 + uz * (z1 - z0),
    }))
  return mergedMesh(geos, new THREE.MeshBasicMaterial({ color: WARM }))
}

/** Both landmarks, table-driven from cityLayout.js's LANDMARK_SITES. */
export function createTowers() {
  const group = new THREE.Group()

  // Non-uniform on purpose — see the header. `sxz` is pinned to TOCHO_PLAN_H so
  // every footprint stays exactly where it was verified to fit; only `sy`
  // follows the site's height. Do not collapse these back into setScalar().
  const tochoSite = LANDMARK_SITES.find((s) => s.id === 'tocho')
  const sxz = TOCHO_PLAN_H / TOCHO_SPIKE_H
  const sy  = tochoSite.h / TOCHO_SPIKE_H
  const tocho = createTocho(sxz, sy)
  tocho.scale.set(sxz, sy, sxz)
  // World space, so NOT parented to `tocho` — that group carries the landmark
  // compression, and a ground plane sized in real lot metres must not be
  // squeezed by it.
  group.add(createPlaza(tochoSite))
  group.add(createPlazaLamps(tochoSite))
  const tPos = lotGroupCenter(tochoSite.cell, tochoSite.lots)
  tocho.position.set(tPos.x, 0, tPos.z)
  group.add(tocho)

  const cocoonSite = LANDMARK_SITES.find((s) => s.id === 'cocoon')
  const cocoonScale = cocoonSite.h / COCOON_SPIKE_H
  const cocoon = createCocoon(cocoonScale)
  cocoon.scale.setScalar(cocoonScale)
  const cPos = lotGroupCenter(cocoonSite.cell, cocoonSite.lots)
  cocoon.position.set(cPos.x, 0, cPos.z)
  group.add(cocoon)

  return group
}
