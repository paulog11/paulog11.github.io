// Cartoon-style contour pass: one merged LineSegments outlining every solid
// form in the city. CLAUDE.md's reference look gets its read from hard dark
// edges around every shape; right now the scene is black boxes with glowing
// window rectangles and nothing defines a silhouette. This is that pass —
// walk the finished graph once, collect edges, merge into ONE buffer, ONE
// draw call.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

// Near-black, not pure black — NIGHT (the sky background, palette.js) is
// 0x070a12; an outline drawn in that exact colour would vanish against it.
const OUTLINE_COLOR = '#141a24'

// Cocoon (towers.js) is a 28-segment LatheGeometry: adjacent facets sit ~12.9
// degrees apart, so anything at or below that treats ordinary curvature as a
// hard edge. 27 clears that with margin while still catching every real
// crease — box corners, the Cocoon profile's actual bends, Golden Gai's
// merged stall geometry (whose own edges are all 90 degrees, box corners, so
// thresholdAngle doesn't reduce those — there's just no way around a warren
// of small buildings contributing a lot of edges).
const THRESHOLD_ANGLE = 27

function isTransparent(mesh) {
  // Every invisible pick-target hit-box (project/board-row/konbini/kōban/
  // vending) and every light-pool decal in this scene is `transparent: true`
  // for exactly the reason renderer.js's own occluded() already encodes:
  // transparent means "not a solid form, click/see through it." Reusing that
  // rule here stops the pass from drawing a rectangle around an invisible hit
  // box or a hard square frame around a soft round glow.
  return [mesh.material].flat().some((m) => m?.transparent)
}

/** One InstancedMesh's edges, per instance, baked to world space. three.js has
 * no InstancedLineSegments — EdgesGeometry(mesh.geometry) alone would only
 * outline ONE unit box at the origin, not all ~40 (blocks.js) or ~24
 * (alley.js's per-stall signs) instances. */
function instancedEdges(mesh, thresholdAngle, out) {
  const base = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle)
  const instance = new THREE.Matrix4()
  const world = new THREE.Matrix4()
  for (let i = 0; i < mesh.count; i++) {
    mesh.getMatrixAt(i, instance)
    world.multiplyMatrices(mesh.matrixWorld, instance)
    out.push(base.clone().applyMatrix4(world))
  }
}

/**
 * Walks `scene` once and returns a single THREE.LineSegments outlining every
 * solid mesh in it — one draw call regardless of city size. Must be called
 * LAST, after everything else is added to `scene`: it bakes world-space
 * geometry from a single pass, so anything added afterward has no outline.
 *
 * `skip` excludes whole subtrees — ambient.js's rain/train/steam animate
 * every frame, and a baked, static outline of a moving object is a
 * stationary ghost.
 */
export function createOutlines(scene, { skip = [], color = OUTLINE_COLOR, thresholdAngle = THRESHOLD_ANGLE } = {}) {
  scene.updateMatrixWorld(true)
  const geoms = []

  function walk(obj) {
    // Mirrors how three.js itself renders: an invisible object hides its
    // whole subtree, not just itself, so this must also stop descending here.
    if (skip.includes(obj) || !obj.visible) return
    if (obj.isInstancedMesh) {
      instancedEdges(obj, thresholdAngle, geoms)
    } else if (obj.isMesh && !isTransparent(obj)) {
      geoms.push(new THREE.EdgesGeometry(obj.geometry, thresholdAngle).applyMatrix4(obj.matrixWorld))
    }
    for (const child of obj.children) walk(child)
  }
  walk(scene)

  const geometry = mergeGeometries(geoms)
  const material = new THREE.LineBasicMaterial({ color, transparent: true })
  const outlines = new THREE.LineSegments(geometry, material)
  // Two independent reasons this mesh is never hit by a raycast, and both are
  // needed: `transparent: true` is the CORRECTNESS one — renderer.js's
  // occluded() filters transparent materials out of its occlusion result, so
  // without it this outline would silently block clicks on every building and
  // board row behind it. `raycast = () => {}` is a PERF optimization on top —
  // occluded() still fully intersection-tests every scene object before that
  // filter runs, and this is a many-thousand-segment mesh spanning the whole
  // map, so skipping the test outright avoids paying for it on every
  // pointermove. Neither makes the other redundant; don't delete one because
  // it looks like it duplicates the other.
  outlines.raycast = () => {}
  return outlines
}
