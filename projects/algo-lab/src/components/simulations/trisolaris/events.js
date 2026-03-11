/**
 * Trisolaris event definitions — each describes a chapter from Liu Cixin's
 * "The Three-Body Problem". The setup() function returns initial positions
 * and velocities for the three suns and the planet Trisolaris.
 */
export const TRI_EVENTS = [
  {
    key: 'chaotic',
    era: 'Chaotic Era',
    name: 'Chaotic Era',
    desc: 'The three suns tear across the sky in unpredictable trajectories. Temperature swings from freezing to furnace. Civilization must dehydrate and store its people as dried husks in deep bunkers to survive.',
    overlayColor: 'rgba(180,60,20,0.06)',
    skyTop: '#1a0a02',
    stabilityText: 'UNSTABLE',
    tempBase: 800, tempVar: 600,
    setup: (cx, cy, sc) => ({
      suns: [
        { x: cx + sc*0.6,  y: cy - sc*0.5,  vx: -1.1, vy:  0.9, mass: 900, color: '#ffb347', name: 'Alpha' },
        { x: cx - sc*0.7,  y: cy + sc*0.3,  vx:  1.3, vy: -0.5, mass: 750, color: '#ff7c52', name: 'Beta'  },
        { x: cx + sc*0.1,  y: cy + sc*0.8,  vx:  0.2, vy: -1.4, mass: 820, color: '#ffd580', name: 'Gamma' },
      ],
      planet: { x: cx, y: cy + sc*0.15, vx: 2.2, vy: -1.0, mass: 0.001 }
    })
  },
  {
    key: 'stable',
    era: 'Stable Era',
    name: 'Stable Era',
    desc: 'Against all odds, the three suns settle into a near-periodic configuration. A single sun rises and sets predictably. Civilization emerges from the bunkers, plants crops, builds cities — knowing it cannot last.',
    overlayColor: 'rgba(100,180,255,0.04)',
    skyTop: '#020d1a',
    stabilityText: 'STABLE',
    tempBase: 320, tempVar: 30,
    setup: (cx, cy, sc) => ({
      suns: [
        { x: cx + sc*0.55,  y: cy,            vx:  0.0, vy:  1.6, mass: 800, color: '#ffcf77', name: 'Alpha' },
        { x: cx - sc*0.28,  y: cy - sc*0.45,  vx: -1.4, vy: -0.8, mass: 800, color: '#ff9955', name: 'Beta'  },
        { x: cx - sc*0.28,  y: cy + sc*0.45,  vx:  1.4, vy: -0.8, mass: 800, color: '#ffe0a0', name: 'Gamma' },
      ],
      planet: { x: cx + sc*0.9, y: cy, vx: 0.0, vy: 2.5, mass: 0.001 }
    })
  },
  {
    key: 'triSolarDay',
    era: 'Astronomical Event',
    name: 'Tri-Solar Day',
    desc: 'All three suns hang in the sky simultaneously. Shadows are cast in three directions at once. The surface temperature spikes — oceans boil, and the ground cracks. The civilization retreats underground.',
    overlayColor: 'rgba(255,200,80,0.08)',
    skyTop: '#1f1200',
    stabilityText: 'CRITICAL',
    tempBase: 1400, tempVar: 200,
    setup: (cx, cy, sc) => {
      const pOff = sc * 0.85
      return {
        suns: [
          { x: cx - pOff*0.6, y: cy - sc*0.5, vx:  0.6, vy:  1.2, mass: 850, color: '#fff176', name: 'Alpha' },
          { x: cx - pOff*0.8, y: cy,           vx:  0.8, vy:  0.0, mass: 850, color: '#ffb347', name: 'Beta'  },
          { x: cx - pOff*0.6, y: cy + sc*0.5,  vx:  0.6, vy: -1.2, mass: 850, color: '#ff8c42', name: 'Gamma' },
        ],
        planet: { x: cx + sc*0.3, y: cy, vx: 0.0, vy: 1.8, mass: 0.001 }
      }
    }
  },
  {
    key: 'syzygy',
    era: 'Astronomical Event',
    name: 'Tri-Solar Syzygy',
    desc: "The three suns align in a perfect line — a syzygy. Gravitational tides tear at Trisolaris. The aligned suns form a blazing chain across the sky. The gravitational resonance sends shockwaves through the planet's core.",
    overlayColor: 'rgba(255,100,20,0.1)',
    skyTop: '#200800',
    stabilityText: 'CATASTROPHIC',
    tempBase: 1800, tempVar: 100,
    setup: (cx, cy, sc) => ({
      suns: [
        { x: cx - sc*1.4, y: cy, vx:  0.0, vy:  1.8, mass: 900, color: '#fff0a0', name: 'Alpha' },
        { x: cx,          y: cy, vx:  0.0, vy: -0.5, mass: 900, color: '#ffb347', name: 'Beta'  },
        { x: cx + sc*1.4, y: cy, vx:  0.0, vy: -1.3, mass: 900, color: '#ff7c52', name: 'Gamma' },
      ],
      planet: { x: cx, y: cy + sc*0.7, vx: 2.0, vy: 0.0, mass: 0.001 }
    })
  },
  {
    key: 'flyingStars',
    era: 'Catastrophic Event',
    name: 'Three Flying Stars',
    desc: 'The three suns escape each other\'s gravity entirely, hurtling in different directions across the sky. Trisolaris is flung into the void. All hope of survival is lost — unless humanity can flee to the stars.',
    overlayColor: 'rgba(20,20,60,0.12)',
    skyTop: '#00010a',
    stabilityText: 'EJECTED',
    tempBase: -220, tempVar: 10,
    setup: (cx, cy, sc) => ({
      suns: [
        { x: cx,            y: cy,           vx:  3.5, vy: -2.0, mass: 900, color: '#ffcf77', name: 'Alpha' },
        { x: cx + sc*0.2,   y: cy + sc*0.1,  vx: -3.0, vy:  2.5, mass: 900, color: '#ff8855', name: 'Beta'  },
        { x: cx - sc*0.2,   y: cy + sc*0.1,  vx:  0.5, vy:  3.0, mass: 900, color: '#ffeebb', name: 'Gamma' },
      ],
      planet: { x: cx, y: cy + sc*0.4, vx: -1.5, vy: 1.0, mass: 0.001 }
    })
  }
]
