// ── SOUND ENGINE (Web Audio API — no external files) ──────────────────────────
const Audio = (() => {
  let ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Master gain so we can mute globally
  let masterGain = null;
  function getMaster() {
    const c = getCtx();
    if (!masterGain) {
      masterGain = c.createGain();
      masterGain.gain.value = 0.7;
      masterGain.connect(c.destination);
    }
    return masterGain;
  }

  function osc(type, freq, startTime, duration, gainVal = 0.4, c = null) {
    c = c || getCtx();
    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    g.connect(getMaster());
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, startTime);
    o.connect(g);
    o.start(startTime);
    o.stop(startTime + duration + 0.01);
    return { osc: o, gain: g };
  }

  function sweep(type, freqStart, freqEnd, startTime, duration, gainVal = 0.35) {
    const c = getCtx();
    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    g.connect(getMaster());
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freqStart, startTime);
    o.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
    o.connect(g);
    o.start(startTime);
    o.stop(startTime + duration + 0.01);
  }

  function noise(startTime, duration, gainVal = 0.15, filterFreq = 2000) {
    const c = getCtx();
    const bufSize = c.sampleRate * duration;
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const filt = c.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = filterFreq;
    filt.Q.value = 1.5;
    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    src.connect(filt);
    filt.connect(g);
    g.connect(getMaster());
    src.start(startTime);
    src.stop(startTime + duration + 0.01);
  }

  const sounds = {
    // Crisp card whoosh + thud when flipping
    cardFlip() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sine', 800, 300, t, 0.12, 0.2);
      noise(t + 0.05, 0.08, 0.08, 1800);
      osc('sine', 180, t + 0.1, 0.12, 0.15, c);
    },

    // Satisfying "ding" for a clean number draw
    draw() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 523, t, 0.06, 0.3, c);
      osc('sine', 659, t + 0.03, 0.08, 0.2, c);
    },

    // High-value card (8-12) — slightly richer tone
    drawHigh() {
      const c = getCtx(); const t = c.currentTime;
      osc('triangle', 440, t, 0.05, 0.35, c);
      osc('sine',     660, t + 0.02, 0.06, 0.25, c);
      osc('sine',     880, t + 0.04, 0.07, 0.15, c);
    },

    // Stop voluntarily — gentle resolved chord
    stop() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 392, t,       0.15, 0.3, c);
      osc('sine', 523, t + 0.05, 0.15, 0.25, c);
      osc('sine', 659, t + 0.10, 0.15, 0.2, c);
    },

    // Bust — descending dissonant sweep + buzz
    bust() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sawtooth', 400, 80, t, 0.4, 0.3);
      sweep('square',   350, 60, t + 0.03, 0.35, 0.15);
      noise(t, 0.15, 0.12, 400);
    },

    // Freeze — icy shimmer
    freeze() {
      const c = getCtx(); const t = c.currentTime;
      [1047, 1319, 1568, 2093].forEach((f, i) => {
        osc('sine', f, t + i * 0.06, 0.25, 0.18, c);
      });
      sweep('sine', 2200, 800, t + 0.1, 0.4, 0.1);
    },

    // Skip frozen turn — short ice-crack click
    skipFrozen() {
      const c = getCtx(); const t = c.currentTime;
      osc('triangle', 1200, t, 0.05, 0.25, c);
      osc('sine',      600, t + 0.04, 0.06, 0.15, c);
    },

    // Flip Three — rapid triple thump
    flipThree() {
      const c = getCtx(); const t = c.currentTime;
      [0, 0.1, 0.2].forEach(delay => {
        sweep('triangle', 300, 150, t + delay, 0.12, 0.3);
        noise(t + delay, 0.08, 0.1, 600);
      });
    },

    // Score modifier — coin-like jingle
    modifier() {
      const c = getCtx(); const t = c.currentTime;
      [1047, 1319, 1568].forEach((f, i) => {
        osc('sine', f, t + i * 0.07, 0.18, 0.22, c);
      });
    },

    // x2 modifier — bigger fanfare
    modifierX2() {
      const c = getCtx(); const t = c.currentTime;
      [523, 659, 784, 1047].forEach((f, i) => {
        osc('sine', f, t + i * 0.06, 0.22, 0.28, c);
      });
      sweep('triangle', 200, 400, t + 0.1, 0.3, 0.15);
    },

    // Second Chance — magical sparkle
    secondChance() {
      const c = getCtx(); const t = c.currentTime;
      [880, 1108, 1320, 1760, 2217].forEach((f, i) => {
        osc('sine', f, t + i * 0.05, 0.2, 0.2, c);
      });
      sweep('sine', 400, 1600, t, 0.35, 0.1);
    },

    // Second Chance triggered (saved from bust) — relieved ascending
    secondChanceSaved() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sine', 200, 600, t, 0.25, 0.25);
      osc('sine', 880, t + 0.2, 0.25, 0.3, c);
      osc('sine', 1047, t + 0.35, 0.25, 0.25, c);
    },

    // Flip 7 achieved — triumphant fanfare
    flip7() {
      const c = getCtx(); const t = c.currentTime;
      // Rising arpeggio
      [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => {
        osc('sine',     f, t + i * 0.07, 0.5 - i * 0.03, 0.35, c);
        osc('triangle', f * 2, t + i * 0.07, 0.3, 0.15, c);
      });
      // Big chord at the top
      [523, 659, 784, 1047].forEach((f, i) => {
        osc('sine', f, t + 0.55, 0.8, 0.3 - i * 0.05, c);
      });
    },

    // Round end — gentle resolution
    roundEnd() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 392, t, 0.3, 0.3, c);
      osc('sine', 494, t + 0.15, 0.3, 0.25, c);
      osc('sine', 523, t + 0.3, 0.5, 0.3, c);
    },

    // Game over — victory fanfare
    gameOver() {
      const c = getCtx(); const t = c.currentTime;
      const melody = [523,523,523,523,415,466,523];
      melody.forEach((f, i) => {
        const dur = i === melody.length - 1 ? 0.8 : 0.18;
        osc('sine',     f, t + i * 0.22, dur, 0.4, c);
        osc('triangle', f * 2, t + i * 0.22, dur * 0.7, 0.15, c);
      });
    },

    // UI click — subtle tick
    click() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 440, t, 0.04, 0.2, c);
    },
  };

  return {
    play(name, ...args) {
      try { sounds[name] && sounds[name](...args); } catch(e) {}
    },
    get muted() { return masterGain ? masterGain.gain.value < 0.01 : false; },
    toggleMute() {
      const m = getMaster();
      m.gain.value = m.gain.value > 0.01 ? 0 : 0.7;
    },
  };
})();

export default Audio;
