// Baked light-spill decals. Replaces the PointLights the shopfronts used to
// carry — a 178m map seen all at once would need dozens of them, and every
// live light is per-fragment shader cost. A flat additive sprite gives the
// same "lit patch of ground" read for the price of one quad.
import * as THREE from 'three'

let sharedTexture = null

/** Opaque centre fading to transparent edge. Colour comes from material.color,
 * so every pool reuses this one canvas instead of drawing its own. */
export function sharedGradientTexture() {
  if (sharedTexture) return sharedTexture
  const size = 128
  const c = document.createElement('canvas')
  c.width = size; c.height = size
  const ctx = c.getContext('2d')
  const r = size / 2
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r)
  grad.addColorStop(0,   'rgba(255,255,255,1)')
  grad.addColorStop(0.5, 'rgba(255,255,255,0.4)')
  grad.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  sharedTexture = new THREE.CanvasTexture(c)
  sharedTexture.colorSpace = THREE.SRGBColorSpace
  return sharedTexture
}

/**
 * A flat, unlit glow disc laid on the ground. `radius` is metres, `intensity`
 * drives opacity — additive blending means alpha IS the brightness of the
 * contribution, so this stays below 1 rather than trying to "overdrive" a
 * colour, which under NoToneMapping just clips to white.
 */
export function createLightPool({ color, radius = 6, intensity = 1 }) {
  const material = new THREE.MeshBasicMaterial({
    map: sharedGradientTexture(),
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: intensity,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  mesh.rotation.x = -Math.PI / 2
  mesh.scale.set(radius, radius, 1)
  return mesh
}

/** Scene teardown only — a disposed texture can't be handed to the next pool
 * this module creates, so the caller must null it out via this, not by
 * traversing the scene generically. */
export function disposeSharedLightPoolTexture() {
  sharedTexture?.dispose()
  sharedTexture = null
}
