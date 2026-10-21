/**
 * Subway entrances: a 2×2-tile lot that is a small plaza with a stair hood and a
 * line sign. Where they stand is `ENTRANCES` in layout.ts; this file is what one
 * looks like. Which line serves which entrance is illustrative, not surveyed:
 * the four lines are real and the spots are plausible, nothing more.
 *
 * ONE builder, four colours. A lot is laid out back to front along the +gx/+gy
 * diagonal, because only those two faces are ever on screen:
 *
 *   - the PYLON at the back, on the screen-centre line of the lot. It is the
 *     beacon, and it is tall on purpose: every other lot in the ward is a
 *     2–7 storey building, and one in front of an entrance (+gx or +gy of it)
 *     hides everything of it below its own roofline. An east-side entrance has
 *     both, and even at 3.4 storeys the ones inside Kabukichō are mostly buried:
 *     only the top third of the sign shows. The back corner is the least-hidden
 *     spot in the lot, and height is the only other lever. West of the station
 *     the Nishi quadrants an entrance claims are empty, so those show whole.
 *   - the HOOD in front of it, off to the +gy side: a low glazed roof over a
 *     dark stair mouth that faces +gy, with the line colour as a fascia.
 *   - railings and bollards on the paved front, drawn only when zoomed in.
 *
 * The rules this file shares with landmarks.ts: `massing` reads no palette (it
 * speaks in slot names, plus one hour test, which is not a palette read and
 * cannot move a height), `animate` runs after all of it, so everything drawn
 * there must stand where nothing of this sprite is in front of it, and night
 * lights are gated on `hourNow()`.
 *
 * Cost: there are 13 of these and all may be on screen at once, so the far
 * band is about a dozen primitives each and everything finer waits for zoom
 * 0.7. The letter is ONE text run, on the +gy face, drawn from `massing` by
 * day and from `animate` by night, never both: canvas text is the dearest thing
 * here. It was on both faces first, and at the opening zoom that reads as
 * "MM" and "SS", for twice the text.
 */
import { hashStep, toUnit } from '@latticekit/core';
import { LEVEL_H, defineSprite, glowDot, isoPost, isoWall, mix, wallText } from '@latticekit/draw';
import type { Ink, Pen, SpriteDef } from '@latticekit/draw';

import type { MetroLine } from './layout.ts';
import { hourNow } from './sprites.ts';

/** Slot, letter and letter colours per line. The slots are signage, so they are
 *  near-identical in the day and night stop sets and the sign needs no
 *  night-only colour of its own. The letter is pale on the dark lines and dark
 *  on the leaf green, where white would be 2:1. */
const LINES: Record<MetroLine, { slot: string; letter: string; day: Ink; night: number }> = {
  marunouchi: { slot: 'metro_red', letter: 'M', day: 'canopy', night: 0xfffbf0ff },
  fukutoshin: { slot: 'metro_brown', letter: 'F', day: 'canopy', night: 0xfffbf0ff },
  shinjuku: { slot: 'metro_green', letter: 'S', day: 'ink', night: 0x10231cff },
  oedo: { slot: 'metro_magenta', letter: 'E', day: 'canopy', night: 0xfffbf0ff },
};

/** Below this much night (`1 - hourNow()`) nothing is lit, as in station.ts. */
const LIGHTS_ON = 0.3;

/** Fine detail needs this much zoom; below it the sprite is its far band. */
const NEAR = 0.7;

// ── the pylon ────────────────────────────────────────────────────────────────

/** Its footprint, in tiles. The letter is as wide as its face lets it be, not
 *  as tall as the panel: `wallText` shrinks a glyph to the segment, so a wider
 *  pylon is what buys a bigger letter, and a taller one buys nothing. */
const PX0 = 0.15, PX1 = 0.85, PY0 = 0.15, PY1 = 0.85;
/** The lightbox panel runs from here to here, in storeys, and the dark frame is
 *  a little taller. The panel's foot must stay above the hood's roofline: the
 *  night panel is drawn from `animate`, over the whole sprite, and anything
 *  lower would paint over the hood that stands in front of the pylon. The hood
 *  tops out at 0.8; at this foot the clearance is about 15 px at zoom 1. */
const PZ0 = 0.9, PZ1 = 3.25, PTOP = 3.4;
const PAD = 0.05;

// ── the hood ─────────────────────────────────────────────────────────────────

const HX0 = 0.4, HX1 = 1.4, HY0 = 1.0, HY1 = 1.5;
const HZ = 0.5;                  // storeys: the eave
const RISE = 0.3;
/** The stair mouth, on the hood's +gy face. */
const OX0 = 0.55, OX1 = 1.25, OZ = 0.38;
/** The roof overhangs the body by this much on every side. */
const EAVE = 0.1;

/** Is it dark enough for the lights? One number for the whole sprite. */
function night(): number {
  return 1 - hourNow();
}

/** Nine levels of brightness, as everywhere: a continuously animated intensity
 *  is a colour-pair cache key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

const defs = new Map<MetroLine, SpriteDef>();

/** The sprite for one line's entrance, built once per line. */
export function entranceDef(line: MetroLine): SpriteDef {
  let def = defs.get(line);
  if (def === undefined) {
    def = build(line);
    defs.set(line, def);
  }
  return def;
}

function build(line: MetroLine): SpriteDef {
  const { slot, letter, day, night: nightInk } = LINES[line];
  const px0 = PX0 + PAD, px1 = PX1 - PAD, py0 = PY0 + PAD, py1 = PY1 - PAD;
  const panelH = PZ1 - PZ0;
  return defineSprite({
    id: `shinjuku.entrance.${line}`, w: 2, d: 2,
    massing(s) {
      // Paving first, then what stands on it. The plaza is the lighter
      // `concrete` of the Nishi plazas, so the lot reads as a site and not as a
      // gap in the street.
      s.patch(0.06, 0.06, 1.88, 1.88, 0, 'concrete');
      s.shadow(PX0, PY0, PX1 - PX0, PY1 - PY0, 0.5);
      s.shadow(HX0 - EAVE, HY0 - EAVE, HX1 - HX0 + 2 * EAVE, HY1 - HY0 + 2 * EAVE, 0.4);

      // The pylon: a dark frame, and on each face a flat panel in the line
      // colour with a pale border, as the concourse plate does. `wall` fills
      // FLAT where `box` shades, so the two faces read as equally lit boxes.
      s.box(PX0, PY0, PX1 - PX0, PY1 - PY0, { color: 'darkstone', h: PTOP });
      if (night() < LIGHTS_ON) {
        s.wall(px0, PY1, px1, PY1, PZ0, PZ1, slot, 'canopy');
        s.sign(px0, PY1, px1, PY1, PZ1, panelH, letter, day);
        s.wall(PX1, py0, PX1, py1, PZ0, PZ1, slot, 'canopy');
      }

      // The hood stands in front of the pylon (higher gy), so it comes second.
      // A blue-grey body, a pale glazed roof, a black mouth: three values, so
      // the mouth reads as a hole and the roof as a lid even at 0.35.
      s.box(HX0, HY0, HX1 - HX0, HY1 - HY0, { color: 'slate', h: HZ });
      s.wall(OX0, HY1, OX1, HY1, 0, OZ, 'ink');
      s.roof(HX0 - EAVE, HY0 - EAVE, HX1 - HX0 + 2 * EAVE, HY1 - HY0 + 2 * EAVE, HZ, RISE, 'glass');
      // The line colour as the eave fascia: a band that survives when the pylon
      // is behind a roof.
      s.wall(HX0 - EAVE, HY1 + EAVE, HX1 + EAVE, HY1 + EAVE, HZ - 0.09, HZ, slot);
    },
    animate(pen, gx, gy, v) {
      const zoom = pen.camera.zoom;
      const n = night();
      const lit = n >= LIGHTS_ON;
      const p = pen.palette;

      if (zoom >= NEAR) {
        // Railings flank the path to the mouth, and two bollards keep cars off
        // the paving. Nothing of this sprite stands in front of them.
        for (let i = 0; i < 2; i++) {
          const x = i === 0 ? OX0 - 0.05 : OX1 + 0.05;
          isoWall(pen, gx + x, gy + HY1 + EAVE, gx + x, gy + 1.92, 0.2, 0.3, 'metal');
          isoPost(pen, gx + x, gy + 1.92, 0, 0.34, 'metal', 0.05);
        }
        isoPost(pen, gx + 1.66, gy + 1.82, 0, 0.26, 'canopy', 0.09);
        isoPost(pen, gx + 1.84, gy + 1.56, 0, 0.26, 'canopy', 0.09);
        // A crossing-light indicator on the roof: green, then red, a few
        // seconds each, out of step from one entrance to the next. Small enough
        // that it is only worth drawing from here.
        const red = ((pen.t / 2.4 + toUnit(hashStep(v.seed, 1))) % 1) < 0.5;
        glowDot(pen, gx + HX1 - 0.05, gy + (HY0 + HY1) / 2, HZ + RISE + 0.05, red ? 'bad' : 'ok', 0.06, 1);
      }

      if (!lit) {
        // Day: the stairs are a hint in the mouth. Narrower with height, which
        // is all a staircase going away from you is in this projection.
        if (zoom >= NEAR) steps(pen, gx, gy, 'slate');
        return;
      }

      const lum = snap(n);
      // The lightbox, over the day art (which `massing` skipped, so it is the
      // only text drawn): the line colour pushed a little toward white, with a
      // bright border. `mix` returns a number, so a frame allocates nothing.
      const body = mix(p.get(slot), 0xffffffff, 0.2 * lum);
      const edge = mix(body, 0xffffffff, 0.55);
      isoWall(pen, gx + px0, gy + PY1, gx + px1, gy + PY1, PZ0, PZ1, body, edge);
      wallText(pen, gx + px0, gy + PY1, gx + px1, gy + PY1, PZ1, panelH, letter, nightInk);
      isoWall(pen, gx + PX1, gy + py0, gx + PX1, gy + py1, PZ0, PZ1, body, edge);

      // The stair mouth is a lit hole.
      isoWall(pen, gx + OX0, gy + HY1, gx + OX1, gy + HY1, 0, OZ, 'warn');
      if (zoom >= NEAR) steps(pen, gx, gy, 'darkstone');

      // ONE pool, tinted by the line, and it is on the SIGN, not on the ground:
      // `slot` is signage and does not roll down at night, but the night mask
      // still darkens whatever no pool covers, so a sign outside its own pool
      // goes pastel and dull (tried: a ground pool in front of the stairs
      // looked nice and left the beacon the dimmest thing in the street).
      // Raised to the panel's middle, because a pool is a ground ellipse and `z`
      // is what lifts it up the face; it is flat, so it cannot cover all of a
      // 2-storey panel, and the soft edge is left to do the top and the foot.
      pen.light?.add(gx + 0.5, gy + PY1, 1.95 * LEVEL_H, 2.1, snap(0.55 * lum), slot);
    },
  });
}

/** Three treads in the stair mouth, each narrower than the one below. */
function steps(pen: Pen, gx: number, gy: number, color: Ink): void {
  for (let i = 0; i < 3; i++) {
    const z = 0.06 + i * 0.11;
    const inset = i * 0.06;
    isoWall(pen, gx + OX0 + inset, gy + HY1, gx + OX1 - inset, gy + HY1, z, z + 0.035, color);
  }
}
