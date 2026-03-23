<script setup>
import { ref } from 'vue'

defineProps({
  hasKey: { type: Boolean, required: true }
})

const emit = defineEmits(['save', 'clear'])

const inputVal = ref('')

function onSave() {
  if (!inputVal.value.trim()) return
  emit('save', inputVal.value.trim())
  inputVal.value = ''
}
</script>

<template>
  <div class="api-section">
    <label>API Key</label>

    <template v-if="!hasKey">
      <input
        v-model="inputVal"
        type="password"
        placeholder="sk-ant-..."
        autocomplete="off"
        @keydown.enter="onSave"
      />
      <button class="save-btn" @click="onSave">Save</button>
    </template>

    <template v-else>
      <span class="api-saved">●●●●●●●● saved</span>
      <button class="save-btn" @click="emit('clear')">Clear</button>
    </template>
  </div>
</template>
