<template>
  <div class="relative h-full w-full bg-[#a9c8ec]">
    <!-- Content inside <canvas> is what assistive tech and crawlers read. -->
    <canvas
      v-if="!failed"
      ref="canvasEl"
      data-scene
      class="block h-full w-full cursor-grab touch-none"
      aria-label="Interactive 3D map of Shinjuku. Shinjuku Station sits at the centre; each lit building is one project."
    >
      <ProjectList :projects="projects" />
    </canvas>

    <!-- WebGL initialised but then failed: swap the list in for real. -->
    <div v-else class="h-full w-full overflow-y-auto">
      <ProjectList :projects="projects" />
    </div>

    <!-- Nothing about a canvas advertises that it pans and zooms, and at the
         default zoom the lit buildings are small. Decorative, so aria-hidden. -->
    <div
      v-if="!failed && showHint"
      class="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
      aria-hidden="true"
      data-hint
    >
      <!-- motion-safe: the pulse is an animation like any other and must not
           run for users who asked for reduced motion. -->
      <span class="motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75">
        drag to pan · scroll to zoom · lit buildings are projects
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createStage, addDaylight } from '../scene/renderer.js'
import { createStreets } from '../scene/street.js'
import { createBlocks } from '../scene/blocks.js'
import { createStation } from '../scene/station.js'
import { createTowers } from '../scene/towers.js'
import { createGoldenGaiBlock } from '../scene/alley.js'
import { createKonbini } from '../scene/konbini.js'
import { createVendingBank, createKoban } from '../scene/streetFurniture.js'
import { createProjectBuilding } from '../scene/projectBuilding.js'
import { createAmbient } from '../scene/ambient.js'
import { createDepartureBoard } from '../scene/departureBoard.js'
import { createOutlines } from '../scene/outline.js'
import { PROJECT_SITES, SCENERY_SITES, lotCenter } from '../scene/cityLayout.js'
import ProjectList from './ProjectList.vue'

const props = defineProps({
  projects: { type: Array, required: true },
})
const emit = defineEmits(['select', 'hover'])

const canvasEl = ref(null)
const failed = ref(false)
const showHint = ref(true)
let hintTimer = null
let stage = null
let ambient = null

onMounted(() => {
  try {
    stage = createStage(canvasEl.value)
  } catch (err) {
    console.error('WebGL unavailable, falling back to the project list.', err)
    failed.value = true
    return
  }

  addDaylight(stage.scene)

  stage.scene.add(createStreets())
  stage.scene.add(createBlocks())

  // 都庁 and the Cocoon. Backdrop, never clickable — they establish the place
  // and give the skyline something taller than the filler to read against.
  stage.scene.add(createTowers())

  // Golden Gai fills its own block. Scenery only — nothing in it is pickable;
  // its vertical signs join the flicker pool with the project signs below.
  const goldenGai = createGoldenGaiBlock()
  stage.scene.add(goldenGai.group)

  // Konbini, kōban, vending. Scenery — their modules still return a `hit` mesh
  // from when they were interactive, and it is deliberately not registered.
  const SCENERY = { konbini: createKonbini, koban: createKoban, vending: createVendingBank }
  for (const site of SCENERY_SITES) {
    const make = SCENERY[site.id]
    if (!make) {
      console.warn(`cityLayout SCENERY_SITES references unknown scenery id "${site.id}"`)
      continue
    }
    const { x, z } = lotCenter(site.cell, site.lot)
    const { group } = make()
    group.position.set(x, 0, z)
    group.rotation.y = site.ry ?? 0
    stage.scene.add(group)
  }

  const station = createStation()
  stage.scene.add(station.group)

  // Every interactive thing in the scene registers the same payload shape, so
  // hover and dispatch stay uniform.
  const register = (hit, payload) => stage.addPickable(hit, payload)

  // The nine clickable buildings. cityLayout.js owns WHERE they stand; App.vue
  // owns WHAT they are. A site whose id has no matching project is skipped
  // rather than rendering a nameless building.
  const byId = new Map(props.projects.map((p) => [p.id, p]))
  for (const site of PROJECT_SITES) {
    const project = byId.get(site.id)
    if (!project) {
      console.warn(`cityLayout PROJECT_SITES references unknown project id "${site.id}"`)
      continue
    }
    const building = createProjectBuilding(project, site)
    stage.scene.add(building.group)
    register(building.hit, { kind: 'project', project, hover: building.setHover })
  }

  // The station's destination board: the one readable index in the scene, and
  // the defence against nine buildings being hard to find on a 178m map. Each
  // ROW is its own pick target, so it is a real second route to every project.
  const board = createDepartureBoard(props.projects)
  station.boardAnchor.add(board.group)
  for (const row of board.rows) {
    register(row.hit, { kind: 'project', project: row.project, hover: row.setHover })
  }

  // No flicker in daytime — failing-neon stutter is a night trope. Passing no
  // flickerMaterials hits createFlicker's built-in empty-array no-op.
  ambient = createAmbient({
    reduceMotion: stage.reduceMotion,
    trackY: station.trackY,
  })
  stage.scene.add(ambient.group)
  stage.onFrame((dt, elapsed) => ambient.update(dt, elapsed))

  // Cartoon contour pass — must run LAST: it walks the finished graph once
  // and bakes world-space edges, so anything added to the scene after this
  // point has no outline. ambient.group is skipped because its rain/train/
  // steam animate every frame and a baked-in-world-space outline of a moving
  // object would be a stationary ghost.
  stage.scene.add(createOutlines(stage.scene, { skip: [ambient.group] }))

  // Only one thing is lit at a time, so the scene reads as a single focus.
  let active = null
  stage.onHover((payload) => {
    if (payload === active) return
    active?.hover?.(false)
    payload?.hover?.(true)
    active = payload
    emit('hover', payload?.project ?? null)
  })

  stage.onSelect((payload) => emit('select', payload))

  // The hint has done its job the moment you touch the scene.
  const dismiss = () => { showHint.value = false }
  canvasEl.value.addEventListener('pointerdown', dismiss, { once: true })
  hintTimer = setTimeout(dismiss, 9000)

  stage.start()
})

onBeforeUnmount(() => {
  clearTimeout(hintTimer)
  ambient?.dispose()   // restores the flickered sign materials before teardown
  stage?.dispose()
})
</script>
