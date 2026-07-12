"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, EASE } from "@/lib/variants";
import { WordReveal } from "./ui/word-reveal";

const FAQS = [
  {
    q: "What does “impossible to ignore” actually mean?",
    a: "It means when your ideal customer needs what you sell, you're the name in their head. Practically: more branded searches, more inbound, more “I keep seeing you everywhere.” It's our mission, and it's measurable.",
  },
  {
    q: "How much does this cost?",
    a: "Projects start around $2k; ongoing partnerships typically run $1k–$10k/month depending on scope. We'll always tell you the real number up front — no “book a call to find out” games. You just did the call part by reading this.",
  },
  {
    q: "What if it doesn't work?",
    a: "Then you don't pay. If we can't get you to at least a 2x ROAS, we refund 100% of our fee. We only win when you win, and we're happy to put our money where our mouth is.",
  },
  {
    q: "Do you lock us into long contracts?",
    a: "Nope. Month-to-month after an initial 90-day runway (real momentum takes about that long). If we're not earning our keep, you shouldn't be paying us. 94% of clients stay — that's the retention plan.",
  },
  {
    q: "We're small. Are we too small for you?",
    a: "The mission is making good brands impossible to ignore — not big ones. Some of our favorite wins started as one-person operations. If the product's good and you're serious, we're interested.",
  },
  {
    q: "How fast will we see results?",
    a: "Honest answer: paid media moves in weeks, organic and brand moves in months. Anyone promising overnight virality is selling you a lottery ticket. We'll show you leading indicators from week one so you're never guessing.",
  },
] as const;

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            Real questions
          </m.div>
          <h2 className="section-title">
            <WordReveal text="Stuff people actually ask us." />
          </h2>
        </m.div>

        <m.div
          className="mt-[clamp(30px,5vw,50px)] max-w-[880px]"
          variants={stagger(0.07)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <m.div
                key={f.q}
                variants={fadeUp}
                className="mb-3.5 overflow-hidden rounded-[18px] border-2 border-ink bg-night-soft"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-5 px-[22px] py-5 text-left font-display text-[clamp(.98rem,1.2vw,1.15rem)] font-bold"
                >
                  {f.q}
                  <m.span
                    aria-hidden="true"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 28 }
                    }
                    className="shrink-0 text-2xl leading-none"
                  >
                    +
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      key="answer"
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <m.p
                        initial={reduce ? false : { y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
                        className="max-w-[720px] px-[22px] pb-[22px] text-[0.96rem] font-semibold text-khaki"
                      >
                        {f.a}
                      </m.p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
