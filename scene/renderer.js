import * as THREE from 'three'
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js'
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass }      from 'three/addons/postprocessing/OutputPass.js'
import { NIGHT } from './palette.js'

// 1 world unit = 1 metre at street level. Backdrop towers use compressed
// geometry (Phase 3) because an ortho camera gives them no distance falloff.
const FRUSTUM  = 26          // metres of vertical view at zoom 1
const AZIMUTH  = Math.PI / 4 // 45° — the isometric default
const DRAG_SLOP = 5          // px of pointer travel that still counts as a click

/**
 * The night sky, used both as the visible background and as the reflection
 * environment. Equirectangular, so canvas-Y runs zenith → horizon (mid) → nadir.
 * Tokyo's sky is never black: light pollution puts a warm bloom just above the
 * horizon. That glow also fills the upper corners of the frame, which at this
 * camera elevation are genuinely sky — no ground position projects there, so no
 * amount of backdrop geometry can cover them.
 */
function nightSky(renderer) {
  const c = document.createElement('canvas')
  c.width = 64; c.height = 256
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0,    '#03050b')   // zenith
  grad.addColorStop(0.32, '#070b16')
  grad.addColorStop(0.46, '#141a2e')
  grad.addColorStop(0.5,  '#3a2740')   // horizon: city glow
  grad.addColorStop(0.54, '#2a1a22')
  grad.addColorStop(1,    '#05070d')   // below the horizon
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 256)

  const src = new THREE.CanvasTexture(c)
  src.mapping = THREE.EquirectangularReflectionMapping
  src.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromEquirectangular(src).texture
  pmrem.dispose()
  // `src` stays alive — it is the scene background, not just the PMREM source.
  return { env, background: src }
}

/**
 * Owns the canvas, camera, post-processing and pointer picking.
 * Throws if WebGL is unavailable — callers should catch and fall back.
 */
/** Phones and small viewports get a cheaper scene. Overridable for benchmarking. */
export function detectQuality() {
  return (window.innerWidth < 900 || matchMedia('(pointer: coarse)').matches) ? 'low' : 'high'
}

export function createStage(canvas, opts = {}) {
  const quality = opts.quality ?? detectQuality()
  const low = quality === 'low'
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !low })
  renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1.25 : 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.95

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(NIGHT, 90, 260)
  // Without an environment map, any metallic surface has no diffuse and nothing
  // to reflect, so it renders pure black. Wet asphalt and puddles depend on it.
  const sky = nightSky(renderer)
  scene.background = sky.background
  scene.environment = sky.env
  scene.environmentIntensity = 0.55

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000)
  const elevation = 22 * Math.PI / 180
  const radius = 160
  camera.position.set(
    radius * Math.cos(elevation) * Math.sin(AZIMUTH),
    radius * Math.sin(elevation),
    radius * Math.cos(elevation) * Math.cos(AZIMUTH),
  )

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 3.4, -1.5)
  // Panning along the alley is how narrow viewports reach every stall — at
  // 375px only ~3 of 9 fit, and zooming out far enough to fit all nine makes
  // the signs unreadable. On touch, one finger travels the street.
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
  controls.minZoom = 0.7
  controls.maxZoom = 2.6
  controls.update()

  // Bloom is the most expensive pass here (five mip blurs over the full frame),
  // so the low tier renders it at half resolution.
  const bloomScale = low ? 0.5 : 1
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = opts.bloom === false
    ? null
    : new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.45, 0.58)
  if (bloom) composer.addPass(bloom)
  composer.addPass(new OutputPass())

  // ── Sizing ────────────────────────────────────────────────────────────────
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    const aspect = w / h
    camera.left   = -FRUSTUM * aspect / 2
    camera.right  =  FRUSTUM * aspect / 2
    camera.top    =  FRUSTUM / 2
    camera.bottom = -FRUSTUM / 2
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
    bloom?.resolution.set(w * bloomScale, h * bloomScale)
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

  function hitTest(ev) {
    const r = canvas.getBoundingClientRect()
    pointer.x =  ((ev.clientX - r.left) / r.width)  * 2 - 1
    pointer.y = -((ev.clientY - r.top)  / r.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    return raycaster.intersectObjects(targets, false)[0]?.object ?? null
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
  // Under reduced-motion we render on demand only: the scene stays interactive
  // (orbit, hover) but nothing animates on its own.
  const frameCallbacks = []
  const clock = new THREE.Clock()
  let dirty = true
  const invalidate = () => { dirty = true }

  // Keep panning on rails: slide along the alley only, never off it. Camera and
  // target move together so the framing stays rigid.
  const PAN_X = 24, HOME_Y = 3.4, HOME_Z = -1.5
  function clampPan() {
    const t = controls.target
    const dx = THREE.MathUtils.clamp(t.x, -PAN_X, PAN_X) - t.x
    const dy = HOME_Y - t.y
    const dz = HOME_Z - t.z
    if (!dx && !dy && !dz) return
    t.set(t.x + dx, t.y + dy, t.z + dz)
    camera.position.set(camera.position.x + dx, camera.position.y + dy, camera.position.z + dz)
  }

  function tick() {
    const moving = controls.update()
    clampPan()
    if (reduceMotion) {
      if (!moving && !dirty) return
    } else {
      const dt = clock.getDelta()
      for (const fn of frameCallbacks) fn(dt, clock.elapsedTime)
    }
    dirty = false
    composer.render()
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
      composer.dispose()
      renderer.dispose()
    },
  }
}

/** Moonlight and city bounce. The emissive facades do most of the real work. */
export function addNightLighting(scene) {
  scene.add(new THREE.AmbientLight(0x3a4566, 1.6))
  const moon = new THREE.DirectionalLight(0xc2d2f0, 2.2)
  moon.position.set(-60, 70, 40)
  scene.add(moon)
  const fill = new THREE.DirectionalLight(0x9fb3d9, 1.5)
  fill.position.set(110, 50, 110)
  scene.add(fill)
  const bounce = new THREE.DirectionalLight(0xff8a4a, 0.6)
  bounce.position.set(40, -20, 50)
  scene.add(bounce)
}
