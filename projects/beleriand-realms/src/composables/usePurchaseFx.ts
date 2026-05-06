import { ref, type Ref } from 'vue'
import { type Card } from '../types/game'

export interface FlightEntry {
  card: Card
  fromRect: DOMRect
  toRect: DOMRect
  key: number
}

const flights: Ref<FlightEntry[]> = ref([])

export function flyToDiscard(card: Card, fromRect: DOMRect, toRect: DOMRect): void {
  const entry: FlightEntry = { card, fromRect, toRect, key: Date.now() }
  flights.value.push(entry)
  setTimeout(() => {
    const idx = flights.value.findIndex(f => f.key === entry.key)
    if (idx !== -1) flights.value.splice(idx, 1)
  }, 750)
}

export function usePurchaseFx() {
  return { flights }
}
