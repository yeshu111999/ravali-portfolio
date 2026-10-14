"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const cards = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: "ravali-s", href: profile.linkedin },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
    { label: "Location", value: `${profile.location} · Remote-friendly`, href: undefined },
  ];

  return (
    <section id="contact" className="px-3 pb-6 sm:px-5">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ffe4ec] via-[#f6efff] to-[#fff1e6] px-6 py-20 sm:px-12 md:py-28">
        <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
        <Reveal className="relative text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-rose-deep uppercase">Contact</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl leading-[1.02] font-semibold text-ink sm:text-6xl md:text-7xl">
            Let&apos;s build something <span className="text-gradient italic">delightful</span> together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            I&apos;m open to Senior Frontend roles: onsite, hybrid or remote. Have a product that deserves a fast, accessible frontend? Say hi.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-deep"
            >
              Say hello ✉️
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-7 py-4 text-sm font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5"
            >
              {copied ? "Copied! ✓" : "Copy email"}
            </button>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-7 py-4 text-sm font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5"
            >
              Download résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const inner = (
              <>
                <p className="text-[11px] font-bold tracking-[0.2em] text-muted uppercase">{c.label}</p>
                <p className="mt-1 truncate font-semibold text-ink">{c.value}</p>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-2xl border border-white bg-white/70 px-5 py-4 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="rounded-2xl border border-white bg-white/70 px-5 py-4 backdrop-blur">
                {inner}
              </div>
            );
          })}
        </Reveal>
      </div>
      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Designed & built with React, Next.js and a lot of care.</p>
        <a href="#top" className="font-semibold text-ink hover:text-rose-deep">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
