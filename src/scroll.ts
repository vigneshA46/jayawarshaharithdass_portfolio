import Lenis from "lenis";
import { view } from "./store";

let lenis: Lenis | null = null;

export function startScroll() {
  if (view.reduced) return () => {};
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  let raf = 0;
  const loop = (t: number) => {
    lenis?.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToEl(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + scrollY;
  if (lenis) lenis.scrollTo(y, { duration: 1.6 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Smooths pointer position once for the whole page; scenes read view.mx / view.my. */
export function startPointer() {
  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = (e.clientY / innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove);
  let raf = 0;
  const tick = () => {
    if (!view.reduced) {
      view.mx += (pointer.x - view.mx) * 0.06;
      view.my += (pointer.y - view.my) * 0.06;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
  };
}

/** Writes this scene's smoothed scroll progress (and the pointer) onto its stage as CSS variables. `main` also feeds the 3D backdrop. */
export function driveStage(stage: HTMLElement, section: HTMLElement, main = false, onFrame?: (p: number, stage: HTMLElement) => void) {
  let p = 0;
  let raf = 0;
  const tick = () => {
    const r = section.getBoundingClientRect();
    const target = Math.min(Math.max(-r.top / Math.max(1, r.height - innerHeight), 0), 1);
    p += (target - p) * (view.reduced ? 1 : 0.14);
    if (main) view.p = p;
    stage.style.setProperty("--p", p.toFixed(4));
    stage.style.setProperty("--mx", view.mx.toFixed(4));
    stage.style.setProperty("--my", view.my.toFixed(4));
    onFrame?.(p, stage);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
