// Browser regression tests for the Shinjuku scene.
//
// Every browser check on this project used to be a throwaway scratchpad script,
// re-derived from scratch each session at real cost. This file is the committed
// replacement. It is deliberately small: it covers only the things that have
// ACTUALLY broken here, not everything that could be asserted.
//
// Run with `npm test`. Plain node:test + playwright — no @playwright/test, no
// config file, no fixtures.
//
// ── Two traps this file exists to guard against ───────────────────────────────
//
// 1. DRAW CALLS need `renderer.info.autoReset = false` before reset()/render(),
//    because info.render is cleared on EVERY render() call. A naive read reports
//    only the last pass. spike/perf.html already does this correctly and hands
//    the numbers over on `window.__perf`; do not re-measure them here.
//
// 2. FRAME RATE must never be measured by timing requestAnimationFrame. rAF
//    fires at display rate whether or not the frame renders, so it reports
//    ~60fps regardless of the 30fps cap. This hid a real 20fps bug for an entire
//    phase. perf.html times `stage.onFrame` callbacks, which run only on frames
//    that actually render.
//
// Measure on spike/perf.html, never spike/city.html — city.html omits scenery
// and ambient and under-reports draw calls by ~81.

import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const PORT = 5199
const ORIGIN = `http://localhost:${PORT}`

// Budgets, not exact values. These are ceilings taken from the measured
// baseline with headroom; a change that blows past one is a regression worth a
// human look, and a change that comes in far under should RATCHET THESE DOWN.
//
// Measured baseline: 163 calls / 13,356 tris / 21 programs / 65 textures.
// This is the night -> day conversion: ground light pools (street.js's
// scatterPools, station.js's buildLightPools, towers.js's plaza lamp-spill
// texture) were the single biggest cost and are gone outright — daylight
// doesn't need faked ground glow. Rain (ambient.js) and the Golden Gai neon
// flicker (both night tropes) are gone too. programs dropped 22 -> 21 because
// the light pools' additive-blended Basic material was its own shader
// variant. The old 244/10,820/22/66 baseline predates this and should not be
// compared against — that was a different scene (lit at night), not a
// regression measured against this one.
//
// Triangles climbed 10,656 -> 14,256 on top of that from the sidewalk/tree/
// crosswalk reskin (street.js): the sidewalk band and zebra crosswalks are
// repainted textures, no new geometry, but ~90 low-poly street trees (merged
// into 2 draw calls via mergeGeometries) account for the whole increase.
// calls only ticked 161 -> 163 (the 2 merged tree meshes), well inside the
// existing ceiling, and programs held flat at 21 — the trees' plain
// MeshLambertMaterial reused an already-compiled program. A follow-up pass
// dropped 14,256 to 13,356: the tree trunk CylinderGeometry defaulted to
// closed caps, but both are permanently invisible (bottom faces into the
// ground, top is buried inside the canopy), so `openEnded: true` drops each
// trunk from 20 to 10 triangles — ~900 triangles off across all 90 trees,
// zero visual change.
const BUDGET = { calls: 180, triangles: 13656, programs: 22 }

// The 30fps cap means a rendered frame lands ~33.3ms apart. The ceiling catches
// the cap regressing to 20fps (50ms), which is exactly what happened once.
const FRAME_MS_MAX = 42

// three.js prints this itself on import; it is not our bug and not an error.
const BENIGN = [/THREE.Clock/i, /Download the React DevTools/i]

let browser
let server
let indexHtmlBefore

before(async () => {
  // `npm run dev` fires a predev hook that overwrites index.html from
  // index.source.html. That is documented and correct for a dev server, but a
  // test must not leave the working tree dirty — so stash the bytes and put
  // them back in after().
  indexHtmlBefore = readFileSync('index.html')

  server = spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
    detached: true,
  })

  browser = await chromium.launch()

  // Poll rather than sleep a fixed amount — vite's start time varies enough
  // that a fixed wait is either flaky or wasteful.
  const deadline = Date.now() + 30_000
  for (;;) {
    try {
      const res = await fetch(ORIGIN)
      if (res.ok) break
    } catch { /* not up yet */ }
    if (Date.now() > deadline) throw new Error(`dev server never came up on ${ORIGIN}`)
    await new Promise((r) => setTimeout(r, 250))
  }
})

after(async () => {
  await browser?.close()
  if (server?.pid) process.kill(-server.pid, 'SIGTERM')
  if (indexHtmlBefore) writeFileSync('index.html', indexHtmlBefore)
})

/**
 * Opens a page, collects console errors and uncaught exceptions, and waits for
 * the harness to signal `window.__ready`.
 */
async function open(path, { viewport = { width: 1280, height: 720 } } = {}) {
  const page = await browser.newPage({ viewport })
  const errors = []
  page.on('console', (m) => {
    if (m.type() !== 'error') return
    if (BENIGN.some((re) => re.test(m.text()))) return
    errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${ORIGIN}${path}`, { waitUntil: 'load' })
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 })
  return { page, errors }
}

describe('cost budget (spike/perf.html — the full production-equivalent scene)', () => {
  test('draw calls, triangles, programs and rendered frame time stay in budget', async () => {
    const { page, errors } = await open('/spike/perf.html')

    // perf.html fills window.__perf only after it has banked 90 RENDERED
    // frames, so this wait is also the frame-rate measurement completing.
    await page.waitForFunction(() => window.__perf, null, { timeout: 60_000 })
    const perf = await page.evaluate(() => window.__perf)

    assert.deepEqual(errors, [], 'console errors on perf.html')
    assert.ok(perf.calls <= BUDGET.calls, `draw calls ${perf.calls} > budget ${BUDGET.calls}`)
    assert.ok(perf.tris <= BUDGET.triangles, `triangles ${perf.tris} > budget ${BUDGET.triangles}`)
    assert.ok(perf.programs <= BUDGET.programs, `programs ${perf.programs} > budget ${BUDGET.programs}`)
    assert.ok(
      perf.medianMs <= FRAME_MS_MAX,
      `rendered frame median ${perf.medianMs}ms > ${FRAME_MS_MAX}ms — the fps cap has regressed ` +
      `(a flat ~50ms median regardless of scene complexity means the cap is waiting a third display tick)`,
    )

    console.log(
      `    cost: ${perf.calls} calls · ${perf.tris} tris · ${perf.programs} programs · ` +
      `${perf.textures} textures · ${perf.medianMs}ms (${perf.renderedFps}fps)`,
    )
    await page.close()
  })
})

describe('picking (spike/city.html)', () => {
  test('all 9 project buildings are hittable and dispatch their own id', async () => {
    // Zoomed in enough that the buildings are large targets, then each one is
    // clicked at its own projected screen position.
    const { page, errors } = await open('/spike/city.html')

    const results = await page.evaluate(async () => {
      const stage = window.__stage
      const THREE = await import('/node_modules/three/build/three.module.js')
      const rect = stage.renderer.domElement.getBoundingClientRect()
      const out = []

      for (const b of window.__projects) {
        // Centre the camera on this building so it cannot be occluded or
        // off-frame, then raycast the same way renderer.js does.
        const p = new THREE.Vector3()
        b.hit.getWorldPosition(p)
        stage.controls.target.set(p.x, stage.controls.target.y, p.z)
        stage.camera.position.set(
          p.x + 130, stage.camera.position.y, p.z + 130,
        )
        stage.camera.zoom = 3
        stage.camera.updateProjectionMatrix()
        stage.controls.update()
        stage.camera.updateMatrixWorld(true)

        const ndc = p.clone().project(stage.camera)
        const x = (ndc.x * 0.5 + 0.5) * rect.width
        const y = (-ndc.y * 0.5 + 0.5) * rect.height

        const ray = new THREE.Raycaster()
        ray.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), stage.camera)
        const hit = ray.intersectObject(b.hit, false)[0]?.object ?? null

        out.push({
          id: b.hit.userData.project?.project?.id ?? b.hit.userData.project?.id ?? null,
          expected: b.project?.id ?? null,
          hitId: hit?.userData.project?.project?.id ?? null,
          onScreen: Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1,
          px: [Math.round(x), Math.round(y)],
        })
      }
      return out
    })

    assert.deepEqual(errors, [], 'console errors on city.html')
    assert.equal(results.length, 9, 'expected 9 project buildings on the grid')
    for (const r of results) {
      assert.ok(r.onScreen, `${r.id}: projected off-screen at ${r.px}`)
      assert.equal(r.hitId, r.id, `${r.id}: raycast hit ${r.hitId} instead of itself`)
    }
    await page.close()
  })
})

// Shared by both occlusion tests below via `page.evaluate(sampleGrid)`: casts
// the same 1280x720 8px-step ray grid against the project hit boxes and
// classifies each hit as phantom (an opaque, non-transparent object sits
// nearer than the hit) or clean. Runs inside the page, so it must have no
// outer (Node-side) closures — only browser globals (window, dynamic import)
// are used. One copy means the occlusion epsilon and the transparent-material
// occluder filter can only ever drift out of sync with themselves, not with
// a second copy elsewhere in this file.
async function sampleGrid() {
  const stage = window.__stage
  const THREE = await import('/node_modules/three/build/three.module.js')
  const hits = window.__projects.map((b) => b.hit)
  const hitSet = new Set(hits)
  const ids = window.__projects.map((b) => b.hit.userData.project?.project?.id ?? b.hit.userData.project?.id)

  const occluders = []
  stage.scene.traverse((o) => {
    if (!o.isMesh || hitSet.has(o)) return
    if ([o.material].flat().some((m) => m?.transparent)) return
    occluders.push(o)
  })

  const ray = new THREE.Raycaster()
  const v = new THREE.Vector2()
  const W = 1280, H = 720, STEP = 8
  const points = []
  for (let py = 0; py < H; py += STEP) {
    for (let px = 0; px < W; px += STEP) {
      v.set((px / W) * 2 - 1, -(py / H) * 2 + 1)
      ray.setFromCamera(v, stage.camera)
      const t = ray.intersectObjects(hits, false)[0]
      if (!t) continue
      const o = ray.intersectObjects(occluders, false)[0]
      const phantom = !!(o && o.distance < t.distance - 0.01)
      const id = t.object.userData.project?.project?.id ?? t.object.userData.project?.id
      points.push({ px, py, id, phantom })
    }
  }
  return { points, ids }
}

describe('occlusion-aware picking (known-open #5h)', () => {
  // Project hit boxes are as tall as their buildings and project to ~190px
  // screen columns. Raycasting only the registered targets let a filler
  // building standing in FRONT of a tall project be clicked as that project:
  // 26.4% of the clickable area, and >50% for venue-search and japan-map.
  //
  // This drives the real path — a genuine pointermove, then canvas.style.cursor,
  // which onPointerMove sets to 'pointer' only when hitTest returned a hit.
  test('a filler building in front of a project blocks the click', async () => {
    const { page } = await open('/spike/city.html')
    const { points } = await page.evaluate(sampleGrid)
    const r = await page.evaluate((points) => {
      const canvas = window.__stage.renderer.domElement
      const rect = canvas.getBoundingClientRect()
      const probe = (px, py) => {
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          clientX: rect.left + px, clientY: rect.top + py, bubbles: true,
        }))
        return canvas.style.cursor === 'pointer'
      }
      const phantom = points.filter((p) => p.phantom)
      const clean = points.filter((p) => !p.phantom)
      return {
        phantom: phantom.length,
        clean: clean.length,
        stillClickable: phantom.filter((p) => probe(p.px, p.py)).length,
        lost: clean.filter((p) => !probe(p.px, p.py)).length,
      }
    }, points)

    assert.ok(r.phantom > 0, 'sampling found no occluded points — the grid is wrong, not the fix')
    assert.equal(r.stillClickable, 0, `${r.stillClickable} of ${r.phantom} occluded points still select a project`)
    assert.equal(r.lost, 0, `${r.lost} of ${r.clean} legitimately visible points stopped being clickable`)
    console.log(`    ${r.phantom} occluded points now rejected, all ${r.clean} visible points still clickable`)
    await page.close()
  })

  // The test above proves occluded points get rejected and clean points stay
  // clickable, but never asks whether those clean points are actually spread
  // across all 9 projects. If ~90 new street trees fully hid one project from
  // this view, every one of its "clean" points would just become "phantom"
  // instead — phantom/clean/lost/stillClickable would all still report 0/pass,
  // because there is nothing left to lose. This is the departure-board failure
  // mode from CLAUDE.md: a generic occlusion check passed while 6 of 9 rows
  // were invisible, and only a dedicated per-item assertion caught it.
  test('every project has at least one clickable point at the default view', async () => {
    const { page } = await open('/spike/city.html')
    const { points, ids } = await page.evaluate(sampleGrid)

    // If window.__projects were ever empty, `counts` would be `{}` and the loop
    // below would iterate zero times and pass green having checked nothing —
    // exactly the silent-pass failure mode this test exists to prevent. Same
    // reasoning for the id resolution: if the userData shape it's read from
    // ever changes, every id could silently collapse to `undefined`, merging
    // all 9 projects into one bogus tally key.
    assert.equal(ids.length, 9, 'expected 9 registered project hit boxes')
    assert.ok(ids.every(Boolean), `unresolvable project id in ${JSON.stringify(ids)}`)

    const counts = Object.fromEntries(ids.map((id) => [id, 0]))
    for (const p of points) if (!p.phantom) counts[p.id] = (counts[p.id] ?? 0) + 1

    // Threshold is 8, comfortably under the real measured floor (19, on
    // bible-hymn-kids) so incidental scene changes won't flake it, but high
    // enough to actually fire if a project loses most of its clickable area —
    // 1 only proved "not 100% occluded".
    for (const [id, n] of Object.entries(counts)) {
      assert.ok(n >= 8, `${id}: only ${n} clickable sample points at the default view`)
    }
    console.log(`    per-project clickable points: ${JSON.stringify(counts)}`)
    await page.close()
  })
})

describe('the departure board is the second route to every project', () => {
  // The board is the scene's readable index and the non-spatial way to reach a
  // project. It sat at ground level on the station facade, where the station's
  // OWN elevated deck hid 6 of its 9 rows at every zoom — and once picking
  // became occlusion-aware, hidden rows were unclickable too. Both halves are
  // asserted here because either one alone would let the defect back in.
  for (const zoom of [1, 2, 4]) {
    test(`all 9 rows are visible and clickable at zoom ${zoom}`, async () => {
      const { page, errors } = await open(`/spike/board.html?zoom=${zoom}`)
      const rows = await page.evaluate(async () => {
        const stage = window.__stage
        const THREE = await import('/node_modules/three/build/three.module.js')
        const canvas = stage.renderer.domElement
        const rect = canvas.getBoundingClientRect()
        const rowHits = new Set(window.__rows.map((r) => r.hit))
        const occluders = []
        stage.scene.traverse((o) => {
          if (!o.isMesh || rowHits.has(o)) return
          if ([o.material].flat().some((m) => m?.transparent)) return
          occluders.push(o)
        })
        const dir = new THREE.Vector3()
        stage.camera.getWorldDirection(dir).negate()
        const ray = new THREE.Raycaster()
        return window.__rows.map((row) => {
          const p = new THREE.Vector3()
          row.hit.getWorldPosition(p)
          ray.set(p.clone().addScaledVector(dir, 0.05), dir)
          ray.far = 1000
          const blocked = !!ray.intersectObjects(occluders, false)[0]
          const ndc = p.clone().project(stage.camera)
          canvas.dispatchEvent(new PointerEvent('pointermove', {
            clientX: rect.left + (ndc.x * 0.5 + 0.5) * rect.width,
            clientY: rect.top + (-ndc.y * 0.5 + 0.5) * rect.height,
            bubbles: true,
          }))
          return { id: row.project?.id, blocked, clickable: canvas.style.cursor === 'pointer' }
        })
      })

      assert.deepEqual(errors, [], 'console errors on board.html')
      assert.equal(rows.length, 9, `board has ${rows.length} rows, expected 9`)
      const hidden = rows.filter((r) => r.blocked).map((r) => r.id)
      const dead = rows.filter((r) => !r.clickable).map((r) => r.id)
      assert.deepEqual(hidden, [], `board rows occluded by the station itself: ${hidden}`)
      assert.deepEqual(dead, [], `board rows that cannot be clicked: ${dead}`)
      await page.close()
    })
  }
})

describe('camera framing', () => {
  // The whole point of the derived frustum: a fixed one left a 375px portrait
  // phone with 75 units of horizontal view for a map that needs 252.
  for (const [label, viewport] of [
    ['desktop 1280x720', { width: 1280, height: 720 }],
    ['phone 375x667', { width: 375, height: 667 }],
  ]) {
    test(`the whole map fits at zoom 1 — ${label}`, async () => {
      const { page, errors } = await open('/spike/city.html', { viewport })

      const corners = await page.evaluate(async () => {
        const stage = window.__stage
        const THREE = await import('/node_modules/three/build/three.module.js')
        const { MAP_HALF } = await import('/scene/cityLayout.js')
        stage.camera.zoom = 1
        stage.camera.updateProjectionMatrix()
        stage.camera.updateMatrixWorld(true)
        const out = []
        for (const sx of [-1, 1]) {
          for (const sz of [-1, 1]) {
            const ndc = new THREE.Vector3(sx * MAP_HALF, 0, sz * MAP_HALF).project(stage.camera)
            out.push({ corner: [sx, sz], x: +ndc.x.toFixed(3), y: +ndc.y.toFixed(3) })
          }
        }
        return out
      })

      assert.deepEqual(errors, [], `console errors on city.html at ${label}`)
      for (const c of corners) {
        assert.ok(
          Math.abs(c.x) <= 1 && Math.abs(c.y) <= 1,
          `map corner ${c.corner} projects outside the frustum at ${label}: ndc ${c.x},${c.y}`,
        )
      }
      await page.close()
    })
  }

  // Known-open #3: at 375x667 the frustum inflates to 475 to fit the map's
  // width, leaving the 145-unit-tall city filling 31% of the viewport height.
  // The aspect-derived default zoom is the fix; these numbers are what it buys.
  for (const [label, viewport, minFill] of [
    ['desktop 1280x720', { width: 1280, height: 720 }, 0.85],
    ['phone 375x667', { width: 375, height: 667 }, 0.45],
  ]) {
    test(`the city fills the frame at the default zoom — ${label}`, async () => {
      const { page } = await open('/spike/city.html', { viewport })
      const fill = await page.evaluate(() => {
        const cam = window.__stage.camera
        // Vertical world units visible = frustum height / zoom. CONTENT_H (145)
        // is the city's screen-space height, defined in renderer.js.
        return { zoom: +cam.zoom.toFixed(3), fill: 145 / ((cam.top - cam.bottom) / cam.zoom) }
      })
      assert.ok(
        fill.fill >= minFill,
        `${label}: city fills ${(fill.fill * 100).toFixed(0)}% of the viewport height ` +
        `at default zoom ${fill.zoom}, wanted >= ${minFill * 100}%`,
      )
      console.log(`    ${label}: default zoom ${fill.zoom}, city fills ${(fill.fill * 100).toFixed(0)}% of height`)
      await page.close()
    })
  }

  test('every project is still reachable by panning at the default zoom', async () => {
    // The default zoom on a phone deliberately no longer shows the whole map,
    // so "reachable" now means the pan clamp can bring each one into frame.
    const { page } = await open('/spike/city.html', { viewport: { width: 375, height: 667 } })
    const unreachable = await page.evaluate(async () => {
      const stage = window.__stage
      const THREE = await import('/node_modules/three/build/three.module.js')
      const bad = []
      for (const b of window.__projects) {
        const p = new THREE.Vector3()
        b.hit.getWorldPosition(p)
        const before = stage.controls.target.clone()
        stage.controls.target.set(p.x, before.y, p.z)
        stage.camera.position.set(
          stage.camera.position.x + (p.x - before.x),
          stage.camera.position.y,
          stage.camera.position.z + (p.z - before.z),
        )
        stage.camera.updateMatrixWorld(true)
        const ndc = p.clone().project(stage.camera)
        if (Math.abs(ndc.x) > 1 || Math.abs(ndc.y) > 1) {
          bad.push({ id: b.project?.id, ndc: [+ndc.x.toFixed(2), +ndc.y.toFixed(2)] })
        }
      }
      return bad
    })
    assert.deepEqual(unreachable, [], 'projects that cannot be panned into frame on a phone')
    await page.close()
  })

  test('pan is clamped to the map, not the rail it used to be', async () => {
    const { page } = await open('/spike/city.html')
    const clamp = await page.evaluate(async () => {
      const stage = window.__stage
      const { MAP_HALF } = await import('/scene/cityLayout.js')
      // Shove the pivot far outside the map on both axes and let the loop clamp.
      stage.controls.target.set(9999, stage.controls.target.y, 9999)
      await new Promise((r) => setTimeout(r, 200))
      const hi = { x: stage.controls.target.x, z: stage.controls.target.z }
      stage.controls.target.set(-9999, stage.controls.target.y, -9999)
      await new Promise((r) => setTimeout(r, 200))
      const lo = { x: stage.controls.target.x, z: stage.controls.target.z }
      return { hi, lo, MAP_HALF }
    })
    assert.equal(Math.round(clamp.hi.x), clamp.MAP_HALF)
    assert.equal(Math.round(clamp.hi.z), clamp.MAP_HALF)
    assert.equal(Math.round(clamp.lo.x), -clamp.MAP_HALF)
    assert.equal(Math.round(clamp.lo.z), -clamp.MAP_HALF)
    await page.close()
  })
})

describe('the real page', () => {
  test('renders the scene with no console errors', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    const errors = []
    page.on('console', (m) => {
      if (m.type() === 'error' && !BENIGN.some((re) => re.test(m.text()))) errors.push(m.text())
    })
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(ORIGIN, { waitUntil: 'load' })
    await page.waitForSelector('canvas[data-scene]', { timeout: 15_000 })
    await page.waitForTimeout(1500)   // let the scene build and a few frames run

    assert.deepEqual(errors, [], 'console errors on the real page')
    await page.close()
  })

  // prefers-reduced-motion must produce a perceptually static frame. Rather than
  // diffing pixels with a tolerance — which is what the previous byte-hash check
  // was replaced with, and is itself fiddly to calibrate — this asserts the
  // MECHANISM: renderer.js's reduced-motion branch renders on demand only and
  // never invokes the frame callbacks, so a settled scene cannot change at all.
  // The screenshot comparison below then corroborates it end to end.
  test('reduced motion stops the render loop entirely', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    await page.emulateMedia({ reducedMotion: 'reduce' })   // must precede goto
    await page.goto(`${ORIGIN}/spike/city.html`, { waitUntil: 'load' })
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 })

    const reduce = await page.evaluate(() => window.__stage.reduceMotion)
    assert.equal(reduce, true, 'stage did not pick up prefers-reduced-motion')

    await page.waitForTimeout(1200)                        // let damping settle
    const before = await page.evaluate(() => window.__stage.renderer.info.render.frame)
    await page.waitForTimeout(1500)
    const after = await page.evaluate(() => window.__stage.renderer.info.render.frame)
    assert.equal(after, before, `${after - before} frames rendered while idle under reduced motion`)
    await page.close()
  })

  test('reduced motion leaves the real page perceptually static, CSS included', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(ORIGIN, { waitUntil: 'load' })
    await page.waitForSelector('canvas[data-scene]', { timeout: 15_000 })
    await page.waitForTimeout(2000)

    // The hint's pulse is a CSS animation like any other and is gated behind
    // Tailwind's motion-safe: variant.
    const anim = await page.$eval('[data-hint] span', (el) => getComputedStyle(el).animationName)
    assert.equal(anim, 'none', `hint still animates under reduced motion (animation-name: ${anim})`)

    // With the loop stopped the canvas cannot change, so these must be byte
    // identical. If this ever goes flaky, something is still animating — that is
    // the signal, not noise to be tolerated away.
    const a = await page.screenshot()
    await page.waitForTimeout(1500)
    const b = await page.screenshot()
    assert.ok(a.equals(b), 'the page changed while idle under prefers-reduced-motion')
    await page.close()
  })

  test('the hint DOES animate when motion is not restricted', async () => {
    // Guards the opposite failure: motion-safe: silently disabling the pulse for
    // everyone would also make the test above pass.
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(ORIGIN, { waitUntil: 'load' })
    await page.waitForSelector('[data-hint] span', { timeout: 15_000 })
    const anim = await page.$eval('[data-hint] span', (el) => getComputedStyle(el).animationName)
    assert.notEqual(anim, 'none', 'the hint pulse never runs, so motion-safe: is not what gates it')
    await page.close()
  })

  test('the accessible fallback list exposes every project', async () => {
    // ProjectList.vue renders INSIDE the <canvas>. That is what screen readers
    // and crawlers get, so it is load-bearing, not a stub.
    const page = await browser.newPage()
    await page.goto(ORIGIN, { waitUntil: 'load' })
    await page.waitForSelector('canvas[data-scene]', { timeout: 15_000 })

    const items = await page.$$eval('canvas[data-scene] li', (els) =>
      els.map((el) => el.querySelector('h3')?.textContent.trim()),
    )
    assert.equal(items.length, 9, `fallback list has ${items.length} projects, expected 9`)
    assert.ok(items.every(Boolean), 'a fallback list entry has no title')

    const label = await page.getAttribute('canvas[data-scene]', 'aria-label')
    assert.ok(label && label.length > 20, 'canvas is missing a descriptive aria-label')
    await page.close()
  })
})
