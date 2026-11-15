import { ceoPhilosophy as c } from "../content";
import StageSection from "./StageSection";

const words = c.quote.split(" ");

/** Slide 4: the CEO philosophy as one large line that resolves word by word. */
export default function CeoPhilosophy() {
  return (
    <StageSection id="ceo" height="320vh">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="gold-text translate-y-[8vh] font-display text-[78vw] leading-none opacity-[0.07] md:text-[44vw]">&ldquo;</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ ["--s" as string]: "clamp(0, calc((var(--p, 0) - 0.04) * 1.35), 1)" }}>
        <p className="ab-fade font-mono text-[11px] tracking-[0.4em] text-gold uppercase" style={{ ["--from" as string]: 0 }}>{c.eyebrow}</p>
        <div aria-hidden className="ab-fade my-5 h-px w-24 bg-gold/60 md:my-7" style={{ ["--from" as string]: 0.02 }} />
        <p className="max-w-[20ch] font-display text-[7.2vw] leading-[1.14] text-ivory md:max-w-[34ch] md:text-[3.5vw]" aria-label={`“${c.quote}”`}>
          <span aria-hidden className="gold-text">&ldquo;</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden>
              <span className={`wd ${c.highlight.includes(w) ? "gold-text" : ""}`} style={{ ["--k" as string]: i, ["--n" as string]: words.length }}>{w}</span>{i < words.length - 1 ? " " : ""}
            </span>
          ))}
          <span aria-hidden className="gold-text">&rdquo;</span>
        </p>
      </div>
    </StageSection>
  );
}
