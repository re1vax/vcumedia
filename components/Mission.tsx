"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  stagger,
  viewportOnce,
  stickerHover,
  hoverSpring,
} from "@/lib/variants";
import { Marker } from "./ui/word-reveal";

const VALUES = [
  {
    num: "01 · KEEP IT REAL",
    title: "No smoke, no mirrors",
    body: "We won't dress up vanity metrics as wins or hide behind jargon. If something's working, you'll see it. If it's not, you'll hear it from us first — with a plan to fix it.",
  },
  {
    num: "02 · DO THE WORK",
    title: "Sweat the small stuff",
    body: "Being impossible to ignore isn't luck. It's a hundred small decisions done right — the hook, the headline, the timing, the follow-up. We obsess over all of it so you don't have to.",
  },
  {
    num: "03 · EARN ATTENTION",
    title: "Don't beg for it",
    body: "People aren't dumb, and their scroll thumb is fast. We make stuff worth stopping for — content people actually want — because earned attention converts, and interrupted attention bounces.",
  },
] as const;

export default function Mission() {
  const reduce = useReducedMotion();

  return (
    <section id="mission" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            The mission
          </m.div>
          <m.p
            variants={fadeUp}
            className="mb-[clamp(36px,6vw,60px)] max-w-[1060px] font-display text-[clamp(1.5rem,3.2vw,2.9rem)] font-bold leading-[1.25]"
          >
            Somewhere out there, someone needs exactly what you do —
            they&apos;ve just never heard of you. That&apos;s not a you
            problem. That&apos;s a noise problem. Our whole job is cutting
            through it, so good brands become{" "}
            <Marker>impossible to ignore.</Marker>
          </m.p>
        </m.div>

        <m.div
          className="grid gap-[clamp(22px,1.8vw,32px)] md:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.12)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {VALUES.map((v, i) => (
            <m.div
              key={v.num}
              variants={fadeUp}
              whileHover={reduce ? undefined : stickerHover(i)}
              transition={hoverSpring}
              className="card p-8 lg:px-9 lg:py-10"
            >
              <span className="mb-3.5 inline-block rounded-full bg-ink px-3 py-1 font-display text-[0.82rem] font-extrabold tracking-[0.14em] text-night">
                {v.num}
              </span>
              <h3 className="mb-2 text-[clamp(1.3rem,1.3vw,1.5rem)]">
                {v.title}
              </h3>
              <p className="text-[clamp(.96rem,1vw,1.05rem)] font-semibold text-khaki">
                {v.body}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
