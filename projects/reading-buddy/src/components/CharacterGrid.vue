<script setup>
import CharacterCard from './CharacterCard.vue'

defineProps({
  characters: { type: Array, required: true },
  allCharacters: { type: Object, required: true },
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <TransitionGroup name="card">
      <CharacterCard
        v-for="character in characters"
        :key="character.key"
        :character="character"
        :allCharacters="allCharacters"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.card-enter-active {
  transition: all 0.4s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
