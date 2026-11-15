export const view = {
  p: 0,
  mx: 0,
  my: 0,
  reduced: typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches,
};
