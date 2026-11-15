import Lenis from "lenis";
import { view } from "./store";

let lenis: Lenis | null = null;

export function startScroll() {
  if (view.reduced) return () => {};
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
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

export function jump(i: number) {
  const el = document.querySelectorAll<HTMLElement>("[data-stop]")[i];
  if (!el) return;
  const y = el.getBoundingClientRect().top + scrollY - (innerHeight - el.offsetHeight) / 2;
  if (lenis) lenis.scrollTo(Math.max(0, y), { duration: 1.6 });
  else window.scrollTo({ top: Math.max(0, y) });
}

/** Maps the scroll position onto a fractional section index for the 3D camera. */
export function trackStops(onActive: (i: number) => void) {
  const stops = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
  const pillars = Array.from(document.querySelectorAll<HTMLElement>("[data-pillar]"));
  let last = -1;
  const update = () => {
    const vh = innerHeight;
    const c = stops.map((e) => {
      const r = e.getBoundingClientRect();
      return r.top + r.height / 2 - vh / 2;
    });
    let f = 0;
    if (c[0] <= 0) {
      f = stops.length - 1;
      for (let i = 0; i < c.length - 1; i++) {
        if (c[i] <= 0 && c[i + 1] > 0) {
          f = i + -c[i] / (c[i + 1] - c[i]);
          break;
        }
      }
    }
    view.f = f;
    view.pillar = pillars.filter((p) => {
      const r = p.getBoundingClientRect();
      return r.top + r.height / 2 < vh * 0.62;
    }).length - 1;
    const a = Math.round(f);
    if (a !== last) {
      last = a;
      onActive(a);
    }
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}
