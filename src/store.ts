/** Shared, non-reactive scroll state read by the 3D scene every frame. */
export const view = {
  /** Fractional section index the viewer is currently at. */
  f: 0,
  /** Index of the leadership-philosophy line nearest the viewport centre. */
  pillar: 0,
  reduced: typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches,
};
