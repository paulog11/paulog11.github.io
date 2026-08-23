import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { MAP_HALF as DEFAULT_MAP_HALF } from './cityLayout.js'

// 1 world unit = 1 metre. The map is a 178m square (see cityLayout.js), and the
// camera frames all of it at zoom 1 — on ANY aspect ratio.
//
// All three constants below are derived from this rig's projection, not tuned
// against a screenshot:
//   screenX = 0.707(x - z)      -> x-z spans +/-178, so half-width  = 0.707*178 = 126
//   screenY = 0.927y - 0.265(x+z)
// At ground level screenY spans +/-47. The tallest content (~46m towers) adds
// 0.927*46 = 43 on top, and only at the BACK of the map, so the content box is
// asymmetric: roughly -47 to +90. That asymmetry is why the camera target sits
// above the ground rather than on it — with a ground-level target the city
// bunches into the top of the frame and the bottom third renders empty.
//
// These are DEFAULTS, overridable via createStage's opts.content — a caller
// framing a differently-sized map (see scene/net/) passes its own {w,h,cy} and
// opts.mapHalf rather than editing these.
const DEFAULT_CONTENT = { w: 267, h: 145, cy: 21.3 }
                                             // 252 wide + ~6% margin
                                             // 137 tall + ~6% margin
                                             // screenY centre of the content box

const AZIMUTH  = Math.PI / 4 // 45 degrees — the isometric default
const DRAG_SLOP = 5          // px of pointer travel that still counts as a click

// The closest the camera may get, in metres of vertical view. Expressed as a
// view size rather than a zoom multiplier so a phone and a desktop reach the
// same intimacy — a fixed maxZoom would leave narrow screens permanently
// further out, because their zoom-1 frustum is much larger (see resize()).
const CLOSEST_VIEW = 30
const MIN_ZOOM = 0.9

/**
 * The zoom the scene OPENS at, derived from the aspect ratio.
 *
 * On a 16:9 desktop the frustum is height-bound and zoom 1 frames the city
 * exactly. On a 375px portrait phone width binds instead: the frustum inflates
 * to 475 to fit a 267-unit-wide map, and the 145-unit-tall city then occupies
 * 31% of the viewport height — the whole map is visible, but as a postage stamp
 * with ~270px of empty sky above it.
 *
 * A phone cannot both fit 267 units of width AND fill 145 units of height; the
 * two are ~3.3x apart. So the default splits the difference geometrically:
 *
 *     zoom = sqrt(frustum / CONTENT_H)
 *
 * The square root is what makes it a split rather than a preference — the city
 * ends up occupying the SAME fraction of both axes. At 375x667 that is 55% of
 * the height and 55% of the width, versus 31% and 100%. Desktop is unaffected
 * (1.02), because there the ratio inside the root is already ~1.
 *
 * This changes where you START, not where you can GO: minZoom is still 0.9, so
 * pinching out to see the entire map remains available on every device.
 *
 * Deliberately height-only, not clamped against a width-fit candidate. A very
 * wide, short content box (e.g. scene/net/'s ground-only 750x281, versus
 * today's 267x145) hits the SAME width-binds-at-zoom-1 condition a portrait
 * phone hits with today's box, and this formula already, deliberately, zooms
 * past that point — that's what turns a 267-wide map's 31%-of-height postage
 * stamp on a 375px phone into 55%. Clamping to "never crop width" would
 * silently collapse THAT case back to zoom 1 too (verified: phone fill drops
 * from 55% to 30%, under this repo's own 45% test floor) — it isn't a
 * width-cropping bug to fix, it's this function's one existing job, now also
 * visible on ordinary desktop aspects because a ground-only box is unusually
 * wide. CONTENT_H is parameterised so a caller with a differently-shaped
 * content box still gets this same, unchanged trade-off.
 */
const defaultZoom = (frustum, CONTENT_H) => Math.sqrt(frustum / CONTENT_H)

// Render resolution as a fraction of CSS pixels. Below 1 this is a large,
// near-linear fragment-cost saving, and paired with `image-rendering: pixelated`
// on the canvas it is not a compromise but the actual 90s look.
const RES_SCALE = { high: 0.75, low: 0.55 }

// 90s isometric games ran here. Halves the frame budget versus 60fps, and the
// scene is a static city — nothing in it needs to be smooth.
const TARGET_FPS = 30

// setAnimationLoop fires on the display's cadence — 16.67ms ticks at 60Hz. Two
// ticks is 33.33ms, which is exactly 1000/30, so a naive `< 1000/TARGET_FPS`
// test loses to timer jitter almost every time and the loop waits for a THIRD
// tick: 50ms, i.e. an actual 20fps. Measured at a flat 49.9-50.1ms median
// regardless of scene complexity, which is what proves it was the cap and not
// GPU load. Half a tick of slack lets the 2-tick gap qualify.
const FRAME_SLACK_MS = 8

/**
 * The day sky, used as the visible background. Equirectangular, so canvas-Y
 * runs zenith -> horizon (mid) -> nadir. Deep blue overhead, paling toward a
 * hazy horizon the way a real midday sky does.
 *
 * No PMREM environment any more. That existed only so metallic surfaces had
 * something to reflect, and nothing in the scene is metallic since the material
 * policy went unlit/Lambert — generating it was pure startup cost.
 */
function daySky() {
  const c = document.createElement('canvas')
  c.width = 64; c.height = 256
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0,    '#3d7dd8')   // zenith
  grad.addColorStop(0.32, '#6fa3e6')
  grad.addColorStop(0.46, '#a9c8ec')
  grad.addColorStop(0.5,  '#d8e6ef')   // horizon haze
  grad.addColorStop(0.54, '#c7c9bd')
  grad.addColorStop(1,    '#9a9a90')   // below the horizon
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 256)

  const src = new THREE.CanvasTexture(c)
  src.mapping = THREE.EquirectangularReflectionMapping
  src.colorSpace = THREE.SRGBColorSpace
  return src
}

/** Phones and small viewports get a cheaper scene. Overridable for benchmarking. */
export function detectQuality() {
  return (window.innerWidth < 900 || matchMedia('(pointer: coarse)').matches) ? 'low' : 'high'
}

/**
 * Owns the canvas, camera and pointer picking.
 * Throws if WebGL is unavailable — callers should catch and fall back.
 */
export function createStage(canvas, opts = {}) {
  const quality = opts.quality ?? detectQuality()
  const low = quality === 'low'
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  // A caller framing a different-sized map (see scene/net/, MAP_HALF 250 vs
  // cityLayout.js's 89) passes both of these; every existing caller passes
  // neither and gets today's exact numbers back out of the derivations below.
  const mapHalf = opts.mapHalf ?? DEFAULT_MAP_HALF
  const { w: CONTENT_W, h: CONTENT_H, cy: CONTENT_CY } = opts.content ?? DEFAULT_CONTENT
  const TARGET_Y = CONTENT_CY / 0.927   // the world height that centres the content box

  // antialias off: it fights the pixelated upscale and costs fill rate. The
  // chunky edges are the point.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
  renderer.setPixelRatio(opts.resScale ?? (low ? RES_SCALE.low : RES_SCALE.high))
  // No tone mapping. ACES exists to roll off highlights for a bloom pass; with
  // flat unlit signage and no bloom it only desaturates the neon. Flat saturated
  // colour is the palette this look wants.
  renderer.toneMapping = THREE.NoToneMapping

  const scene = new THREE.Scene()
  const elevation = 22 * Math.PI / 180

  // Ground-plane view depth under this rig is `radius - K*(x+z)`, K = cos(el)*
  // cos(45deg) (see CLAUDE.md's screenY derivation). Both the camera radius and
  // the fog far plane are pinned to two INVARIANTS measured off today's known-
  // good numbers (radius 200, fog 220-500 at MAP_HALF 89), not scaled by a
  // fitted multiplier — so a bigger map reproduces the same margins instead of
  // an approximation of them, and MAP_HALF=89 reproduces today's numbers EXACTLY:
  //   NEAR_BUFFER = camera-to-near-corner gap    (200 - K*2*89 = 83.30)
  //   FOG_MARGIN  = fog-far beyond the far corner (500 - (200 + K*2*89) = 183.30)
  // radius = K*2*mapHalf + NEAR_BUFFER keeps the near-corner gap constant at
  // any map size, which is what stops the near corner clipping behind the
  // camera on a larger map (verified: at MAP_HALF 250 the near corner would
  // otherwise sit at view depth -127.8, i.e. behind camera.near).
  const K = Math.cos(elevation) * Math.SQRT1_2
  const NEAR_BUFFER = 83.30
  const FOG_MARGIN = 183.30
  const radius = K * 2 * mapHalf + NEAR_BUFFER
  const farCornerDepth = radius + K * 2 * mapHalf
  // Pushed far out: see the derivation above. This only softens the extreme
  // back corner, and at MAP_HALF 89 reproduces the literal 220/500 this had
  // before parameterisation.
  scene.fog = new THREE.Fog(0xc7d3dc, 220, farCornerDepth + FOG_MARGIN)
  scene.background = daySky()

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000)
  camera.position.set(
    radius * Math.cos(elevation) * Math.sin(AZIMUTH),
    radius * Math.sin(elevation) + TARGET_Y,
    radius * Math.cos(elevation) * Math.cos(AZIMUTH),
  )

  const controls = new OrbitControls(camera, canvas)
  // Above the station rather than on it — see CONTENT_CY. The pivot being off
  // the ground is deliberate, not a leftover.
  controls.target.set(0, TARGET_Y, 0)
  controls.enablePan = true
  controls.screenSpacePanning = false
  controls.touches.ONE = THREE.TOUCH.PAN
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  // Constrained so the composition can never break and you never see the
  // unfinished backs of buildings.
  controls.minPolarAngle   = Math.PI * 0.26
  controls.maxPolarAngle   = Math.PI * 0.46
  controls.minAzimuthAngle = AZIMUTH - Math.PI / 5
  controls.maxAzimuthAngle = AZIMUTH + Math.PI / 5
  controls.minZoom = MIN_ZOOM
  controls.zoom0 = 1
  controls.update()

  // ── Sizing ────────────────────────────────────────────────────────────────
  let zoomed = false            // has the aspect-derived default zoom been applied?

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    const aspect = w / h
    // The frustum satisfies whichever axis is binding. On a 16:9 desktop that is
    // height; on a 375px portrait phone the map is ~3.5x too wide to fit inside a
    // height-derived frustum, so width binds and the view pulls back. A fixed
    // frustum left narrow screens unable to see the city at all.
    const frustum = Math.max(CONTENT_H, CONTENT_W / aspect)
    camera.left   = -frustum * aspect / 2
    camera.right  =  frustum * aspect / 2
    camera.top    =  frustum / 2
    camera.bottom = -frustum / 2
    camera.updateProjectionMatrix()
    // Zoom range follows the frustum so every device can reach the same closest
    // view, rather than phones being stuck further out.
    controls.maxZoom = Math.max(MIN_ZOOM + 0.1, frustum / CLOSEST_VIEW)

    // Applied on the first sizing only. resize() also runs on every window
    // resize and on device rotation, and re-deriving the zoom there would
    // silently throw away wherever the user had zoomed to.
    if (!zoomed) {
      zoomed = true
      const z = THREE.MathUtils.clamp(defaultZoom(frustum, CONTENT_H), MIN_ZOOM, controls.maxZoom)
      camera.zoom = z
      controls.zoom0 = z          // so controls.reset() returns here, not to 1
      camera.updateProjectionMatrix()
    }
    // updateStyle=false: the backing store shrinks by the pixel ratio while the
    // canvas keeps its CSS size, so the browser upscales it.
    renderer.setSize(w, h, false)
    invalidate()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  // ── Picking ───────────────────────────────────────────────────────────────
  // Meshes register themselves here; userData.project carries the payload.
  const targets = []
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const handlers = { hover: () => {}, select: () => {} }
  let hovered = null
  let downAt = null

  // Project hit boxes are as tall as their buildings (~35-40m), which under an
  // orthographic isometric camera is a ~190px screen column. Raycasting ONLY the
  // registered targets means nothing else can occlude them — so a click that
  // visually lands on a filler building standing in front of a tall project
  // still selects that project. Measured at zoom 1 on a 1280x720 frame: 26.4% of
  // the total clickable area was such a phantom, and for `venue-search` and
  // `japan-map` it was 52.8% and 47.3% — more than half of each one's clickable
  // area was somewhere else on screen.
  //
  // So a hit is only real if nothing opaque sits in front of it. Transparent
  // meshes are skipped deliberately: the halos, light-pool decals and rain are
  // additive atmosphere you are meant to click straight through.
  function occluded(hit) {
    // Clamping `far` to the hit is what makes this cheap — everything behind the
    // candidate is rejected on its bounding volume before any triangle is tested.
    const far = raycaster.far
    raycaster.far = hit.distance - 0.01
    const blocked = raycaster
      .intersectObject(scene, true)
      .some((i) => i.object.visible && !targets.includes(i.object) &&
                   ![i.object.material].flat().some((m) => m?.transparent))
    raycaster.far = far
    return blocked
  }

  function hitTest(ev) {
    const r = canvas.getBoundingClientRect()
    pointer.x =  ((ev.clientX - r.left) / r.width)  * 2 - 1
    pointer.y = -((ev.clientY - r.top)  / r.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(targets, false)[0]
    if (!hit) return null
    return occluded(hit) ? null : hit.object
  }

  function onPointerMove(ev) {
    const hit = hitTest(ev)
    if (hit === hovered) return
    hovered = hit
    canvas.style.cursor = hit ? 'pointer' : 'grab'
    handlers.hover(hit?.userData.project ?? null)
    invalidate()
  }

  const onPointerDown = (ev) => { downAt = { x: ev.clientX, y: ev.clientY } }

  function onPointerUp(ev) {
    if (!downAt) return
    const moved = Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y)
    downAt = null
    if (moved > DRAG_SLOP) return          // that was an orbit drag, not a click
    const hit = hitTest(ev)
    if (hit) handlers.select(hit.userData.project)
  }

  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointerup',   onPointerUp)

  // ── Frame loop ────────────────────────────────────────────────────────────
  const frameCallbacks = []
  const clock = new THREE.Clock()
  let dirty = true
  let lastFrame = 0
  const invalidate = () => { dirty = true }

  // Panning is a box over the map, not a rail: at high zoom you need to reach
  // every corner, and the camera has to travel with the target so the isometric
  // framing stays rigid.
  function clampPan() {
    const t = controls.target
    const dx = THREE.MathUtils.clamp(t.x, -mapHalf, mapHalf) - t.x
    const dy = TARGET_Y - t.y                        // pivot height is fixed, see CONTENT_CY
    const dz = THREE.MathUtils.clamp(t.z, -mapHalf, mapHalf) - t.z
    if (!dx && !dy && !dz) return
    t.set(t.x + dx, t.y + dy, t.z + dz)
    camera.position.set(
      camera.position.x + dx,
      camera.position.y + dy,
      camera.position.z + dz,
    )
  }

  function tick(now) {
    const moving = controls.update()
    clampPan()

    // Under reduced motion we render on demand only: the scene stays fully
    // interactive (orbit, zoom, hover) but nothing animates on its own.
    if (reduceMotion) {
      if (!moving && !dirty) return
      dirty = false
      renderer.render(scene, camera)
      return
    }

    // Everything else is capped rather than on-demand, because rain, the train,
    // steam and neon flicker all animate every frame — there is no idle state to
    // fall back to. The cap is where the saving comes from.
    if (now - lastFrame < 1000 / TARGET_FPS - FRAME_SLACK_MS) return
    const dt = Math.min((now - lastFrame) / 1000, 0.1)
    lastFrame = now

    for (const fn of frameCallbacks) fn(dt, clock.getElapsedTime())
    dirty = false
    renderer.render(scene, camera)
  }

  resize()

  return {
    scene, camera, controls, renderer, reduceMotion, quality,
    invalidate,
    onFrame: (fn) => frameCallbacks.push(fn),
    /** Register a mesh as clickable. `project` is handed back on hover/select. */
    addPickable(mesh, project) {
      mesh.userData.project = project
      targets.push(mesh)
    },
    onHover:  (fn) => { handlers.hover = fn },
    onSelect: (fn) => { handlers.select = fn },
    start: () => renderer.setAnimationLoop(tick),
    stop:  () => renderer.setAnimationLoop(null),
    dispose() {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup',   onPointerUp)
      controls.dispose()
      scene.traverse((o) => {
        o.geometry?.dispose()
        for (const m of [o.material].flat().filter(Boolean)) {
          for (const v of Object.values(m)) v?.isTexture && v.dispose()
          m.dispose()
        }
      })
      scene.background?.dispose()
      renderer.dispose()
    },
  }
}

/**
 * Two lights, not four. Under MeshLambertMaterial every light is per-fragment
 * work and every distinct light count compiles another shader program; the
 * emissive maps on the facades do most of the visual work anyway.
 */
export function addDaylight(scene) {
  scene.add(new THREE.AmbientLight(0xdbe6f5, 1.6))
  const sun = new THREE.DirectionalLight(0xfff3d8, 2.0)
  sun.position.set(-60, 70, 40)
  scene.add(sun)
}
