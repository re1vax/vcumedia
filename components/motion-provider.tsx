"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * LazyMotion + `m` components (instead of `motion.*`) keeps the animation
 * bundle small — only the DOM animation features ship to the client.
 * `strict` throws if a full `motion` component sneaks in.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
