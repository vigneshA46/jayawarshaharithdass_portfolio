import { vision } from "../content";
import StageSection from "./StageSection";

const lead = ["To", "build", "a", "global", "business", "presence", "that", "connects", "people,", "opportunities,", "industries", "and", "international", "markets."];

/** Scene 7: the vision statement resolves out of expanding rings. */
export default function Vision() {
  return (
    <StageSection id="vision" height="260vh">
      <div aria-hidden>{[0, 1, 2].map((k) => <span key={k} className="ring-out" style={{ ["--k" as string]: k }} />)}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ ["--s" as string]: "clamp(0, calc((var(--p, 0) - 0.04) * 1.5), 1)" }}>
        <p className="ab-fade font-mono text-[11px] tracking-[0.4em] text-gold uppercase" style={{ ["--from" as string]: 0 }}>03 | My vision</p>
        <p className="mt-5 max-w-[22ch] font-display text-[8.4vw] leading-[1.08] text-ivory md:max-w-[30ch] md:text-[3.7vw]" aria-label={vision[0]}>
          {lead.map((w, i) => (
            <span key={i} aria-hidden>
              <span className={`wd ${["connects", "global"].includes(w) ? "gold-text" : ""}`} style={{ ["--k" as string]: i, ["--n" as string]: lead.length }}>{w}</span>{" "}
            </span>
          ))}
        </p>
        <p className="ab-fade mt-8 max-w-[34rem] text-[13px] leading-relaxed text-dim md:text-[15px]" style={{ ["--from" as string]: 0.5 }}>{vision[1]}</p>
        <p className="ab-fade mt-4 max-w-[34rem] text-[15px] font-semibold text-champagne md:text-lg" style={{ ["--from" as string]: 0.66 }}>{vision[2]}</p>
      </div>
    </StageSection>
  );
}
