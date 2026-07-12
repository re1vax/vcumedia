"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic hover: the wrapped element is gently pulled toward the cursor
 * and springs back on leave; pressing gives a sticker-squish. Pointer-only
 * flourish — inert for reduced-motion users and touch (no pointermove).
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 320, damping: 18, mass: 0.5 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.96, scaleY: 0.92 }}
      style={reduce ? undefined : { x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </m.div>
  );
}
