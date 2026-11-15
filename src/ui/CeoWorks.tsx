import { useEffect, useRef } from "react";
import { ceoWorks as c } from "../content";
import StageSection from "./StageSection";
import Figure from "./Figure";

// The trail enters from the left, drops to the bottom, climbs to the top right, falls to the bottom right
// and finally rises into the centre above him. Coordinates are on a 1000 x 560 map that stretches over the stage.
const PATH =
  "M -30 290 C 70 380 140 520 340 505 C 540 490 650 290 770 150 C 870 40 975 110 940 255 C 905 400 870 520 735 505 C 610 490 560 330 500 175";

// Where each tile floats (percent of the stage), its depth, and a small tilt.
const tiles: { l: number; t: number; z: number; ry: number }[] = [
  { l: 11, t: 42, z: 40, ry: 16 },
  { l: 21, t: 60, z: -20, ry: 10 },
  { l: 11, t: 79, z: 60, ry: 14 },
  { l: 31, t: 42, z: -90, ry: 8 },
  { l: 31, t: 77, z: -70, ry: 6 },
  { l: 89, t: 42, z: 40, ry: -16 },
  { l: 79, t: 60, z: -20, ry: -10 },
  { l: 89, t: 79, z: 60, ry: -14 },
  { l: 69, t: 42, z: -90, ry: -8 },
  { l: 69, t: 77, z: -70, ry: -6 },
];

const icons = [
  // Strategic Planning: target
  <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /><path d="M12 3V1M12 23v-2M3 12H1M23 12h-2" /></>,
  // Corporate Leadership: crown
  <><path d="M3 18h18" /><path d="M4 18l-1-10 5 4 4-7 4 7 5-4-1 10" /></>,
  // Business Development: growth chart
  <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></>,
  // Strategic Partnerships: linked rings
  <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></>,
  // Operations Oversight: gear
  <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" /><circle cx="12" cy="12" r="7" /></>,
  // Financial Oversight: coins
  <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  // Decision Making: branching arrow
  <><path d="M12 21v-9" /><path d="M12 12L5 5" /><path d="M12 12l7-7" /><path d="M5 9V5h4M19 9V5h-4" /></>,
  // Team Building: group
  <><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17.5" cy="9" r="2.6" /><path d="M17 14.3c2.7.2 4.5 2 4.5 5.2" /></>,
  // Risk & Compliance: shield
  <><path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5L15.5 9.5" /></>,
  // Expansion & Innovation: light bulb
  <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.3 1 2.1h5c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 3z" /></>,
];

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Slide 5: ten responsibilities as floating tiles around him, with a fire trail that circles the scene once. */
export default function CeoWorks() {
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const head = useRef<HTMLDivElement>(null);
  const total = useRef(0);
  const tileF = useRef<number[]>([]);

  // work out where along the trail each tile sits so it can light up as the fire passes
  useEffect(() => {
    const p = paths.current[0];
    if (!p) return;
    total.current = p.getTotalLength();
    const N = 260;
    const pts = Array.from({ length: N + 1 }, (_, i) => p.getPointAtLength((i / N) * total.current));
    tileF.current = tiles.map((t) => {
      const x = t.l * 10;
      const y = t.t * 5.6;
      let best = 0;
      let bd = Infinity;
      pts.forEach((q, i) => {
        const d = (q.x - x) ** 2 + (q.y - y) ** 2;
        if (d < bd) { bd = d; best = i; }
      });
      return best / N;
    });
  }, []);

  const onFrame = (p: number, stage: HTMLElement) => {
    const h = ease(clamp01(p / 0.8));
    const L = 0.34 + 0.66 * clamp01((p - 0.8) / 0.2);
    paths.current.forEach((el, i) => {
      if (!el) return;
      const len = i === 3 ? Math.min(L, 0.13) : L; // the head end is thicker, like the body of the fire
      el.style.strokeDasharray = `${len} 3`;
      el.style.strokeDashoffset = String(len - h);
      el.style.opacity = p < 0.015 ? "0" : "1";
    });
    const el0 = paths.current[0];
    const hd = head.current;
    if (el0 && hd && total.current) {
      const pt = el0.getPointAtLength(Math.min(h, 1) * total.current);
      hd.style.left = `${pt.x / 10}%`;
      hd.style.top = `${pt.y / 5.6}%`;
      const flare = clamp01((p - 0.8) / 0.2);
      hd.style.opacity = p < 0.015 ? "0" : "1";
      hd.style.transform = `scale(${1 + flare * 1.8})`;
    }
    stage.querySelectorAll<HTMLElement>(".cw-tile").forEach((t, i) => {
      const f = tileF.current[i] ?? 0;
      const g = clamp01(1 - Math.abs(h - f) * 6.5) + clamp01((p - 0.82) / 0.18) * 0.35;
      t.style.setProperty("--g", Math.min(g, 1).toFixed(3));
    });
  };

  return (
    <StageSection id="works" height="460vh" onFrame={onFrame}>
      {/* heading and introduction */}
      <div className="absolute inset-x-0 top-[10vh] z-20 px-6 text-center md:top-[9vh]">
        <p className="ab-fade font-mono text-[10px] tracking-[0.34em] text-gold uppercase md:text-[11px]" style={{ ["--from" as string]: 0 }}>{c.eyebrow}</p>
        <h2 className="ab-fade mx-auto mt-3 max-w-[24ch] font-display text-[5.6vw] leading-[1.1] text-ivory md:max-w-none md:text-[2.5vw]" style={{ ["--from" as string]: 0.01 }}>
          <span className="block">{c.headline[0]} {c.headline[1]}</span>
          <span className="gold-text block">{c.headline[2]}</span>
        </h2>
        <p className="ab-fade mx-auto mt-3 hidden max-w-[40rem] text-[13px] leading-relaxed text-ivory/75 md:block" style={{ ["--from" as string]: 0.03 }}>{c.text}</p>
      </div>

      <div className="cw-world absolute inset-0">
        {/* warm light and the figure */}
        <div aria-hidden className="absolute bottom-[-12vh] left-1/2 z-0 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,106,40,0.32)_0%,rgba(150,50,15,0.14)_45%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/2 z-[5] -translate-x-1/2">
          <Figure kind="standing" className="h-[40vh] w-auto max-w-none md:h-[66vh]" />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-[6] h-[22vh] bg-gradient-to-t from-black to-transparent" />

        {tiles.map((t, i) => (
          <div key={c.items[i]} className="cw-tile" style={{ ["--l" as string]: `${t.l}%`, ["--t" as string]: `${t.t}%`, ["--lm" as string]: i < 5 ? "13%" : "87%", ["--tm" as string]: `${41 + (i % 5) * 11}%`, ["--z" as string]: `${t.z}px`, ["--ry" as string]: `${t.ry}deg`, ["--k" as string]: i, ["--par" as string]: t.z / 4 }}>
            <div className="cw-box flex h-[54px] w-[54px] items-center justify-center md:h-[100px] md:w-[100px]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-11 md:w-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{icons[i]}</svg>
            </div>
            <p className="max-w-[78px] text-center font-cond text-[8.5px] leading-tight font-semibold tracking-[0.12em] text-ivory uppercase md:max-w-[140px] md:text-[11.5px] md:tracking-[0.16em]">{c.items[i]}</p>
          </div>
        ))}

        {/* the fire trail */}
        <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-0 z-[12] h-full w-full">
          <defs>
            <linearGradient id="fire" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
              <stop offset="0" stopColor="#8a1208" />
              <stop offset="0.35" stopColor="#e8421c" />
              <stop offset="0.7" stopColor="#ff8a2a" />
              <stop offset="1" stopColor="#ffd27a" />
            </linearGradient>
          </defs>
          <g style={{ filter: "blur(9px)" }}>
            <path ref={(el) => { paths.current[0] = el; }} d={PATH} pathLength={1} fill="none" stroke="url(#fire)" strokeWidth="34" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity=".6" />
          </g>
          <g style={{ filter: "drop-shadow(0 0 7px rgba(255,90,30,.9))" }}>
            <path ref={(el) => { paths.current[1] = el; }} d={PATH} pathLength={1} fill="none" stroke="url(#fire)" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
          <g style={{ filter: "drop-shadow(0 0 10px rgba(255,120,40,.95))" }}>
            <path ref={(el) => { paths.current[3] = el; }} d={PATH} pathLength={1} fill="none" stroke="url(#fire)" strokeWidth="20" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
          <path ref={(el) => { paths.current[2] = el; }} d={PATH} pathLength={1} fill="none" stroke="#fff1cf" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div ref={head} aria-hidden className="fire-head" style={{ opacity: 0, left: "-3%", top: "52%" }} />
      </div>
    </StageSection>
  );
}
