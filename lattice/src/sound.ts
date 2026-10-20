/**
 * CHŌME — the sound, which is nine numbers per noise and no files at all.
 *
 * Nothing comes out until a user gesture unlocks the audio: browsers refuse
 * otherwise, and this package installs no listener of its own on purpose, so
 * `unlock()` is called from our own tap handler.
 */
import { createAudio, validateSounds } from '@latticekit/audio';
import type { SoundDef } from '@latticekit/audio';

const SOUNDS = {
  /** A building going up: a low thump with a dusting of noise on top. */
  place: {
    bus: 'sfx', minGapMs: 60,
    layers: [
      { wave: 'triangle', hz: 196, toHz: 96, gain: 0.2, hold: 0.15, cutoff: 1100 },
      { wave: 'noise', hz: 0, gain: 0.09, hold: 0.06, cutoff: 2800 },
    ],
  },
  /** Refused. Short, low, and not a buzzer. */
  deny: {
    bus: 'ui', minGapMs: 140,
    layers: [{ wave: 'square', hz: 132, gain: 0.07, hold: 0.08, cutoff: 820 }],
  },
  /** Picking a different thing to build. */
  pick: {
    bus: 'ui', minGapMs: 40,
    layers: [{ wave: 'sine', hz: 1120, gain: 0.045, hold: 0.03, cutoff: 2400 }],
  },
  /** Dusk, and again at dawn — the ward changing shift. */
  chime: {
    bus: 'sfx', minGapMs: 400,
    layers: [
      { wave: 'sine', hz: 523, toHz: 659, gain: 0.1, hold: 0.5, cutoff: 3000 },
      { wave: 'sine', hz: 784, gain: 0.05, hold: 0.7, cutoff: 3200, delay: 0.08 },
    ],
  },
} satisfies Record<string, SoundDef>;

export const audio = createAudio({ sounds: SOUNDS });

/** Returns problems rather than throwing — a game must not refuse to start
 *  because a sound is slightly too loud. Asserted in the self-check. */
export const problems = validateSounds(SOUNDS);
