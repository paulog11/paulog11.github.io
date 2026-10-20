/**
 * CHŌME — where everything stands. Pure data and arithmetic; it imports
 * nothing but the hashes, and nothing in here knows that three.js or a canvas
 * exists. `node tools/check.mjs` asserts its invariants without a browser.
 *
 * A block is `PITCH` tiles across: the first two are street, the remaining
 * eight are four lots of 2×2. So "which lot is this tile?" is two divisions
 * and no data structure, and every lot in the ward has an integer address
 * whether anything stands on it or not.
 */
import { hash2, toUnit } from '@latticekit/core';

/** Tiles per axis. 160, not 64: at 64 the whole ward fits inside the viewport
 *  and the result is a diorama — a model of a place rather than a place. The
 *  inequality is `w ≤ 2H − 4h` on the projected diamond, and 64 satisfies it
 *  at exactly one camera position, which is a photograph. */
export const W = 160;

/** Block pitch: 2 tiles of street + 8 tiles of lots. */
export const PITCH = 10;

/** A lot is 2×2 tiles, and so is every building in the ward. */
export const LOT = 2;

/** Lots per axis, across the whole ward. */
export const LOTS = (W / PITCH) * 4;

/** The ward's identity. Everything that was here before the player is a pure
 *  function of this and a lot address — never of a sequential Rng, or panning
 *  away and back would hand back a different ward. */
export const SEED = 0x63686f6d;

/** Is this tile part of a street? */
export function isStreet(g: number): boolean {
  const t = Math.floor(g);
  return t - Math.floor(t / PITCH) * PITCH < 2;
}

/** The lot address along one axis, or -1 for a street or off the ward. */
export function lotOf(g: number): number {
  if (!Number.isFinite(g) || g < 0 || g >= W) return -1;
  const t = Math.floor(g);
  const b = Math.floor(t / PITCH);
  const m = t - b * PITCH;
  return m < 2 ? -1 : b * 4 + ((m - 2) >> 1);
}

/** The inverse: the tile a lot's near corner sits on. */
export function tileOf(lot: number): number {
  return Math.floor(lot / 4) * PITCH + 2 + (lot % 4) * LOT;
}

/** One key per lot, so the ward is one flat Map rather than a grid of grids. */
export function keyOf(lx: number, ly: number): number {
  return ly * LOTS + lx;
}

/** Was this lot already built on when the player arrived? Two in three were,
 *  so the ward opens dense and the gaps are scattered through it rather than
 *  fenced off at one end. */
export function neighbourAt(lx: number, ly: number): boolean {
  return toUnit(hash2(SEED, lx, ly)) > 0.47;
}

/** How tall that neighbour is — a second hash, so height and existence are
 *  independent and the skyline does not correlate with the gaps.
 *
 *  Four levels rather than six, and it is not a taste call: on a 2-tile
 *  footprint a six-storey mass is a pencil tower, and a ward of them reads as
 *  a forest rather than as a neighbourhood. Low-rise with the occasional
 *  taller block is what leaves the streets visible from this camera. */
export function neighbourLevel(lx: number, ly: number): number {
  return 1 + Math.floor(toUnit(hash2(SEED ^ 0x9e37, lx, ly)) * 4);
}

/** A building's own variant seed, so the same lot is always the same building. */
export function lotSeed(lx: number, ly: number): number {
  return hash2(SEED ^ 0x5a17, lx, ly);
}

/** The NEAR EDGE of street `a` along one axis. A street is the two tiles where
 *  `g % PITCH` is 0 or 1, so the drivable band is `[avenue(a), avenue(a) + 2)`
 *  and the two lanes sit at +`LANE_NEAR` and +`LANE_FAR` inside it.
 *
 *  This returned the street's *centre* once, and the far lane was then written
 *  as centre + 1.7 — which is `a·PITCH + 2.7`, a LOT tile. Half the ward's
 *  traffic drove through the buildings, invisible, and the only symptom was a
 *  frame that measured as static. */
export function avenue(a: number): number {
  return a * PITCH;
}

/** The two lanes, as offsets inside a street's two tiles. */
export const LANE_NEAR = 0.4;
export const LANE_FAR = 1.6;

/** How many avenues the ward has per axis. */
export const AVENUES = W / PITCH;
