// Japanese street signage, drawn entirely with Canvas 2D — no image assets.
// Shinjuku's look is ~80% signage, so this carries most of the scene's atmosphere.
import * as THREE from 'three'

const FONT = "'Shippori Mincho', serif"
const H_ASPECT = 4        // horizontal sign: w = h * 4
const V_ASPECT = 1 / 3.5  // vertical sign:   w = h / 3.5

// Canvas2D silently ignores an invalid `fillStyle` and keeps the previous value,
// so passing a palette number (0xff2d55) instead of a string renders black on
// black and the sign vanishes with no error. Accept both.
const asCss = (c) => typeof c === 'number' ? '#' + c.toString(16).padStart(6, '0') : c

/** Deterministic hash so `painted` noise is stable across re-renders of the same text. */
function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h || 1
}

function fitHorizontalSize(ctx, str, maxWidth, maxHeight) {
  let size = maxHeight
  ctx.font = `bold ${size}px ${FONT}`
  while (size > 6 && ctx.measureText(str).width > maxWidth) {
    size -= 2
    ctx.font = `bold ${size}px ${FONT}`
  }
  return size
}

function fitVerticalSize(ctx, chars, maxCharWidth, maxTotalHeight) {
  let size = maxTotalHeight
  ctx.font = `bold ${size}px ${FONT}`
  while (size > 6 && (
    size * chars.length * 1.05 > maxTotalHeight ||
    chars.some((c) => ctx.measureText(c).width > maxCharWidth)
  )) {
    size -= 2
    ctx.font = `bold ${size}px ${FONT}`
  }
  return size
}

// Computes fitted glyph positions for main (+ optional sub) text. Shared across
// all three styles so the fitting/centering logic lives in exactly one place.
function layoutText(ctx, w, h, text, sub, orientation) {
  const pad = h * 0.12

  if (orientation === 'vertical') {
    const chars = Array.from(text)
    const subChars = sub ? Array.from(sub) : []
    const hasSub = subChars.length > 0
    const colW = (hasSub ? w * 0.55 : w * 0.7) - pad
    const maxH = h - pad * 2

    const size = fitVerticalSize(ctx, chars, colW, maxH)
    const lineH = size * 1.05
    let y = h / 2 - (lineH * chars.length) / 2 + lineH / 2
    const mainX = hasSub ? w * 0.66 : w / 2
    const glyphs = chars.map((ch) => {
      const glyph = { text: ch, x: mainX, y, size }
      y += lineH
      return glyph
    })

    if (hasSub) {
      const subSize = fitVerticalSize(ctx, subChars, colW * 0.6, maxH * 0.8)
      const subLineH = subSize * 1.05
      let sy = h / 2 - (subLineH * subChars.length) / 2 + subLineH / 2
      for (const ch of subChars) {
        glyphs.push({ text: ch, x: w * 0.28, y: sy, size: subSize })
        sy += subLineH
      }
    }
    return glyphs
  }

  // horizontal
  const maxWidth = w - pad * 2
  const mainSize = fitHorizontalSize(ctx, text, maxWidth, sub ? h * 0.55 : h * 0.7)
  const glyphs = [{ text, x: w / 2, y: sub ? h * 0.4 : h / 2, size: mainSize }]
  if (sub) {
    const subSize = fitHorizontalSize(ctx, sub, maxWidth, h * 0.22)
    glyphs.push({ text: sub, x: w / 2, y: h * 0.74, size: subSize })
  }
  return glyphs
}

// Neon tube look: diffuse halo, then a hot white core.
// The halo uses shadowBlur rather than fat strokeText — a wide round-joined
// stroke produces scalloped lumps around each glyph, not a glow.
function glowText(ctx, { text, x, y, size }, color) {
  ctx.font = `bold ${size}px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.fillStyle = color
  ctx.shadowColor = color

  ctx.shadowBlur = size * 0.75   // outer bloom, stacked for density
  ctx.fillText(text, x, y)
  ctx.fillText(text, x, y)
  ctx.shadowBlur = size * 0.3
  ctx.fillText(text, x, y)

  // Tube core: thin white stroke over a coloured body reads as lit glass.
  ctx.shadowBlur = size * 0.1
  ctx.shadowColor = '#fff'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = size * 0.07
  ctx.strokeText(text, x, y)

  ctx.shadowBlur = 0
  ctx.shadowColor = 'transparent'
}

function neon(g, w, h, text, sub, orientation, color) {
  g.fillStyle = '#0a0a0d'; g.fillRect(0, 0, w, h)

  const inset = h * 0.08
  g.strokeStyle = color
  g.lineWidth = Math.max(2, h * 0.015)
  g.strokeRect(inset, inset, w - inset * 2, h - inset * 2)

  const glyphs = layoutText(g, w, h, text, sub, orientation)
  for (const glyph of glyphs) glowText(g, glyph, color)
}

function lightbox(g, w, h, text, sub, orientation, color) {
  g.fillStyle = color; g.fillRect(0, 0, w, h)

  const glyphs = layoutText(g, w, h, text, sub, orientation)
  g.fillStyle = '#000'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  for (const glyph of glyphs) {
    g.font = `bold ${glyph.size}px ${FONT}`
    g.fillText(glyph.text, glyph.x, glyph.y)
  }
}

function muteColor(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const gray = (r + g + b) / 3
  const mix = (c) => Math.round(c * 0.3 + gray * 0.3 + 30)
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`
}

function painted(g, w, h, text, sub, orientation, color) {
  g.fillStyle = muteColor(color); g.fillRect(0, 0, w, h)

  let seed = hashSeed(text)
  const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296
  g.strokeStyle = 'rgba(0,0,0,0.15)'
  for (let i = 0; i < 40; i++) {
    g.lineWidth = rnd() * 1.5
    const x = rnd() * w, y = rnd() * h
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x + (rnd() - 0.5) * 30, y + (rnd() - 0.5) * 30)
    g.stroke()
  }
  g.fillStyle = 'rgba(255,255,255,0.06)'
  for (let i = 0; i < 300; i++) g.fillRect(rnd() * w, rnd() * h, 1, 1)

  const glyphs = layoutText(g, w, h, text, sub, orientation)
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillStyle = '#e8ded0'
  g.strokeStyle = 'rgba(0,0,0,0.4)'
  for (const glyph of glyphs) {
    g.font = `bold ${glyph.size}px ${FONT}`
    g.lineWidth = glyph.size * 0.06
    g.strokeText(glyph.text, glyph.x, glyph.y)
    g.fillText(glyph.text, glyph.x, glyph.y)
  }
}

const STYLES = { neon, lightbox, painted }

/**
 * Returns { map, aspect } for a signage mesh.
 *
 * This used to return an `emissiveMap` from a second, identically-drawn canvas.
 * Every sign in the scene is now a MeshBasicMaterial — unlit, where the map IS
 * the output — so nothing ever read it, and each sign was allocating and
 * painting a full duplicate canvas at startup for nothing.
 */
export function createSignTexture(opts) {
  const {
    text, sub = '', style = 'neon', orientation = 'horizontal',
    color: rawColor = '#FF2D55', px = 256,
  } = opts
  const color = asCss(rawColor)

  const aspect = orientation === 'vertical' ? V_ASPECT : H_ASPECT
  const h = px
  const w = Math.round(h * aspect)

  const map = document.createElement('canvas'); map.width = w; map.height = h
  const g = map.getContext('2d')

  ;(STYLES[style] ?? neon)(g, w, h, text, sub, orientation, color)

  const tex = Object.assign(new THREE.CanvasTexture(map), {
    colorSpace: THREE.SRGBColorSpace,
    anisotropy: 8,
  })
  return { map: tex, aspect: w / h }
}
