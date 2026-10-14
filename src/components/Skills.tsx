import Reveal, { SectionHeading } from "./Reveal";
import { skills } from "@/data/resume";

const tints = ["bg-blush", "bg-lilac", "bg-peach", "bg-mint", "bg-blush", "bg-lilac"];

export default function Skills() {
  return (
    <section id="skills" className="relative bg-white/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Toolkit" title="What I" accent="work with." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={0.05 * (i % 3)}>
              <div className="h-full rounded-[1.75rem] border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-35px_rgba(120,40,80,0.45)]">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-2xl font-display text-lg font-semibold text-ink italic ${tints[i]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-ink">{g.group}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm font-medium text-ink/85 transition hover:border-rose/40 hover:bg-blush hover:text-rose-deep"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
