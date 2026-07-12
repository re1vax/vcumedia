import type { Variants } from "framer-motion";

/** Shared ease — a soft overshoot-free curve used across the page. */
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Fade-up reveal for single elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Container that staggers its children's `fadeUp` reveals. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Viewport config for scroll reveals — fire once, ~30% visible. */
export const viewportOnce = { once: true, amount: 0.3 } as const;

/** Sticker pick-up: lift + hard shadow + a small per-card tilt, like
 *  peeling a real sticker. Deterministic per index (no hydration drift). */
const TILTS = [-1.2, 0.9, -0.7, 1.1, -0.5, 0.8];
export const stickerHover = (i: number) => ({
  x: -3,
  y: -4,
  rotate: TILTS[i % TILTS.length],
  boxShadow: "6px 6px 0 0 #F6F1AC",
});

/** Snappy spring for hover gestures — crafted, not eased. */
export const hoverSpring = {
  type: "spring",
  stiffness: 380,
  damping: 16,
} as const;
