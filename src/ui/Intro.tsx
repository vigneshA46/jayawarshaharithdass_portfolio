import { useEffect, useState } from "react";
import { view } from "../store";

/** Opening beat: gold frame draws itself while a counter climbs, then the curtain lifts. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("locked");
    if (view.reduced) {
      setGone(true);
      document.documentElement.classList.remove("locked");
      onDone();
      return;
    }
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        setOut(true);
        onDone();
        document.documentElement.classList.remove("locked");
        setTimeout(() => setGone(true), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;
  return (
    <div aria-hidden className="fixed inset-0 z-50 flex items-center justify-center bg-ink" style={{ transform: out ? "translateY(-100%)" : "none", transition: "transform 1s cubic-bezier(.8,0,.2,1)" }}>
      <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" preserveAspectRatio="none">
        <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" fill="none" stroke="#d9a441" strokeOpacity=".55" pathLength={1} strokeDasharray="1" strokeDashoffset="1" style={{ animation: "frame 1.7s cubic-bezier(.6,0,.2,1) forwards" }} />
      </svg>
      <div className="flex flex-col items-center gap-5">
        <img src="/brand/jd-logo-hero.webp" alt="" width={120} height={120} className="h-24 w-24 md:h-28 md:w-28" style={{ opacity: Math.min(n / 40, 1) }} />
        <p className="font-mono text-[11px] tracking-[0.4em] text-gold">{String(n).padStart(3, "0")}</p>
        <p className="font-cond text-xs tracking-[0.5em] text-dim uppercase">Executive portfolio</p>
      </div>
    </div>
  );
}
