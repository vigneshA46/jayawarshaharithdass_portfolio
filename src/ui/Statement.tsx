import { person } from "../content";
import StageSection from "./StageSection";

const words = ["Time", "and", "Word", "build", "empire."];

/** Scene 2: TIME and WORD arrive from opposite sides and resolve into his line. */
export default function Statement() {
  return (
    <StageSection id="statement" height="280vh">
      <p aria-hidden className="st-time gold-text absolute top-[12vh] left-[4vw] font-display text-[19vw] leading-[0.85] tracking-tight md:top-[10vh] md:text-[16vw]">TIME</p>
      <p aria-hidden className="st-word gold-text absolute right-[4vw] bottom-[11vh] font-display text-[19vw] leading-[0.85] tracking-tight md:bottom-[9vh] md:text-[16vw]">WORD</p>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <p className="max-w-[18ch] text-center font-display text-[11vw] leading-[1.05] text-ivory md:max-w-[22ch] md:text-[5.4vw]" aria-label={person.motto}>
          {words.map((w, i) => (
            <span key={w} aria-hidden>
              <span className={`wd ${i === 0 || i === 2 ? "gold-text" : ""}`} style={{ ["--k" as string]: i, ["--n" as string]: words.length }}>{w}</span>{" "}
            </span>
          ))}
        </p>
      </div>
      <p className="ab-fade absolute inset-x-0 bottom-[3vh] z-10 text-center font-mono text-[10px] tracking-[0.4em] text-dim uppercase" style={{ ["--from" as string]: 0.7 }}>{person.ventures}</p>
    </StageSection>
  );
}
