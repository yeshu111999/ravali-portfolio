import Reveal, { SectionHeading } from "./Reveal";
import { education, profile, stats, strengths } from "@/data/resume";

const icons: Record<string, React.ReactNode> = {
  layers: <path d="M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
};

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div>
          <SectionHeading eyebrow="About me" title="Engineering with" accent="empathy." />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-white p-4">
                <p className="font-display text-3xl font-semibold text-rose-deep">{s.value}</p>
                <p className="mt-1 text-xs leading-snug font-medium text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={0.06 * i}>
                <div className="group h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-rose/30 hover:shadow-[0_20px_50px_-25px_rgba(179,54,92,0.4)]">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep transition group-hover:bg-rose group-hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
                      {icons[s.icon]}
                    </svg>
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 rounded-3xl border border-line bg-gradient-to-br from-white to-lilac/60 p-6">
            <p className="text-xs font-bold tracking-[0.3em] text-rose-deep uppercase">Education</p>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span>
                    <span className="block font-bold text-ink">{e.degree}</span>
                    <span className="text-sm text-muted">{e.school}</span>
                  </span>
                  {e.period && <span className="text-sm font-semibold whitespace-nowrap text-muted">{e.period}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
