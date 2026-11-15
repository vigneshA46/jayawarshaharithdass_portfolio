import { about, principles } from "../content";
import StageSection from "./StageSection";
import Figure from "./Figure";

/** Scene 3: Vision. Discipline. Execution. light up one by one beside a second portrait. */
export default function About() {
  return (
    <StageSection id="about" height="330vh">
      <div className="ab-fig absolute right-[-6vw] bottom-0 z-0 h-[58vh] opacity-55 md:right-[3vw] md:h-[88vh] md:opacity-90">
        <Figure kind="close" className="h-full w-auto" />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-[6vw]">
        <p className="ab-fade font-mono text-[11px] tracking-[0.4em] text-gold uppercase" style={{ ["--from" as string]: 0 }}>01 | About me</p>
        <ul className="mt-5 font-display text-[13.5vw] leading-[0.98] md:text-[8.2vw]">
          {principles.map((w, i) => (
            <li key={w} className="ab-word" style={{ ["--k" as string]: i }}>
              {w}.
              <span aria-hidden className="gold-text">{w}.</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 max-w-[34rem] space-y-3">
          <p className="ab-fade text-[14px] leading-relaxed text-ivory/85 md:text-base" style={{ ["--from" as string]: 0.5 }}>{about[0]}</p>
          <p className="ab-fade text-[15px] font-semibold text-champagne md:text-lg" style={{ ["--from" as string]: 0.68 }}>{about[3]}</p>
        </div>
      </div>
    </StageSection>
  );
}
