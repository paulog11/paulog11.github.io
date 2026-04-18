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
  const L = mx
  const R = W - mx
  const T = my
  const B = H - my

  const leftWall   = L
  const midDivider = L + (R - L) * 0.52
  const rightWall  = R
  const topWall    = T
  const bottomWall = B

  const exitGap = Math.max(32, (B - T) * 0.07)

  const northExitX = L + (midDivider - L) * 0.55
  const eastGateY  = T + (B - T) * 0.25
  const westGateY  = T + (B - T) * 0.50
  const cwGateX    = midDivider + (R - midDivider) * 0.3

  const walls = []

  // ─── LEFT WALL (gaps for East Gate and West Gate) ───
  walls.push({ x1: leftWall, y1: topWall,               x2: leftWall, y2: eastGateY - exitGap / 2 })
  walls.push({ x1: leftWall, y1: eastGateY + exitGap / 2, x2: leftWall, y2: westGateY - exitGap / 2 })
  walls.push({ x1: leftWall, y1: westGateY + exitGap / 2, x2: leftWall, y2: bottomWall })

  // ─── TOP WALL (gap for North Exit) ───
  walls.push({ x1: leftWall,               y1: topWall, x2: northExitX - exitGap / 2, y2: topWall })
  walls.push({ x1: northExitX + exitGap / 2, y1: topWall, x2: midDivider,             y2: topWall })
  walls.push({ x1: midDivider, y1: topWall,             x2: midDivider, y2: T + (B - T) * 0.08 })
  walls.push({ x1: midDivider, y1: T + (B - T) * 0.08, x2: rightWall,  y2: T + (B - T) * 0.08 })
  walls.push({ x1: rightWall,  y1: T + (B - T) * 0.08, x2: rightWall,  y2: bottomWall })

  // ─── BOTTOM WALL (gap for Central West Gate) ───
  const stepX = midDivider - (midDivider - leftWall) * 0.05
  const stepY = bottomWall - (B - T) * 0.08
  walls.push({ x1: leftWall, y1: bottomWall, x2: stepX, y2: bottomWall })
  walls.push({ x1: stepX, y1: bottomWall, x2: stepX, y2: stepY })
  walls.push({ x1: stepX, y1: stepY, x2: cwGateX - exitGap / 2, y2: stepY })
  walls.push({ x1: cwGateX + exitGap / 2, y1: stepY, x2: rightWall, y2: stepY })
  walls.push({ x1: rightWall, y1: stepY, x2: rightWall, y2: bottomWall })

  // ─── EXIT CORRIDORS (walls extending to canvas edges, creating visible tunnels) ───
  // North Exit: vertical corridor from station top wall to canvas top
  walls.push({ x1: northExitX - exitGap / 2, y1: 0, x2: northExitX - exitGap / 2, y2: topWall })
  walls.push({ x1: northExitX + exitGap / 2, y1: 0, x2: northExitX + exitGap / 2, y2: topWall })
  // East Gate: horizontal corridor from canvas left to station left wall
  walls.push({ x1: 0, y1: eastGateY - exitGap / 2, x2: leftWall, y2: eastGateY - exitGap / 2 })
  walls.push({ x1: 0, y1: eastGateY + exitGap / 2, x2: leftWall, y2: eastGateY + exitGap / 2 })
  // West Gate: horizontal corridor from canvas left to station left wall
  walls.push({ x1: 0, y1: westGateY - exitGap / 2, x2: leftWall, y2: westGateY - exitGap / 2 })
  walls.push({ x1: 0, y1: westGateY + exitGap / 2, x2: leftWall, y2: westGateY + exitGap / 2 })
  // Central West Gate: vertical corridor from step down to canvas bottom
  walls.push({ x1: cwGateX - exitGap / 2, y1: stepY, x2: cwGateX - exitGap / 2, y2: H })
  walls.push({ x1: cwGateX + exitGap / 2, y1: stepY, x2: cwGateX + exitGap / 2, y2: H })

  // ─── VERTICAL DIVIDER (4 platforms — wider passages between tracks) ───
  const divTop = T + (B - T) * 0.08
  const divBot = stepY
  const numPlatforms = 4
  const divHeight = divBot - divTop
  const platSpacing = divHeight / (numPlatforms + 1)
  const platGapHalf = Math.max(10, platSpacing * 0.32)

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

  // ─── PLATFORMS ───
  const platforms = []
  const trackLabels = ['Tracks 1 & 2', 'Tracks 5 & 6', 'Tracks 9 & 10', 'Tracks 13 & 14']
  const platW = (midDivider - leftWall) * 0.75
  const platH = Math.max(6, platSpacing * 0.28)
  const platX = leftWall + (midDivider - leftWall - platW) * 0.55

  for (let i = 0; i < numPlatforms; i++) {
    const cy = divTop + platSpacing * (i + 1)
    platforms.push({
      x: platX, y: cy - platH / 2, w: platW, h: platH,
      label: trackLabels[i],
    })
    walls.push({ x1: platX, y1: cy - platH / 2, x2: platX + platW, y2: cy - platH / 2 })
    walls.push({ x1: platX, y1: cy + platH / 2, x2: platX + platW, y2: cy + platH / 2 })
  }

  // ─── EXITS (spawn positions at far ends of corridors, near canvas edges) ───
  const exits = [
    { x: northExitX, y: 4,       label: 'North Exit',        spawnDx: 0,   spawnDy: 1.5  },
    { x: 4,          y: eastGateY, label: 'East Gate',        spawnDx: 1.5, spawnDy: 0    },
    { x: 4,          y: westGateY, label: 'West Gate',        spawnDx: 1.5, spawnDy: 0    },
    { x: cwGateX,    y: H - 4,   label: 'Central West Gate', spawnDx: 0,   spawnDy: -1.5 },
  ]

  return { walls, platforms, exits }
}
