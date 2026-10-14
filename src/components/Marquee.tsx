import { marquee } from "@/data/resume";

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white/60 py-5" aria-label="Technologies">
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap text-ink/80 italic" aria-hidden={i >= marquee.length}>
            {m}
            <span className="text-rose">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}
