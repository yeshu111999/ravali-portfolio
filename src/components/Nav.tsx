"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/70 bg-cream/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12" aria-label="Main">
        <a href="#top" className="leading-tight">
          <span className="block text-[11px] font-bold tracking-[0.3em] text-ink uppercase">{profile.name}</span>
          <span className="block text-[9px] font-semibold tracking-[0.3em] text-muted uppercase">Frontend Engineer</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[11px] font-bold tracking-[0.25em] text-muted uppercase transition hover:text-[#d9668a]">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              download
              className="rounded-full border border-ink/15 px-4 py-2 text-[11px] font-bold tracking-[0.25em] text-ink uppercase transition hover:border-[#d9668a] hover:text-[#d9668a]"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-[11px] font-bold tracking-[0.25em] text-ink uppercase md:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="mx-5 mb-4 rounded-3xl border border-white bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          {[...links, { href: profile.resume, label: "Résumé" }].map((l) => (
            <li key={l.href}>
              <a onClick={() => setOpen(false)} href={l.href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-ink hover:bg-blush">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
