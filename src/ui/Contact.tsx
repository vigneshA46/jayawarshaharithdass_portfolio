import { closing, person } from "../content";
import Reveal from "./Reveal";

/** Scene 10: a gold slab to finish, with the three ventures and his closing lines. */
export default function Contact() {
  return (
    <section id="contact" className="relative z-10 flex min-h-screen flex-col justify-end pt-[22vh]">
      <div className="slab relative px-6 py-14 md:px-[7vw] md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal><p className="font-mono text-[11px] tracking-[0.4em] uppercase opacity-70">07 | Contact &amp; official identity</p></Reveal>
            <Reveal as="h2" className="mt-4 font-display text-[10vw] leading-[0.98] md:text-[4.4vw]" delay={0.05}>
              {closing.map((c) => (
                <span key={c} className="block">{c}</span>
              ))}
            </Reveal>
            <Reveal as="p" className="mt-6 font-cond text-sm font-semibold tracking-[0.3em] uppercase" delay={0.1}>{person.motto}</Reveal>
          </div>
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <p className="font-display text-2xl">{person.name.toUpperCase()}</p>
              <p className="mt-1 font-cond text-sm tracking-[0.25em] uppercase">{person.role}</p>
              <ul className="mt-4 space-y-1.5 text-sm font-medium">
                <li>JD COSMOPOLITAN Pvt. Ltd. — Parent Company</li>
                <li>VENTURE KARTS — Global Platform Venture</li>
                <li>JD SOVEREIGN — Subsidiary of JD COSMOPOLITAN</li>
              </ul>
            </Reveal>
            <Reveal className="grid gap-5 border-t border-black/25 pt-5 text-sm sm:grid-cols-2" delay={0.15}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-70">Email</p>
                <ul className="mt-2 space-y-2">
                  {person.emails.map(([label, addr]) => (
                    <li key={addr}>
                      <span className="block font-mono text-[9px] tracking-[0.22em] uppercase opacity-60">{label}</span>
                      <a href={`mailto:${addr}`} className="font-medium break-all underline underline-offset-4">{addr}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-70">Phone</p>
                <ul className="mt-2 space-y-2">
                  {person.phones.map(([label, href]) => (
                    <li key={href}>
                      <a href={href} className="font-medium underline underline-offset-4">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal className="flex flex-wrap gap-2" delay={0.18}>
              {person.links.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="border border-black/60 px-3 py-2 font-cond text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-[#15110a] hover:text-champagne">{label}</a>
              ))}
            </Reveal>
            <Reveal delay={0.2}>
              <a href={person.mainSite} className="inline-block bg-[#15110a] px-6 py-3 font-cond text-[12px] font-semibold tracking-[0.22em] text-champagne uppercase">Visit JD COSMOPOLITAN →</a>
            </Reveal>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-6xl text-[11px] opacity-70">© 2026 JD COSMOPOLITAN. All rights reserved.</p>
      </div>
    </section>
  );
}
