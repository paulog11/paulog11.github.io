import { ref, computed } from 'vue'

export function useInput() {
  const query = ref('')
  const recording = ref(false)
  let recognition = null

  const supported = computed(() =>
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  )

  function startRecording() {
    if (!supported.value || recording.value) return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SR()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      query.value = event.results[0][0].transcript
    }

    recognition.onend = () => {
      recording.value = false
    }

    recognition.onerror = () => {
      recording.value = false
    }

    recognition.start()
    recording.value = true
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop()
      recognition = null
    }
    recording.value = false
  }

  function setQuery(val) {
    query.value = val
  }

  return { query, recording, supported, startRecording, stopRecording, setQuery }
}
