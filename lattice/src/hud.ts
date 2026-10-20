/**
 * CHŌME — the readout and the shelf of things to build.
 *
 * Every number here is written on UPDATE, never on render. A HUD updated in
 * the render callback freezes in a backgrounded tab while the canvas keeps
 * showing its last painted frame, so the game looks alive with prices and
 * affordability marks that stopped twenty minutes ago.
 *
 * The overlay root is `pointer-events: none` inline and interactivity is
 * granted per node, so a tap that is not on a button reaches the ward.
 */
import { fmtCompact } from '@latticekit/core';
import type { Loop } from '@latticekit/loop';
import { createOverlay, el, interactive, setText, toasts } from '@latticekit/ui';
import type { Overlay } from '@latticekit/ui';
import { KINDS } from './city.ts';
import type { Kind } from './city.ts';

export interface HudModel {
  readonly coin: number;
  readonly rate: number;
  readonly pop: number;
  readonly night: boolean;
  readonly selected: Kind;
  readonly price: (kind: Kind) => number;
  readonly affordable: (kind: Kind) => boolean;
  readonly owned: (kind: Kind) => number;
}

const LABEL: Record<Kind, string> = { home: 'Townhouse', shop: 'Shop', park: 'Pocket park' };
const WHY: Record<Kind, string> = {
  home: 'Pays more beside a park',
  shop: 'Pays more beside homes, and better after dark',
  park: 'Earns nothing. Makes every home near it earn more',
};

export interface Hud {
  readonly ui: Overlay;
  say(key: string, text: string, kind?: 'good' | 'bad'): void;
  destroy(): void;
}

export function createHud(loop: Loop, read: () => HudModel, onPick: (kind: Kind) => void): Hud {
  // The SAME clock the loop runs on. `loop.realTime` is seconds and
  // `createOverlay` wants milliseconds; two clocks in one HUD is the bug where
  // a poll and a settle disagree and a dialog reopens after a confirm.
  const ui = createOverlay({ now: () => loop.realTime * 1000 });
  const toast = toasts(ui);

  // Deliberately NOT a `roll`. A roll eases to its target over ~400ms and
  // `set` is only idempotent when the value has not changed — but coin accrues
  // continuously, so every update is a new target and the ease restarts about
  // sixty times a second. The displayed number then never leaves where it
  // started: measured at "0" on screen while the ledger held 35.44. A roll is
  // for a number that JUMPS (you were paid 120); a balance that is always
  // moving wants the plain text, which is also the one a player reads to
  // decide whether they can afford the next thing.
  const coin = el('b', {}, '0');
  const rate = el('b', { class: 'rate' }, '+0');
  const pop = el('b', {}, '0');
  const hint = el('p', { class: 'hint' }, 'Tap an empty lot to build. Drag to look around; pinch or scroll to zoom.');

  const buttons = new Map<Kind, HTMLButtonElement>();
  const priceNodes = new Map<Kind, HTMLElement>();
  const shelf = el('div', { class: 'shelf' });

  for (const kind of KINDS) {
    const price = el('span', { class: 'price' }, '—');
    const button = interactive(el('button', { class: 'pick', type: 'button' },
      el('span', { class: 'name' }, LABEL[kind]), price));
    button.addEventListener('click', () => onPick(kind));
    buttons.set(kind, button);
    priceNodes.set(kind, price);
    shelf.append(button);
  }

  ui.mount(el('div', { class: 'hud' },
    el('div', { class: 'readout' },
      el('div', { class: 'stat' }, coin, el('span', {}, 'coin')),
      el('div', { class: 'stat' }, rate, el('span', {}, 'per sec')),
      el('div', { class: 'stat' }, pop, el('span', {}, 'residents')),
    ),
    shelf,
    hint,
  ), { interactive: true });

  ui.every(() => {
    const m = read();
    setText(coin, fmtCompact(m.coin, 0));
    setText(rate, `+${m.rate.toFixed(1)}`);
    setText(pop, String(m.pop));
    for (const kind of KINDS) {
      const button = buttons.get(kind);
      const price = priceNodes.get(kind);
      if (button === undefined || price === undefined) continue;
      const on = m.selected === kind;
      setText(price, `${Math.ceil(m.price(kind))} coin · ${m.owned(kind)} built`);
      button.classList.toggle('is-on', on);
      button.toggleAttribute('disabled', !m.affordable(kind));
      button.title = WHY[kind];
    }
    setText(hint, m.selected === 'park'
      ? `${WHY.park}. Tap an empty lot.`
      : `${WHY[m.selected]}. Tap an empty lot.`);
  });

  return {
    ui,
    // Keyed on the condition, never on the rendered text: a message carrying a
    // changing number defeats a latch keyed on it.
    say: (key, text, kind) => { toast.once(key, text, kind); },
    destroy: () => ui.destroy(),
  };
}
