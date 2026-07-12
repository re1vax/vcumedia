"use client";

import { Wordmark } from "./Logo";

const COLS = [
  {
    h: "Site",
    links: [
      { label: "Mission", href: "#mission" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    h: "Services",
    links: [
      { label: "Brand Strategy", href: "#services" },
      { label: "Social & Content", href: "#services" },
      { label: "Paid Media", href: "#services" },
      { label: "SEO & Web", href: "#services" },
    ],
  },
  {
    h: "Elsewhere",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/vcumedia" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/vcu-media" },
    ],
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-8 pt-16 text-night">
      <div className="wrap">
        <div className="mb-11 flex flex-col justify-between gap-7 md:flex-row md:flex-wrap md:gap-10">
          <div>
            <a href="#top" aria-label="vcu media home">
              <Wordmark inverted />
            </a>
            <p className="mt-3.5 max-w-[340px] text-[0.94rem] font-semibold opacity-75">
              One mission, every project: make good brands impossible to
              ignore. Everything else is detail.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="mb-4 text-[0.85rem] uppercase tracking-[0.14em] opacity-60">
                {c.h}
              </h4>
              {c.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="mb-2 block text-[0.94rem] font-semibold opacity-90 transition-opacity hover:opacity-55"
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-night/25 pt-6 text-[0.85rem] font-semibold opacity-80">
          <span>© {year} vcu media. Built loud, on purpose. ✦</span>
          <a href="#top" className="font-display text-[0.9rem] font-extrabold">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
