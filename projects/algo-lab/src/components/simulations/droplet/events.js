/**
 * Droplet Attack event definitions — each describes a phase of the
 * devastating encounter from Liu Cixin's "The Dark Forest".
 * The Trisolaran probe ("Droplet") annihilates humanity's combined space fleet.
 *
 * setup(cx, cy, W, H) returns initial positions for fleet + droplet.
 */
export const DROPLET_EVENTS = [
  {
    key: 'assembly',
    phase: 'Phase I',
    name: 'Fleet Assembly',
    desc: 'Two thousand warships of the combined Earth fleet arrange into rectangular formation near the orbit of Jupiter. Commanders are confident — humanity has prepared for this moment for two centuries. The fleet gleams against the void.',
    overlayColor: 'rgba(60,100,180,0.04)',
    skyTop: '#050a18',
    statusText: 'CONFIDENT',
    dropletSpeed: 0,
    setup: (cx, cy, W, H) => ({
      droplet: null,
      cameraZoom: 1,
      cameraTarget: { x: cx, y: cy }
    })
  },
  {
    key: 'contact',
    phase: 'Phase II',
    name: 'First Contact',
    desc: 'The Trisolaran probe drifts into view — a perfect teardrop, barely three meters long, its surface a flawless mirror. Scientists marvel at its beauty. The fleet holds position, awaiting orders. No one suspects what comes next.',
    overlayColor: 'rgba(80,140,200,0.05)',
    skyTop: '#060c1a',
    statusText: 'CAUTIOUS',
    dropletSpeed: 0.8,
    setup: (cx, cy, W, H) => ({
      droplet: { x: cx + W * 0.48, y: cy, phase: 'approaching' },
      cameraZoom: 1,
      cameraTarget: { x: cx, y: cy }
    })
  },
  {
    key: 'firstStrike',
    phase: 'Phase III',
    name: 'The Attack Begins',
    desc: 'Without warning the Droplet accelerates to an impossible velocity and strikes the flagship. The hull vaporizes on contact. In the time it takes to register what happened, three more ships are gone. The fleet erupts into chaos.',
    overlayColor: 'rgba(200,80,40,0.06)',
    skyTop: '#0a0808',
    statusText: 'PANIC',
    dropletSpeed: 6,
    setup: (cx, cy, W, H) => ({
      droplet: { x: cx + W * 0.35, y: cy - H * 0.3, phase: 'attacking' },
      cameraZoom: 1.4,
      cameraTarget: { x: cx, y: cy }
    })
  },
  {
    key: 'destruction',
    phase: 'Phase IV',
    name: 'Systematic Destruction',
    desc: 'The Droplet carves through the formation with surgical precision, sweeping row by row in a relentless geometric pattern. Each ship is a brief flash of light, then nothing. The probe moves too fast to track, too small to target. Humanity\'s greatest fleet is being erased.',
    overlayColor: 'rgba(255,100,30,0.08)',
    skyTop: '#0f0604',
    statusText: 'DEVASTATION',
    dropletSpeed: 12,
    setup: (cx, cy, W, H) => ({
      droplet: { x: cx - W * 0.3, y: cy - H * 0.25, phase: 'attacking' },
      cameraZoom: 1.0,
      cameraTarget: { x: cx, y: cy }
    })
  },
  {
    key: 'aftermath',
    phase: 'Phase V',
    name: 'Dark Forest',
    desc: 'Silence. Where two thousand warships once held formation, only expanding clouds of debris drift through space. The Droplet exits the field unscathed, its mirror surface still perfect. Humanity learns the truth of the cosmos — the universe is a dark forest.',
    overlayColor: 'rgba(10,10,30,0.12)',
    skyTop: '#020206',
    statusText: 'SILENCE',
    dropletSpeed: 0.3,
    setup: (cx, cy, W, H) => ({
      droplet: { x: cx, y: cy, phase: 'idle' },
      cameraZoom: 0.8,
      cameraTarget: { x: cx, y: cy }
    })
  }
]
