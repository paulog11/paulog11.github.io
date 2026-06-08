import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { channels } from '../data/shadowing-channels.js'

export function useShadowing() {
  const selectedChannelId = ref(channels[0]?.id || '')
  const filterLevel = ref('')
  const completedVideos = useLocalStorage('japandash:shadowing-completed', [])
  const shadowingProgress = useLocalStorage('japandash:shadowing-progress', {})
  const selectedVideoId = ref(null)

  const selectedChannel = computed(() =>
    channels.find(c => c.id === selectedChannelId.value) || channels[0]
  )

  const filteredVideos = computed(() => {
    const vids = selectedChannel.value?.videos || []
    if (!filterLevel.value) return vids
    return vids.filter(v => v.level === filterLevel.value)
  })

  const selectedVideo = computed(() => {
    if (!selectedVideoId.value) return null
    for (const ch of channels) {
      const v = ch.videos.find(v => v.id === selectedVideoId.value)
      if (v) return v
    }
    return null
  })

  function selectChannel(id) {
    selectedChannelId.value = id
    selectedVideoId.value = null
  }

  function selectVideo(id) {
    selectedVideoId.value = id
  }

  function markCompleted(videoId) {
    if (!completedVideos.value.includes(videoId)) {
      completedVideos.value = [...completedVideos.value, videoId]
    }
  }

  function isCompleted(videoId) {
    return completedVideos.value.includes(videoId)
  }

  function randomPick() {
    const unwatched = filteredVideos.value.filter(v => !isCompleted(v.id))
    const pool = unwatched.length > 0 ? unwatched : filteredVideos.value
    if (pool.length === 0) return
    const pick = pool[Math.floor(Math.random() * pool.length)]
    selectedVideoId.value = pick.id
  }

  function getProgress(videoId) {
    return { step: shadowingProgress.value[videoId] ?? 0 }
  }

  function advanceStep(videoId) {
    const current = shadowingProgress.value[videoId] ?? 0
    shadowingProgress.value = { ...shadowingProgress.value, [videoId]: Math.min(current + 1, 3) }
  }

  function resetProgress(videoId) {
    const updated = { ...shadowingProgress.value }
    delete updated[videoId]
    shadowingProgress.value = updated
  }

  return {
    channels,
    selectedChannelId,
    selectedChannel,
    filterLevel,
    filteredVideos,
    selectedVideoId,
    selectedVideo,
    completedVideos,
    selectChannel,
    selectVideo,
    markCompleted,
    isCompleted,
    randomPick,
    getProgress,
    advanceStep,
    resetProgress,
  }
}
