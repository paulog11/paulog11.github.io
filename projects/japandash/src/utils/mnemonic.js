const TAG_COLORS = {
  radical: 'text-ai font-medium',
  kanji: 'text-beni font-medium',
  reading: 'text-matcha font-medium',
  ja: 'italic',
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Escapes the raw string first, then whitelist-injects only WaniKani's known
// mnemonic tags back in as styled spans — anything else stays inert text.
export function renderMnemonic(text) {
  if (!text) return ''
  let escaped = escapeHtml(text)
  for (const [tag, cls] of Object.entries(TAG_COLORS)) {
    escaped = escaped
      .replace(new RegExp(`&lt;${tag}&gt;`, 'g'), `<span class="${cls}">`)
      .replace(new RegExp(`&lt;/${tag}&gt;`, 'g'), '</span>')
  }
  return escaped
}
