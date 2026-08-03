// Filler buildings: everything in the 3x3 grid that is not the station, a
// project, or Golden Gai. One InstancedMesh for the whole city so ~40
// buildings cost one draw call.
import * as THREE from 'three'
import { fillerBuildings } from './cityLayout.js'

let seed = 20260731
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

// Shared atlas: several independent window-grid "panels" side by side, not
// one pattern repeated. At zoom 1 the whole map (and every filler facade at
// once) is on screen, so a single small tiled pattern reads as wallpaper the
// way it never did when crowd.js's field was a soft-focus backdrop. Each
// instance samples one panel via a per-instance UV offset (below) instead of
// the same 0..1 square, so neighbouring buildings don't obviously match.
//
// Panel width is fixed in pixels so "panel index -> U offset" is exact division.
const PANEL_PX_W = 120
const IMG_H = 240

// Filler facade mass. This used to be palette NIGHT — which is the SKY colour
// (#070a12), so a filler building's unlit face was pixel-identical to the
// background: you weren't seeing dark buildings, you were seeing lit windows
// floating on nothing, and no outline or silhouette was possible. Kept below
// towers.js's 都庁 (#565f70) so the landmark still reads as the lightest mass.
const FACADE = '#3d4553'
// Softer than palette GRANITE (#b9c0cc, 75% luminance). Against the old 3.9%
// base that jump was the single biggest source of the barcode look; 都庁 keeps
// real granite because it is actually stone-clad and should out-value filler.
//
// The ceiling here is CLIPPING, not taste. renderer.js lights this scene with
// AmbientLight(0x4a5578, 2.2) + DirectionalLight(0xc2d2f0, 1.8) under
// NoToneMapping, so a lit face is multiplied by roughly (1.6, 1.8, 2.2) and
// anything above ~0.45 in blue saturates to white instead of rolling off.
// #6b7383 blew the piers out into solid pale bars that read as the loudest
// thing on every facade — louder than the lit windows. #575e6b was not enough
// of a cut to fix it. Measured by stripping the emissive and sampling the
// render: the usable headroom above FACADE here is tiny, so the pier is now
// only a shade lighter. The vertical structure it used to provide comes from
// outline.js instead, which costs nothing and cannot clip.
const PIER = '#464e5d'
// Desaturated on purpose. Palette CYAN (#00e5ff) at full saturation across ~40
// filler buildings competed with the project signs, which are the one thing on
// this map that must win. Saturated neon is reserved for signage now.
// Spread across VALUE, not just hue: with only ~18 cells per face, three
// equally-bright colours made a half-lit facade read as one solid cream slab.
// The dim two are still "lit", just further away or behind blinds.
const WINDOW_COLORS = ['#f2e3c4', '#d9b878', '#a8cfe8', '#8a9bb0']

// Window inset as a FRACTION of the bay, not a pixel count. The old `pxCol - 2`
// was 2px of a 12px bay; carried onto a 30px bay it left an 80%-wide window and
// the mullions disappeared, which is the other way to lose the grid — same
// failure as no unlit windows at all, arrived at from the opposite end.
const INSET_X = 0.19
const INSET_Y = 0.225

// Bays are sized in WORLD METRES, the rule towers.js learned the hard way. A
// filler footprint is LOT*(0.62..0.92) = 8.7-12.9m, which at zoom 1 is ~41 CSS
// px (x0.707 isometric, x4.8 px/m) and ~31 rendered px after RES_SCALE. The old
// pxCol:12 put 10 columns in that — 3.1 px each, 4.5x under CLAUDE.md's ~3m
// legibility floor — so facades aliased into vertical stripes instead of
// resolving as windows. 3-4 columns is ~3m per bay and actually resolves.
// `rows` had the same bug in the other axis: a flat 32 rows gave a 15m midrise
// 0.47m floors. Rows now track height, so a floor is ~2-5m either way.
// Variety used to come from varying the pitch; at 3-4 columns there is no room
// for that, so it comes from pier position, lit fraction and row count instead.
// `cap` is a solid band at the top AND bottom — roofline/plinth detail that
// sidesteps needing to know which V edge a box face lands on. It counts ROWS,
// so it does NOT survive the row cut: cap:1 was 2 of 32 rows (6%) and is 2 of 5
// (40%) here, which blanked most of the midrise city. This is the same
// degeneration that broke isPier() in towers.js — a constant tuned at a high
// count, silently reinterpreted at a low one. Midrise has no rows to spare;
// only towers (9-12 rows) are tall enough to still afford a cap.
//
// `lit` is a fraction of GLASS CELLS and has to RISE as bays get coarser, for
// the same reason towers.js's did: 0.34 of 320 cells was ~87 lit windows, 0.34
// of 18 is ~6, and a night city with 6 lit windows per face reads as evacuated.
const MIDRISE_PANELS = [
  { cols: 4, rows: 6, pierAt: 0, lit: 0.44, cap: 0 },
  { cols: 3, rows: 5, pierAt: 1, lit: 0.40, cap: 0 },
  { cols: 4, rows: 7, pierAt: 2, lit: 0.48, cap: 0 },
  { cols: 3, rows: 6, pierAt: 0, lit: 0.42, cap: 0 },
]
// Towers are 26-44m against midrise's 14-30m, so they get more rows for the
// same floor height. They are also the brightest thing in a night skyline: a
// lit fraction below midrise's would be backwards.
const TOWER_PANELS = [
  { cols: 4, rows: 10, pierAt: 0, lit: 0.48, cap: 1 },
  { cols: 4, rows: 11, pierAt: 3, lit: 0.45, cap: 1 },
  { cols: 3, rows: 9,  pierAt: 1, lit: 0.52, cap: 1 },
  { cols: 4, rows: 12, pierAt: 2, lit: 0.46, cap: 1 },
]
const PANELS = [...MIDRISE_PANELS, ...TOWER_PANELS]
const MIDRISE_IDX = [0, 1, 2, 3]
const TOWER_IDX = [4, 5, 6, 7]

function drawPanel(g, ge, ox, { cols, rows, pierAt, lit, cap }) {
  const pxCol = PANEL_PX_W / cols
  const pxRow = IMG_H / rows
  const ix = pxCol * INSET_X, iy = pxRow * INSET_Y
  const ww = pxCol - 2 * ix, wh = pxRow - 2 * iy
  for (let i = 0; i < cols; i++) {
    const x = ox + i * pxCol
    if (i === pierAt) {
      g.fillStyle = PIER
      g.fillRect(x, 0, pxCol, IMG_H)
      continue
    }
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      if (j < cap || j >= rows - cap) {
        g.fillStyle = PIER                  // roofline / plinth band
        g.fillRect(x, y, pxCol, pxRow)
        continue
      }
      if (rnd() > lit) {
        // Unlit windows still darken the base, so the grid reads where nothing
        // is on. Skipping them (the old behaviour) left most of the facade as
        // flat fill and put the whole burden of "this is a building" on the
        // glow. Colour map only — an unlit window must not enter the emissive.
        g.fillStyle = 'rgba(0,0,0,0.22)'
        g.fillRect(x + ix, y + iy, ww, wh)
        continue
      }
      const c = WINDOW_COLORS[Math.floor(rnd() * WINDOW_COLORS.length)]
      g.fillStyle = c;  g.fillRect(x + ix, y + iy, ww, wh)
      ge.fillStyle = c; ge.fillRect(x + ix, y + iy, ww, wh)
    }
  }
  // Floor banding, per panel — `rows` differs per recipe now, so this can no
  // longer be one loop across the whole atlas.
  g.fillStyle = 'rgba(0,0,0,0.45)'
  for (let j = 0; j < rows; j++) g.fillRect(ox, j * pxRow, PANEL_PX_W, 2)
}

function buildAtlas() {
  const w = PANEL_PX_W * PANELS.length
  const h = IMG_H
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()
  g.fillStyle = FACADE;  g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000'; ge.fillRect(0, 0, w, h)

  PANELS.forEach((recipe, i) => drawPanel(g, ge, i * PANEL_PX_W, recipe))

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi), panelCount: PANELS.length }
}

// Per-instance panel selection needs a per-instance UV offset, which
// InstancedMesh has no built-in support for (every instance shares one
// material/one set of UVs). onBeforeCompile splices an instanced attribute
// into the vertex shader: after the stock <uv_vertex> chunk computes vMapUv/
// vEmissiveMapUv in [0,1], remap into this instance's 1/panelCount-wide slice
// of the atlas. Cheap and correct because BoxGeometry's per-face UV is always
// [0,1] regardless of instance scale.
function patchAtlasUv(material, panelCount) {
  // Without this, three's program cache could in principle hand this
  // material a compiled program built for some other material of the same
  // shape (map+emissiveMap Lambert) that never got the aUvOffset patch —
  // the cache key doesn't otherwise account for onBeforeCompile at all.
  material.customProgramCacheKey = () => 'blocks-atlas-uv'
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <uv_pars_vertex>',
        '#include <uv_pars_vertex>\nattribute vec2 aUvOffset;',
      )
      .replace(
        '#include <uv_vertex>',
        `#include <uv_vertex>
#ifdef USE_MAP
  vMapUv = vMapUv / ${panelCount.toFixed(1)} + aUvOffset;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = vEmissiveMapUv / ${panelCount.toFixed(1)} + aUvOffset;
#endif`,
      )
  }
}

/** Filler city block: everything fillerBuildings() places, as one instanced field. */
export function createBlocks() {
  const group = new THREE.Group()
  const records = fillerBuildings()

  // Unit box translated so its base sits at y=0 — the instance matrix's scale
  // then just stretches it up from the ground.
  const geo = new THREE.BoxGeometry(1, 1, 1)
  geo.translate(0, 0.5, 0)

  const { map, emissiveMap, panelCount } = buildAtlas()
  const material = new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.4,
  })
  patchAtlasUv(material, panelCount)

  const mesh = new THREE.InstancedMesh(geo, material, records.length)
  const offsets = new Float32Array(records.length * 2)   // vec2 per instance; y unused, panels run in one row
  const dummy = new THREE.Object3D()

  records.forEach((b, i) => {
    dummy.position.set(b.x, 0, b.z)
    dummy.rotation.set(0, b.ry, 0)
    dummy.scale.set(b.w, b.h, b.d)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)

    const pool = b.kind === 'tower' ? TOWER_IDX : MIDRISE_IDX
    const panel = pool[Math.floor(rnd() * pool.length)]
    offsets[i * 2] = panel / panelCount
  })
  mesh.instanceMatrix.needsUpdate = true
  geo.setAttribute('aUvOffset', new THREE.InstancedBufferAttribute(offsets, 2))

  group.add(mesh)
  return group
}
