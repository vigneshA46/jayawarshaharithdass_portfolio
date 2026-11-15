import { person, rail } from "../content";
import { jump } from "../scroll";

export default function Header({ active }: { active: number }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <a href={person.mainSite} className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-ivory/90 uppercase" aria-label="JD COSMOPOLITAN">
          <img src="/brand/jd-logo.webp" alt="" width={40} height={40} className="h-10 w-10" />
          <span className="hidden sm:inline">JD COSMOPOLITAN</span>
        </a>
        <span className="font-mono text-[11px] tracking-widest text-gold">
          {String(active + 1).padStart(2, "0")} / {String(rail.length).padStart(2, "0")}
        </span>
      </header>
      <nav aria-label="Sections" className="fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {rail.map((label, i) => (
          <button key={label} type="button" onClick={() => jump(i)} aria-label={label} aria-current={active === i} className="group relative flex h-3 w-3 items-center justify-center">
            <span className={`block rounded-full transition-all ${active === i ? "h-2.5 w-2.5 bg-gold" : "h-1.5 w-1.5 bg-ivory/35 group-hover:bg-champagne"}`} />
            <span className="pointer-events-none absolute right-6 rounded bg-ink/80 px-2 py-1 text-[10px] tracking-widest whitespace-nowrap text-champagne uppercase opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
          </button>
        ))}
      </nav>
      <div aria-hidden className="pointer-events-none fixed inset-3 z-20 border border-gold/35 md:inset-4" />
    </>
  );
}
