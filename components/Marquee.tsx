"use client";

import { useRef, useEffect } from "react";
import {
  m,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const SERVICES = [
  "Automation",
  "Performance marketing",
  "Branding",
  "Growth marketing",
  "GTM strategy",
  "Email marketing",
  "SEO",
  "GEO",
  "SMS marketing",
  "Business strategy",
];

const BASE_SPEED = 70; // px/s at rest

/**
 * Ink-yellow service ticker. The loop runs on rAF so it can react to
 * scroll velocity — flick the page and the tape whips with you, then
 * settles. Static for reduced-motion users.
 */
export default function Marquee() {
  const reduce = useReducedMotion();
  // Doubled content = seamless loop at -50%
  const items = [...SERVICES, ...SERVICES];

  const trackRef = useRef<HTMLDivElement>(null);
  const half = useRef(0);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 250,
    mass: 0.5,
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      half.current = el.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !half.current) return;
    const boost = Math.min(Math.abs(smoothVelocity.get()) / 800, 5);
    let next = x.get() - BASE_SPEED * (1 + boost) * (delta / 1000);
    if (next <= -half.current) next += half.current;
    x.set(next);
  });

  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-ink py-5 text-night"
      aria-hidden="true"
    >
      <m.div
        ref={trackRef}
        className="inline-block whitespace-nowrap"
        style={reduce ? undefined : { x }}
      >
        {items.map((s, i) => (
          <span
            key={i}
            className="mx-[30px] inline-block font-display text-[1.05rem] font-bold"
          >
            <b className="mr-[30px]">✦</b>
            {s}
          </span>
        ))}
      </m.div>
    </div>
  );
}
