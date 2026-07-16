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
 * The "what an atom is supposed to become" ladder — the stages matter climbs
 * from raw quarks to living things. `breaksAt` in BB_OUTCOMES indexes into this.
 */
export const BUILD_CHAIN = ['Quarks', 'Protons', 'Nuclei', 'Atoms', 'Stars', 'Life']

/**
 * Outcome descriptions for each possible universe state.
 */
export const BB_OUTCOMES = {
  'life-permitting': {
    name: 'Life-Permitting Universe',
    desc: 'Constants are finely tuned. Gravity forms structures, atoms bind, stars ignite, and complex chemistry emerges. A universe capable of life.',
    eli5: 'Every dial is close enough to its natural setting. Gravity can pull matter together, the strong force can bind nuclei, and atoms can hold onto their electrons. Watch the dots: they clump step by step — quarks into protons, protons into nuclei, nuclei into atoms, atoms into stars. This is the one setup where the whole ladder holds all the way to life.',
    breaksAt: null,
    color: '#4ade80', borderColor: 'rgba(74,222,128,0.35)'
  },
  'big-crunch': {
    name: 'Big Crunch',
    desc: 'Gravity or dark energy is too strong. Expansion halts and reverses. All matter collapses back into a singularity within seconds.',
    eli5: 'Gravity (or dark energy pulling inward) is cranked way too high. Instead of the universe spreading out to cool and build things, it pulls itself back in like a rubber band snapping. Watch the dots: they rush together into a single crushing point in seconds — no time for stars or anything else to ever form.',
    breaksAt: 4,
    atomTag: 'gravity crushing everything inward',
    color: '#f87171', borderColor: 'rgba(248,113,113,0.35)'
  },
  'heat-death': {
    name: 'Heat Death / Eternal Void',
    desc: 'Expansion is too rapid or dark energy too high. Matter scatters before gravity can bind it. The universe thins into cold, structureless void.',
    eli5: "Expansion is cranked too far the other way — everything is flying apart faster than gravity can grab hold. Watch the dots: they scatter thinner and thinner, drifting past each other forever without ever bunching up. No clumps, no stars — just an empty, freezing void that goes on forever.",
    breaksAt: 4,
    atomTag: "expansion too fast — clumps can't form",
    color: '#60a5fa', borderColor: 'rgba(96,165,250,0.35)'
  },
  'no-atoms': {
    name: 'No Atoms',
    desc: 'Electromagnetic force is mistuned. Electrons cannot bind to nuclei — chemistry is impossible. Only free quarks and radiation exist.',
    eli5: 'The electromagnetic dial — the one that lets electrons stick to nuclei — is off. Without it, electrons can never settle into orbit around a nucleus. Watch the dots: nuclei and electrons keep bouncing past each other, never locking together. No atoms means no chemistry, no molecules, no anything built out of atoms.',
    breaksAt: 3,
    atomTag: "electrons can't bind to nuclei",
    color: '#fb923c', borderColor: 'rgba(251,146,60,0.35)'
  },
  'no-nuclei': {
    name: 'No Nuclei',
    desc: 'Strong force too weak. Quarks cannot bind into protons or neutrons. Only a plasma of free particles — no matter as we know it.',
    eli5: "The strong force glue that holds quarks together is too weak. Quarks need a tight grip to snap into protons and neutrons, and this grip just isn't strong enough. Watch the dots: they stay loose, drifting as a free quark plasma instead of clumping into particles. No protons or neutrons means the whole build-a-universe ladder stops at the very first rung.",
    breaksAt: 1,
    atomTag: 'strong force too weak to bind',
    color: '#e879f9', borderColor: 'rgba(232,121,249,0.35)'
  },
  'no-hydrogen': {
    name: 'All Hydrogen Fused',
    desc: 'Strong force too strong. All hydrogen fused immediately after the Bang. No long-lived stars, no water, no carbon — stellar engines die.',
    eli5: "The strong force glue is cranked too tight — the opposite problem. It grabs every proton so hard that all the hydrogen fuses into heavier stuff almost instantly, right after the Bang. Watch the dots: no plain hydrogen survives to fuel a star. Without hydrogen fuel, stars can't burn slow and steady for billions of years — no long-lived suns, no water, no carbon.",
    breaksAt: 4,
    atomTag: 'all hydrogen fused too soon',
    color: '#fbbf24', borderColor: 'rgba(251,191,36,0.35)'
  },
  'no-chemistry': {
    name: 'No Chemistry',
    desc: 'Proton/electron mass ratio is off. Atomic orbitals collapse or expand beyond bonding range. No molecules, no biology, no complexity.',
    eli5: "The proton is supposed to be about 1836 times heavier than the electron — that exact ratio is what lets electron orbitals sit at just the right distance to share with neighboring atoms. Nudge that ratio and the orbitals collapse in tight or balloon out wide. Watch the dots: atoms still form, but they never lock together into molecules. No molecules means no chemistry, no biology, no anything more complex than a lone atom.",
    breaksAt: 5,
    atomTag: 'mass ratio wrong — no bonds',
    color: '#f472b6', borderColor: 'rgba(244,114,182,0.35)'
  },
  'massless-chaos': {
    name: 'Massless Chaos',
    desc: 'Higgs or light-speed deviation prevents mass from forming. All particles travel at lightspeed — no bound structures, pure radiation.',
    eli5: 'The Higgs dial gives every particle its weight. You broke it — so nothing weighs anything anymore. Weightless particles can only fly at top speed forever; they can never slow down and stick together. Watch the dots: they will zip apart and never form a single clump. No clumps means no atoms, no stars, no planets — ever.',
    breaksAt: 1,
    atomTag: "no mass — can't stick",
    color: '#a78bfa', borderColor: 'rgba(167,139,250,0.35)'
  },
  'antimatter-dom': {
    name: 'Antimatter Universe',
    desc: 'Matter-antimatter balance tips the other way. Annihilation eliminates almost everything — a universe of pure photons and emptiness.',
    eli5: "Right after the Bang there was a tiny lopsided extra bit of matter over antimatter — that's the only reason any matter survived at all. Tip that balance the other way and antimatter wins instead. Watch the dots: every particle meets its antiparticle and they annihilate each other in a flash of light. Almost nothing is left to build with — just photons and empty space.",
    breaksAt: 1,
    atomTag: 'annihilated by antimatter',
    color: '#34d399', borderColor: 'rgba(52,211,153,0.35)'
  },
  'no-radiation': {
    name: 'Dark Frozen Universe',
    desc: 'Speed of light too low — radiation pressure vanishes. No stellar ignition, no photosynthesis, no heat transport. Everything freezes.',
    eli5: 'The speed of light is dialed down too low, and radiation pressure — the outward push of light — vanishes with it. Stars need that push to balance their own gravity and ignite. Watch the dots: nothing can spark into a star, and no light or heat pours out to warm anything nearby. The whole universe just sits there and freezes.',
    breaksAt: 4,
    atomTag: "no radiation pressure — can't ignite",
    color: '#94a3b8', borderColor: 'rgba(148,163,184,0.35)'
  }
}

/**
 * Epochs mark time windows in the Atom-view simulation as `bbTime` advances.
 * Each entry: [startTime, endTime, name, description, eli5].
 * The description explains what real-universe physics is being represented.
 * The eli5 explains what the dots are doing right now, in kid terms.
 */
export const EPOCHS = [
  [0,      0.002, 'Planck Epoch',              'First 10⁻⁴³ s. All four fundamental forces are unified and spacetime itself is ill-defined — quantum gravity rules.', "The dots don't even exist as separate things yet — space and time themselves are a blurry quantum foam. It's too early for anything you'd call a particle."],
  [0.002,  0.01,  'Grand Unification',         'Gravity separates from the other three forces. Particles are still massless and the universe is a seething energy bath.', 'The dots are pure energy, zipping around massless at the speed of light. Gravity has just split off from the other forces, but nothing has weight yet.'],
  [0.01,   0.025, 'Quark Epoch',               'Free quarks and gluons swim in a quark-gluon plasma — the universe is too hot for them to bind into protons or neutrons yet.', "The dots are quarks — the tiniest LEGO bricks that exist. It's still way too hot for them to snap together."],
  [0.025,  0.06,  'Hadron Epoch',              'Quarks confine into hadrons — protons, neutrons, and their antiparticles — as the universe cools below a few trillion kelvin.', 'The dots are snapping together now — quarks locking three at a time into protons and neutrons as things finally cool enough to hold.'],
  [0.06,   0.10,  'Lepton Epoch',              'Most hadrons annihilate with their antiparticles; leptons (electrons, neutrinos) dominate the remaining particle soup.', "Most of the proton-and-neutron dots just met their antimatter twins and vanished in flashes of light. What's left is mostly lightweight dots called electrons and neutrinos."],
  [0.10,   0.25,  'Big Bang Nucleosynthesis',  'Protons and neutrons fuse into the first light nuclei: hydrogen, helium, and trace lithium. The universe becomes transparent soon after.', 'The dots are fusing — protons and neutrons welding together into the first tiny nuclei: hydrogen, helium, a pinch of lithium. Light is about to start traveling freely for the first time.'],
  [0.25,   999,   'Structure Formation',       'Gravity draws matter into filaments and halos. Over millions of years, the first stars and galaxies ignite.', "The dots are drifting into gravity's grip, clumping into filaments and clouds. Given enough time, some of those clumps collapse and ignite into the first stars."],
]

/**
 * Celestial view operates on a post-nucleosynthesis timescale — gas collapsing
 * into stars, black holes forming, and planets condensing.
 */
export const CELESTIAL_EPOCH = {
  name: 'Cosmic Structure Formation',
  desc: 'Gas clouds collapse under gravity, ignite fusion to become stars, and forge heavier elements. Dense cores become black holes; rocky debris condenses into planets.',
}

/**
 * Planetary view zooms into a single young star after structure formation —
 * a protoplanetary disk where dust accretes into worlds.
 */
export const PLANETARY_EPOCH = {
  name: 'Planetary Formation',
  desc: 'A protoplanetary disk of dust circles a young star. Grains collide and stick, growing into planetesimals and protoplanets that sweep their orbital lanes clear — some settling in the habitable zone.',
}
