"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import PaintedAvatar, { type Mood } from "./PaintedAvatar";
import { profile } from "@/data/resume";

const lines: Record<Mood, string> = {
  hello: "Move your cursor to call me ✨",
  left: "Anyone here on the left? 👀",
  right: "Ooh, what's over there? 👉",
  up: "Something interesting up there? ☝️",
  down: "Psst… scroll down for my work ↓",
  near: "Hi there! 👋 I'm Ravali",
  fast: "Whoa, slow down! 😳",
  typing: "Okay… back to coding ⌨️",
  wink: "Aww, thank you 💗",
  scrollDown: "Yay, let's go! 👇",
  scrollUp: "Welcome back! 👆",
};

type Heart = { id: number; x: number; y: number; drift: number };

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [mood, setMood] = useState<Mood>("hello");
  const [hearts, setHearts] = useState<Heart[]>([]);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);
  const section = useRef<HTMLElement>(null);

  // Scroll-linked motion: she glides down and fades as you leave the hero.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Debounce so the bubble doesn't flicker while the cursor crosses zones.
  const handleMood = useCallback((m: Mood) => {
    if (pending.current) clearTimeout(pending.current);
    const instant = m === "wink" || m === "near" || m === "fast" || m === "scrollDown" || m === "scrollUp";
    pending.current = setTimeout(() => setMood(m), instant ? 0 : 220);
  }, []);

  const spawnHearts = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const batch = Array.from({ length: 5 }, () => ({
      id: nextId.current++,
      x,
      y,
      drift: (Math.random() - 0.5) * 120,
    }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => setHearts((h) => h.filter((p) => !batch.includes(p))), 1400);
  };

  return (
    <section
      id="top"
      ref={section}
      onPointerDown={spawnHearts}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[radial-gradient(ellipse_at_0%_100%,#ffe3ec_0%,transparent_45%),radial-gradient(ellipse_at_100%_20%,#f1eaff_0%,transparent_40%)]"
    >
      {/* Name */}
      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col px-5 pt-24 sm:px-8 lg:justify-center lg:px-12 lg:pt-0"
      >
        <div className="text-center lg:max-w-[40%] lg:text-left">
          <h1 className="font-display leading-[0.9] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="block text-[clamp(3rem,8vw,7rem)] font-semibold text-ink"
            >
              {profile.first}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
              className="block pb-1 text-[clamp(3rem,8vw,7rem)] font-medium text-[#e7849f] italic"
            >
              {profile.last}
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-[11px] font-bold tracking-[0.34em] text-muted uppercase sm:text-xs"
          >
            {profile.title}
          </motion.p>

          {/* Speech card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 hidden lg:block"
            role="status"
            aria-live="polite"
          >
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease }}
              className="inline-flex max-w-xs items-center gap-3 rounded-2xl border border-white bg-white/85 px-4 py-3 text-sm font-medium text-ink shadow-[0_14px_40px_-18px_rgba(179,54,92,0.35)] backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f29bb5] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ec7f9f]" />
              </span>
              {lines[mood]}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        className={`absolute bottom-0 left-0 z-10 flex h-[58%] w-full justify-center sm:h-[64%] lg:left-[8%] lg:h-[90%]`}
      >
        <motion.div style={{ y: avatarY, scale: avatarScale, opacity: avatarOpacity }} className="relative h-full origin-bottom">
          <PaintedAvatar onMood={handleMood} />
        </motion.div>
      </motion.div>

      {/* Scroll cue: a little hand pointing the way down */}
      <motion.a
        href="#about"
        style={{ opacity: cueOpacity }}
        onPointerDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="group absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2.5 rounded-full border border-white bg-white/85 py-2 pr-4 pl-2 text-[11px] font-bold tracking-[0.22em] text-ink uppercase shadow-[0_12px_30px_-14px_rgba(179,54,92,0.45)] backdrop-blur sm:flex lg:left-[6%] lg:translate-x-0 xl:left-[max(3rem,calc((100vw-80rem)/2+3rem))]"
      >
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-blush">
          <motion.span
            animate={{ y: [-14, 14] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
            className="text-lg leading-none"
          >
            👇
          </motion.span>
        </span>
        Scroll to explore
      </motion.a>

      {/* Mobile speech bubble above her head */}
      <div className="absolute bottom-[calc(58%+4px)] left-1/2 z-20 -translate-x-1/2 sm:bottom-[calc(64%+4px)] lg:hidden" aria-hidden>
        <motion.div
          key={mood}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease }}
          className="rounded-2xl border border-white bg-white/90 px-3.5 py-2 text-xs font-medium whitespace-nowrap text-ink shadow-lg"
        >
          {lines[mood]}
        </motion.div>
      </div>

      {/* Click hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            aria-hidden
            initial={{ opacity: 1, x: h.x - 10, y: h.y - 10, scale: 0.4 }}
            animate={{ opacity: 0, x: h.x - 10 + h.drift, y: h.y - 140 - Math.abs(h.drift) * 0.4, scale: 1.1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="pointer-events-none absolute top-0 left-0 z-30 text-xl text-[#ef7fa0]"
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </section>
  );
}
