/** Brand wordmark: "vcu media" set in the display face. */
export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`font-display text-[1.45rem] font-extrabold leading-none tracking-[-0.02em] ${
        inverted ? "text-night" : "text-ink"
      }`}
    >
      vcu
      <small className="ml-0.5 text-[0.95rem] font-semibold opacity-65">
        media
      </small>
    </span>
  );
}

/** Circular brand mark with the ✦ sparkle — recreated from the reference logo SVG. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <path
        d="M162 38 m0 -34 q7 27 34 34 q-27 7 -34 34 q-7 -27 -34 -34 q27 -7 34 -34"
        className="fill-night"
        transform="scale(1.35) translate(-42 -10)"
      />
      <path
        d="M162 38 m0 -26 q5.5 20.5 26 26 q-20.5 5.5 -26 26 q-5.5 -20.5 -26 -26 q20.5 -5.5 26 -26"
        fill="currentColor"
      />
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fontFamily="var(--font-baloo)"
        fontWeight="800"
        fontSize="58"
        fill="currentColor"
      >
        vcu
      </text>
    </svg>
  );
}
