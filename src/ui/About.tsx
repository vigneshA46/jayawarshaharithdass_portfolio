import { about, principles } from "../content";
import StageSection from "./StageSection";
import Figure from "./Figure";

const a = ["Business", "isn't", "about"];
const b = ["It's", "about", "what", "outlasts", "it."];
const total = a.length + 1 + b.length;

/**
 * Scene 3 (one slide): the About text and the manifesto live together on the same screen.
 * As you scroll, each part arrives in turn and stays: principles, about text, then the manifesto.
 */
export default function About() {
  const w = (t: string, k: number, extra = "") => (
    <span key={t + k}>
      <span className={`wd ${extra}`} style={{ ["--k" as string]: k, ["--n" as string]: total }}>{t}</span>{" "}
    </span>
  );
  return (
    <StageSection id="about" height="420vh">
      <div className="ab-fig absolute right-[-12vw] bottom-0 z-0 translate-y-[6vh] opacity-55 md:right-[3vw] md:translate-y-0 md:opacity-100">
        <Figure kind="standing" className="h-[36vh] w-auto md:h-[90vh]" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 pt-[9vh] md:pt-[6vh] md:pr-[38vw] md:pl-[6vw]">
        <p className="ab-fade font-mono text-[10px] tracking-[0.4em] text-gold uppercase md:text-[11px]" style={{ ["--from" as string]: 0 }}>01 | About me</p>

        {/* about: principles beside the text */}
        <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-[auto_1fr] md:items-start md:gap-[3vw]">
          <ul className="font-display text-[9vw] leading-[1.02] md:text-[4.1vw]">
            {principles.map((p, i) => (
              <li key={p} className="ab-word" style={{ ["--k" as string]: i, ["--a" as string]: "clamp(0, calc((var(--p, 0) - 0.03 - var(--k, 0) * 0.06) * 16), 1)" }}>
                {p}.
                <span aria-hidden className="gold-text">{p}.</span>
              </li>
            ))}
          </ul>
          <div className="max-w-[28rem] space-y-2 md:space-y-3 md:pt-1">
            <p className="ab-fade text-[12.5px] leading-relaxed text-ivory/85 md:text-[14px]" style={{ ["--from" as string]: 0.2 }}>{about[0]}</p>
            <p className="ab-fade text-[12.5px] font-semibold leading-snug text-champagne md:text-[15px]" style={{ ["--from" as string]: 0.27 }}>{about[3]}</p>
          </div>
        </div>

        <div className="ab-fade my-4 h-px w-full max-w-[52rem] bg-gold/35 md:my-6" style={{ ["--from" as string]: 0.31 }} />

        {/* the manifesto, on the same slide */}
        <div style={{ ["--s" as string]: "clamp(0, calc((var(--p, 0) - 0.34) * 2.2), 1)" }}>
          <p className="font-display text-[5.9vw] leading-[1.12] md:text-[3vw]" aria-label="Business isn't about revenue. It's about what outlasts it.">
            <span aria-hidden>
              {a.map((t, i) => w(t, i))}
              <span className="struck">{w("revenue.", 3)}</span>
            </span>
            <br className="hidden md:inline" />{" "}
            <span aria-hidden>{b.map((t, i) => w(t, 4 + i, t === "outlasts" ? "gold-text" : ""))}</span>
          </p>
        </div>
        <p className="ab-fade mt-3 max-w-[54%] text-[12px] leading-relaxed text-ivory/70 md:mt-4 md:max-w-[40rem] md:text-[14px]" style={{ ["--from" as string]: 0.82 }}>{about[1]}</p>
      </div>
    </StageSection>
  );
}
