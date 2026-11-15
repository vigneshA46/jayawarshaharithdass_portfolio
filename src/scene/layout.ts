import type { Vec3 } from "./util";

/** World positions of each object. The camera flies between them as you scroll. */
export const W = {
  monolith: [0, 0, 0] as Vec3,
  rings: [16, 0, 0] as Vec3,
  globe: [34, 0, 0] as Vec3,
  karts: [27, 1.6, -5] as Vec3,
  sovereign: [41.5, -0.8, -5] as Vec3,
  pillars: [60, 0, 0] as Vec3,
  legacy: [80, 0, 0] as Vec3,
  seal: [97, 0, 0] as Vec3,
};

/** One pose per section, in order. `side` shifts the subject to one side so the copy never covers it. */
export const POSES: { pos: Vec3; look: Vec3; side: number; m?: number; up?: number }[] = [
  { pos: [0, 0.4, 11], look: [0, 0.2, 0], side: 1 }, // cover
  { pos: [16, 0, 8.5], look: [16, 0, 0], side: -1 }, // about
  { pos: [34, 0.4, 14], look: [34, 0, 0], side: 1 }, // JD COSMOPOLITAN
  { pos: [25.8, 1.8, 3], look: [27, 1.6, -5], side: -1 }, // VENTURE KARTS
  { pos: [43.4, 1.2, 5], look: [41.5, -0.2, -5], side: 1 }, // JD SOVEREIGN
  { pos: [34, 6.4, 21], look: [34, 3.4, -3], side: 0 }, // vision (wide)
  { pos: [60, 1.2, 15.5], look: [60, 1.8, 0], side: 1, m: 1.6 }, // philosophy
  { pos: [60, 5.5, 24], look: [60, 0, 0], side: 0, m: 1.5 }, // focus
  { pos: [80, 2.6, 10.5], look: [80, 0.6, 0], side: -1 }, // mission
  { pos: [97, 0, 11.5], look: [97, 0, 0], side: 1, m: 1.9, up: 0.14 }, // contact
];
