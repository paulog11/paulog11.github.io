/**
 * CHŌME — what stands on the ward, what it earns, and what survives a reload.
 *
 * Where things stand is `layout.ts`'s job and not this file's. This one owns
 * the ledger and the one rule the economy has: a rate may read a purchased
 * count or a banked total, and may never read a stock this graph produces.
 */
import { asEpochMillis } from '@latticekit/core';
import type { EpochMillis } from '@latticekit/core';
import {
  advance, buildFlow, costOfNext, createFlow, defineEconomy,
  elapsedSeconds, project, zeroStocks,
} from '@latticekit/sim';
import type { CostCurve, Ledger } from '@latticekit/sim';
import { keyOf, lotOf, lotSeed, neighbourAt, tileOf } from './layout.ts';

export type Kind = 'home' | 'shop' | 'park';
/** Field order, and it is the save's field order too. Never reordered. */
export const KINDS: readonly Kind[] = ['home', 'shop', 'park'];

export interface Placed {
  readonly kind: Kind;
  readonly lx: number;
  readonly ly: number;
  /** Near-corner tile, cached because every frame reads it. */
  readonly gx: number;
  readonly gy: number;
  readonly seed: number;
}

// ── the economy ──────────────────────────────────────────────────────────────

type Node = Kind | 'coin';
type Gate = 'night';

/** Banked multipliers. They move only when the player places something, which
 *  is what makes them legal inside `scale`: a rate must be piecewise constant
 *  in time, or the answer depends on how often it was asked. */
let homeMult = 1;
let shopMult = 1;

const ECO = defineEconomy<Node, Gate>({
  // The save's field order. Appending a node later keeps every old save's
  // fields where they were; reordering this line rewrites history.
  nodes: ['home', 'shop', 'park', 'coin'],
  gates: ['night'],
  edges: [
    // A source — no `from`. The ward's standing grant: what it pays before the
    // player owns anything at all. Written any other way this has to nominate
    // an arbitrary `from` and divide it back out, and the workaround reaches
    // the save file, because `nodes` IS the save's field order.
    { to: 'coin', per: 1.4 },
    { from: 'home', to: 'coin', per: 0.26, scale: () => homeMult },
    // `gate` MUST be named on the edge. Passing a gate ratio to `buildFlow`
    // while the edge is untagged means the ratio is never read — the dark pays
    // nothing while the HUD goes on advertising a bonus that does not exist.
    { from: 'shop', to: 'coin', per: 0.62, gate: 'night', scale: () => shopMult },
  ],
});

const COST: Record<Kind, CostCurve> = {
  home: { base: 45, growth: 1.075 },
  shop: { base: 130, growth: 1.105 },
  park: { base: 85, growth: 1.09 },
};

/** Shops trade better after dark. One number, committed at the boundary. */
const NIGHT_TRADE = 1.55;

const flow = createFlow(ECO);
const view = zeroStocks(ECO);

/** The game owns the calendar: one call site, greppable, and the only place a
 *  wall clock enters the ward. */
const epochNow = (): EpochMillis => asEpochMillis(Date.now());

export interface Ward {
  readonly lots: Map<number, Placed>;
  /** Coin, projected to this instant. Moves nothing. */
  coin(): number;
  /** Coin per second as the economy itself reports it — a diff of two
   *  projections rather than a second formula that could disagree with it. */
  rate(): number;
  population(): number;
  owned(kind: Kind): number;
  price(kind: Kind): number;
  /** Why this lot cannot be built on, or undefined if it can. */
  refuse(kind: Kind, gx: number, gy: number): string | undefined;
  place(kind: Kind, gx: number, gy: number): Placed | undefined;
  /** Day/night is a boundary: commit what is owed, then change the rate. */
  setNight(dark: boolean): void;
  night(): boolean;
  snapshot(): { coin: number; lots: number[] };
}

export function createWard(start?: { coin: number; lots: readonly number[] }): Ward {
  const lots = new Map<number, Placed>();
  let dark = false;

  let ledger: Ledger<Node> = {
    stocks: { home: 0, shop: 0, park: 0, coin: start?.coin ?? 150 },
    atMs: epochNow(),
  };

  /** How many of `kind` are on the eight lots around this one. */
  function near(p: Placed, kind: Kind): number {
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const q = lots.get(keyOf(p.lx + dx, p.ly + dy));
        if (q !== undefined && q.kind === kind) n++;
      }
    }
    return n;
  }

  /** Rebuild the banked multipliers from the ward as it now stands.
   *  ponytail: O(n) rescan per placement — fine to a few thousand lots. Make
   *  it incremental (touch only the eight neighbours of the new lot) if a ward
   *  ever gets big enough to feel it. */
  function rebank(): void {
    let homes = 0;
    let homesNearPark = 0;
    let shops = 0;
    let shopNeighbours = 0;
    for (const p of lots.values()) {
      if (p.kind === 'home') {
        homes++;
        if (near(p, 'park') > 0) homesNearPark++;
      } else if (p.kind === 'shop') {
        shops++;
        shopNeighbours += Math.min(4, near(p, 'home'));
      }
    }
    homeMult = 1 + 0.45 * (homes === 0 ? 0 : homesNearPark / homes);
    shopMult = 1 + 0.3 * (shops === 0 ? 0 : shopNeighbours / shops);
    buildFlow(ECO, ledger.stocks, { night: dark ? NIGHT_TRADE : 1 }, flow);
  }

  function commit(atMs: EpochMillis): void {
    ledger = advance(ECO, ledger, flow, elapsedSeconds(ledger, atMs), atMs);
  }

  function refuse(kind: Kind, gx: number, gy: number): string | undefined {
    const lx = lotOf(gx);
    const ly = lotOf(gy);
    if (lx < 0 || ly < 0) return 'That is the street.';
    if (neighbourAt(lx, ly)) return 'Somebody already lives there.';
    if (lots.has(keyOf(lx, ly))) return 'You have built there already.';
    project(ECO, ledger, flow, epochNow(), view);
    if (view.coin < costOfNext(COST[kind], ledger.stocks[kind])) return 'Not enough coin yet.';
    return undefined;
  }

  const ward: Ward = {
    lots,
    coin: () => {
      project(ECO, ledger, flow, epochNow(), view);
      return view.coin;
    },
    rate: () => {
      const t = epochNow();
      project(ECO, ledger, flow, t, view);
      const a = view.coin;
      project(ECO, ledger, flow, asEpochMillis(t + 1000), view);
      return view.coin - a;
    },
    population: () => Math.round(ledger.stocks.home * 4 * homeMult),
    owned: (kind) => ledger.stocks[kind],
    price: (kind) => costOfNext(COST[kind], ledger.stocks[kind]),
    refuse,
    place: (kind, gx, gy) => {
      if (refuse(kind, gx, gy) !== undefined) return undefined;
      const atMs = epochNow();
      commit(atMs);
      const price = costOfNext(COST[kind], ledger.stocks[kind]);
      // Compare exactly. No epsilon: `commit` just made the stocks true as of
      // this instant, and an epsilon here is a free building at the margin.
      if (ledger.stocks.coin < price) return undefined;
      const lx = lotOf(gx);
      const ly = lotOf(gy);
      const p: Placed = {
        kind, lx, ly, gx: tileOf(lx), gy: tileOf(ly), seed: lotSeed(lx, ly),
      };
      ledger = {
        stocks: {
          ...ledger.stocks,
          [kind]: ledger.stocks[kind] + 1,
          coin: ledger.stocks.coin - price,
        },
        atMs: ledger.atMs,
      };
      lots.set(keyOf(lx, ly), p);
      // The multipliers moved and `scale` is sampled once per `buildFlow`, so
      // this rebuild is not bookkeeping — it is the only thing that makes the
      // new building pay.
      rebank();
      return p;
    },
    setNight: (nowDark) => {
      if (nowDark === dark) return;
      commit(epochNow());
      dark = nowDark;
      buildFlow(ECO, ledger.stocks, { night: dark ? NIGHT_TRADE : 1 }, flow);
    },
    night: () => dark,
    snapshot: () => {
      const flat: number[] = [];
      for (const p of lots.values()) flat.push(p.lx, p.ly, KINDS.indexOf(p.kind));
      project(ECO, ledger, flow, epochNow(), view);
      return { coin: view.coin, lots: flat };
    },
  };

  // Restore. Through the Map directly rather than through `place`: a reload
  // must not re-charge the player for what they already bought.
  if (start !== undefined) {
    const counts: Record<Kind, number> = { home: 0, shop: 0, park: 0 };
    for (let i = 0; i + 2 < start.lots.length; i += 3) {
      const lx = start.lots[i] ?? -1;
      const ly = start.lots[i + 1] ?? -1;
      const kind = KINDS[start.lots[i + 2] ?? -1];
      if (kind === undefined || lotOf(tileOf(lx)) !== lx || lotOf(tileOf(ly)) !== ly) continue;
      lots.set(keyOf(lx, ly), {
        kind, lx, ly, gx: tileOf(lx), gy: tileOf(ly), seed: lotSeed(lx, ly),
      });
      counts[kind]++;
    }
    // No offline credit, deliberately: the clock restarts at `now`, so a closed
    // tab earns nothing. Crediting an absence correctly means the concave
    // offline warp and its resume-never-restart rule, and this is a builder
    // rather than an idle game.
    ledger = { stocks: { ...counts, coin: start.coin }, atMs: epochNow() };
  }
  rebank();

  return ward;
}
