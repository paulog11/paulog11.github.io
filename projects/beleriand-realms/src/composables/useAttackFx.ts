import { ref, type Ref } from 'vue'
import { Faction } from '../types/game'

interface HitPayload {
  targetId: string
  faction: Faction
  key: number
}

const currentHit: Ref<HitPayload | null> = ref(null)
let clearTimer: ReturnType<typeof setTimeout> | null = null

export function triggerHit(targetId: string, faction: Faction): void {
  if (clearTimer !== null) clearTimeout(clearTimer)
  currentHit.value = { targetId, faction, key: Date.now() }
  clearTimer = setTimeout(() => {
    currentHit.value = null
    clearTimer = null
  }, 500)
}

export function useAttackFx() {
  return { currentHit }
}
