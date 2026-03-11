/**
 * Fleet generation and sweep-path computation for the Droplet Attack simulation.
 */

/**
 * Create a rectangular grid of ships centered on (cx, cy).
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} W  - canvas width
 * @param {number} H  - canvas height
 * @param {number} rows - grid rows (default 20)
 * @param {number} cols - grid columns (default 25)
 * @returns {Array} fleet of ship objects
 */
export function createFleet(cx, cy, W, H, rows = 20, cols = 25) {
  const spacingX = (W * 0.55) / cols
  const spacingY = (H * 0.55) / rows
  const startX = cx - (cols - 1) * spacingX / 2
  const startY = cy - (rows - 1) * spacingY / 2
  const fleet = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fleet.push({
        x: startX + c * spacingX,
        y: startY + r * spacingY,
        alive: true,
        deathTime: -1,
        row: r,
        col: c
      })
    }
  }
  return fleet
}

/**
 * Compute a boustrophedon (typewriter / snake) sweep path through the fleet.
 * Even rows go left→right, odd rows go right→left.
 * Returns an ordered array of fleet indices.
 * @param {Array} fleet - array of ship objects
 * @param {number} rows
 * @param {number} cols
 * @returns {number[]} ordered indices
 */
export function computeSweepPath(fleet, rows = 20, cols = 25) {
  const path = []
  for (let r = 0; r < rows; r++) {
    if (r % 2 === 0) {
      // left to right
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c
        if (fleet[idx] && fleet[idx].alive) path.push(idx)
      }
    } else {
      // right to left
      for (let c = cols - 1; c >= 0; c--) {
        const idx = r * cols + c
        if (fleet[idx] && fleet[idx].alive) path.push(idx)
      }
    }
  }
  return path
}
