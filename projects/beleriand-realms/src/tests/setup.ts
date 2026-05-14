import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, vi } from 'vitest'

// Silence SFX and visual effects in tests — they depend on DOM APIs not present in happy-dom
vi.mock('../composables/useSfx', () => ({ playSfx: vi.fn() }))
vi.mock('../composables/useAttackFx', () => ({ triggerHit: vi.fn() }))
vi.mock('../composables/usePurchaseFx', () => ({ triggerPurchaseFlight: vi.fn() }))

beforeEach(() => {
  setActivePinia(createPinia())
})
