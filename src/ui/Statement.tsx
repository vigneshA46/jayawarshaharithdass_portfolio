import { person } from "../content";
import StageSection from "./StageSection";

const words = ["Time", "and", "Word", "build", "empire."];

// The dial is the lower arc of a circle centred on the pivot (500, 60), 192 degrees wide, measured from straight down.
const R = 432;
const arcPoint = (deg: number, r = R): [number, number] => [500 + r * Math.sin((deg * Math.PI) / 180), 60 + r * Math.cos((deg * Math.PI) / 180)];
const arcPath = (r: number) => {
  const [lx, ly] = arcPoint(-96, r);
  const [rx, ry] = arcPoint(96, r);
  return `M${lx.toFixed(1)} ${ly.toFixed(1)} A${r} ${r} 0 1 0 ${rx.toFixed(1)} ${ry.toFixed(1)}`;
};
const ARC = arcPath(R);
const ARC_IN = arcPath(R - 8);
const ARC_OUT = arcPath(R + 8);
const ARM = R - 6;

/** A pendulum dial: ladder-notched bowl ring, a glowing pivot, and a "V" whose right arm travels along the ring. */
function Dial() {
  return (
    <svg viewBox="0 0 1000 560" aria-hidden className="dial absolute top-[-3vh] left-[-34vw] z-0 h-[84vw] w-[150vw] md:top-[-4vh] md:left-[-3vw] md:h-[54vh] md:w-[96.5vh]">
      <defs>
        <linearGradient id="armR" gradientUnits="userSpaceOnUse" x1="500" y1="60" x2="500" y2={60 + ARM}>
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="0.7" stopColor="#ffb55a" />
          <stop offset="1" stopColor="#ff7a1a" />
        </linearGradient>
        <radialGradient id="flare">
          <stop offset="0" stopColor="#fff2cf" stopOpacity="1" />
          <stop offset="0.25" stopColor="#ffb040" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#ff7a1a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ball">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#ffe2a0" />
          <stop offset="1" stopColor="#ffb040" stopOpacity="0" />
        </radialGradient>
        {/* reveals the bright ring up to wherever the right arm has reached */}
        <mask id="reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="560">
          <path className="dial-reveal" pathLength={1} d={ARC} fill="none" stroke="#fff" strokeWidth="60" />
        </mask>
      </defs>

      {/* ring: two hairlines with ladder rungs between them (dim = not yet reached) */}
      <path d={ARC_IN} fill="none" stroke="#d9a441" strokeOpacity=".4" strokeWidth="1.2" />
      <path d={ARC_OUT} fill="none" stroke="#d9a441" strokeOpacity=".4" strokeWidth="1.2" />
      <path d={ARC} fill="none" stroke="#d9a441" strokeOpacity=".45" strokeWidth="16" strokeDasharray="1.4 9.6" />
      <g mask="url(#reveal)">
        <path d={ARC} fill="none" stroke="#ffcf7a" strokeOpacity=".95" strokeWidth="16" strokeDasharray="1.8 9.2" />
        <path d={ARC_IN} fill="none" stroke="#ffcf7a" strokeOpacity=".85" strokeWidth="1.6" />
        <path d={ARC_OUT} fill="none" stroke="#ffcf7a" strokeOpacity=".85" strokeWidth="1.6" />
      </g>

      {/* left arm: fixed, thin, white, with a small arrow marker */}
      <g style={{ transform: "rotate(44deg)", transformBox: "view-box", transformOrigin: "500px 60px" }}>
        <line x1="500" y1="60" x2="500" y2={60 + ARM} stroke="#fff6e6" strokeOpacity=".9" strokeWidth="2.2" />
        <polygon points={`500,${60 + ARM * 0.5 - 7} 494,${60 + ARM * 0.5 + 6} 506,${60 + ARM * 0.5 + 6}`} fill="#fff6e6" fillOpacity=".9" />
      </g>

      {/* right arm: glowing, sweeps along the ring */}
      <g className="dial-arm-r">
        <line x1="500" y1="60" x2="500" y2={60 + ARM} stroke="url(#armR)" strokeWidth="4.5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 7px rgba(255,150,40,.85))" }} />
        <circle cx="500" cy={60 + ARM} r="62" fill="url(#flare)" style={{ mixBlendMode: "screen" }} />
        <circle cx="500" cy={60 + ARM} r="9" fill="#fff6e0" />
      </g>

      {/* pivot */}
      <circle cx="500" cy="60" r="26" fill="url(#ball)" style={{ mixBlendMode: "screen" }} />
      <circle cx="500" cy="60" r="8" fill="#ffffff" />
    </svg>
  );
}

const SEAL_TEXT = "A PERSON'S WORD BUILDS TRUST AND RELATIONSHIPS ✦ ";

/** A calm seal: a ring of his own words that turns slowly, with fine concentric lines. */
function Seal() {
  return (
    <svg viewBox="0 0 700 700" aria-hidden className="seal absolute right-[-34vw] bottom-[-18vh] z-0 h-[84vw] w-[84vw] md:right-[-13vw] md:bottom-[-26vh] md:h-[84vh] md:w-[84vh]">
      <defs>
        <path id="sealpath" d="M350 350 m-292 0 a292 292 0 1 1 584 0 a292 292 0 1 1 -584 0" />
      </defs>
      <circle className="seal-draw" pathLength={1} cx="350" cy="350" r="338" fill="none" stroke="#d9a441" strokeOpacity=".35" strokeWidth="1.4" />
      <circle className="seal-draw" pathLength={1} cx="350" cy="350" r="322" fill="none" stroke="#d9a441" strokeOpacity=".2" strokeWidth="1" />
      <g className="seal-text">
        <text fill="#f2d58a" fillOpacity=".42" fontSize="21" letterSpacing="5" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          <textPath href="#sealpath" startOffset="0" textLength="1790" lengthAdjust="spacing">{SEAL_TEXT.repeat(2)}</textPath>
        </text>
      </g>
      <circle className="seal-draw" pathLength={1} cx="350" cy="350" r="262" fill="none" stroke="#d9a441" strokeOpacity=".45" strokeWidth="1.4" />
      <g className="seal-dash">
        <circle cx="350" cy="350" r="244" fill="none" stroke="#d9a441" strokeOpacity=".4" strokeWidth="1.2" strokeDasharray="2 12" />
      </g>
      <circle className="seal-draw" pathLength={1} cx="350" cy="350" r="150" fill="none" stroke="#d9a441" strokeOpacity=".3" strokeWidth="1" />
      <path d="M350 270 L362 338 L430 350 L362 362 L350 430 L338 362 L270 350 L338 338 Z" fill="none" stroke="#f2d58a" strokeOpacity=".45" strokeWidth="1.6" />
    </svg>
  );
}

/** Scene 2: TIME (a pendulum dial, one slow sweep) and WORD (a seal of his own words) resolve into his line. */
export default function Statement() {
  const onFrame = (p: number, stage: HTMLElement) => {
    const e = p * p * (3 - 2 * p); // ease in and out so the sweep starts and ends gently
    const ang = -40 + e * 100;
    stage.style.setProperty("--hand", `${ang.toFixed(2)}deg`);
    stage.style.setProperty("--rev", ((ang + 96) / 192).toFixed(4));
    stage.style.setProperty("--frac", e.toFixed(4));
  };
  return (
    <StageSection id="statement" height="360vh" onFrame={onFrame}>
      <Dial />
      <Seal />
      <p aria-hidden className="st-time gold-text absolute top-[12vh] left-[4vw] z-[2] font-display text-[19vw] leading-[0.85] tracking-wide md:top-[10vh] md:text-[15vw]">TIME</p>
      <p aria-hidden className="st-word gold-text absolute right-[4vw] bottom-[11vh] z-[2] font-display text-[19vw] leading-[0.85] tracking-wide md:bottom-[9vh] md:text-[15vw]">WORD</p>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <p className="max-w-[16ch] text-center font-display text-[10vw] leading-[1.08] text-ivory md:max-w-[22ch] md:text-[4.8vw]" aria-label={person.motto}>
          {words.map((w, i) => (
            <span key={w} aria-hidden>
              <span className={`wd ${i === 0 || i === 2 ? "gold-text" : ""}`} style={{ ["--k" as string]: i, ["--n" as string]: words.length }}>{w}</span>{" "}
            </span>
          ))}
        </p>
      </div>
      <p className="ab-fade absolute inset-x-0 bottom-[3vh] z-10 text-center font-mono text-[10px] tracking-[0.4em] text-dim uppercase" style={{ ["--from" as string]: 0.7 }}>{person.ventures}</p>
    </StageSection>
  );
}
