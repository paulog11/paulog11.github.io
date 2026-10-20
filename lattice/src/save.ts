/**
 * CHŌME — keeping the ward across a reload.
 *
 * The chain IS the version: `createStore` reads the current version off the
 * migration chain's head, so declaring one number and shipping another is not
 * a bug that can be written down here. When the shape of a save changes, add a
 * rung — `parsed.version === N` with a fallback to `newGame()` is not a
 * migration policy, it is a delete.
 */
import { asEpochMillis } from '@latticekit/core';
import { browserStorage, createStore, migrations, scheduleFrom } from '@latticekit/persist';
import type { Recognize } from '@latticekit/persist';
import type { Loop } from '@latticekit/loop';

export interface Save1 {
  readonly version: 1;
  readonly coin: number;
  /** Flat triples of (lot x, lot y, kind index). Compact, and JSON-safe. */
  readonly lots: readonly number[];
}

/** A recognizer returns the value TYPED, or throws naming the field. Never a
 *  boolean — a boolean has already discarded the value that was wrong, so it
 *  cannot say which field it was. */
const isV1: Recognize<Save1> = (value) => {
  const v = value as { coin?: unknown; lots?: unknown };
  // `Number.isFinite` is the guard that matters: JSON turns Infinity and NaN
  // into `null` under a perfectly valid checksum, and they come back as NaN on
  // the next tick with nothing anywhere to explain it.
  if (typeof v.coin !== 'number' || !Number.isFinite(v.coin)) {
    throw new RangeError(`save.v1.coin: expected a finite number, got ${String(v.coin)}`);
  }
  if (!Array.isArray(v.lots)) {
    throw new RangeError(`save.v1.lots: expected an array, got ${String(v.lots)}`);
  }
  const lots: number[] = [];
  for (const n of v.lots as readonly unknown[]) {
    if (typeof n !== 'number' || !Number.isFinite(n)) {
      throw new RangeError(`save.v1.lots: expected finite numbers, got ${String(n)}`);
    }
    lots.push(Math.floor(n));
  }
  return { version: 1, coin: Math.max(0, v.coin), lots };
};

const CHAIN = migrations(1, isV1).seal();

export function openSave(loop: Loop, read: () => Save1) {
  const store = createStore({
    key: 'chome:ward',
    chain: CHAIN,
    adapter: browserStorage(),
    fresh: (): Save1 => ({ version: 1, coin: 150, lots: [] }),
    // Required, and it has no default on purpose.
    now: () => asEpochMillis(Date.now()),
  });

  // `open()` never throws, for any content whatsoever: every failure degrades
  // to a fresh ward and reports itself on the result.
  const opened = store.open();

  // `scheduleFrom(loop.real)`, never `loop.real.after`. The loop schedules in
  // SECONDS and returns a timer id; this package schedules in MILLISECONDS and
  // wants a cancel function — and cast through, it asks for a write every
  // 4,000 seconds while the status reports `ok` the whole time.
  //
  // `loop.real` rather than `loop.sim` because the schedule has to keep firing
  // in a hidden tab, which is precisely the moment before a tab is closed.
  const auto = store.autosave(read, { schedule: scheduleFrom(loop.real) });

  return { store, opened, auto };
}
