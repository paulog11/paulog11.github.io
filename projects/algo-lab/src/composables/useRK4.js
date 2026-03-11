/**
 * Shared RK4 (4th-order Runge-Kutta) integrator.
 * Used by both NBody and Trisolaris simulations.
 *
 * @param {Array} bodies   - array of objects with { x, y, vx, vy, mass }
 * @param {number} G       - gravitational constant
 * @param {number} soften  - softening length to prevent singularity
 * @param {number} dt      - time step
 * @param {number} trailMax - max trail length (0 = no trail)
 */
export function rk4Step(bodies, G, soften, dt, trailMax = 0) {
  const n = bodies.length

  function accel(xs, ys) {
    const ax = new Array(n).fill(0)
    const ay = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx   = xs[j] - xs[i]
        const dy   = ys[j] - ys[i]
        const dist2 = dx*dx + dy*dy + soften*soften
        const dist  = Math.sqrt(dist2)
        const f     = G / (dist2 * dist)
        ax[i] += f * bodies[j].mass * dx
        ay[i] += f * bodies[j].mass * dy
        ax[j] -= f * bodies[i].mass * dx
        ay[j] -= f * bodies[i].mass * dy
      }
    }
    return { ax, ay }
  }

  const x0  = bodies.map(b => b.x)
  const y0  = bodies.map(b => b.y)
  const vx0 = bodies.map(b => b.vx)
  const vy0 = bodies.map(b => b.vy)

  const { ax: ax1, ay: ay1 } = accel(x0, y0)

  const x2  = x0.map((x,i) => x  + vx0[i]*dt/2)
  const y2  = y0.map((y,i) => y  + vy0[i]*dt/2)
  const vx2 = vx0.map((v,i) => v + ax1[i]*dt/2)
  const vy2 = vy0.map((v,i) => v + ay1[i]*dt/2)
  const { ax: ax2, ay: ay2 } = accel(x2, y2)

  const x3  = x0.map((x,i) => x  + vx2[i]*dt/2)
  const y3  = y0.map((y,i) => y  + vy2[i]*dt/2)
  const vx3 = vx0.map((v,i) => v + ax2[i]*dt/2)
  const vy3 = vy0.map((v,i) => v + ay2[i]*dt/2)
  const { ax: ax3, ay: ay3 } = accel(x3, y3)

  const x4  = x0.map((x,i) => x  + vx3[i]*dt)
  const y4  = y0.map((y,i) => y  + vy3[i]*dt)
  const vx4 = vx0.map((v,i) => v + ax3[i]*dt)
  const vy4 = vy0.map((v,i) => v + ay3[i]*dt)
  const { ax: ax4, ay: ay4 } = accel(x4, y4)

  for (let i = 0; i < n; i++) {
    const b = bodies[i]
    if (trailMax > 0) {
      b.trail.push({ x: b.x, y: b.y })
      while (b.trail.length > trailMax) b.trail.shift()
    }
    b.vx += dt/6 * (ax1[i] + 2*ax2[i] + 2*ax3[i] + ax4[i])
    b.vy += dt/6 * (ay1[i] + 2*ay2[i] + 2*ay3[i] + ay4[i])
    b.x  += dt/6 * (vx0[i] + 2*vx2[i] + 2*vx3[i] + vx4[i])
    b.y  += dt/6 * (vy0[i] + 2*vy2[i] + 2*vy3[i] + vy4[i])
  }
}

/**
 * Convert a hex color string to { r, g, b }
 */
export function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16),
  }
}
