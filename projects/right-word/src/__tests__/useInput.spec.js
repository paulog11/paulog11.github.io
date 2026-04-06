import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useInput } from '../composables/useInput'

function makeMockRecognition() {
  return {
    lang: '',
    interimResults: true,
    maxAlternatives: 1,
    onresult: null,
    onend: null,
    onerror: null,
    start: vi.fn(),
    stop: vi.fn(),
  }
}

describe('useInput', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('query starts as empty string', () => {
    const { query } = useInput()
    expect(query.value).toBe('')
  })

  it('setQuery updates query', () => {
    const { query, setQuery } = useInput()
    setQuery('hello')
    expect(query.value).toBe('hello')
  })

  it('recording starts as false', () => {
    const { recording } = useInput()
    expect(recording.value).toBe(false)
  })

  it('supported is false when SpeechRecognition is not in window', () => {
    const { supported } = useInput()
    expect(supported.value).toBe(false)
  })

  it('supported is true when SpeechRecognition is in window', () => {
    vi.stubGlobal('SpeechRecognition', class {})
    const { supported } = useInput()
    expect(supported.value).toBe(true)
  })

  it('supported is true when webkitSpeechRecognition is in window', () => {
    vi.stubGlobal('webkitSpeechRecognition', class {})
    const { supported } = useInput()
    expect(supported.value).toBe(true)
  })

  it('startRecording sets recording to true and calls start()', () => {
    const mockRecognition = makeMockRecognition()
    vi.stubGlobal('SpeechRecognition', vi.fn(() => mockRecognition))

    const { recording, startRecording } = useInput()
    startRecording()

    expect(recording.value).toBe(true)
    expect(mockRecognition.start).toHaveBeenCalledOnce()
  })

  it('startRecording does nothing when not supported', () => {
    const { recording, startRecording } = useInput()
    startRecording()
    expect(recording.value).toBe(false)
  })

  it('startRecording does nothing if already recording', () => {
    const mockRecognition = makeMockRecognition()
    vi.stubGlobal('SpeechRecognition', vi.fn(() => mockRecognition))

    const { startRecording } = useInput()
    startRecording()
    startRecording()

    expect(mockRecognition.start).toHaveBeenCalledOnce()
  })

  it('onresult sets query from transcript', () => {
    const mockRecognition = makeMockRecognition()
    vi.stubGlobal('SpeechRecognition', vi.fn(() => mockRecognition))

    const { query, startRecording } = useInput()
    startRecording()

    mockRecognition.onresult({ results: [[{ transcript: 'excuse me' }]] })
    expect(query.value).toBe('excuse me')
  })

  it('onend sets recording to false', () => {
    const mockRecognition = makeMockRecognition()
    vi.stubGlobal('SpeechRecognition', vi.fn(() => mockRecognition))

    const { recording, startRecording } = useInput()
    startRecording()
    expect(recording.value).toBe(true)

    mockRecognition.onend()
    expect(recording.value).toBe(false)
  })

  it('stopRecording sets recording to false and calls stop()', () => {
    const mockRecognition = makeMockRecognition()
    vi.stubGlobal('SpeechRecognition', vi.fn(() => mockRecognition))

    const { recording, startRecording, stopRecording } = useInput()
    startRecording()
    expect(recording.value).toBe(true)

    stopRecording()
    expect(recording.value).toBe(false)
    expect(mockRecognition.stop).toHaveBeenCalledOnce()
  })
})
