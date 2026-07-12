"use client";

import { m } from "framer-motion";
import { EASE } from "@/lib/variants";

/**
 * Word-mask reveal: each word slides up out of its own clipped line box.
 * Participates in the parent's hidden/visible variant propagation, so it
 * drops into any existing whileInView container. Screen readers get the
 * plain string via aria-label; the animated spans are hidden from them.
 */
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              visible: {
                y: 0,
                transition: { duration: 0.55, ease: EASE, delay: i * 0.05 },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Marker underline that draws itself left-to-right when the section
 * reveals — replaces the static .underline-pop pseudo-element.
 */
export function Marker({ children }: { children: React.ReactNode }) {
  return (
    // inline-block: gives the absolute bar a real box to anchor to —
    // plain inline containers place it against the line box and the
    // bar drifts below the text on wrapped/mobile layouts
    <span className="relative inline-block">
      {children}
      <m.span
        aria-hidden="true"
        className="absolute bottom-[0.1em] left-0 right-0 -z-10 h-[0.18em] origin-left rounded-full bg-ink/[0.14]"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { delay: 0.55, duration: 0.6, ease: EASE },
          },
        }}
      />
    </span>
  );
}
