// Filler buildings: everything in the 3x3 grid that is not the station, a
// project, or Golden Gai. One InstancedMesh for the whole city so ~40
// buildings cost one draw call.
import * as THREE from 'three'
import { fillerBuildings } from './cityLayout.js'
import { NIGHT, GRANITE, WARM, AMBER, CYAN } from './palette.js'

let seed = 20260731
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

const hex = (n) => '#' + n.toString(16).padStart(6, '0')

// Shared atlas: several independent window-grid "panels" side by side, not
// one pattern repeated. At zoom 1 the whole map (and every filler facade at
// once) is on screen, so a single small tiled pattern reads as wallpaper the
// way it never did when crowd.js's field was a soft-focus backdrop. Each
// instance samples one panel via a per-instance UV offset (below) instead of
// the same 0..1 square, so neighbouring buildings don't obviously match.
//
// Panel width is fixed in pixels so "panel index -> U offset" is exact
// division; pxCol varies instead to give each panel a different pitch.
const PANEL_PX_W = 120
const PX_ROW = 8
const ROWS = 32
const IMG_H = ROWS * PX_ROW

// Tighter pitch (smaller pxCol -> more columns) and more frequent granite
// piers for towers; looser and glassier for midrise. `cap` is a solid granite
// band at the top AND bottom of the panel — doubles as a roofline/plinth
// detail and sidesteps needing to know which V edge a box face lands on.
const MIDRISE_PANELS = [
  { pxCol: 12, pierEvery: 5, lit: 0.34, cap: 1 },
  { pxCol: 10, pierEvery: 6, lit: 0.30, cap: 0 },
  { pxCol: 12, pierEvery: 4, lit: 0.38, cap: 1 },
  { pxCol: 10, pierEvery: 5, lit: 0.32, cap: 0 },
]
// `pierEvery` counts COLUMNS, and towers have twice as many columns as midrise
// for the same panel width — so matching midrise's numbers here would make every
// other column granite and the tower would render as a flat grey slab (it did).
// The pier and cap counts have to scale with the column count to keep the same
// visual rhythm. Towers are also the brightest thing in a night skyline: a lit
// fraction below midrise's is backwards.
const TOWER_PANELS = [
  { pxCol: 6, pierEvery: 8,  lit: 0.38, cap: 1 },
  { pxCol: 5, pierEvery: 10, lit: 0.34, cap: 2 },
  { pxCol: 6, pierEvery: 7,  lit: 0.42, cap: 1 },
  { pxCol: 5, pierEvery: 9,  lit: 0.36, cap: 2 },
]
const PANELS = [...MIDRISE_PANELS, ...TOWER_PANELS]
const MIDRISE_IDX = [0, 1, 2, 3]
const TOWER_IDX = [4, 5, 6, 7]
const WINDOW_COLORS = [WARM, AMBER, CYAN]

function drawPanel(g, ge, ox, { pxCol, pierEvery, lit, cap }) {
  const cols = Math.round(PANEL_PX_W / pxCol)
  for (let i = 0; i < cols; i++) {
    const x = ox + i * pxCol
    if (i % pierEvery === 0) {
      g.fillStyle = hex(GRANITE)
      g.fillRect(x, 0, pxCol, IMG_H)
      continue
    }
    for (let j = 0; j < ROWS; j++) {
      const y = j * PX_ROW
      if (j < cap || j >= ROWS - cap) {
        g.fillStyle = hex(GRANITE)          // roofline / plinth band
        g.fillRect(x, y, pxCol, PX_ROW)
        continue
      }
      if (rnd() > lit) continue
      const c = hex(WINDOW_COLORS[Math.floor(rnd() * WINDOW_COLORS.length)])
      g.fillStyle = c;  g.fillRect(x + 1, y + 1, pxCol - 2, PX_ROW - 2)
      ge.fillStyle = c; ge.fillRect(x + 1, y + 1, pxCol - 2, PX_ROW - 2)
    }
  }
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
  g.fillStyle = hex(NIGHT); g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';    ge.fillRect(0, 0, w, h)

  PANELS.forEach((recipe, i) => drawPanel(g, ge, i * PANEL_PX_W, recipe))

  g.fillStyle = 'rgba(0,0,0,0.45)'
  for (let j = 0; j < ROWS; j++) g.fillRect(0, j * PX_ROW, w, 1)   // floor banding

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
