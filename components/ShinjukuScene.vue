<template>
  <div class="relative h-full w-full bg-[#070a12]">
    <!-- Content inside <canvas> is what assistive tech and crawlers read. -->
    <canvas
      v-if="!failed"
      ref="canvasEl"
      class="block h-full w-full cursor-grab touch-none"
      aria-label="Interactive 3D map of a Shinjuku street. Each stall is one project."
    >
      <ProjectList :projects="projects" />
    </canvas>

    <!-- WebGL initialised but then failed: swap the list in for real. -->
    <div v-else class="h-full w-full overflow-y-auto">
      <ProjectList :projects="projects" />
    </div>

    <!-- Panning is the only way to reach every stall on a narrow screen, and
         nothing about a canvas advertises that. Decorative, so aria-hidden. -->
    <div
      v-if="!failed && showHint"
      class="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
      aria-hidden="true"
      data-hint
    >
      <!-- motion-safe: the pulse is an animation like any other and must not
           run for users who asked for reduced motion. -->
      <span class="motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75">
        drag to walk the alley
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createStage, addNightLighting } from '../scene/renderer.js'
import { createStreet } from '../scene/street.js'
import { createTowers } from '../scene/towers.js'
import { createCrowd } from '../scene/crowd.js'
import { createAmbient } from '../scene/ambient.js'
import { createAlley } from '../scene/alley.js'
import { createDepartureBoard } from '../scene/departureBoard.js'
import { createVendingBank, createKoban } from '../scene/streetFurniture.js'
import { createKonbini } from '../scene/konbini.js'
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

  addNightLighting(stage.scene)

  // Measured cost centres, worst first: crowd geometry (~33%), shopfront point
  // lights (~24-33%), bloom (~12%). The low tier cuts the first two.
  const low = stage.quality === 'low'

  // Long enough that panning to either rail never reveals the end of the paving.
  stage.scene.add(createStreet({ length: 170, width: 26 }))
  stage.scene.add(createCrowd({ count: low ? 54 : 108 }))
  stage.scene.add(createTowers())

  const { group, stalls } = createAlley(props.projects, { lightEvery: low ? 2 : 1 })
  stage.scene.add(group)

  ambient = createAmbient({
    reduceMotion: stage.reduceMotion,
    flickerMaterials: stalls.map((s) => s.vertMat),
  })
  stage.scene.add(ambient.group)
  stage.onFrame((dt, elapsed) => ambient.update(dt, elapsed))

  // Every interactive thing in the scene — stalls and diegetic widgets alike —
  // registers the same payload shape, so hover and dispatch stay uniform.
  const register = (hit, payload) => stage.addPickable(hit, payload)

  for (const stall of stalls) {
    register(stall.hit, { kind: 'project', project: stall.project, hover: stall.setHover })
  }

  // Departure board: the one readable index in the scene. Each ROW is its own
  // pick target, so it works as a real second route to a project.
  const board = createDepartureBoard(props.projects)
  board.group.position.set(-19.5, 0, 2)
  stage.scene.add(board.group)
  for (const row of board.rows) {
    register(row.hit, { kind: 'project', project: row.project, hover: row.setHover })
  }

  // Diegetic widgets. Positions are deconflicted in screen space, not just in
  // world space — the board spans x -29..-15, so street furniture cannot sit there.
  const vending = createVendingBank()
  vending.group.position.set(-6, 0, 5)
  stage.scene.add(vending.group)
  register(vending.hit, {
    kind: 'link',
    url: './assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf',
    download: 'Paulo_Gonzales_Resume_SoftwareEngineer.pdf',
    hover: vending.setHover,
  })

  const koban = createKoban()
  koban.group.position.set(8, 0, 11)
  stage.scene.add(koban.group)
  register(koban.hit, {
    kind: 'link',
    url: 'https://github.com/paulog11',
    hover: koban.setHover,
  })

  const konbini = createKonbini()
  konbini.group.position.set(22, 0, -3)
  stage.scene.add(konbini.group)
  register(konbini.hit, {
    kind: 'link',
    url: './projects/profile/',
    hover: konbini.setHover,
  })

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
