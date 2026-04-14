/**
 * Curvature Drive Physics
 *
 * Models a flexible spacecraft that propels itself via curvature waves —
 * the geometric phase locomotion analog to "curvature propulsion" from
 * Liu Cixin's Three-Body Problem series.
 *
 * Physical basis: Taylor's waving-sheet theorem + Frenet-Serret integration.
 * A traveling curvature wave κ(s,t) = A·sin(2π·s·λ/L − ωt) along the body
 * generates net propulsion proportional to A²·f·λ (quadratic in amplitude).
 */

const BODY_LENGTH = 120  // px — length of the spacecraft spine

/**
 * Build spine control points from a traveling curvature wave.
 * Uses Frenet-Serret: θ(s) = ∫κ ds, then (x,y) = ∫(cosθ, sinθ) ds.
 *
 * @param {number} cx          World-frame center X
 * @param {number} cy          World-frame center Y
 * @param {number} heading     Body heading angle (radians, 0 = rightward)
 * @param {number} wavePhase   Current wave phase (radians, advances with time)
 * @param {number} amplitude   Wave amplitude A (controls curvature magnitude)
 * @param {number} wavelengths Number of full wave crests along body length λ
 * @param {number} N           Number of spine control points
 * @returns {Array<{x,y,kappa}>} World-frame control points with local curvature
 */
export function buildSpine(cx, cy, heading, wavePhase, amplitude, wavelengths, N) {
  const ds = BODY_LENGTH / (N - 1)
  const points = []

  // Integrate from s=0 (tail) to s=L (nose) in body frame
  // Anchor integration at the midpoint so center stays at (cx,cy)
  // First pass: integrate tangent angle θ(s) from s=0
  const thetas = []
  let theta = 0
  for (let i = 0; i < N; i++) {
    const s = i * ds
    const kappa = amplitude * Math.sin(2 * Math.PI * (s / BODY_LENGTH) * wavelengths - wavePhase)
    thetas.push({ theta, kappa })
    if (i < N - 1) theta += kappa * ds
  }

  // Integrate (x,y) in body frame, starting from (0,0) at tail
  let bx = 0, by = 0
  const bodyPts = [{ bx: 0, by: 0, kappa: thetas[0].kappa }]
  for (let i = 1; i < N; i++) {
    const midTheta = (thetas[i - 1].theta + thetas[i].theta) / 2
    bx += Math.cos(midTheta) * ds
    by += Math.sin(midTheta) * ds
    bodyPts.push({ bx, by, kappa: thetas[i].kappa })
  }

  // Find body-frame center (midpoint index)
  const mid = bodyPts[Math.floor(N / 2)]
  const originBx = mid.bx
  const originBy = mid.by

  // Rotate body frame to world heading, translate to (cx, cy)
  const cosH = Math.cos(heading)
  const sinH = Math.sin(heading)

  for (const pt of bodyPts) {
    const dx = pt.bx - originBx
    const dy = pt.by - originBy
    points.push({
      x: cx + dx * cosH - dy * sinH,
      y: cy + dx * sinH + dy * cosH,
      kappa: pt.kappa,
    })
  }

  return points
}

/**
 * Compute the first two Fourier curvature modes (shape space coordinates).
 * w1 = (2/L)∫κ(s)·cos(2πs/L) ds  — "cosine mode"
 * w2 = (2/L)∫κ(s)·sin(2πs/L) ds  — "sine mode"
 * These trace a closed ellipse in (w1,w2) space each gait cycle.
 *
 * @param {Array<{kappa}>} spine  Spine points from buildSpine
 * @returns {{w1: number, w2: number}}
 */
export function computeShapeModes(spine) {
  const N = spine.length
  const ds = BODY_LENGTH / (N - 1)
  let w1 = 0, w2 = 0
  for (let i = 0; i < N; i++) {
    const s = i * ds
    const angle = 2 * Math.PI * s / BODY_LENGTH
    w1 += spine[i].kappa * Math.cos(angle) * ds
    w2 += spine[i].kappa * Math.sin(angle) * ds
  }
  return { w1: (2 / BODY_LENGTH) * w1, w2: (2 / BODY_LENGTH) * w2 }
}

/**
 * Net propulsive speed in body frame (Taylor swimming theorem, leading order).
 * v_prop = c · A² · f · λ
 * The coefficient c is tuned so the simulation is visually legible.
 *
 * @param {number} amplitude   Wave amplitude A
 * @param {number} freq        Oscillation frequency f (Hz, cycles/sec)
 * @param {number} wavelengths Number of crests λ
 * @returns {number} Speed in px/sec in body-forward direction
 */
export function propulsionSpeed(amplitude, freq, wavelengths) {
  const C = 18  // tuning constant (px/sec per unit A²·f·λ)
  return C * amplitude * amplitude * freq * wavelengths
}

/**
 * Total gravitational acceleration on the spacecraft from three suns.
 * Uses softened Newtonian gravity: a = G·M / (r² + ε²)^(3/2) · r̂
 *
 * @param {number} cx     Spacecraft center X
 * @param {number} cy     Spacecraft center Y
 * @param {Array<{x,y,mass}>} suns  Array of gravity sources
 * @param {number} G      Gravitational constant (px³/sec²/mass unit)
 * @param {number} soften Softening length (px) to avoid singularity
 * @returns {{ax: number, ay: number}}
 */
export function gravityAccel(cx, cy, suns, G = 3000, soften = 40) {
  let ax = 0, ay = 0
  for (const sun of suns) {
    const dx = sun.x - cx
    const dy = sun.y - cy
    const r2 = dx * dx + dy * dy + soften * soften
    const r = Math.sqrt(r2)
    const mag = G * sun.mass / r2
    ax += mag * dx / r
    ay += mag * dy / r
  }
  return { ax, ay }
}

/**
 * Return initial sun positions arranged in a near-equilateral triangle,
 * centered on the canvas, scaled to fit.
 *
 * @param {number} W  Canvas width
 * @param {number} H  Canvas height
 * @returns {Array<{x,y,mass,color,label}>}
 */
export function defaultSuns(W, H) {
  const R = Math.min(W, H) * 0.3
  const cx = W / 2, cy = H / 2
  return [
    { x: cx + R * Math.cos(Math.PI / 2),       y: cy - R * Math.sin(Math.PI / 2),       mass: 1.0, color: '#f7a96e', label: 'α' },
    { x: cx + R * Math.cos(Math.PI / 2 + 2.1), y: cy - R * Math.sin(Math.PI / 2 + 2.1), mass: 0.85, color: '#e8c87a', label: 'β' },
    { x: cx + R * Math.cos(Math.PI / 2 + 4.2), y: cy - R * Math.sin(Math.PI / 2 + 4.2), mass: 0.7,  color: '#f7a96e', label: 'γ' },
  ]
}

export { BODY_LENGTH }
