import { mission } from "../content";
import StageSection from "./StageSection";
import Figure from "./Figure";

/** Scene 9: "Beyond business. Beyond generations." with light rising behind a returning portrait. */
export default function Mission() {
  const a = ["Beyond", "business."];
  const b = ["Beyond", "generations."];
  const all = [...a, ...b];
  const w = (t: string, k: number) => (
    <span key={k}>
      <span className={`wd ${k >= 2 ? "gold-text" : ""}`} style={{ ["--k" as string]: k, ["--n" as string]: all.length }}>{t}</span>{" "}
    </span>
  );
  return (
    <StageSection id="mission" height="300vh">
      <div aria-hidden className="ms-bloom" />
      <div aria-hidden className="ab-fig absolute bottom-0 left-1/2 z-0 h-[44vh] -translate-x-1/2 opacity-80 md:right-[3vw] md:left-auto md:h-[90vh] md:translate-x-0"><Figure kind="seated" className="h-full w-auto" /></div>
      <div className="absolute inset-0 z-10 flex flex-col items-center px-6 pt-[15vh] text-center md:items-start md:justify-center md:px-[7vw] md:pt-0 md:text-left" style={{ ["--s" as string]: "clamp(0, calc((var(--p, 0) - 0.03) * 2.4), 1)" }}>
        <p className="ab-fade font-mono text-[11px] tracking-[0.4em] text-gold uppercase" style={{ ["--from" as string]: 0 }}>06 | My personal mission</p>
        <h2 className="mt-4 font-display text-[12vw] leading-[1.02] text-ivory md:text-[5.2vw]" aria-label={mission.title}>
          <span aria-hidden>{a.map((t, i) => w(t, i))}</span><br /><span aria-hidden>{b.map((t, i) => w(t, 2 + i))}</span>
        </h2>
        <div className="mt-6 max-w-[34rem] space-y-3 md:max-w-[30rem]">
          {mission.text.map((t, i) => (
            <p key={i} className="ab-fade text-[13px] leading-relaxed text-ivory/85 md:text-[15px]" style={{ ["--from" as string]: 0.35 + i * 0.12 }}>{t}</p>
          ))}
          <p className="ab-fade pt-2 text-[15px] font-semibold text-champagne md:text-xl" style={{ ["--from" as string]: 0.62 }}>{mission.closing}</p>
        </div>
      </div>
    </StageSection>
  );
}
