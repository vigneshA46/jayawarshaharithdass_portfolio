import { about, closing, focus, mission, person, philosophy, principles, ventures, vision } from "../content";
import Reveal from "./Reveal";
import Section from "./Section";

const eyebrow = "font-mono text-[11px] tracking-[0.32em] text-gold uppercase";
const h2 = "mt-3 text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.04] font-semibold tracking-tight text-ivory";
const body = "mt-4 text-[15px] leading-relaxed text-ivory/80 md:text-base";

function Num({ n }: { n: string }) {
  return <p className={eyebrow}>{n}</p>;
}

type V = (typeof ventures)["parent"];
function Venture({ v }: { v: V }) {
  return (
    <div className="panel rounded-sm p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Num n={`${v.no} | ${v.tag}`} />
          <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-tight font-semibold text-ivory">{v.name}</h2>
        </div>
        {v.logoSrc ? (
          <img src={v.logoSrc} alt="" className="h-14 w-14 shrink-0 object-contain" />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-gold/50 text-center font-mono text-[8px] leading-tight tracking-wider text-gold/70 uppercase">Logo to be added</div>
        )}
      </div>
      <p className="mt-2 text-xs font-semibold tracking-wide text-dim">{v.kind}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ivory/85">{v.text}</p>
      <ul className="mt-5 space-y-2 border-t border-gold/25 pt-4">
        {v.items.map((it) => (
          <li key={it} className="flex gap-3 text-sm text-ivory/90">
            <span className="mt-[7px] h-1 w-1 shrink-0 bg-gold" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sections() {
  return (
    <>
      {/* 01 Cover */}
      <Section id="cover" side="left">
        <p className={eyebrow}>Personal executive portfolio</p>
        <h1 className="mt-5 text-[clamp(2rem,8.2vw,3.9rem)] leading-[0.98] font-bold tracking-tight">
          <span className="gold-text block">{person.first}</span>
          <span className="gold-text block">{person.last}</span>
        </h1>
        <p className="mt-4 text-lg font-semibold tracking-[0.18em] text-ivory uppercase">{person.role}</p>
        <p className="mt-2 text-[11px] tracking-[0.2em] text-dim uppercase md:text-xs">{person.roles}</p>
        <div className="mt-7 space-y-1 text-lg font-semibold text-champagne md:text-xl">
          {person.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <p className="mt-7 text-[11px] tracking-[0.26em] text-dim uppercase">{person.ventures}</p>
        <p className="mt-1 text-sm font-bold tracking-[0.12em] text-gold uppercase">{person.motto}</p>
        <div className="mt-8 hidden items-center gap-3 text-[10px] tracking-[0.3em] text-dim uppercase md:flex">
          <span className="cue block h-10 w-px bg-gold" /> Scroll
        </div>
      </Section>

      {/* 02 About */}
      <Section id="about" side="right">
        <Reveal><Num n="01 | About me" /></Reveal>
        <Reveal as="h2" className={h2} delay={0.05}>Vision. Discipline. Execution.</Reveal>
        <Reveal className="mt-4 flex flex-wrap gap-2" delay={0.1}>
          {principles.map((p) => (
            <span key={p} className="border border-gold/45 px-3 py-1 text-[11px] tracking-[0.2em] text-champagne uppercase">{p}</span>
          ))}
        </Reveal>
        <div className="mt-2 flex items-start gap-5">
          <div className="min-w-0 flex-1">
            {about.map((t, i) => (
              <Reveal as="p" key={i} className={`${body} ${i === about.length - 1 ? "font-semibold text-champagne" : ""}`} delay={0.12 + i * 0.05}>{t}</Reveal>
            ))}
          </div>
          <Reveal className="hidden w-32 shrink-0 sm:block md:w-36" delay={0.2}>
            <div className="mt-4 flex aspect-[4/5] items-center justify-center border border-dashed border-gold/50 bg-ink/50 p-2 text-center font-mono text-[9px] leading-snug tracking-wider text-gold/70 uppercase">
              {person.photoSrc ? <img src={person.photoSrc} alt={person.name} className="h-full w-full object-cover" /> : "Portrait to be added"}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 03 Empire */}
      <Section id="parent" side="left">
        <Reveal><p className={eyebrow}>02 | My business empire</p></Reveal>
        <Reveal as="h2" className="mt-3 mb-5 text-[clamp(1.5rem,3.2vw,2.3rem)] font-semibold text-champagne" delay={0.05}>Three companies. Three identities. One vision.</Reveal>
        <Reveal delay={0.1}><Venture v={ventures.parent} /></Reveal>
      </Section>
      <Section id="karts" side="right">
        <Reveal><Venture v={ventures.karts} /></Reveal>
      </Section>
      <Section id="sovereign" side="left">
        <Reveal><Venture v={ventures.sovereign} /></Reveal>
      </Section>

      {/* 06 Vision */}
      <Section id="vision" side="center">
        <div className="text-center md:mb-[34vh]">
          <Reveal><Num n="03 | My vision" /></Reveal>
          <Reveal as="h2" className="mt-3 text-[clamp(1.5rem,3.6vw,2.7rem)] leading-tight font-semibold text-ivory" delay={0.05}>{vision[0]}</Reveal>
          <div className="mx-auto mt-5 max-w-2xl">
            <Reveal as="p" className="text-[15px] leading-relaxed text-ivory/80 md:text-base" delay={0.1}>{vision[1]}</Reveal>
            <Reveal as="p" className="mt-3 text-[15px] font-semibold text-champagne md:text-base" delay={0.15}>{vision[2]}</Reveal>
          </div>
        </div>
      </Section>

      {/* 07 Philosophy */}
      <section id="philosophy" data-stop className="relative z-10 px-6 py-[12vh] md:px-[8vw]">
        <div className="max-w-[34rem]">
          <Reveal><Num n="04 | My leadership philosophy" /></Reveal>
          <Reveal as="h2" className={h2} delay={0.05}>Five words that guide every decision.</Reveal>
          <ul className="mt-10 space-y-[14vh] md:space-y-[18vh]">
            {philosophy.map(([k, v]) => (
              <li key={k} data-pillar>
                <Reveal>
                  <div className="panel rounded-sm p-5 md:p-6">
                    <p className="gold-text text-3xl font-bold tracking-wide uppercase md:text-4xl">{k}</p>
                    <p className="mt-2 text-[15px] text-ivory/85 md:text-base">{v}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal as="p" className="mt-[14vh] text-lg font-bold tracking-[0.1em] text-gold uppercase" delay={0.05}>{person.motto}</Reveal>
        </div>
      </section>

      {/* 08 Focus */}
      <Section id="focus" side="center">
        <div className="md:mb-[26vh]">
          <Reveal><Num n="05 | My professional focus" /></Reveal>
          <Reveal as="h2" className={h2} delay={0.05}>Where the work happens.</Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {focus.map((f, i) => (
              <Reveal as="li" key={f} delay={0.08 + i * 0.05} className="panel flex items-center gap-4 rounded-sm px-4 py-3 text-sm text-ivory/90 md:text-[15px]">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 09 Mission */}
      <Section id="mission" side="right">
        <Reveal><Num n="06 | My personal mission" /></Reveal>
        <Reveal as="h2" className={h2} delay={0.05}>{mission.title}</Reveal>
        {mission.text.map((t, i) => (
          <Reveal as="p" key={i} className={body} delay={0.1 + i * 0.05}>{t}</Reveal>
        ))}
        <Reveal as="p" className="mt-6 border-l-2 border-gold pl-4 text-lg leading-snug font-semibold text-champagne md:text-xl" delay={0.2}>{mission.closing}</Reveal>
      </Section>

      {/* 10 Contact */}
      <Section id="contact" side="left">
        <Reveal><Num n="07 | Contact & official identity" /></Reveal>
        <Reveal as="h2" className="gold-text mt-3 text-[clamp(1.8rem,4.4vw,3.2rem)] leading-[1.02] font-bold tracking-tight" delay={0.05}>{person.name.toUpperCase()}</Reveal>
        <Reveal as="p" className="mt-2 text-lg font-semibold tracking-[0.18em] uppercase" delay={0.08}>{person.role}</Reveal>
        <Reveal className="mt-6 space-y-1.5 text-sm text-ivory/85" delay={0.12}>
          <p>JD COSMOPOLITAN Pvt. Ltd. — Parent Company</p>
          <p>VENTURE KARTS — Global Platform Venture</p>
          <p>JD SOVEREIGN — Subsidiary of JD COSMOPOLITAN</p>
        </Reveal>
        <Reveal className="mt-6 grid gap-4 border-t border-gold/25 pt-5 sm:grid-cols-2" delay={0.16}>
          <div>
            <p className={eyebrow}>Official website</p>
            <p className="mt-1 text-sm text-dim">{person.website ? <a href={person.website} className="text-champagne underline">{person.website}</a> : "To be added"}</p>
          </div>
          <div>
            <p className={eyebrow}>Official email</p>
            <p className="mt-1 text-sm text-dim">{person.email ? <a href={`mailto:${person.email}`} className="text-champagne underline">{person.email}</a> : "To be added"}</p>
          </div>
        </Reveal>
        <Reveal className="mt-7 space-y-0.5 text-sm font-bold tracking-[0.14em] text-gold uppercase" delay={0.2}>
          {closing.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </Reveal>
        <Reveal as="p" className="mt-3 text-[11px] tracking-[0.2em] text-dim uppercase" delay={0.24}>{person.motto}</Reveal>
        <Reveal as="p" className="mt-8 text-[11px] text-dim" delay={0.28}>
          © 2026 JD COSMOPOLITAN. All rights reserved. <a href={person.mainSite} className="text-champagne underline-offset-2 hover:underline">jdcosmopolitan.com</a>
        </Reveal>
      </Section>
    </>
  );
}
