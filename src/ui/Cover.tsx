import { useEffect, useRef } from "react";
import { person } from "../content";
import { driveStage, scrollToEl } from "../scroll";
import Figure from "./Figure";

function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span className="line" aria-hidden>
      {text.split("").map((c, i) => (
        <span key={i} className="ch" style={{ ["--i" as string]: start + i }}>{c}</span>
      ))}
    </span>
  );
}

/** Scene 1: portrait on the left, name and introduction on the right. */
export default function Cover() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => (section.current && stage.current ? driveStage(stage.current, section.current, true) : undefined), []);

  return (
    <section ref={section} id="cover" className="relative h-[230vh]">
      <div ref={stage} className="cover-stage sticky top-0 h-screen overflow-hidden">
        <div className="world absolute inset-0">
          <h1 className="sr-only">{person.name}, {person.role}</h1>

          {/* warm light behind him */}
          <div aria-hidden className="absolute bottom-[-10vh] left-[-14vw] z-0 h-[95vh] w-[95vh] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.30)_0%,rgba(120,80,20,0.16)_42%,transparent_68%)] md:left-[2vw]" />

          {/* portrait, left */}
          <div className="layer-figure absolute bottom-0 left-[-10vw] z-20 md:left-[3vw]">
            <div className="figure-in">
              <Figure kind="close" className="h-[70vh] w-auto max-w-none md:h-[94vh]" />
            </div>
          </div>

          {/* name and introduction, right */}
          <div className="layer-name absolute top-[15vh] right-5 left-5 z-10 md:top-[13vh] md:right-[4vw] md:left-[38vw]">
            <p className="fade-up font-mono text-[10px] tracking-[0.34em] text-gold uppercase md:text-[11px]" style={{ ["--d" as string]: ".5s" }}>Personal executive portfolio</p>
            <div className="font-display mt-3 leading-[0.95] md:mt-4">
              <div className="gold-text whitespace-nowrap text-[8.2vw] tracking-wide md:text-[5.7vw]"><Letters text={person.first} /></div>
              <div className="gold-text text-[19vw] tracking-wide md:text-[13.5vw]"><Letters text={person.last} start={6} /></div>
            </div>
          </div>

          <div className="layer-copy absolute right-5 bottom-[5vh] z-30 w-[52vw] md:right-[4vw] md:bottom-[9vh] md:w-[56vw]">
            <p className="fade-up font-cond text-[13px] font-semibold tracking-[0.18em] text-ivory uppercase md:text-[clamp(1.1rem,2.1vw,1.8rem)] md:tracking-[0.2em]" style={{ ["--d" as string]: ".7s" }}>{person.role}</p>
            <p className="fade-up mt-1.5 font-mono text-[9px] leading-relaxed tracking-[0.16em] text-dim uppercase md:mt-2 md:text-[11px] md:tracking-[0.18em]" style={{ ["--d" as string]: ".85s" }}>{person.roles}</p>
            <ul className="mt-4 hidden space-y-1 md:block">
              {person.lines.map((l, i) => (
                <li key={l} className="fade-up font-cond text-lg tracking-[0.12em] text-gold uppercase" style={{ ["--d" as string]: `${1 + i * 0.12}s` }}>{l}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-5">
              <button type="button" onClick={() => scrollToEl("statement")} className="fade-up btn-gold font-cond px-4 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase md:px-5 md:text-[12px] md:tracking-[0.22em]" style={{ ["--d" as string]: "1.3s" }}>Explore the empire ↓</button>
              <p className="fade-up hidden font-mono text-[10px] tracking-[0.3em] text-dim uppercase md:block md:text-[11px]" style={{ ["--d" as string]: "1.2s" }}>{person.ventures}</p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </section>
  );
}
