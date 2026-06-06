<template>
  <div
    ref="rootEl"
    class="flex flex-col rounded-xl border border-koshi bg-surface/70 backdrop-blur-sm shadow-sm transition-shadow duration-200 overflow-hidden"
    :class="[
      isFocused ? 'h-full w-full' : sizeSpanClass,
      isDragging ? 'opacity-40 shadow-none' : '',
      isDragOver ? 'ring-2 ring-ai/50 shadow-md' : (isDragging ? '' : 'hover:shadow-md'),
    ]"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <!-- Title bar (draggable handle) -->
    <div
      class="flex items-center gap-2 px-4 py-2.5 bg-koshi/50 border-b border-koshi select-none flex-shrink-0"
      :class="isFocused ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'"
      :draggable="!isFocused"
      @dragstart="!isFocused && onDragStart($event)"
      @dragend="!isFocused && onDragEnd()"
      @click="!isFocused && collapsible && toggle()"
    >
      <!-- Skill-area color dot -->
      <span
        v-if="widgetId"
        class="w-1.5 h-1.5 rounded-full shrink-0"
        :class="areaColorClass"
      />
      <span v-if="icon" class="text-base leading-none">{{ icon }}</span>
      <span class="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-usuzumi font-medium">
        {{ title }}
      </span>
      <!-- Exit focus button (replaces collapse chevron when focused) -->
      <button
        v-if="isFocused"
        class="ml-auto text-usuzumi hover:text-sumi text-xs transition-colors px-2 py-0.5 rounded hover:bg-koshi/60"
        @click="clearFocus()"
      >
        ✕ Exit
      </button>
      <span
        v-else-if="collapsible"
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
      <slot v-else :focused="isFocused" />
    </div>

    <!-- Practice CTA footer (only for focusable activities, not focused, not collapsed) -->
    <div
      v-if="isFocusable && !isFocused && !collapsed"
      class="flex-shrink-0 border-t border-koshi/60"
    >
      <button
        class="w-full py-2.5 text-sm font-medium bg-ai text-white hover:bg-ai/90 transition-colors flex items-center justify-center gap-1.5"
        @click="setFocus(widgetId)"
      >
        <span class="text-xs">▶</span> Practice
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWidgetLayout, WIDGET_META } from '../composables/useWidgetLayout.js'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  widgetId: { type: String, default: '' },
  span: { type: String, default: 'single' },
  collapsible: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const { draggingId, dragOverId, reorder, focusedWidget, setFocus, clearFocus } = useWidgetLayout()

const rootEl = ref(null)
const collapsed = ref(false)

function toggle() {
  collapsed.value = !collapsed.value
}

const isDragging = computed(() => !!props.widgetId && draggingId.value === props.widgetId)
const isDragOver = computed(() => !!props.widgetId && dragOverId.value === props.widgetId && draggingId.value !== props.widgetId)

const isFocused    = computed(() => !!props.widgetId && focusedWidget.value === props.widgetId)
const isFocusable  = computed(() => !!props.widgetId && !WIDGET_META[props.widgetId]?.tool)

const AREA_COLORS = {
  track:     'bg-ai',
  input:     'bg-matcha',
  output:    'bg-beni',
  reference: 'bg-kin',
}

const areaColorClass = computed(() => {
  const area = WIDGET_META[props.widgetId]?.area
  return AREA_COLORS[area] ?? 'bg-usuzumi'
})

const sizeSpanClass = computed(() => {
  let size = 'small'
  if (props.widgetId && WIDGET_META[props.widgetId]) {
    size = WIDGET_META[props.widgetId].size
  } else if (props.span === 'double') {
    size = 'wide'
  }
  switch (size) {
    case 'large': return 'col-span-1 md:col-span-2 row-span-2'
    case 'wide':  return 'col-span-1 md:col-span-2 row-span-1'
    case 'tall':  return 'col-span-1 row-span-2'
    default:      return 'col-span-1 row-span-1'
  }
})

// — Drag to reorder —

function onDragStart(e) {
  if (!props.widgetId) return
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', props.widgetId)
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
</script>
