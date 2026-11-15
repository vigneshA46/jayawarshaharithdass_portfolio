import { philosophy, person } from "../content";
import StageSection from "./StageSection";
import Figure from "./Figure";

/** Scene 6: his five words, one full-screen moment each. */
export default function Philosophy() {
  const onFrame = (p: number, stage: HTMLElement) => {
    const f = Math.min(p / 0.92, 1) * (philosophy.length - 1);
    philosophy.forEach((_, i) => {
      const s = f - i;
      stage.style.setProperty(`--o${i}`, Math.max(0, Math.min(1, 1 - Math.abs(s) * 1.9)).toFixed(3));
      stage.style.setProperty(`--s${i}`, s.toFixed(3));
    });
    stage.dataset.active = String(Math.round(f));
    stage.querySelectorAll<HTMLElement>(".ph-tick").forEach((t, i) => t.classList.toggle("on", i === Math.round(f)));
  };

  return (
    <StageSection id="philosophy" height="620vh" onFrame={onFrame}>
      <div aria-hidden className="ph-ghost"><Figure kind="profile" className="photo-soft h-full w-auto" /></div>
      <p className="absolute inset-x-0 top-[12vh] z-20 text-center font-mono text-[11px] tracking-[0.4em] text-gold uppercase">04 | My leadership philosophy</p>
      {philosophy.map(([word, line], i) => (
        <div key={word} className="ph-word z-10" style={{ opacity: `var(--o${i}, 0)`, transform: `scale(calc(1 + var(--s${i}, 0) * 0.5)) translateY(calc(var(--s${i}, 0) * -6vh))`, filter: `blur(calc((1 - var(--o${i}, 0)) * 14px))` }} aria-hidden={false}>
          <p className="font-mono text-[11px] tracking-[0.4em] text-dim uppercase">0{i + 1} / 05</p>
          <h2 className="gold-text mt-3 font-display leading-[0.95] tracking-tight" style={{ fontSize: `min(15vw, ${(88 / (word.length * 0.82)).toFixed(1)}vw)` }}>{word.toUpperCase()}</h2>
          <p className="mt-5 max-w-[26ch] font-cond text-[clamp(1.1rem,2.6vw,2rem)] tracking-[0.08em] text-ivory uppercase md:max-w-[40ch]">{line}</p>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-[6vh] z-20 flex flex-col items-center gap-4">
        <div className="flex gap-2">{philosophy.map((p) => <span key={p[0]} className="ph-tick" />)}</div>
        <p className="font-cond text-xs font-semibold tracking-[0.3em] text-gold uppercase">{person.motto}</p>
      </div>
    </StageSection>
  );
}
