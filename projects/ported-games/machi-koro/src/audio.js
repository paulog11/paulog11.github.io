// ── SOUND ENGINE (Web Audio API — no external files) ──────────────────────────
const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let _muted = false;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function getMaster() {
    const c = getCtx();
    if (!masterGain) {
      masterGain = c.createGain();
      masterGain.gain.value = 0.65;
      masterGain.connect(c.destination);
    }
    return masterGain;
  }

  function osc(type, freq, startTime, duration, gainVal = 0.35, c = null) {
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
  }

  function sweep(type, freqStart, freqEnd, startTime, duration, gainVal = 0.3) {
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

  function noise(startTime, duration, gainVal = 0.12, filterFreq = 1500) {
    const c = getCtx();
    const bufSize = Math.floor(c.sampleRate * duration);
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
    // Dice tumble + settle
    diceRoll() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sawtooth', 350, 120, t, 0.35, 0.25);
      noise(t, 0.2, 0.15, 800);
      noise(t + 0.15, 0.15, 0.1, 1200);
      osc('sine', 160, t + 0.28, 0.15, 0.2, c);
    },

    // Small coin gain — ascending ping
    coinGain() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 523, t, 0.08, 0.28, c);
      osc('sine', 659, t + 0.05, 0.09, 0.22, c);
      osc('sine', 784, t + 0.10, 0.10, 0.18, c);
    },

    // Large coin gain (5+) — richer fanfare
    coinBig() {
      const c = getCtx(); const t = c.currentTime;
      [523, 659, 784, 1047].forEach((f, i) => {
        osc('sine',     f, t + i * 0.06, 0.22, 0.3 - i * 0.04, c);
        osc('triangle', f * 1.5, t + i * 0.06, 0.15, 0.1, c);
      });
    },

    // Coins taken from you — descending figure
    coinLoss() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sine', 500, 220, t, 0.28, 0.2);
      osc('sine', 220, t + 0.2, 0.15, 0.15, c);
    },

    // Landmark built — triumphant stab
    landmarkBuy() {
      const c = getCtx(); const t = c.currentTime;
      [392, 523, 659, 784].forEach((f, i) => {
        osc('sine', f, t + i * 0.07, 0.4 - i * 0.05, 0.35, c);
        osc('triangle', f * 2, t + i * 0.07, 0.2, 0.12, c);
      });
      sweep('sine', 300, 600, t + 0.1, 0.4, 0.1);
    },

    // Establishment bought — short clean ping
    establishmentBuy() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 880, t, 0.06, 0.3, c);
      osc('sine', 1108, t + 0.04, 0.08, 0.2, c);
    },

    // TV Station fires — quirky ascending
    tvStation() {
      const c = getCtx(); const t = c.currentTime;
      sweep('square', 200, 600, t, 0.2, 0.2);
      noise(t + 0.05, 0.1, 0.1, 1000);
      osc('sine', 880, t + 0.18, 0.15, 0.25, c);
    },

    // Business Center swap — two crossing sweeps
    businessCenter() {
      const c = getCtx(); const t = c.currentTime;
      sweep('triangle', 300, 700, t, 0.3, 0.2);
      sweep('triangle', 700, 300, t + 0.05, 0.3, 0.15);
    },

    // Stadium — deep thud per player
    stadium() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sawtooth', 250, 60, t, 0.35, 0.3);
      noise(t, 0.15, 0.15, 400);
      osc('sine', 120, t + 0.1, 0.3, 0.2, c);
    },

    // Radio Tower reroll — quick sweep
    reroll() {
      const c = getCtx(); const t = c.currentTime;
      sweep('sine', 600, 300, t, 0.15, 0.2);
      sweep('sine', 300, 700, t + 0.12, 0.2, 0.15);
    },

    // Win — ascending fanfare matching flip7
    win() {
      const c = getCtx(); const t = c.currentTime;
      [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => {
        osc('sine',     f, t + i * 0.08, 0.55 - i * 0.03, 0.35, c);
        osc('triangle', f * 2, t + i * 0.08, 0.3, 0.12, c);
      });
      [523, 659, 784, 1047].forEach((f, i) => {
        osc('sine', f, t + 0.65, 0.9, 0.3 - i * 0.05, c);
      });
    },

    // UI click — subtle tick
    click() {
      const c = getCtx(); const t = c.currentTime;
      osc('sine', 440, t, 0.04, 0.18, c);
    },
  };

  return {
    diceRoll()        { try { sounds.diceRoll(); }        catch(e) {} },
    coinGain()        { try { sounds.coinGain(); }        catch(e) {} },
    coinBig()         { try { sounds.coinBig(); }         catch(e) {} },
    coinLoss()        { try { sounds.coinLoss(); }        catch(e) {} },
    landmarkBuy()     { try { sounds.landmarkBuy(); }     catch(e) {} },
    establishmentBuy(){ try { sounds.establishmentBuy(); }catch(e) {} },
    tvStation()       { try { sounds.tvStation(); }       catch(e) {} },
    businessCenter()  { try { sounds.businessCenter(); }  catch(e) {} },
    stadium()         { try { sounds.stadium(); }         catch(e) {} },
    reroll()          { try { sounds.reroll(); }          catch(e) {} },
    win()             { try { sounds.win(); }             catch(e) {} },
    click()           { try { sounds.click(); }           catch(e) {} },
    setMuted(val) {
      _muted = val;
      const m = getMaster();
      m.gain.value = val ? 0 : 0.65;
    },
    get muted() { return _muted; },
  };
})();

export const audio = AudioEngine;
