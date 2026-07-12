"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { BrandMark } from "./Logo";
import Magnetic from "./ui/magnetic";
import { SparklesCore } from "./ui/sparkles";
import { EASE } from "@/lib/variants";

const META = [
  { n: "120+", l: "brands amplified" },
  { n: "4.2x", l: "average ROAS" },
  { n: "0", l: "buzzwords used" },
] as const;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/**
 * Cinematic hero (choreography from 21st.dev
 * @easemize/cinematic-landing-hero, rebuilt on framer-motion):
 *
 *   Load:   ONLY the mission line on the bare night ground — line one
 *           blur-rises in, "impossible to ignore." wipes in via
 *           clip-path (the component's second-tagline treatment) —
 *           plus a bouncing ↓. No navbar, no starfield.
 *   Scroll: the line scales up and dissolves; the starry window (the
 *           sparkle field lives inside it) pops up from the bottom
 *           carrying the full previous hero, whose elements pop in at
 *           staggered beats. The navbar slides in once the window
 *           is rising (see Navbar).
 *
 * Reduced motion: the static hero, headline included, no pin.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const cinematic = !reduce;
  const wrapRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // intro dissolve — opacity/filter written to the DOM directly
  // (scroll-linked opacity MotionValues in `style` proved unreliable)
  const introRef = useRef<HTMLDivElement>(null);
  const introScale = useTransform(scrollYProgress, [0.08, 0.35], [1, 1.18]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const el = introRef.current;
    if (!el) return;
    el.style.opacity = String(1 - clamp01((v - 0.08) / 0.24));
    el.style.filter = `blur(${18 * clamp01((v - 0.08) / 0.27)}px)`;
    el.style.pointerEvents = v > 0.3 ? "none" : "";
  });

  // the starry window rises slightly small, then swells to full-bleed
  // (the component's width/height expansion, done with scale + radius)
  const cardRef = useRef<HTMLDivElement>(null);
  const cardY = useTransform(scrollYProgress, [0.18, 0.5], ["112vh", "0vh"]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.64], [0.92, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const card = cardRef.current;
    if (!card) return;
    const t = clamp01((v - 0.5) / 0.14);
    card.style.borderRadius = `${22 * (1 - t)}px`;
    card.style.borderColor = `rgba(246,241,172,${1 - t})`;
  });

  // staggered pops: headline, eyebrow, paragraph, CTAs, meta ×3, mark
  const POP_WINDOWS = [
    [0.56, 0.64], // 0 headline
    [0.6, 0.67], // 1 eyebrow
    [0.63, 0.7], // 2 paragraph
    [0.66, 0.73], // 3 CTAs
    [0.69, 0.76], // 4 meta 0
    [0.71, 0.78], // 5 meta 1
    [0.73, 0.8], // 6 meta 2
    [0.54, 0.66], // 7 mark (opacity only — framer owns its transform)
  ] as const;
  const popRefs = useRef<(HTMLElement | null)[]>([]);
  const setPopRef = (i: number) => (el: HTMLElement | null) => {
    popRefs.current[i] = el;
  };
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    POP_WINDOWS.forEach(([a, b], i) => {
      const el = popRefs.current[i];
      if (!el) return;
      const t = clamp01((v - a) / (b - a));
      el.style.opacity = String(t);
      if (i < 7) el.style.transform = `translateY(${46 * (1 - t)}px)`;
    });
  });
  const popInitial = (i: number): React.CSSProperties | undefined =>
    cinematic
      ? i < 7
        ? { opacity: 0, transform: "translateY(46px)" }
        : { opacity: 0 }
      : undefined;
  const markScale = useTransform(scrollYProgress, [0.54, 0.7], [0.55, 1]);
  const markRotate = useTransform(scrollYProgress, [0.54, 0.7], [-10, 0]);

  // mouse tilt on the mark
  const tiltSpring = { stiffness: 120, damping: 20, mass: 0.6 };
  const tiltX = useSpring(useMotionValue(0), tiltSpring);
  const tiltY = useSpring(useMotionValue(0), tiltSpring);
  function onStageMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    tiltY.set((e.clientX / window.innerWidth - 0.5) * 16);
    tiltX.set(-(e.clientY / window.innerHeight - 0.5) * 16);
  }

  const headlineCls =
    "mb-[22px] text-[clamp(2rem,5.2vw,4.6rem)] font-display font-extrabold leading-[1.08] tracking-[-0.01em]";
  const headlineText = (
    <>
      Good brands deserve to be{" "}
      <span className="underline-pop inline-block">
        impossible to ignore.
      </span>
    </>
  );

  const heroCard = (
    <div className="wrap w-full">
      <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-[clamp(30px,6vw,110px)]">
        <div>
          <div ref={setPopRef(1)} style={popInitial(1)} className="eyebrow">
            vcu media — marketing, minus the fluff
          </div>

          {cinematic ? (
            <p
              aria-hidden="true"
              ref={setPopRef(0)}
              style={popInitial(0)}
              className={headlineCls}
            >
              {headlineText}
            </p>
          ) : (
            <h1 className={headlineCls}>{headlineText}</h1>
          )}

          <p
            ref={setPopRef(2)}
            style={popInitial(2)}
            className="mb-[30px] max-w-[620px] text-[clamp(1rem,1.4vw,1.24rem)] font-semibold text-khaki"
          >
            That&apos;s the mission. You&apos;re already doing great work — the
            internet just hasn&apos;t caught on yet. We build the strategy,
            content, and campaigns that fix that. No buzzwords. No 40-slide
            decks about &ldquo;synergy.&rdquo; Just work that works.
          </p>

          <div
            ref={setPopRef(3)}
            style={popInitial(3)}
            className="flex flex-wrap gap-3.5"
          >
            <Magnetic className="max-sm:basis-full">
              <a href="#contact" className="btn-ink block">
                Start a project
              </a>
            </Magnetic>
            <Magnetic className="max-sm:basis-full">
              <a href="#work" className="btn-ghost block">
                See the receipts
              </a>
            </Magnetic>
          </div>

          <div className="mt-[clamp(24px,4vw,48px)] flex flex-wrap gap-[clamp(20px,4vw,52px)]">
            {META.map((s, i) => (
              <div
                key={s.l}
                ref={setPopRef(4 + i)}
                style={popInitial(4 + i)}
                className="text-[0.9rem] font-bold text-khaki"
              >
                <strong className="block font-display text-[clamp(1.5rem,1.7vw,1.9rem)] leading-tight text-ink">
                  {s.n}
                </strong>
                {s.l}
              </div>
            ))}
          </div>
        </div>

        {/* decorative mark: desktop only — on phones the card height
            is tight and the intro already carries the brand moment */}
        <div
          ref={setPopRef(7)}
          style={popInitial(7)}
          className="hidden justify-center lg:flex"
        >
          <m.div
            style={
              cinematic
                ? {
                    scale: markScale,
                    rotate: markRotate,
                    rotateX: tiltX,
                    rotateY: tiltY,
                  }
                : undefined
            }
            className="text-ink"
          >
            <div className="anim-floaty">
              {/* Supersampled: the SVG renders at 2× and is scaled down by
                  half, so the GPU texture behind the scroll/tilt transforms
                  always has double the pixels — stays crisp at rest. */}
              <div className="relative aspect-square w-[min(30vw,140px)] lg:w-[clamp(280px,22vw,400px)]">
                <div className="absolute left-1/2 top-1/2 w-[200%] -translate-x-1/2 -translate-y-1/2 scale-50">
                  <BrandMark className="h-auto w-full" />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );

  // Reduced motion: static hero, no intro, no pin
  if (!cinematic) {
    return (
      <section
        id="top"
        className="relative flex min-h-svh items-center overflow-hidden pb-[70px] pt-[130px]"
      >
        {heroCard}
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      id="top"
      onPointerMove={onStageMove}
      className="relative h-[260vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Act 1: the mission line, alone on the night ground */}
        <m.div
          ref={introRef}
          style={{ scale: introScale }}
          className="absolute inset-0 flex items-center justify-center px-5"
        >
          <div className="text-center">
            <h1 className="font-display font-extrabold leading-[1.08] text-[clamp(2.2rem,7vw,5.6rem)]">
              <m.span
                className="block"
                initial={{ y: 60, scale: 0.9, filter: "blur(16px)" }}
                animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              >
                Good brands deserve to be
              </m.span>
              {/* the component's second-line treatment: clip-path wipe */}
              <m.span
                className="underline-pop mt-1 inline-block"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1], delay: 0.9 }}
              >
                impossible to ignore.
              </m.span>
            </h1>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-10"
            >
              <span aria-hidden="true" className="anim-bounce inline-block text-3xl">
                ↓
              </span>
            </m.div>
          </div>
        </m.div>

        {/* Act 2–3: the starry window rises slightly small, then fills
            the screen; radius and border dissolve as it expands */}
        <m.div
          ref={cardRef}
          style={{ y: cardY, scale: cardScale, borderRadius: 22 }}
          className="absolute inset-0 flex items-center overflow-hidden border-2 border-ink bg-night-soft"
        >
          {/* the stars live inside the window */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [mask-image:radial-gradient(115%_95%_at_65%_40%,white_35%,transparent_80%)]"
          >
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.5}
              maxSize={1.6}
              particleDensity={70}
              speed={2}
              particleColor="#F6F1AC"
              className="h-full w-full"
            />
          </div>
          <span
            aria-hidden="true"
            className="anim-twinkle absolute right-6 top-5 text-xl"
          >
            ✦
          </span>
          <span
            aria-hidden="true"
            className="anim-twinkle absolute bottom-5 left-6 text-xl"
            style={{ animationDelay: "1.4s" }}
          >
            ✦
          </span>
          <div className="relative z-10 w-full py-6">{heroCard}</div>
        </m.div>
      </div>
    </section>
  );
}
