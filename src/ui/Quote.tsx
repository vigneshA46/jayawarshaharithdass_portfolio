import { about } from "../content";
import StageSection from "./StageSection";

const a = ["Business", "isn't", "about"];
const b = ["It's", "about", "what", "outlasts", "it."];

/** Scene 4: the idea behind his approach, in the manner of a one-line manifesto. */
export default function Quote() {
  const n = a.length + 1 + b.length;
  const w = (t: string, k: number, extra = "") => (
    <span key={t + k}>
      <span className={`wd ${extra}`} style={{ ["--k" as string]: k, ["--n" as string]: n }}>{t}</span>{" "}
    </span>
  );
  return (
    <StageSection id="quote" height="260vh">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ ["--s" as string]: "clamp(0, calc((var(--p, 0) - 0.06) * 1.7), 1)" }}>
        <p className="font-display text-[10.5vw] leading-[1.06] md:text-[6.2vw]" aria-label="Business isn't about revenue. It's about what outlasts it.">
          <span aria-hidden>
            {a.map((t, i) => w(t, i))}
            <span className="struck">{w("revenue.", 3)}</span>
          </span>
          <br />
          <span aria-hidden>{b.map((t, i) => w(t, 4 + i, t === "outlasts" ? "gold-text" : ""))}</span>
        </p>
        <p className="ab-fade mt-8 max-w-[36rem] text-[13px] leading-relaxed text-dim md:text-[15px]" style={{ ["--from" as string]: 0.55 }}>{about[1]}</p>
      </div>
    </StageSection>
  );
}
