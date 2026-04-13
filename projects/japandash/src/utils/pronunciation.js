export function toHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
}

export function compareReading(expected, heard) {
  const exp = toHiragana(expected).split('')
  const hrd = toHiragana(heard).split('')
  const len = Math.max(exp.length, hrd.length)
  const breakdown = []
  for (let i = 0; i < len; i++) {
    breakdown.push({ expected: exp[i] ?? '', heard: hrd[i] ?? '', match: exp[i] === hrd[i] })
  }
  const score = Math.round((breakdown.filter(b => b.match).length / len) * 100)
  return { score, breakdown }
}
