// The nine clickable buildings — the only way into Paulo's projects from this
// scene, so legibility and "obviously interactive" beat everything else here.
import * as THREE from 'three'
import { createSignTexture } from './signTexture.js'
import { createLightPool } from './lightPool.js'
import { lotCenter } from './cityLayout.js'
import { WARM, AMBER, CYAN } from './palette.js'

const hex = (n) => '#' + n.toString(16).padStart(6, '0')

/** Deterministic per-project hash — same idiom as signTexture's own (unexported) hashSeed. */
function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h || 1
}

const ACCENTS = [0xff2d55, 0xffb347, 0x00e5ff, 0xff6fa8, 0x7ce7c4]

// Everything a shipped project needs to look shipped; everything else reads
// as less finished. `sign` reuses signTexture's existing styles instead of
// inventing a new "dim" mode: lightbox is a flat backlit box (still lit, but
// not neon-alive), painted doesn't self-illuminate at all — see signTexture.js.
const STATUS_STYLE = {
  'live':         { sign: 'neon',     bright: 1.0,  halo: 1.0 },
  'WIP':          { sign: 'lightbox', bright: 0.55, halo: 0.5 },
  'coming-soon':  { sign: 'painted',  bright: 0.25, halo: 0.12 },
}

// Rooftop board, sized independently of the building footprint (real
// Shinjuku signage routinely cantilevers past the building it's bolted to).
// SIGN DESIGN BUDGET — MEASURED, superseding the estimate that used to be here.
//
// SIGN_W=14 at the sign's fixed 4:1 aspect is a 3.5m-tall plane. Under an
// orthographic camera that is the same on-screen height for every sign
// regardless of title: 15.56 CSS px at zoom 1 on a 1280x720 viewport.
//
// The glyphs get only part of that. layoutText caps the main line at h*0.55
// when a subtitle is present (h*0.7 without), and 7 of the 9 titles are long
// enough that splitTitle wraps them onto two lines. Measured glyph heights:
//
//     wrapped titles (7 of 9)   176/320 of canvas ->  8.56 CSS px
//     single-line ("Flip 7")    224/320 of canvas -> 10.89 CSS px
//
// Then renderer.js draws at RES_SCALE (0.75 high tier, 0.55 low) and the
// browser hard-upscales with image-rendering: pixelated, so the real figure is
// 6.4 device px high-tier and 4.7 low-tier. With antialias off, that is not
// readable text.
//
// This is DELIBERATE and the gate was amended to match: at zoom 1 a sign's job
// is to MARK a building, not to label it — the station's departure board is the
// readable index at that zoom, which is its documented purpose. Titles become
// legible from zoom ~1.9 of the 0.9-5.0 range.
//
// So: do not "fix" this by enlarging the sign. At 4:1, doubling glyph height
// means a 28m-wide sign on a 14m lot.
const SIGN_W = 14
const W = 8.5, D = 8.5   // footprint — inside the 14m lot budget with margin to spare

/** Splits a long title at the space nearest its midpoint, for signTexture's two-line layout. */
function splitTitle(title) {
  if (title.length <= 12) return { text: title, sub: '' }
  const mid = title.length / 2
  let bestIdx = -1, bestDist = Infinity
  for (let i = 0; i < title.length; i++) {
    if (title[i] !== ' ') continue
    const d = Math.abs(i - mid)
    if (d < bestDist) { bestDist = d; bestIdx = i }
  }
  if (bestIdx < 0) return { text: title, sub: '' }
  return { text: title.slice(0, bestIdx), sub: title.slice(bestIdx + 1) }
}

/** Dual-canvas window grid, same idiom as blocks.js/crowd.js, but brighter — this building glows. */
function heroFacade(seed, accent, bright) {
  let s = seed
  const rnd = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
  // Bays sized in world metres, same rule as blocks.js/towers.js: a project lot
  // is ~12m wide and these run ~22m tall, so 9x30 gave 1.3m bays and 0.7m
  // floors — both far under CLAUDE.md's ~3m floor, which is why these read as
  // striped rather than windowed. 4x7 is ~3m per bay in both axes.
  const cols = 4, rows = 7, pxCol = 30, pxRow = 34
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()
  // Daytime facade, a touch lighter than blocks.js's filler (#9aa1ad) because
  // these nine are the ones that must be found.
  g.fillStyle = '#a9b1bd'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  const colors = [WARM, AMBER, CYAN, accent]   // the project's own neon colour bleeds into its own windows
  for (let i = 0; i < cols; i++) {
    const x = i * pxCol
    if (i % 4 === 0) {      // one pier in four; i % 3 was 33% piers at 9 columns
      // Same clipping ceiling as blocks.js PIER — see the note there.
      g.fillStyle = '#4d5566'
      g.fillRect(x, 0, pxCol, h)
      continue
    }
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      if (rnd() > 0.6 * bright) {              // dimmer statuses read as a mostly-dark building
        g.fillStyle = 'rgba(0,0,0,0.22)'       // unlit windows still show the grid
        g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
        continue
      }
      const c = hex(colors[Math.floor(rnd() * colors.length)])
      g.fillStyle = c;  g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
      ge.fillStyle = c; ge.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
    }
  }
  g.fillStyle = 'rgba(0,0,0,0.4)'
  for (let j = 0; j < rows; j++) g.fillRect(0, j * pxRow, w, 2)

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/**
 * One clickable project building. Returns { group, hit, setHover, project } —
 * the same shape ShinjukuScene.vue already expects from alley.js's stalls.
 */
export function createProjectBuilding(project, site) {
  const group = new THREE.Group()
  const { x, z } = lotCenter(site.cell, site.lot)
  group.position.set(x, 0, z)
  const height = site.h

  const accent = ACCENTS[hashSeed(project.id) % ACCENTS.length]
  const accentCss = hex(accent)
  const cfg = STATUS_STYLE[project.status] ?? STATUS_STYLE.live

  // ── Facade — Lambert because it needs emissive/emissiveMap for the hover pulse ──
  const { map, emissiveMap } = heroFacade(hashSeed(project.id), accent, cfg.bright)
  // Daytime: windows read as coloured glass, not a night glow — well below the
  // old 1.1 that was tuned against a black night sky.
  const baseEmissive = 0.35 * cfg.bright
  const facadeMat = new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: baseEmissive,
  })
  const body = new THREE.Mesh(new THREE.BoxGeometry(W, height, D), facadeMat)
  body.position.y = height / 2
  group.add(body)

  // ── Sign — Basic because the texture already bakes in the lit look; no lighting to fake ──
  const { text, sub } = splitTitle(project.title)
  const sign = createSignTexture({
    text, sub, style: cfg.sign, orientation: 'horizontal', color: accentCss, px: 320,
  })
  const signMat = new THREE.MeshBasicMaterial({ map: sign.map })
  const signH = SIGN_W / sign.aspect
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(SIGN_W, signH), signMat)
  // Mounted above the roof, on the +Z face — the two faces (+X, +Z) this
  // azimuth-45 camera actually sees. Roof-mounted keeps it clear of
  // shorter neighbouring filler and reads as a rooftop board, not a wall sign.
  signMesh.position.set(0, height + 0.4 + signH / 2, D / 2 + 0.06)
  group.add(signMesh)

  // ── Ground halo — lightPool.js's shared-texture decal, not a real light ──
  const haloOpacity = 0.5 * cfg.halo
  const halo = createLightPool({ color: accentCss, radius: SIGN_W * 0.65, intensity: haloOpacity })
  halo.position.y = 0.03   // clear of the street plane, avoids z-fighting
  group.add(halo)

  // ── Hit box — generous, covers the sign overhang too ──
  const hitH = height + signH + 2
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(SIGN_W + 1, hitH, D + 1),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hit.position.y = hitH / 2
  group.add(hit)

  // Basic materials have no emissive channel — brighten via `color` instead,
  // which multiplies the (already-baked-bright) map texture. NoToneMapping
  // means this clips rather than rolls off, which is the point: a hovered
  // sign should read as hotter, not just re-tinted.
  function setHover(on) {
    signMat.color.setScalar(on ? 1.6 : 1.0)
    halo.material.opacity = on ? haloOpacity * 1.7 : haloOpacity
    facadeMat.emissiveIntensity = on ? baseEmissive * 1.4 : baseEmissive
  }

  return { group, hit, setHover, project }
}
