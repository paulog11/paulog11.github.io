// Corner flourish — top-left orientation; mirror with scale-x-[-1] / scale-y-[-1] for other corners.
export const CORNER_FLOURISH =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <g fill="none" stroke="#C9A227" stroke-width="0.9" opacity="0.55">
      <!-- Horizontal arm -->
      <line x1="4" y1="4" x2="22" y2="4"/>
      <!-- Vertical arm -->
      <line x1="4" y1="4" x2="4" y2="22"/>
      <!-- Corner diamond pip -->
      <rect x="2.5" y="2.5" width="3" height="3" transform="rotate(45 4 4)" fill="#C9A227" opacity="0.7"/>
      <!-- Curl along horizontal arm -->
      <path d="M10,4 Q14,4 14,8 Q14,11 10,11 Q8,11 8,9" stroke-width="0.8"/>
      <!-- End pip on horizontal -->
      <circle cx="22" cy="4" r="1" fill="#C9A227" opacity="0.5"/>
      <!-- End pip on vertical -->
      <circle cx="4" cy="22" r="1" fill="#C9A227" opacity="0.5"/>
    </g>
  </svg>`

// Dual-line gilded frame — two nested rounded rects + 4 midpoint diamond pips.
export const GILT_FRAME =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 240" width="100%" height="100%" preserveAspectRatio="none">
    <g fill="none">
      <!-- Outer frame line -->
      <rect x="5" y="5" width="150" height="230" rx="9" ry="9"
            stroke="#C9A227" stroke-width="1" opacity="0.30"/>
      <!-- Inner frame line -->
      <rect x="9" y="9" width="142" height="222" rx="6" ry="6"
            stroke="#C9A227" stroke-width="0.5" opacity="0.18"/>
      <!-- Midpoint diamond pips — top, bottom, left, right -->
      <rect x="78" y="3" width="4" height="4" transform="rotate(45 80 5)"  fill="#C9A227" opacity="0.35"/>
      <rect x="78" y="233" width="4" height="4" transform="rotate(45 80 235)" fill="#C9A227" opacity="0.35"/>
      <rect x="3"  y="118" width="4" height="4" transform="rotate(45 5 120)"  fill="#C9A227" opacity="0.35"/>
      <rect x="153" y="118" width="4" height="4" transform="rotate(45 155 120)" fill="#C9A227" opacity="0.35"/>
    </g>
  </svg>`

// Wax-seal ring — sits behind the cost number; crimson fill, gold rim.
export const WAX_SEAL =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <!-- Seal body -->
    <circle cx="14" cy="14" r="12" fill="#4A0A0A" opacity="0.85"/>
    <!-- Gold rim -->
    <circle cx="14" cy="14" r="12" fill="none" stroke="#C9A227" stroke-width="1.2" opacity="0.70"/>
    <!-- Inner rim hair-line -->
    <circle cx="14" cy="14" r="9.5" fill="none" stroke="#C9A227" stroke-width="0.5" opacity="0.30"/>
  </svg>`

// Gondolin tower — slim white tower spire silhouette, Free Peoples motif.
export const GONDOLIN_TOWER =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 120" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
    <g fill="#C9A227" opacity="0.9">
      <!-- Main tower shaft -->
      <rect x="32" y="40" width="16" height="70"/>
      <!-- Tower top battlements -->
      <rect x="28" y="32" width="24" height="12"/>
      <rect x="26" y="28" width="6" height="8"/>
      <rect x="48" y="28" width="6" height="8"/>
      <!-- Spire -->
      <polygon points="40,0 44,30 36,30"/>
      <!-- Window slits -->
      <rect x="37" y="60" width="6" height="10" fill="#1a1209"/>
      <rect x="37" y="85" width="6" height="10" fill="#1a1209"/>
      <!-- Base step -->
      <rect x="24" y="108" width="32" height="4"/>
      <rect x="20" y="112" width="40" height="4"/>
    </g>
  </svg>`

// Angband peaks — three jagged volcanic peaks silhouette, Morgoth motif.
export const ANGBAND_PEAKS =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
    <g fill="#9B2020" opacity="0.9">
      <!-- Left peak -->
      <polygon points="10,100 36,20 52,100"/>
      <!-- Centre peak (tallest) -->
      <polygon points="38,100 60,0 82,100"/>
      <!-- Right peak -->
      <polygon points="68,100 84,22 110,100"/>
      <!-- Dark crevice lines -->
      <polygon points="42,100 60,20 62,100" fill="#4A0A0A" opacity="0.5"/>
    </g>
  </svg>`

// Heraldic banner ribbon — decorative banner wrapping for HP bars.
export const BANNER_FRAME =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 18" width="100%" height="100%" preserveAspectRatio="none">
    <g fill="none">
      <!-- Banner body gradient approximation -->
      <rect x="0" y="2" width="142" height="14" rx="2" ry="2"
            fill="#3d2f14" opacity="0.45"/>
      <!-- Top edge line -->
      <line x1="0" y1="2" x2="142" y2="2" stroke="#C9A227" stroke-width="0.6" opacity="0.30"/>
      <!-- Bottom edge line -->
      <line x1="0" y1="16" x2="142" y2="16" stroke="#C9A227" stroke-width="0.6" opacity="0.30"/>
      <!-- Left ribbon tail -->
      <path d="M0,2 L0,16 L-6,9 Z" fill="#3d2f14" opacity="0.45"/>
      <!-- Right ribbon tail -->
      <path d="M142,2 L142,16 L148,9 Z" fill="#3d2f14" opacity="0.45"/>
    </g>
  </svg>`

// Embossed glyph plate — small rounded rect background for ⚔ / ◈ / ✦ stat pips.
export const STAT_PLATE =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 18" width="100%" height="100%" preserveAspectRatio="none">
    <rect x="0.5" y="0.5" width="35" height="17" rx="3" ry="3"
          fill="currentColor" fill-opacity="0.10"
          stroke="currentColor" stroke-width="0.6" stroke-opacity="0.30"/>
  </svg>`
