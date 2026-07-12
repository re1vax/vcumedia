"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/variants";
import { WordReveal, Marker } from "./ui/word-reveal";
import Magnetic from "./ui/magnetic";

const inputCls =
  "w-full rounded-[14px] border-2 border-ink bg-[#12120c] px-4 py-3 text-[16px] font-semibold text-ink transition-shadow duration-150 focus:outline-none focus:shadow-focus-ink appearance-none";
const labelCls =
  "mb-[7px] block font-display text-[0.85rem] font-extrabold";
const errCls = "mt-1.5 text-[0.8rem] font-bold text-[#ff8f86]";

/**
 * Submissions are delivered by Web3Forms (https://web3forms.com) to the
 * inbox tied to NEXT_PUBLIC_WEB3FORMS_KEY. The key is designed to be
 * public. Until the key is set, the form runs in demo mode: validation
 * and the success state work, but nothing is delivered.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Contact() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capture before any await
    const val = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLTextAreaElement)
        .value;

    const next = {
      name: !(val("name").trim().length > 0),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email").trim()),
      message: !(val("message").trim().length > 5),
    };
    setErrors(next);
    if (next.name || next.email || next.message) return;

    if (!WEB3FORMS_KEY) {
      console.warn("Web3Forms key missing — contact form is in demo mode.");
      setSent(true);
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New lead — vcu media site",
          from_name: "vcu media website",
          name: val("name").trim(),
          email: val("email").trim(),
          company: val("company").trim(),
          budget: val("budget"),
          message: val("message").trim(),
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  const clearError = (field: keyof typeof errors) =>
    setErrors((p) => (p[field] ? { ...p, [field]: false } : p));

  return (
    <section id="contact" className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <m.div
          variants={stagger(0.08)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.div variants={fadeUp} className="eyebrow">
            Say hey
          </m.div>
          <h2 className="section-title">
            <WordReveal text="Ready to be" />
            <br />
            <Marker>impossible to ignore?</Marker>
          </h2>
        </m.div>

        <div className="mt-[clamp(30px,5vw,50px)] grid gap-[clamp(30px,6vw,100px)] lg:grid-cols-[1fr_1.2fr]">
          <m.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="mb-[26px] max-w-[440px] text-[clamp(1rem,1.05vw,1.08rem)] font-semibold text-khaki">
              Tell us what you&apos;re building. We read every message
              ourselves — no bots, no SDR handoffs — and reply within one
              business day.
            </p>
            {[
              "hello@vcumedia.com",
              "(+91) 8368759412",
              "Greater Noida, UP — working everywhere",
            ].map((line) => (
              <div
                key={line}
                className="mb-4 flex items-center gap-3 text-[0.97rem] font-bold"
              >
                <span aria-hidden="true">✦</span>
                {line}
              </div>
            ))}
          </m.div>

          <m.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="card p-6 shadow-sticker lg:p-11">
              <AnimatePresence mode="wait" initial={false}>
                {!sent ? (
                  <m.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="mb-4">
                        <label htmlFor="name" className={labelCls}>
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name"
                          onInput={() => clearError("name")}
                          className={`${inputCls} ${errors.name ? "border-[#ff8f86]" : ""}`}
                        />
                        {errors.name && (
                          <div className={errCls}>
                            We need a name to say hey back.
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className={labelCls}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="you@company.com"
                          onInput={() => clearError("email")}
                          className={`${inputCls} ${errors.email ? "border-[#ff8f86]" : ""}`}
                        />
                        {errors.email && (
                          <div className={errCls}>
                            That email doesn&apos;t look right.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="mb-4">
                        <label htmlFor="company" className={labelCls}>
                          Company <span className="opacity-50">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Brand or company"
                          className={inputCls}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="budget" className={labelCls}>
                          Monthly budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          defaultValue="$1k – $5k"
                          className={`${inputCls} select-chevron`}
                        >
                          <option>Under $1k</option>
                          <option>$1k – $5k</option>
                          <option>$5k – $10k</option>
                          <option>$10k+</option>
                          <option>Not sure yet</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className={labelCls}>
                        What&apos;s the goal?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your brand and what 'impossible to ignore' would look like for you..."
                        onInput={() => clearError("message")}
                        className={`${inputCls} min-h-[120px] resize-y ${errors.message ? "border-[#ff8f86]" : ""}`}
                      />
                      {errors.message && (
                        <div className={errCls}>
                          Give us a sentence or two to work with.
                        </div>
                      )}
                    </div>
                    <Magnetic className="w-full" strength={0.12}>
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-ink w-full disabled:cursor-wait disabled:opacity-70"
                      >
                        {sending ? "Sending…" : "Send it →"}
                      </button>
                    </Magnetic>
                    {sendError && (
                      <p className={`${errCls} mt-3 text-center`}>
                        Something went wrong on our end. Email us directly at{" "}
                        <a href="mailto:hello@vcumedia.com" className="underline">
                          hello@vcumedia.com
                        </a>
                        .
                      </p>
                    )}
                  </m.form>
                ) : (
                  <m.div
                    key="success"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-sticker bg-ink px-8 py-11 text-center text-night"
                  >
                    <h3 className="mb-2 text-2xl">Message received. 🤝</h3>
                    <p className="font-semibold opacity-85">
                      A real human will hit you back within one business day.
                      Meanwhile, go make something good. We&apos;ll handle the
                      &ldquo;impossible to ignore&rdquo; part.
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
