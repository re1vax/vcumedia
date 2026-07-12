"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  stagger,
  viewportOnce,
  stickerHover,
  hoverSpring,
} from "@/lib/variants";
import { WordReveal, Marker } from "./ui/word-reveal";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const SERVICES = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Branding",
    body: "Before the world can't ignore you, we figure out what makes you worth noticing. Positioning, voice, and a story that actually sounds like you.",
    tag: "→ The foundation",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Social Media",
    body: "Feeds that feel alive, not corporate. We plan it, make it, post it, and reply to the comments — so your brand shows up like a person, not a press release.",
    tag: "→ Daily presence",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    title: "Content & Video",
    body: "Scroll-stopping short-form, brand films, photography, and copy with a pulse. The stuff people actually stop for — and remember after.",
    tag: "→ The scroll-stopper",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Performance Marketing",
    body: "Ads that pay rent. Meta, Google, TikTok, YouTube — we put real money where it multiplies and kill what doesn't, fast. Every dollar accounted for.",
    tag: "→ Fuel on the fire",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "SEO & Web",
    body: "Being impossible to ignore includes page one of Google. Sites that load fast, read clean, rank well, and turn visits into conversations.",
    tag: "→ Found, not lost",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email Marketing",
    body: "The inbox is the one feed you own. Welcome flows, campaigns, and win-backs people open on purpose — no spray, no pray.",
    tag: "→ The long game",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Automation",
    body: "The boring stuff, on autopilot. Lead routing, follow-ups, reporting, CRM hygiene — we wire it all up so nothing (and nobody) slips through the cracks.",
    tag: "→ Hours back, every week",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Growth Marketing",
    body: "Experiments over guesses. We test hooks, funnels, offers, and channels — then double down on what compounds and cut what doesn't.",
    tag: "→ The compounding engine",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: "GTM Strategy",
    body: "Launching something new? We map the audience, the message, the channels, and the timing — so day one lands like a punch, not a shrug.",
    tag: "→ Day-one momentum",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    title: "Business Strategy",
    body: "Zoom out before we zoom in. Offers, pricing, positioning — the business-level calls that make every marketing dollar work harder.",
    tag: "→ The big picture",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l1.9 5.8 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.8L4.3 10.7l5.8-1.9z" />
        <circle cx="19" cy="19" r="1.5" />
        <circle cx="5" cy="4" r="1.5" />
      </svg>
    ),
    title: "GEO",
    body: "Generative Engine Optimization. When people ask ChatGPT or Claude who to hire or what to buy, we make sure your name is the answer.",
    tag: "→ The new page one",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
    title: "SMS Marketing",
    body: "Texts people actually read — 98% open rates don't lie. Timely, personal, never spammy. The shortest path between you and a yes.",
    tag: "→ Straight to the pocket",
  },
] as const;

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            What we do
          </m.div>
          <h2 className="section-title">
            <WordReveal text="Every service, one job:" />
            <br />
            <WordReveal text="make you" /> <Marker>unmissable.</Marker>
          </h2>
          <m.p variants={fadeUp} className="section-sub">
            Pick one, pick a few, or hand us the keys. Everything below is a
            different route to the same destination — a brand people can&apos;t
            scroll past.
          </m.p>
        </m.div>

        <m.div
          className="mt-[clamp(36px,6vw,60px)] grid gap-[clamp(22px,1.8vw,32px)] md:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.06)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((s, i) => (
            <m.article
              key={s.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : stickerHover(i)}
              transition={hoverSpring}
              className="card p-8 lg:px-9 lg:py-10"
            >
              <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-ink text-night">
                {s.icon}
              </div>
              <h3 className="mb-2 text-[clamp(1.25rem,1.3vw,1.45rem)]">
                {s.title}
              </h3>
              <p className="mb-3.5 text-[clamp(.95rem,1vw,1.05rem)] font-semibold text-khaki">
                {s.body}
              </p>
              <span className="font-display text-[0.85rem] font-extrabold">
                {s.tag}
              </span>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
