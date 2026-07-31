import * as THREE from 'three'

// The two hero landmarks, built as BACKDROP. They establish the place; the
// alley in front of them is what you actually click.
//
// Both are modelled in "spike units" (1 unit = 5 m, matching spike/tocho.html)
// and then the whole group is scaled down. An orthographic camera gives no
// distance falloff, so a literally-scaled 243 m tower would be nine times the
// screen height — the compression IS the forced perspective.
// Height is bounded by the projection, not by taste. Screen height at azimuth
// 45°/elevation 22° is 0.927y - 0.265(x+z), so an object 26 m back is already
// ~7 m up-screen before its own height counts. With a 26 m vertical view and
// the frame top at ~16.5, 13 m is what keeps the bifurcation — the whole point
// of the silhouette — inside the frame.
const S = 11 / 48.6    // 都庁's 48.6 spike-units become 11 scene-metres
const S_COCOON = 8 / 40.8

let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

/**
 * Tange's facade: alternating granite piers and dark glass, subdivided at two
 * scales, which is what gives 都庁 its "circuit board" read. Returns separate
 * colour and emissive canvases so only the glass glows.
 */
function facade(cols, rows, { lit = 0.3, pxCol = 24, pxRow = 14 } = {}) {
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g]  = mk()
  const [cEmi, ge] = mk()

  g.fillStyle = '#20242c'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  const sig = [1, 0, 0, 1, 1, 0, 0, 1]
  const isPier = (i) => sig[i % 8] === 1 && sig[Math.floor(i / 8) % 8] === 1

  for (let i = 0; i < cols; i++) {
    const x = i * pxCol
    if (isPier(i)) {
      g.fillStyle = '#b9c0cc'
      g.fillRect(x, 0, pxCol, h)
      g.fillStyle = 'rgba(0,0,0,0.18)'
      g.fillRect(x + pxCol - 3, 0, 3, h)
      continue
    }
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      if (rnd() > lit) continue
      const warm = rnd()
      const col = warm > 0.82 ? '#a8cfe8' : warm > 0.25 ? '#e8c88a' : '#f2e3c4'
      g.fillStyle = col;  g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
      ge.fillStyle = col; ge.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
    }
  }

  g.fillStyle = 'rgba(0,0,0,0.55)'
  for (let j = 0; j < rows; j++) g.fillRect(0, j * pxRow, w, 2)

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/** The Cocoon's woven diagonal lattice — a texture, not geometry. */
function latticeTexture() {
  const w = 512, h = 1024
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  const e = document.createElement('canvas')
  e.width = w; e.height = h
  const ge = e.getContext('2d')

  g.fillStyle = '#161c28'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  // Lit cells behind the lattice.
  for (let y = 0; y < h; y += 26) {
    for (let x = 0; x < w; x += 26) {
      if (rnd() > 0.34) continue
      const col = rnd() > 0.5 ? '#cfe6f5' : '#e8d4a8'
      g.fillStyle = col;  g.fillRect(x + 4, y + 4, 18, 18)
      ge.fillStyle = col; ge.fillRect(x + 4, y + 4, 18, 18)
    }
  }

  // The weave: two sets of diagonals, drawn on both canvases so the white
  // ribs glow faintly the way the real building's lighting picks them out.
  for (const dir of [1, -1]) {
    for (let i = -h; i < w + h; i += 46) {
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

function slab(w, h, d, opts = {}) {
  const { map, emissiveMap } = facade(
    Math.max(4, Math.round(w * 5 / 3.6)),
    Math.max(4, Math.round(h * 5 / 4.0)),
    opts,
  )
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.5,
      roughness: 0.72, metalness: 0.05,
    }),
  )
  return mesh
}

function place(mesh, x, yBottom, z) {
  mesh.position.set(x, yBottom + mesh.geometry.parameters.height / 2, z)
  return mesh
}

/** Tokyo Metropolitan Government Building No.1 — 243 m, 48 floors. */
function createTocho() {
  const g = new THREE.Group()
  const U = 1 / 5
  const PODIUM_H = 33 * U, SPLIT_Y = 169 * U, TOP_Y = 243 * U

  g.add(place(slab(26, PODIUM_H, 22, { lit: 0.62 }), 0, 0, 0))
  g.add(place(slab(15, SPLIT_Y - PODIUM_H, 15), 0, PODIUM_H, 0))

  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    g.add(place(slab(2.6, SPLIT_Y - PODIUM_H + 1.0, 2.6, { lit: 0.22 }),
      sx * 6.3, PODIUM_H, sz * 6.3))
  }

  // The signature: one mass rising from the podium that bifurcates into twin
  // towers at floor 33 of 48. This is what makes it identifiable.
  for (const sx of [-1, 1]) {
    g.add(place(slab(5.25, TOP_Y - SPLIT_Y, 12), sx * 4.9, SPLIT_Y, 0))
    g.add(place(new THREE.Mesh(
      new THREE.BoxGeometry(3.9, 1.6, 9),
      new THREE.MeshStandardMaterial({ color: 0x6a7286, roughness: 0.9 }),
    ), sx * 4.9, TOP_Y, 0))
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.2, 6, 6),
      new THREE.MeshStandardMaterial({ color: 0x7a8394, roughness: 0.8 }),
    )
    mast.position.set(sx * 4.9, TOP_Y + 1.6 + 3, 0)
    g.add(mast)
    const warn = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xff2b2b }),
    )
    warn.position.set(sx * 4.9, TOP_Y + 1.6 + 6.2, 0)
    g.add(warn)
  }

  return g
}

/** Mode Gakuen Cocoon Tower — 204 m. The lattice is a texture, not geometry. */
function createCocoon() {
  const g = new THREE.Group()
  const H = 204 / 5          // spike units
  const R = 6.6              // the real Cocoon is squat; too slim reads as a tube

  // Elliptical cocoon: narrow at the base, bulging at mid-height, tapering to
  // a rounded crown.
  const profile = [
    [0.52, 0], [0.74, 0.08], [0.92, 0.22], [1.0, 0.42],
    [0.97, 0.6], [0.86, 0.78], [0.62, 0.93], [0.3, 1.0],
  ].map(([rf, hf]) => new THREE.Vector2(rf * R, hf * H))

  const { map, emissiveMap } = latticeTexture()
  const body = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 28),
    new THREE.MeshStandardMaterial({
      map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.42,
      roughness: 0.4, metalness: 0.2,
    }),
  )
  body.scale.z = 0.68        // elliptical in plan, not circular
  g.add(body)

  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(13, 2.4, 10),
    new THREE.MeshStandardMaterial({ color: 0x2a2f3a, roughness: 0.9 }),
  )
  podium.position.y = 1.2
  g.add(podium)

  return g
}

/** Both landmarks, compressed and placed behind the alley. Positions in metres. */
export function createTowers() {
  const group = new THREE.Group()

  // Both sit right of centre: in this projection "directly behind and centred"
  // means x ≈ z ≈ very negative, which pushes an object off the top of frame.
  // The crowd-building field fills the left instead.
  const tocho = createTocho()          // → 11 m, top lands just inside the frame
  tocho.scale.setScalar(S)
  tocho.position.set(2, 0, -21)
  group.add(tocho)

  const cocoon = createCocoon()        // → 8 m
  cocoon.scale.setScalar(S_COCOON)
  cocoon.position.set(-13, 0, -17)
  group.add(cocoon)

  return group
}
