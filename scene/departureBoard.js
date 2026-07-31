import * as THREE from 'three'
import { AMBER, CYAN, WARM } from './palette.js'

// A Shinjuku Station departure board listing projects as destinations.
//
// This is the discoverability defence: a 3D scene is worse than a list at
// "find the thing in five seconds", so the scene carries one readable index
// where every row is individually clickable.
// Sized for legibility, not taste. At the default zoom the view is ~32 px per
// metre, so text needs to be ~0.4 m tall on the board to clear ~13 screen px —
// which means a big board and type at ~6% of its height. A smaller board makes
// the one readable index in the scene unreadable, which defeats its purpose.
// Width is bounded by the composition: the gap left of the alley is ~9.6 screen
// units at 16:9 and the board consumes 0.707 × W of them, so 14 m overflowed the
// frame. 12.5 m fits the gap without occluding the first stall.
const W = 12.5, H = 7             // metres
const PX_W = 1536, PX_H = 768
const PAD = 48, HEAD_Y = 76, ROW0 = 130, ROW_H = 68

const FONT = "'DM Mono', ui-monospace, monospace"

function boardTexture(projects) {
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = PX_W; c.height = PX_H
    return [c, c.getContext('2d')]
  }
  const [cMap, g]  = mk()
  const [cEmi, ge] = mk()

  for (const ctx of [g, ge]) {
    ctx.fillStyle = '#04050a'
    ctx.fillRect(0, 0, PX_W, PX_H)
    ctx.textBaseline = 'middle'
  }

  // Header
  const head = (ctx, dim) => {
    ctx.fillStyle = dim ? '#5a4620' : '#ffcf8a'
    ctx.font = `500 36px ${FONT}`
    ctx.fillText('行先  DESTINATION', PAD, HEAD_Y)
    ctx.textAlign = 'right'
    ctx.fillText('YEAR   STATUS', PX_W - PAD, HEAD_Y)
    ctx.textAlign = 'left'
    ctx.fillStyle = dim ? '#3a2d16' : '#8a6a34'
    ctx.fillRect(PAD, HEAD_Y + 32, PX_W - PAD * 2, 3)
  }
  head(g, false)
  head(ge, false)

  const hex = (n) => '#' + n.toString(16).padStart(6, '0')

  projects.forEach((p, i) => {
    const y = ROW0 + i * ROW_H + ROW_H / 2
    const live = p.status === 'live'
    const main = live ? hex(AMBER) : '#9a8663'
    const stat = live ? hex(CYAN) : '#7d7361'

    for (const ctx of [g, ge]) {
      // Platform number, the way a real board numbers its tracks.
      ctx.font = `500 38px ${FONT}`
      ctx.fillStyle = hex(WARM)
      ctx.fillText(String(i + 1).padStart(2, '0'), PAD, y)

      ctx.font = `500 44px ${FONT}`
      ctx.fillStyle = main
      ctx.fillText(p.title, PAD + 110, y)

      ctx.textAlign = 'right'
      ctx.font = `400 32px ${FONT}`
      ctx.fillStyle = '#8e8a7e'
      ctx.fillText(p.year ?? '', PX_W - PAD - 230, y)
      ctx.fillStyle = stat
      ctx.fillText(live ? 'ON TIME' : 'DELAYED', PX_W - PAD, y)
      ctx.textAlign = 'left'
    }
  })

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/** Row centre in board-local Y (metres), converting canvas px to world. */
function rowLocalY(i) {
  const py = ROW0 + i * ROW_H + ROW_H / 2
  return H / 2 - (py / PX_H) * H
}

export function createDepartureBoard(projects) {
  const group = new THREE.Group()
  const DECK = 2.6                       // underside of the board

  const { map, emissiveMap } = boardTexture(projects)
  const faceMat = new THREE.MeshStandardMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 1.0, roughness: 0.55,
  })
  const face = new THREE.Mesh(new THREE.PlaneGeometry(W, H), faceMat)
  face.position.set(0, DECK + H / 2, 0.07)
  group.add(face)

  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x14171f, roughness: 0.85 })
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(W + 0.5, H + 0.5, 0.3), bezelMat)
  bezel.position.set(0, DECK + H / 2, -0.08)
  group.add(bezel)

  // Hood, so the board reads as a physical object rather than a floating decal.
  const hood = new THREE.Mesh(new THREE.BoxGeometry(W + 0.7, 0.16, 0.8), bezelMat)
  hood.position.set(0, DECK + H + 0.32, 0.22)
  group.add(hood)

  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, DECK, 0.3), bezelMat)
    post.position.set(sx * (W / 2 - 0.6), DECK / 2, 0)
    group.add(post)
  }

  // Row highlight, parked off-board until a row is hovered.
  const highlight = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 0.4, (ROW_H / PX_H) * H),
    new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.16 }),
  )
  highlight.visible = false
  highlight.position.z = 0.1
  group.add(highlight)

  // One thin pick target per row — the board is an index, so a row is the unit
  // of interaction, not the whole board.
  const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  const rows = projects.map((project, i) => {
    const y = DECK + H / 2 + rowLocalY(i)
    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(W - 0.4, (ROW_H / PX_H) * H, 0.5),
      hitMat,
    )
    hit.position.set(0, y, 0.2)
    group.add(hit)
    return {
      hit,
      project,
      setHover(on) {
        highlight.visible = on
        if (on) highlight.position.y = y
        faceMat.emissiveIntensity = on ? 1.35 : 1.0
      },
    }
  })

  return { group, rows }
}
