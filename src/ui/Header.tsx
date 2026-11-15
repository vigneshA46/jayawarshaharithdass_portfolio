import { useEffect, useState } from "react";
import { person } from "../content";
import { scrollToEl } from "../scroll";

const links: [string, string][] = [
  ["About", "about"],
  ["Empire", "empire"],
  ["Philosophy", "philosophy"],
  ["Contact", "contact"],
];

export default function Header() {
  // Over the gold contact slab the bar flips to dark ink so it stays readable.
  const [onSlab, setOnSlab] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = document.querySelector<HTMLElement>("#contact .slab");
      if (!el) return;
      const r = el.getBoundingClientRect();
      setOnSlab(r.top < 50 && r.bottom > 50);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
      <a href={person.mainSite} aria-label="JD COSMOPOLITAN" className="flex items-center gap-3">
        <img src="/brand/jd-logo.webp" alt="" width={44} height={44} className="h-10 w-10 md:h-11 md:w-11" />
      </a>
      <nav aria-label="Main" className="flex items-center gap-5 md:gap-9">
        <ul className="hidden items-center gap-9 md:flex">
          {links.map(([l, id]) => (
            <li key={l}>
              <button type="button" onClick={() => scrollToEl(id)} className={`font-cond text-[13px] tracking-[0.22em] uppercase transition-colors ${onSlab ? "text-[#15110a] hover:text-black" : "text-ivory/80 hover:text-gold"}`}>{l}</button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5 md:gap-2">
          {[["JD COSMOPOLITAN", person.mainSite], ["VENTURE KARTS", person.kartsSite]].map(([label, href]) => (
            <a key={label} href={href} className={`font-cond px-2.5 py-2 text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase md:px-5 md:text-[12px] md:tracking-[0.2em] ${onSlab ? "bg-[#15110a] text-champagne" : "btn-gold"}`}>{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
