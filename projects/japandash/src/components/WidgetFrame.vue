<template>
  <div
    ref="rootEl"
    class="flex flex-col rounded-lg border border-koshi bg-white/70 backdrop-blur-sm shadow-sm transition-shadow duration-200 overflow-hidden relative"
    :class="[
      colSpanClass,
      isDragging ? 'opacity-40 shadow-none' : '',
      isDragOver ? 'ring-2 ring-ai/50 shadow-md' : (isDragging ? '' : 'hover:shadow-md'),
    ]"
    :style="rootStyle"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <!-- Title bar (draggable handle) -->
    <div
      class="flex items-center gap-2 px-4 py-2.5 bg-koshi/50 border-b border-koshi select-none flex-shrink-0 cursor-grab active:cursor-grabbing"
      draggable="true"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @click="collapsible && toggle()"
    >
      <span v-if="icon" class="text-base leading-none">{{ icon }}</span>
      <span class="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-usuzumi font-medium">
        {{ title }}
      </span>
      <span
        v-if="collapsible"
        class="ml-auto text-usuzumi text-xs transition-transform duration-200"
        :class="{ 'rotate-180': collapsed }"
      >
        ▾
      </span>
    </div>

    <!-- Content -->
    <div v-show="!collapsed" class="p-4 overflow-auto flex-1 min-h-0">
      <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="w-5 h-5 border-2 border-ai/30 border-t-ai rounded-full animate-spin" />
      </div>
      <slot v-else />
    </div>

    <!-- Right resize handle -->
    <div
      class="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize z-10 hover:bg-ai/20 transition-colors"
      @mousedown.stop.prevent="startResize($event, 'right')"
    />
    <!-- Bottom resize handle -->
    <div
      class="absolute bottom-0 left-2 right-2 h-1.5 cursor-ns-resize z-10 hover:bg-ai/20 transition-colors"
      @mousedown.stop.prevent="startResize($event, 'bottom')"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWidgetLayout } from '../composables/useWidgetLayout.js'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  widgetId: { type: String, default: '' },
  span: { type: String, default: 'single', validator: v => ['single', 'double', 'tall'].includes(v) },
  collapsible: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const { widgetConfig, draggingId, dragOverId, reorder, updateConfig } = useWidgetLayout()

const rootEl = ref(null)
const collapsed = ref(false)

function toggle() {
  collapsed.value = !collapsed.value
}

const isDragging = computed(() => !!props.widgetId && draggingId.value === props.widgetId)
const isDragOver = computed(() => !!props.widgetId && dragOverId.value === props.widgetId && draggingId.value !== props.widgetId)

const colSpanClass = computed(() => {
  let n = 1
  if (props.widgetId && widgetConfig[props.widgetId]) {
    n = widgetConfig[props.widgetId].colSpan ?? 1
  } else {
    n = props.span === 'double' ? 2 : 1
  }
  // Responsive: cap span to available columns at each breakpoint
  if (n >= 3) return 'col-span-1 md:col-span-2 xl:col-span-3'
  if (n >= 2) return 'col-span-1 md:col-span-2'
  return 'col-span-1'
})

const rootStyle = computed(() => {
  if (!props.widgetId || !widgetConfig[props.widgetId]) return {}
  const h = widgetConfig[props.widgetId].height
  return h ? { height: `${h}px` } : {}
})

// — Drag to reorder —

function onDragStart(e) {
  if (!props.widgetId) return
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', props.widgetId)
  // Delay dim so the drag ghost captures full-opacity state
  setTimeout(() => { draggingId.value = props.widgetId }, 0)
}

function onDragEnd() {
  draggingId.value = null
  dragOverId.value = null
}

function onDragOver() {
  if (!draggingId.value || draggingId.value === props.widgetId) return
  dragOverId.value = props.widgetId
}

function onDragLeave(e) {
  if (!rootEl.value?.contains(e.relatedTarget)) {
    if (dragOverId.value === props.widgetId) dragOverId.value = null
  }
}

function onDrop(e) {
  const fromId = e.dataTransfer.getData('text/plain') || draggingId.value
  if (fromId && props.widgetId) reorder(fromId, props.widgetId)
  draggingId.value = null
  dragOverId.value = null
}

// — Resize —

function startResize(e, direction) {
  if (!props.widgetId) return
  const id = props.widgetId
  const startX = e.clientX
  const startY = e.clientY
  const cfg = widgetConfig[id] ?? { colSpan: 1, height: null }
  const startColSpan = cfg.colSpan ?? 1
  const startHeight = rootEl.value?.offsetHeight ?? 300

  function getGridInfo() {
    const parent = rootEl.value?.parentElement
    if (!parent) return { colWidth: 300, maxCols: 3, gap: 20 }
    const style = getComputedStyle(parent)
    const cols = style.gridTemplateColumns.trim().split(/\s+/)
    const maxCols = cols.length
    const colWidth = parseFloat(cols[0]) || 300
    const gap = parseFloat(style.columnGap) || 20
    return { colWidth, maxCols, gap }
  }

  function onMouseMove(e) {
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    if (direction === 'right') {
      const { colWidth, maxCols, gap } = getGridInfo()
      const baseWidth = startColSpan * colWidth + (startColSpan - 1) * gap
      const newWidth = baseWidth + dx
      let newColSpan = Math.round((newWidth + gap) / (colWidth + gap))
      newColSpan = Math.max(1, Math.min(maxCols, newColSpan))
      if (newColSpan !== (widgetConfig[id]?.colSpan ?? 1)) {
        updateConfig(id, { colSpan: newColSpan })
      }
    }

    if (direction === 'bottom') {
      const newHeight = Math.max(80, startHeight + dy)
      updateConfig(id, { height: Math.round(newHeight) })
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>
