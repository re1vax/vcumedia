"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { m, useInView, animate, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  stagger,
  viewportOnce,
  stickerHover,
  hoverSpring,
} from "@/lib/variants";
import { WordReveal, Marker } from "./ui/word-reveal";

const STATS = [
  { to: 120, suffix: "+", label: "Brands amplified" },
  { to: 38, suffix: "M+", label: "Impressions earned" },
  { to: 4.2, suffix: "x", label: "Average ROAS", decimals: 1 },
  { to: 94, suffix: "%", label: "Clients who stay" },
] as const;

const CASES = [
  {
    badge: "D2C · Luxury Kidswear",
    thumb: "bg-pistachio",
    logo: { src: "/logos/little-tags.png", w: 414, h: 175 },
    title: "Little Tags Luxury",
    body: "Luxury kidswear with world-class product and ads that barely broke even. We rebuilt the funnel and scaled spend into what converted — INR 2M/month became INR 11M/month in four months.",
    result: "ROAS 1x → 6–7x in 4 months",
  },
  {
    badge: "D2C · Health & Recovery",
    thumb: "bg-lilac",
    logo: { src: "/logos/kula.png", w: 334, h: 96 },
    title: "Kula Recovery",
    body: "The largest recovery brand in MENA, doing AED 300k+ months. When war hit the region and demand went quiet, we protected a healthy 8x ROAS and held AED 150k months — then bounced right back to 300–400k by summer.",
    result: "8x ROAS through a downturn",
  },
  {
    badge: "D2C · Luxury Retail",
    thumb: "bg-apricot",
    logo: { src: "/logos/dikochi.png", w: 713, h: 204 },
    title: "Dikochi",
    body: "Luxury pieces at discounted rates, sold direct. Same media budget, sharper targeting and creative — monthly revenue scaled from AED 100k to AED 400k without spending an extra dirham.",
    result: "AED 100k → 400k, same budget",
  },
] as const;

/** Counts up when scrolled into view. */
function Counter({
  to,
  suffix,
  decimals = 0,
}: {
  to: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? to.toFixed(decimals) : "0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to.toFixed(decimals));
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals, reduce]);

  return (
    <div
      ref={ref}
      className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-tight"
    >
      {display}
      {suffix}
    </div>
  );
}

export default function Work() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            The receipts
          </m.div>
          <h2 className="section-title">
            <WordReveal text="Talk is cheap." />
            <br />
            <WordReveal text="Here's the" /> <Marker>proof.</Marker>
          </h2>
          <m.p variants={fadeUp} className="section-sub">
            The mission isn&apos;t a poster on our wall — it&apos;s a number on
            your dashboard. A few recent runs:
          </m.p>
        </m.div>

        {/* animated stat counters */}
        <m.div
          className="mb-[clamp(48px,8vw,80px)] mt-[clamp(36px,6vw,60px)] grid grid-cols-2 gap-[clamp(22px,1.8vw,32px)] lg:grid-cols-4"
          variants={stagger(0.1)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STATS.map((s) => (
            <m.div
              key={s.label}
              variants={fadeUp}
              className="card px-3 py-6 text-center lg:py-10"
            >
              <Counter
                to={s.to}
                suffix={s.suffix}
                decimals={"decimals" in s ? s.decimals : 0}
              />
              <div className="mt-1 text-[0.9rem] font-bold text-khaki">
                {s.label}
              </div>
            </m.div>
          ))}
        </m.div>

        {/* case studies */}
        <m.div
          className="grid gap-[clamp(22px,1.8vw,32px)] md:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.12)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CASES.map((c, i) => (
            <m.article
              key={c.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : stickerHover(i)}
              transition={hoverSpring}
              className="card flex flex-col overflow-hidden"
            >
              <div
                className={`relative flex h-[clamp(180px,14vw,230px)] items-end border-b-2 border-ink p-4 ${c.thumb}`}
              >
                {/* brand mark as ink silhouette — matches the badge/✦ ink */}
                <Image
                  src={c.logo.src}
                  width={c.logo.w}
                  height={c.logo.h}
                  alt={`${c.title} logo`}
                  className="absolute left-1/2 top-[44%] h-auto w-[min(58%,300px)] max-h-[45%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
                <span className="relative rounded-full bg-[#111] px-3 py-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink">
                  {c.badge}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-[18px] top-3.5 text-2xl text-[#111]"
                >
                  ✦
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <h3 className="mb-1.5 text-[clamp(1.2rem,1.3vw,1.4rem)]">
                  {c.title}
                </h3>
                <p className="mb-4 flex-1 text-[clamp(.93rem,1vw,1.03rem)] font-semibold text-khaki">
                  {c.body}
                </p>
                <span className="self-start rounded-full border-2 border-ink bg-night px-3.5 py-1.5 font-display text-[0.95rem] font-extrabold">
                  {c.result}
                </span>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
