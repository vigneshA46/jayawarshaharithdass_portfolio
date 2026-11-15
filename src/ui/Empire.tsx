import { ventures } from "../content";
import StageSection from "./StageSection";

const list = [ventures.parent, ventures.karts, ventures.sovereign];
const short = ["JD COSMOPOLITAN", "VENTURE KARTS", "JD SOVEREIGN"];

/** Scene 5: a ring of three venture panels; scrolling swings the camera round to each one. */
export default function Empire() {
  // distance of each panel from the one in focus (0 = focused, 1 = far) drives its brightness
  const onFrame = (p: number, stage: HTMLElement) => {
    const f = Math.min(Math.max((p - 0.08) * 2.4, 0), 2);
    list.forEach((_, i) => stage.style.setProperty(`--d${i}`, Math.min(Math.abs(i - f), 1).toFixed(3)));
  };

  return (
    <StageSection id="empire" height="420vh" className="empire-stage" onFrame={onFrame}>
      <div className="absolute inset-x-0 top-[11vh] z-20 px-6 text-center md:top-[12vh]">
        <p className="font-mono text-[11px] tracking-[0.4em] text-gold uppercase">02 | My business empire</p>
        <h2 className="mt-3 font-display text-[clamp(1.4rem,3.4vw,2.6rem)] leading-tight text-ivory">
          Three companies. Three identities. <span className="gold-text">One vision.</span>
        </h2>
      </div>

      <div className="gallery absolute inset-0">
        <div aria-hidden className="floor-ring" />
        {list.map((v, i) => (
          <article key={v.name} className="v-panel" style={{ ["--i" as string]: i, ["--d" as string]: `var(--d${i}, ${i === 0 ? 0 : 1})` }}>
            <div className="inner p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">{v.no} | {v.tag}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.5rem,3.1vw,2.3rem)] leading-[1.05] text-ivory">{v.name}</h3>
                </div>
                {v.logoSrc ? (
                  <img src={v.logoSrc} alt="" className="h-14 w-14 shrink-0 object-contain" />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-gold/50 text-center font-mono text-[8px] leading-tight tracking-wider text-gold/70 uppercase">Logo to be added</div>
                )}
              </div>
              <p className="mt-2 font-cond text-xs tracking-[0.12em] text-dim uppercase">{v.kind}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-ivory/85 md:text-[15px]">{v.text}</p>
              <ul className="mt-5 grid gap-2 border-t border-gold/25 pt-4">
                {v.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[13px] text-ivory/90 md:text-sm">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <ol className="absolute inset-x-0 bottom-[5vh] z-20 flex justify-center gap-4 px-4 md:gap-10">
        {short.map((s, i) => (
          <li key={s} className="empire-dot font-cond text-[10px] tracking-[0.22em] uppercase md:text-xs" style={{ ["--d" as string]: `var(--d${i}, ${i === 0 ? 0 : 1})` }}>
            <span className="mr-2 font-mono text-dim">0{i + 1}</span>{s}
          </li>
        ))}
      </ol>
    </StageSection>
  );
}
