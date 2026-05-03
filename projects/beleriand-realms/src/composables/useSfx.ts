import { ref, watch } from 'vue'

type SfxName = 'draw' | 'shuffle' | 'play' | 'click' | 'purchase' | 'attack'

const REGISTRY: Record<SfxName, string> = {
  draw:     'sounds/draw.mp3',
  shuffle:  'sounds/shuffle.mp3',
  play:     'sounds/play.mp3',
  click:    'sounds/click.mp3',
  purchase: 'sounds/purchase.mp3',
  attack:   'sounds/attack.mp3',
}

const STORAGE_KEY = 'beleriand-sfx'
const loaded: Partial<Record<SfxName, HTMLAudioElement>> = {}

const persisted = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
})()

export const sfxVolume = ref<number>(typeof persisted.volume === 'number' ? persisted.volume : 0.5)
export const sfxMuted  = ref<boolean>(!!persisted.muted)

watch([sfxVolume, sfxMuted], ([volume, muted]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume, muted })) } catch {}
})

function getAudio(name: SfxName): HTMLAudioElement {
  if (!loaded[name]) {
    const url = `${import.meta.env.BASE_URL}${REGISTRY[name]}`
    loaded[name] = new Audio(url)
    loaded[name]!.preload = 'auto'
  }
  return loaded[name]!
}

export function playSfx(name: SfxName): void {
  if (sfxMuted.value) return
  try {
    const base = getAudio(name)
    const node = base.cloneNode(true) as HTMLAudioElement
    node.volume = Math.max(0, Math.min(1, sfxVolume.value))
    void node.play().catch(() => { /* autoplay-policy / missing file — ignore */ })
  } catch { /* never break gameplay over a sound */ }
}

export function useSfx() {
  return { playSfx, sfxVolume, sfxMuted }
}
