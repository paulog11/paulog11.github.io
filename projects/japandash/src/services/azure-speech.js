function b64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  ))
}

export async function recognizeWithAzure(audioBlob, referenceText, key, region = 'eastus') {
  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=ja-JP&format=detailed`

  const assessmentConfig = JSON.stringify({
    ReferenceText: referenceText,
    GradingSystem: 'HundredMark',
    Granularity: 'Word',
    EnableMiscue: false,
  })

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': audioBlob.type || 'audio/webm',
      'Pronunciation-Assessment': b64Encode(assessmentConfig),
    },
    body: audioBlob,
  })

  if (!response.ok) throw new Error(`Azure STT ${response.status}: ${await response.text()}`)

  const data = await response.json()
  if (data.RecognitionStatus !== 'Success' || !data.NBest?.length) {
    return { score: 0, heard: '', words: [] }
  }

  const best = data.NBest[0]
  return {
    score: Math.round(best.PronunciationAssessment?.PronScore ?? 0),
    heard: best.DisplayText || '',
    words: (best.Words || []).map(w => ({
      word: w.Word,
      score: Math.round(w.PronunciationAssessment?.AccuracyScore ?? 0),
    })),
  }
}
