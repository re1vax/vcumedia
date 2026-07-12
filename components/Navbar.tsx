"use client";

import { useState, useEffect, useCallback } from "react";
import {
  m,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Wordmark } from "./Logo";
import Magnetic from "./ui/magnetic";
import { EASE } from "@/lib/variants";

const LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pastIntro, setPastIntro] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 10);
    // hidden during the hero intro; slides in as the starry window rises
    setPastIntro(v > window.innerHeight * 0.32);
  });
  const show = reduce ? true : pastIntro || open;

  const close = useCallback(() => setOpen(false), []);

  // Scroll spy: the active link's underline slides between items
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <m.header
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-[100] border-b-2 transition-colors duration-300 ${
        scrolled ? "border-ink" : "border-transparent"
      } ${show ? "" : "pointer-events-none"}`}
    >
      {/* Frosted backdrop on its own layer so the fixed mobile menu
          isn't trapped by backdrop-filter's containing block */}
      <div className="absolute inset-0 -z-10 bg-night/85 backdrop-blur-md" />

      <nav className="wrap flex h-[76px] items-center justify-between gap-4">
        <a href="#top" aria-label="vcu media home">
          <Wordmark />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-9">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`font-display text-[0.95rem] font-bold transition-opacity hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-65"
                  }`}
                >
                  {l.label}
                </a>
                {isActive && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute -bottom-[8px] left-0 right-0 h-[3px] rounded-full bg-ink"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3.5">
          <Magnetic className="hidden lg:inline-block" strength={0.4}>
            <a
              href="#contact"
              className="btn-ink block !px-5 !py-2.5 !text-[0.92rem]"
            >
              Let&apos;s talk
            </a>
          </Magnetic>

          {/* Hamburger */}
          <button
            className="relative z-[110] p-2 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {[0, 1, 2].map((i) => (
              <m.span
                key={i}
                className="my-[5px] block h-[3px] w-[26px] rounded bg-ink"
                animate={
                  open
                    ? i === 0
                      ? { y: 8, rotate: 45 }
                      : i === 1
                        ? { opacity: 0 }
                        : { y: -8, rotate: -45 }
                    : { y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <m.ul
              key="mobile-menu"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8 overflow-y-auto bg-night lg:hidden"
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="font-display text-2xl font-bold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={close} className="btn-ink">
                  Let&apos;s talk
                </a>
              </li>
            </m.ul>
          )}
        </AnimatePresence>
      </nav>
    </m.header>
  );
}
