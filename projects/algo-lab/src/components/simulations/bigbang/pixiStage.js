/**
 * Shared PixiJS stage for the Big Bang simulation views.
 * Owns the single WebGL context: Application, background gradient, star
 * backdrop, the zoomable bloomed `world` container, and the outcome
 * overlay. Per-view renderers (atom/celestial/planetary) attach their
 * root container into `world` and drive frames through render().
 */
import { Application, Container, Graphics, Rectangle, Sprite, Texture } from 'pixi.js'
import { AdvancedBloomFilter } from 'pixi-filters'

export const TEX_SIZE = 32

export async function createPixiStage(containerEl, W, H) {
  const app = new Application()
  await app.init({
    width: W, height: H,
    background: 0x03020a,
    antialias: true,
    autoStart: false, // the component's rAF loop drives rendering
    resolution: Math.min(2, window.devicePixelRatio || 1),
    autoDensity: true,
  })
  containerEl.appendChild(app.canvas)

  const dotTex = makeDotTexture()
  const hardDotTex = makeHardDotTexture()

  // Background gradient — port of the canvas drawBG(). Hidden by default;
  // the planetary view keeps the flat renderer background.
  const bgSprite = new Sprite(makeBgTexture())
  bgSprite.visible = false
  app.stage.addChild(bgSprite)

  // Static star backdrop — outside `world` so it doesn't zoom
  const starsG = new Graphics()
  app.stage.addChild(starsG)

  // Unzoomed per-view layer under the world (atom's bang flash lives here)
  const underlay = new Container()
  app.stage.addChild(underlay)

  // Zoomable world with bloom
  const world = new Container()
  const bloom = new AdvancedBloomFilter({ threshold: 0.3, bloomScale: 1.1, brightness: 1, blur: 6, quality: 3 })
  world.filters = [bloom]
  world.filterArea = new Rectangle(0, 0, W, H)
  app.stage.addChild(world)

  // Outcome tint overlay — above world, unzoomed, unbloomed.
  // The vignette sprite is the canvas-faithful big-crunch ring.
  const overlayG = new Graphics()
  const vignette = new Sprite(makeVignetteTexture())
  vignette.tint = 0xf87171
  vignette.visible = false
  app.stage.addChild(overlayG, vignette)

  const stage = {
    app, world, underlay, dotTex, hardDotTex,
    W, H,
    seedStars,
    setBackgroundGradient(visible) { bgSprite.visible = visible },
    // Per-view bloom tuning — large solid cores need a higher threshold
    // than dense fields of dim particles
    setBloom({ threshold, bloomScale, blur }) {
      bloom.threshold = threshold
      bloom.bloomScale = bloomScale
      bloom.blur = blur
    },
    setZoom(z) {
      world.pivot.set(stage.W / 2, stage.H / 2)
      world.position.set(stage.W / 2, stage.H / 2)
      world.scale.set(z)
    },
    updateOutcome,
    render() { app.render() },
    resize(width, height) {
      stage.W = width; stage.H = height
      app.renderer.resize(width, height)
      world.filterArea = new Rectangle(0, 0, width, height)
      sizeBackdrops()
    },
    destroy() { app.destroy(true, { children: true, texture: false }) },
  }

  function seedStars() {
    starsG.clear()
    for (let i = 0; i < 180; i++) {
      starsG.circle(Math.random() * stage.W, Math.random() * stage.H, Math.random())
        .fill({ color: 0xffffff, alpha: 0.05 + Math.random() * 0.3 })
    }
  }

  // style: 'flat' (planetary's rect fills) | 'vignette' (canvas-faithful crunch ring)
  function updateOutcome(outcomeKey, time, style) {
    overlayG.clear()
    vignette.visible = false
    if (outcomeKey === 'big-crunch') {
      const alpha = 0.08 + 0.04 * Math.sin(time * 3)
      if (style === 'vignette') {
        vignette.visible = true
        vignette.alpha = alpha
        vignette.width = stage.W
        vignette.height = stage.H
      } else {
        overlayG.rect(0, 0, stage.W, stage.H).fill({ color: 0xf87171, alpha })
      }
    } else if (outcomeKey === 'heat-death') {
      overlayG.rect(0, 0, stage.W, stage.H).fill({ color: 0x142850, alpha: Math.min(0.18, time * 0.01) })
    }
  }

  function sizeBackdrops() {
    bgSprite.width = stage.W
    bgSprite.height = stage.H
  }
  sizeBackdrops()

  return stage
}

// ── TEXTURES ──────────────────────────────────────────────

// Soft white dot — tinted per particle/sprite for every glow in the scene
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = TEX_SIZE
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(TEX_SIZE / 2, TEX_SIZE / 2, 0, TEX_SIZE / 2, TEX_SIZE / 2, TEX_SIZE / 2)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.3, 'rgba(255,255,255,0.6)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, TEX_SIZE, TEX_SIZE)
  return Texture.from(c)
}

// Solid white disc with a soft 1px edge — cores, planets, dark cores
function makeHardDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = TEX_SIZE
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(TEX_SIZE / 2, TEX_SIZE / 2, 0, TEX_SIZE / 2, TEX_SIZE / 2, TEX_SIZE / 2)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.88, 'rgba(255,255,255,1)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, TEX_SIZE, TEX_SIZE)
  return Texture.from(c)
}

// Port of canvas drawBG(): radial #0d0618 → #03020a
function makeBgTexture() {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S * 0.7)
  grd.addColorStop(0, '#0d0618')
  grd.addColorStop(1, '#03020a')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}

// Port of canvas drawOutcomeViz() big-crunch: transparent center ramping
// to full alpha at the edges (white — tinted by the stage)
function makeVignetteTexture() {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, S * 0.125, S / 2, S / 2, S * 0.5)
  grd.addColorStop(0, 'rgba(255,255,255,0)')
  grd.addColorStop(1, 'rgba(255,255,255,1)')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}
