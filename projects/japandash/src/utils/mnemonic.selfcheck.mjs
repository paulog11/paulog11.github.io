// Standalone check for renderMnemonic — not imported by app code, run with:
//   node src/utils/mnemonic.selfcheck.mjs
import { renderMnemonic } from './mnemonic.js'

const assert = (cond, msg) => { if (!cond) throw new Error(`FAIL: ${msg}`) }

assert(
  renderMnemonic('<radical>ground</radical> plus water') ===
  '<span class="text-ai font-medium">ground</span> plus water',
  'radical tag renders as ai span'
)
assert(
  renderMnemonic('The <kanji>water</kanji> kanji') ===
  'The <span class="text-beni font-medium">water</span> kanji',
  'kanji tag renders as beni span'
)
assert(
  renderMnemonic('sounds like <reading>sui</reading>') ===
  'sounds like <span class="text-matcha font-medium">sui</span>',
  'reading tag renders as matcha span'
)
assert(
  renderMnemonic('5 < 10 and 10 > 5') === '5 &lt; 10 and 10 &gt; 5',
  'stray angle brackets are escaped, not left as raw HTML'
)
assert(
  renderMnemonic('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;',
  'unknown tags are escaped away, never rendered as elements'
)
assert(renderMnemonic(null) === '' && renderMnemonic('') === '', 'null/empty input returns empty string')

console.log('mnemonic.selfcheck.mjs passed')
