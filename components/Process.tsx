"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/variants";
import { WordReveal } from "./ui/word-reveal";

const STEPS = [
  {
    num: "01",
    title: "Listen",
    body: "We dig into your brand, your customers, and your competitors. Mostly, we shut up and learn what makes you worth noticing.",
  },
  {
    num: "02",
    title: "Plan",
    body: "One clear strategy, in plain English. What we're doing, why, what it costs, and what “impossible to ignore” looks like in numbers.",
  },
  {
    num: "03",
    title: "Make",
    body: "Content, campaigns, and launches — shipped fast and polished. You'll see everything before the world does.",
  },
  {
    num: "04",
    title: "Measure & repeat",
    body: "Weekly numbers, zero spin. We double down on what's winning, cut what's not, and keep the flywheel turning.",
  },
] as const;

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            How it works
          </m.div>
          <h2 className="section-title">
            <WordReveal text="No mystery. No maze." />
            <br />
            <WordReveal text="Just four moves." />
          </h2>
          <m.p variants={fadeUp} className="section-sub">
            Agencies love making this complicated. We don&apos;t. Here&apos;s
            the whole playbook:
          </m.p>
        </m.div>

        <m.div
          className="mt-[clamp(36px,6vw,60px)] grid gap-[clamp(22px,1.8vw,32px)] sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger(0.12)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STEPS.map((s) => (
            <m.div
              key={s.num}
              variants={fadeUp}
              className="group border-l-[3px] border-ink/20 px-6 py-7 transition-colors duration-300 hover:border-ink"
            >
              <span
                className="mb-2.5 block font-display text-[clamp(2.3rem,2.4vw,2.9rem)] font-extrabold leading-none text-transparent"
                style={{ WebkitTextStroke: "1.6px #F6F1AC" }}
              >
                {s.num}
              </span>
              <h3 className="mb-2 text-[clamp(1.2rem,1.2vw,1.4rem)]">
                {s.title}
              </h3>
              <p className="text-[clamp(.93rem,1vw,1.03rem)] font-semibold text-khaki">
                {s.body}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
