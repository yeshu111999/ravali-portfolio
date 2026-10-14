"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal, { SectionHeading } from "./Reveal";
import { experience, type Role } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <SectionHeading eyebrow="Experience" title="Where I've" accent="grown." />
      <ol className="relative mt-16 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-gradient-to-b before:from-rose before:via-[#b89af0] before:to-transparent md:before:left-[calc(28%+11px)]">
        {experience.map((r, i) => (
          <RoleItem key={r.company} role={r} index={i} />
        ))}
      </ol>
    </section>
  );
}

function RoleItem({ role, index }: { role: Role; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="relative grid gap-4 pl-10 md:grid-cols-[28%_1fr] md:gap-10 md:pl-0">
      <Reveal className="md:pr-10 md:text-right">
        <p className="text-sm font-bold text-rose-deep">{role.period}</p>
        <p className="mt-1 text-sm text-muted">{role.location}</p>
      </Reveal>

      <span className="absolute top-1 left-0 grid h-6 w-6 place-items-center rounded-full border-4 border-cream bg-rose shadow-[0_0_0_4px_rgba(220,90,128,0.15)] md:left-[28%]">
        {index === 0 && <span className="absolute h-full w-full animate-ping rounded-full bg-rose/50" />}
      </span>

      <Reveal delay={0.05} className="md:pl-10">
        <div className="rounded-[1.75rem] border border-line bg-white p-6 transition hover:shadow-[0_24px_60px_-35px_rgba(120,40,80,0.45)] sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{role.role}</h3>
          <p className="mt-1 font-semibold text-muted">{role.company}</p>
          <ul className="mt-5 space-y-3">
            {role.highlights.map((h) => (
              <Bullet key={h}>{h}</Bullet>
            ))}
          </ul>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3 overflow-hidden"
              >
                <li className="h-0" />
                {role.more.map((h) => (
                  <Bullet key={h}>{h}</Bullet>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-rose-deep hover:underline"
          >
            {open ? "Show less" : `Show ${role.more.length} more`}
            <span className={`transition ${open ? "rotate-180" : ""}`}>↓</span>
          </button>
          <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
            {role.stack.map((s) => (
              <li key={s} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-rose-deep">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </li>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed text-muted">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
      <span>{children}</span>
    </li>
  );
}
