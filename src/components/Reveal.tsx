"use client";

import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <Reveal>
      <p className="text-xs font-bold tracking-[0.3em] text-rose-deep uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight font-semibold text-ink sm:text-5xl md:text-6xl">
        {title} <span className="text-gradient italic">{accent}</span>
      </h2>
    </Reveal>
  );
}
