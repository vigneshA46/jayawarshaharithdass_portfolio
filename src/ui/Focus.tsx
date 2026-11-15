import { focus } from "../content";
import StageSection from "./StageSection";

/** Scene 8: six focus areas as numbered rows that slide in one by one. */
export default function Focus() {
  return (
    <StageSection id="focus" height="300vh">
      <div className="absolute inset-0 flex flex-col justify-center gap-6 px-6 pt-[13vh] md:flex-row md:pt-0 md:items-center md:gap-[6vw] md:px-[7vw]">
        <div className="md:w-[38%]">
          <p className="ab-fade font-mono text-[11px] tracking-[0.4em] text-gold uppercase" style={{ ["--from" as string]: 0 }}>05 | My professional focus</p>
          <h2 className="ab-fade mt-4 font-display text-[11vw] leading-[1.02] text-ivory md:text-[4.6vw]" style={{ ["--from" as string]: 0 }}>
            Where the <span className="gold-text">work</span> happens.
          </h2>
        </div>
        <ul className="flex-1 space-y-2.5 md:space-y-3">
          {focus.map((f, i) => (
            <li key={f} className="fo-row flex items-center gap-4 border border-gold/30 bg-black/40 px-4 py-3.5 backdrop-blur-sm md:gap-6 md:px-6 md:py-4" style={{ ["--k" as string]: i }}>
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-cond text-[15px] tracking-[0.1em] text-ivory uppercase md:text-xl">{f}</span>
              <span aria-hidden className="text-gold">→</span>
            </li>
          ))}
        </ul>
      </div>
    </StageSection>
  );
}
