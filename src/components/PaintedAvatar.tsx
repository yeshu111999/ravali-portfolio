"use client";

import { useEffect, useRef, useState } from "react";

export type Mood =
  | "hello"
  | "left"
  | "right"
  | "up"
  | "down"
  | "near"
  | "fast"
  | "typing"
  | "wink"
  | "scrollDown"
  | "scrollUp";

type Props = {
  onMood?: (mood: Mood) => void;
  className?: string;
};

// Painted frames are 1254 x 1254; everything below is in those pixel units.
const SIZE = 1254;
const CENTER = "/avatar/center.webp";

const EYES = {
  L: {
    almond: "M546 360 C556 340 594 334 607 359 C596 373 560 375 546 360Z",
    lash: "M546 360 C560 375 596 373 607 359",
    iris: { x: 576, y: 355, r: 15.5 },
    top: 341,
  },
  R: {
    almond: "M668 348 C676 326 708 312 723 337 C712 349 680 353 668 348Z",
    lash: "M668 348 C680 353 712 349 723 337",
    iris: { x: 695.5, y: 335.5, r: 15 },
    top: 322,
  },
} as const;

// Face centre as a fraction of the frame, used for cursor maths.
const FACE = { x: 635 / SIZE, y: 360 / SIZE };
const IDLE_MS = 5000;

const clamp = (v: number, min = -1, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

const fadeBottom = "linear-gradient(to bottom, #000 80%, transparent 98%)";

export default function PaintedAvatar({ onMood, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, SVGElement | null>>({});
  const moodCb = useRef(onMood);
  const [hearts, setHearts] = useState(0);

  useEffect(() => {
    moodCb.current = onMood;
  }, [onMood]);

  const ref = (key: string) => (el: SVGElement | null) => {
    els.current[key] = el;
  };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const last = { x: 0, y: 0, t: 0 };
    const amt = { blush: 0, jolt: 0 };
    let mood: Mood = "hello";
    let scrollUntil = 0;
    let lastScroll = window.scrollY;
    let near = false;
    let lastMove = performance.now();
    let winkStart = -1;
    let fastUntil = 0;
    let nextBlink = performance.now() + 1800;
    let blinkStart = -1;
    let doubleBlink = false;
    let raf = 0;
    let visible = true;

    const emit = (m: Mood) => {
      if (m === mood) return;
      if (m === "near") setHearts((h) => h + 1);
      if (m === "fast") amt.jolt = 1;
      mood = m;
      moodCb.current?.(m);
    };

    const onPoint = (cx: number, cy: number) => {
      const now = performance.now();
      const r = el.getBoundingClientRect();
      const dx = cx - (r.left + r.width * FACE.x);
      const dy = cy - (r.top + r.height * FACE.y);
      target.x = clamp(dx / (window.innerWidth * 0.38));
      target.y = clamp(dy / (window.innerHeight * 0.42));

      const dt = now - last.t;
      if (last.t && dt > 0 && dt < 100 && Math.hypot(cx - last.x, cy - last.y) / dt > 4.2) fastUntil = now + 1000;
      last.x = cx;
      last.y = cy;
      last.t = now;
      lastMove = now;

      near = Math.hypot(dx, dy) < r.width * 0.2;
      if (now - winkStart < 2200 || now < scrollUntil) return;
      if (now < fastUntil) emit("fast");
      else if (near) emit("near");
      else if (Math.abs(dx) > Math.abs(dy) * 1.1) emit(dx < 0 ? "left" : "right");
      else emit(dy < 0 ? "up" : "down");
    };

    const onMouse = (e: MouseEvent) => onPoint(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && onPoint(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = () => {
      lastMove = 0;
      near = false;
    };
    const onClick = () => {
      winkStart = performance.now();
      lastMove = performance.now();
      emit("wink");
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    el.addEventListener("click", onClick);

    // Scrolling: she glances in the direction you're heading.
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScroll;
      lastScroll = y;
      if (Math.abs(delta) < 2) return;
      const now = performance.now();
      scrollUntil = now + 900;
      lastMove = now;
      target.x = 0;
      target.y = delta > 0 ? 1 : -1;
      emit(delta > 0 ? "scrollDown" : "scrollUp");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    const set = (key: string, transform: string) => els.current[key]?.setAttribute("transform", transform);

    function tick(now: number) {
      raf = 0;
      if (!visible) return;

      const idle = now - lastMove > IDLE_MS;
      const winking = now - winkStart < 2200;
      if (idle && !winking) {
        target.x = 0;
        target.y = 0.55;
        near = false;
        emit("typing");
      } else if (mood === "fast" && now > fastUntil) emit(near ? "near" : "hello");
      else if ((mood === "scrollDown" || mood === "scrollUp") && now > scrollUntil) {
        target.y = 0;
        emit("hello");
      }

      cur.x = lerp(cur.x, target.x, 0.075);
      cur.y = lerp(cur.y, target.y, 0.075);
      amt.blush = lerp(amt.blush, near || winking ? 1 : 0, 0.06);
      amt.jolt = lerp(amt.jolt, 0, 0.12);

      const { x, y } = cur;
      const breathe = reduced ? 0 : Math.sin(now / 1000);
      if (tilt.current) {
        const jump = amt.jolt * -14;
        tilt.current.style.transform = `translate3d(${x * 9}px, ${y * 5 + breathe * 2.2 + jump}px, 0) rotate(${x * 1.4}deg) scale(${1 + breathe * 0.004 + amt.jolt * 0.02})`;
      }

      // Irises follow the cursor.
      const ix = x * 6.5;
      const iy = y * 4.5;
      set("irisL", `translate(${ix} ${iy})`);
      set("irisR", `translate(${ix} ${iy})`);

      if (now > nextBlink) {
        blinkStart = now;
        doubleBlink = Math.random() < 0.2;
        nextBlink = now + 2600 + Math.random() * 3000;
      }
      const lid = (start: number, dur: number) => {
        const p = (now - start) / dur;
        return p >= 0 && p < 1 ? Math.sin(p * Math.PI) : 0;
      };
      let blink = lid(blinkStart, 150);
      if (doubleBlink) blink = Math.max(blink, lid(blinkStart + 260, 150));
      const wink = lid(winkStart, 520);
      const closeL = blink;
      const closeR = Math.max(blink, wink);
      set("lidL", `translate(0 ${EYES.L.top}) scale(1 ${closeL.toFixed(3)}) translate(0 ${-EYES.L.top})`);
      set("lidR", `translate(0 ${EYES.R.top}) scale(1 ${closeR.toFixed(3)}) translate(0 ${-EYES.R.top})`);
      els.current.blush?.setAttribute("opacity", (amt.blush * 0.35).toFixed(3));

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      el.removeEventListener("click", onClick);
    };
  }, []);


  return (
    <div ref={wrap} className={`relative aspect-square h-full ${className ?? ""}`} style={{ cursor: "pointer" }}>
      <div ref={tilt} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 85%" }}>
        {/* Painting + living eyes */}
        <div className="absolute inset-0 select-none" style={{ maskImage: fadeBottom, WebkitMaskImage: fadeBottom }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CENTER}
            alt="Illustrated avatar of Ravali smiling at her laptop"
            draggable={false}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full"
          />
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              {(["L", "R"] as const).map((k) => (
                <g key={k}>
                  <clipPath id={`pa-almond-${k}`}>
                    <path d={EYES[k].almond} />
                  </clipPath>
                  <clipPath id={`pa-iris-${k}`}>
                    <circle cx={EYES[k].iris.x} cy={EYES[k].iris.y} r={EYES[k].iris.r} />
                  </clipPath>
                </g>
              ))}
              <linearGradient id="pa-sclera" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b98a80" />
                <stop offset="40%" stopColor="#e2c6bf" />
                <stop offset="100%" stopColor="#f1e1dc" />
              </linearGradient>
              <linearGradient id="pa-shade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b1d16" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#3b1d16" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pa-lid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c98568" />
                <stop offset="70%" stopColor="#d99c80" />
                <stop offset="100%" stopColor="#a8634d" />
              </linearGradient>
              <radialGradient id="pa-blush">
                <stop offset="0%" stopColor="#ff6f93" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff6f93" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g ref={ref("blush")} opacity="0" style={{ mixBlendMode: "multiply" }}>
              <ellipse cx="548" cy="432" rx="52" ry="30" fill="url(#pa-blush)" />
              <ellipse cx="736" cy="414" rx="50" ry="28" fill="url(#pa-blush)" />
            </g>

            {(["L", "R"] as const).map((k) => (
              <g key={k} clipPath={`url(#pa-almond-${k})`}>
                <path d={EYES[k].almond} fill="url(#pa-sclera)" />
                <g ref={ref(`iris${k}`)}>
                  <g clipPath={`url(#pa-iris-${k})`}>
                    <image href={CENTER} width={SIZE} height={SIZE} />
                  </g>
                </g>
                <path d={EYES[k].almond} fill="url(#pa-shade)" />
                <g ref={ref(`lid${k}`)} transform={`translate(0 ${EYES[k].top}) scale(1 0) translate(0 ${-EYES[k].top})`}>
                  <path d={EYES[k].almond} fill="url(#pa-lid)" transform="scale(1.04 1.12)" style={{ transformOrigin: `${EYES[k].iris.x}px ${EYES[k].iris.y}px` }} />
                  <path d={EYES[k].lash} stroke="#2a1512" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              </g>
            ))}
          </svg>
        </div>

      </div>

      {/* Little hearts when you come close */}
      {hearts > 0 && (
        <div key={hearts} className="pointer-events-none absolute top-[14%] left-[56%]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute text-[#f08aa8] opacity-0"
              style={{
                left: `${(i - 1) * 34}px`,
                fontSize: `${16 + i * 5}px`,
                animation: `heart-rise 1.6s ease-out ${i * 0.14}s forwards`,
              }}
            >
              ♥
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
