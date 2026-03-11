/**
 * Physical constants for the Big Bang fine-tuning simulation.
 * Each constant has a nominal value (slider = 0) and a range of ±2.
 * The effect() function returns the universe outcome if this constant
 * is tuned too far from nominal, or null if it's still within tolerance.
 */
export const BB_CONSTANTS = [
  {
    id: 'G', name: 'Gravitational Constant', symbol: 'G',
    desc: 'Strength of gravity between all masses.',
    effect: v => {
      if (v > 1.2)  return { outcome: 'big-crunch',  weight: v - 1.2 }
      if (v < -1.2) return { outcome: 'heat-death',  weight: -v - 1.2 }
      return null
    }
  },
  {
    id: 'alpha', name: 'Electromagnetic Force', symbol: 'α',
    desc: 'Fine structure constant — governs electron-photon coupling.',
    effect: v => {
      if (Math.abs(v) > 1.0) return { outcome: 'no-atoms', weight: Math.abs(v) - 1.0 }
      return null
    }
  },
  {
    id: 'alphaS', name: 'Strong Nuclear Force', symbol: 'αs',
    desc: 'Binds quarks into protons and neutrons.',
    effect: v => {
      if (v > 0.9)  return { outcome: 'no-hydrogen', weight: v - 0.9 }
      if (v < -0.9) return { outcome: 'no-nuclei',   weight: -v - 0.9 }
      return null
    }
  },
  {
    id: 'lambda', name: 'Cosmological Constant', symbol: 'Λ',
    desc: 'Dark energy density — drives accelerating expansion.',
    effect: v => {
      if (v > 1.0)  return { outcome: 'heat-death',  weight: v - 1.0 }
      if (v < -1.0) return { outcome: 'big-crunch',  weight: -v - 1.0 }
      return null
    }
  },
  {
    id: 'higgs', name: 'Higgs Coupling', symbol: 'yₕ',
    desc: 'Determines particle masses via the Higgs field.',
    effect: v => {
      if (Math.abs(v) > 1.2) return { outcome: 'massless-chaos', weight: Math.abs(v) - 1.2 }
      return null
    }
  },
  {
    id: 'H0', name: 'Expansion Rate (H₀)', symbol: 'H₀',
    desc: 'Hubble constant — initial rate of cosmic expansion.',
    effect: v => {
      if (v > 1.3)  return { outcome: 'heat-death',  weight: v - 1.3 }
      if (v < -1.3) return { outcome: 'big-crunch',  weight: -v - 1.3 }
      return null
    }
  },
  {
    id: 'eta', name: 'Baryon-Photon Ratio', symbol: 'η',
    desc: 'Matter-antimatter asymmetry after the Big Bang.',
    effect: v => {
      if (v < -1.0) return { outcome: 'antimatter-dom', weight: -v - 1.0 }
      if (v > 1.5)  return { outcome: 'no-atoms',       weight: v - 1.5 }
      return null
    }
  },
  {
    id: 'mpMe', name: 'Proton/Electron Mass Ratio', symbol: 'mₚ/mₑ',
    desc: 'Ratio of proton to electron mass (nominally ~1836).',
    effect: v => {
      if (Math.abs(v) > 1.0) return { outcome: 'no-chemistry', weight: Math.abs(v) - 1.0 }
      return null
    }
  },
  {
    id: 'omegaL', name: 'Dark Energy Density', symbol: 'Ω_Λ',
    desc: "Fraction of the universe's energy in dark energy.",
    effect: v => {
      if (v > 1.2)  return { outcome: 'heat-death',  weight: v - 1.2 }
      if (v < -1.2) return { outcome: 'big-crunch',  weight: -v - 1.2 }
      return null
    }
  },
  {
    id: 'c', name: 'Speed of Light', symbol: 'c',
    desc: 'Ultimate speed limit — affects causality and radiation pressure.',
    effect: v => {
      if (v < -1.0) return { outcome: 'no-radiation',   weight: -v - 1.0 }
      if (v > 1.5)  return { outcome: 'massless-chaos', weight: v - 1.5 }
      return null
    }
  }
]

/**
 * Outcome descriptions for each possible universe state.
 */
export const BB_OUTCOMES = {
  'life-permitting': {
    name: 'Life-Permitting Universe',
    desc: 'Constants are finely tuned. Gravity forms structures, atoms bind, stars ignite, and complex chemistry emerges. A universe capable of life.',
    color: '#4ade80', borderColor: 'rgba(74,222,128,0.35)'
  },
  'big-crunch': {
    name: 'Big Crunch',
    desc: 'Gravity or dark energy is too strong. Expansion halts and reverses. All matter collapses back into a singularity within seconds.',
    color: '#f87171', borderColor: 'rgba(248,113,113,0.35)'
  },
  'heat-death': {
    name: 'Heat Death / Eternal Void',
    desc: 'Expansion is too rapid or dark energy too high. Matter scatters before gravity can bind it. The universe thins into cold, structureless void.',
    color: '#60a5fa', borderColor: 'rgba(96,165,250,0.35)'
  },
  'no-atoms': {
    name: 'No Atoms',
    desc: 'Electromagnetic force is mistuned. Electrons cannot bind to nuclei — chemistry is impossible. Only free quarks and radiation exist.',
    color: '#fb923c', borderColor: 'rgba(251,146,60,0.35)'
  },
  'no-nuclei': {
    name: 'No Nuclei',
    desc: 'Strong force too weak. Quarks cannot bind into protons or neutrons. Only a plasma of free particles — no matter as we know it.',
    color: '#e879f9', borderColor: 'rgba(232,121,249,0.35)'
  },
  'no-hydrogen': {
    name: 'All Hydrogen Fused',
    desc: 'Strong force too strong. All hydrogen fused immediately after the Bang. No long-lived stars, no water, no carbon — stellar engines die.',
    color: '#fbbf24', borderColor: 'rgba(251,191,36,0.35)'
  },
  'no-chemistry': {
    name: 'No Chemistry',
    desc: 'Proton/electron mass ratio is off. Atomic orbitals collapse or expand beyond bonding range. No molecules, no biology, no complexity.',
    color: '#f472b6', borderColor: 'rgba(244,114,182,0.35)'
  },
  'massless-chaos': {
    name: 'Massless Chaos',
    desc: 'Higgs or light-speed deviation prevents mass from forming. All particles travel at lightspeed — no bound structures, pure radiation.',
    color: '#a78bfa', borderColor: 'rgba(167,139,250,0.35)'
  },
  'antimatter-dom': {
    name: 'Antimatter Universe',
    desc: 'Matter-antimatter balance tips the other way. Annihilation eliminates almost everything — a universe of pure photons and emptiness.',
    color: '#34d399', borderColor: 'rgba(52,211,153,0.35)'
  },
  'no-radiation': {
    name: 'Dark Frozen Universe',
    desc: 'Speed of light too low — radiation pressure vanishes. No stellar ignition, no photosynthesis, no heat transport. Everything freezes.',
    color: '#94a3b8', borderColor: 'rgba(148,163,184,0.35)'
  }
}

export const EPOCHS = [
  [0,      0.002, 'Planck Epoch'],
  [0.002,  0.01,  'Grand Unification'],
  [0.01,   0.025, 'Quark Epoch'],
  [0.025,  0.06,  'Hadron Epoch'],
  [0.06,   0.10,  'Lepton Epoch'],
  [0.10,   0.25,  'Big Bang Nucleosynthesis'],
  [0.25,   999,   'Structure Formation'],
]
