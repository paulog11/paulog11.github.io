/**
 * Simplified Shinjuku Station B1F layout.
 * Based on the actual floor map — irregular polygon with 4 exits.
 *
 * Layout (top-down, approximate):
 *
 *                [North Exit / ALTA]
 *                      |
 *    ┌─────────────────┘  ┌────────────────┐
 *    │                    │                │
 *    │  ══ Tracks 1&2 ══ │                │
 * [East                   │                │
 *  Gate]  ══ Tracks 3&4 ══│                │
 *    │                    │                │
 *    │  ══ Tracks 7&8 ═══│                │
 *    │                    │                │
 * [West   ══ Tracks 9&10═│                │
 *  Gate]                  │                │
 *    │  ══ Tracks 11&12══ │                │
 *    │                    │                │
 *    │  ══ Tracks 13&14══ │                │
 *    │                    │                │
 *    │  ══ Tracks 15&16══ │                │
 *    │                    │                │
 *    └────────────────────┘──┐             │
 *                            │             │
 *                   [Central West Gate]────┘
 */

/**
 * Nearest point on a line segment to a given point.
 */
export function nearestPointOnSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) {
    const d = Math.hypot(px - x1, py - y1)
    return { x: x1, y: y1, dist: d }
  }
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))
  const nx = x1 + t * dx, ny = y1 + t * dy
  return { x: nx, y: ny, dist: Math.hypot(px - nx, py - ny) }
}

/**
 * Test if two line segments intersect.
 * Returns intersection point or null.
 */
export function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const denom = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx)
  if (Math.abs(denom) < 1e-10) return null
  const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / denom
  const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / denom
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return { x: ax + t * (bx - ax), y: ay + t * (by - ay), t, u }
  }
  return null
}

/**
 * Create Shinjuku B1F station layout scaled to canvas dimensions.
 * All coordinates use proportional positioning relative to W and H.
 */
export function createStationLayout(W, H) {
  // Margins
  const mx = W * 0.08
  const my = H * 0.06

  // Station bounding area
  const L = mx              // left edge of station
  const R = W - mx          // right edge
  const T = my              // top edge
  const B = H - my          // bottom edge

  // Key x-coordinates
  const leftWall    = L                  // left boundary
  const midDivider  = L + (R - L) * 0.52 // vertical divider (concourse / right wing)
  const rightWall   = R                  // right boundary

  // Key y-coordinates
  const topWall     = T
  const bottomWall  = B

  // Exit gap size
  const exitGap = Math.max(30, (B - T) * 0.06)

  // Exit positions
  // North Exit: gap in top wall, left-center area
  const northExitX = L + (midDivider - L) * 0.55
  // East Gate: gap in left wall, upper area
  const eastGateY = T + (B - T) * 0.25
  // West Gate: gap in left wall, middle area
  const westGateY = T + (B - T) * 0.50
  // Central West Gate: gap in bottom, right area
  const cwGateX = midDivider + (R - midDivider) * 0.3

  const walls = []

  // ─── LEFT WALL (with gaps for East Gate and West Gate) ───
  walls.push({ x1: leftWall, y1: topWall, x2: leftWall, y2: eastGateY - exitGap / 2 })
  // East Gate gap
  walls.push({ x1: leftWall, y1: eastGateY + exitGap / 2, x2: leftWall, y2: westGateY - exitGap / 2 })
  // West Gate gap
  walls.push({ x1: leftWall, y1: westGateY + exitGap / 2, x2: leftWall, y2: bottomWall })

  // ─── TOP WALL (with gap for North Exit) ───
  walls.push({ x1: leftWall, y1: topWall, x2: northExitX - exitGap / 2, y2: topWall })
  // North Exit gap
  walls.push({ x1: northExitX + exitGap / 2, y1: topWall, x2: midDivider, y2: topWall })
  // Top wall right section (step down to right wing)
  walls.push({ x1: midDivider, y1: topWall, x2: midDivider, y2: T + (B - T) * 0.08 })
  walls.push({ x1: midDivider, y1: T + (B - T) * 0.08, x2: rightWall, y2: T + (B - T) * 0.08 })
  // Right wall top
  walls.push({ x1: rightWall, y1: T + (B - T) * 0.08, x2: rightWall, y2: bottomWall })

  // ─── BOTTOM WALL (with gap for Central West Gate) ───
  walls.push({ x1: leftWall, y1: bottomWall, x2: midDivider - (midDivider - leftWall) * 0.05, y2: bottomWall })
  // Step: bottom-left connects to mid-divider area
  const stepX = midDivider - (midDivider - leftWall) * 0.05
  const stepY = bottomWall - (B - T) * 0.08
  walls.push({ x1: stepX, y1: bottomWall, x2: stepX, y2: stepY })
  walls.push({ x1: stepX, y1: stepY, x2: cwGateX - exitGap / 2, y2: stepY })
  // Central West Gate gap at bottom
  walls.push({ x1: cwGateX + exitGap / 2, y1: stepY, x2: rightWall, y2: stepY })
  // Right wall bottom connector
  walls.push({ x1: rightWall, y1: stepY, x2: rightWall, y2: bottomWall })

  // ─── VERTICAL DIVIDER (concourse boundary, with gaps for track access) ───
  const divTop = T + (B - T) * 0.08
  const divBot = stepY
  const numPlatforms = 7
  const divHeight = divBot - divTop
  const platSpacing = divHeight / (numPlatforms + 1)
  const platGapHalf = Math.max(8, platSpacing * 0.25)

  let prevDivY = divTop
  for (let i = 0; i < numPlatforms; i++) {
    const gapCenter = divTop + platSpacing * (i + 1)
    if (gapCenter - platGapHalf > prevDivY + 1) {
      walls.push({ x1: midDivider, y1: prevDivY, x2: midDivider, y2: gapCenter - platGapHalf })
    }
    prevDivY = gapCenter + platGapHalf
  }
  if (divBot > prevDivY + 1) {
    walls.push({ x1: midDivider, y1: prevDivY, x2: midDivider, y2: divBot })
  }

  // ─── PLATFORMS (horizontal track areas in the concourse) ───
  const platforms = []
  const trackLabels = [
    'Tracks 1 & 2', 'Tracks 3 & 4', 'Tracks 7 & 8',
    'Tracks 9 & 10', 'Tracks 11 & 12', 'Tracks 13 & 14', 'Tracks 15 & 16'
  ]
  const platW = (midDivider - leftWall) * 0.75
  const platH = Math.max(6, platSpacing * 0.3)
  const platX = leftWall + (midDivider - leftWall - platW) * 0.55

  for (let i = 0; i < numPlatforms; i++) {
    const cy = divTop + platSpacing * (i + 1)
    platforms.push({
      x: platX,
      y: cy - platH / 2,
      w: platW,
      h: platH,
      label: trackLabels[i] || `Tracks ${i * 2 + 1} & ${i * 2 + 2}`,
    })
    // Platform walls (top and bottom edges)
    walls.push({ x1: platX, y1: cy - platH / 2, x2: platX + platW, y2: cy - platH / 2 })
    walls.push({ x1: platX, y1: cy + platH / 2, x2: platX + platW, y2: cy + platH / 2 })
  }

  // ─── EXITS ───
  const exits = [
    {
      x: northExitX,
      y: topWall - 5,
      label: 'North Exit',
      // Spawn direction: people enter walking downward
      spawnDx: 0, spawnDy: 1.5,
    },
    {
      x: leftWall - 5,
      y: eastGateY,
      label: 'East Gate',
      spawnDx: 1.5, spawnDy: 0,
    },
    {
      x: leftWall - 5,
      y: westGateY,
      label: 'West Gate',
      spawnDx: 1.5, spawnDy: 0,
    },
    {
      x: cwGateX,
      y: stepY + 5,
      label: 'Central West Gate',
      spawnDx: 0, spawnDy: -1.5,
    },
  ]

  return { walls, platforms, exits }
}
