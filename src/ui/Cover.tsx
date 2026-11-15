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

export default function Cover() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => (section.current && stage.current ? driveStage(stage.current, section.current, true) : undefined), []);

  return (
    <section ref={section} id="cover" className="relative h-[230vh]">
      <div ref={stage} className="cover-stage sticky top-0 h-screen overflow-hidden">
        <div className="world absolute inset-0">
          <h1 className="sr-only">{person.name}, {person.role}</h1>

          {/* 1+2. The figure, with the first name layered in front of it and cut out around his head */}
          <div className="layer-figure absolute inset-x-0 bottom-0 z-20 flex justify-center">
            <div className="figure-in fig-cover">
              <Figure kind="standing" className="h-full w-full" />
              <div className="fig-name font-display leading-[0.9]">
                <div className="gold-text text-[8.3vw] tracking-tight md:text-[8.9vw]"><Letters text={person.first} /></div>
              </div>
            </div>
          </div>

          {/* 3. Surname, overlapping the figure's shoulder */}
          <div className="layer-name absolute right-[5vw] bottom-[27vh] z-30 text-right font-display leading-[0.9] md:right-[6vw] md:bottom-[20vh]">
            <div className="gold-text text-[19vw] tracking-tight md:text-[12.5vw]"><Letters text={person.last} start={6} /></div>
          </div>

          {/* 4. Supporting copy */}
          <div className="layer-copy absolute bottom-[14vh] left-5 z-30 md:bottom-[9vh] md:left-10">
            <p className="fade-up font-cond text-[clamp(1.1rem,2.2vw,1.8rem)] font-semibold tracking-[0.2em] text-ivory uppercase" style={{ ["--d" as string]: ".7s" }}>{person.role}</p>
            <p className="fade-up mt-2 max-w-[16rem] font-mono text-[10px] leading-relaxed tracking-[0.18em] text-dim uppercase md:max-w-none md:text-[11px]" style={{ ["--d" as string]: ".85s" }}>{person.roles}</p>
            <ul className="mt-5 hidden space-y-1 md:block">
              {person.lines.map((l, i) => (
                <li key={l} className="fade-up font-cond text-lg tracking-[0.12em] text-gold uppercase" style={{ ["--d" as string]: `${1 + i * 0.12}s` }}>{l}</li>
              ))}
            </ul>
          </div>

          <div className="layer-copy absolute right-5 bottom-[4vh] left-5 z-30 text-center md:left-auto md:right-10 md:bottom-[9vh] md:text-right">
            <p className="fade-up hidden font-mono text-[10px] tracking-[0.3em] text-dim uppercase md:block md:text-[11px]" style={{ ["--d" as string]: "1.2s" }}>{person.ventures}</p>
            <button type="button" onClick={() => scrollToEl("statement")} className="fade-up btn-gold font-cond mt-3 px-5 py-2.5 text-[12px] font-semibold tracking-[0.22em] uppercase" style={{ ["--d" as string]: "1.35s" }}>Explore the empire ↓</button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </section>
  );
}
