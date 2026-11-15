import { person } from "../content";

/**
 * Stand-in for the portrait. When person.photoSrc is set (a transparent cut-out PNG/WebP),
 * the real photo is shown instead and this drawing disappears.
 */
export default function Portrait({ className = "" }: { className?: string }) {
  if (person.photoSrc) return <img src={person.photoSrc} alt={person.name} className={className} />;
  const body =
    "M0 800 L0 712 C8 628 78 574 188 544 L246 522 C252 500 254 470 254 440 L346 440 C346 470 348 500 354 522 L412 544 C522 574 592 628 600 712 L600 800 Z";
  return (
    <svg viewBox="0 0 600 800" className={className} role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d1914" />
          <stop offset="0.55" stopColor="#0d0c0a" />
          <stop offset="1" stopColor="#050504" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#241a12" />
          <stop offset="1" stopColor="#0c0907" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f2d58a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f2d58a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f2d58a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="face" cx="0.62" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#d9a441" stopOpacity="0.32" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </radialGradient>
        <clipPath id="shape">
          <path d={body} />
          <ellipse cx="300" cy="318" rx="80" ry="102" />
          <ellipse cx="222" cy="326" rx="12" ry="26" />
          <ellipse cx="378" cy="326" rx="12" ry="26" />
        </clipPath>
      </defs>
      <g style={{ filter: "drop-shadow(-3px 0 0 rgba(217,164,65,.7)) drop-shadow(3px 0 0 rgba(217,164,65,.3)) drop-shadow(0 0 36px rgba(217,164,65,.22))" }}>
        <path d={body} fill="url(#suit)" />
        {/* shirt V and lapels */}
        <path d="M262 524 L300 612 L338 524 Z" fill="#15130f" />
        <path d="M246 522 L292 640 L232 720 L150 600 Z" fill="#100f0c" stroke="#d9a441" strokeOpacity=".22" />
        <path d="M354 522 L308 640 L368 720 L450 600 Z" fill="#100f0c" stroke="#d9a441" strokeOpacity=".22" />
        <rect x="270" y="418" width="60" height="112" fill="#1a130c" />
        <ellipse cx="222" cy="326" rx="12" ry="26" fill="url(#skin)" />
        <ellipse cx="378" cy="326" rx="12" ry="26" fill="url(#skin)" />
        <ellipse cx="300" cy="318" rx="80" ry="102" fill="url(#skin)" />
        {/* hair and beard */}
        <path d="M218 300 C214 214 262 196 300 196 C340 196 386 214 382 300 C372 262 344 244 300 244 C256 244 228 262 218 300 Z" fill="#0b0a08" />
        <path d="M224 332 C230 410 262 428 300 428 C338 428 370 410 376 332 C364 372 340 384 300 384 C260 384 236 372 224 332 Z" fill="#0b0a08" />
      </g>
      {/* soft key light on the face, then a sweeping highlight clipped to the figure */}
      <ellipse cx="300" cy="320" rx="110" ry="130" fill="url(#face)" />
      <g clipPath="url(#shape)">
        <rect className="sweep" x="-120" y="0" width="240" height="800" fill="url(#beam)" transform="skewX(-14)" />
      </g>
    </svg>
  );
}
