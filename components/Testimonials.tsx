"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  stagger,
  viewportOnce,
  stickerHover,
  hoverSpring,
} from "@/lib/variants";
import { WordReveal } from "./ui/word-reveal";

const QUOTES = [
  {
    text: "We sat at INR 2 million a month for longer than I'd like to admit. Four months in, we crossed 11 million, and the ads finally pay for themselves six times over.",
    initials: "CA",
    name: "Chandani Agarwal",
    role: "Founder, Little Tags Luxury",
    accent: "bg-pistachio",
  },
  {
    text: "We have partnered with them since the start, and we have grown into the largest recovery brand in the MENA region, consistently hitting high six figure months.",
    initials: "NB",
    name: "Nick Blair",
    role: "Founder & CEO, Kula Recovery",
    accent: "bg-lilac",
  },
  {
    text: "Their growth engine fundamentally changed how we run our marketing. The business grew 4x in a span of three months.",
    initials: "AS",
    name: "Amirali Sofian",
    role: "Founder, Dikochi",
    accent: "bg-apricot",
  },
] as const;

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section id="love" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            Word on the street
          </m.div>
          <h2 className="section-title">
            <WordReveal text="Don't take our word for it." />
          </h2>
        </m.div>

        <m.div
          className="mt-[clamp(36px,6vw,60px)] grid gap-[clamp(22px,1.8vw,32px)] md:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.12)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {QUOTES.map((q, i) => (
            <m.blockquote
              key={q.name}
              variants={fadeUp}
              whileHover={reduce ? undefined : stickerHover(i)}
              transition={hoverSpring}
              className="card flex flex-col gap-[18px] p-8 lg:p-9"
            >
              <div aria-hidden="true" className="tracking-[4px]">
                ✦✦✦✦✦
              </div>
              <p className="flex-1 text-[clamp(.98rem,1.05vw,1.08rem)] font-semibold">
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-[0.9rem] font-extrabold text-[#111] ${q.accent}`}
                >
                  {q.initials}
                </div>
                <div>
                  <b className="block text-[0.93rem]">{q.name}</b>
                  <small className="text-[0.8rem] font-bold text-khaki">
                    {q.role}
                  </small>
                </div>
              </footer>
            </m.blockquote>
          ))}
        </m.div>
      </div>
    </section>
  );
}
