import Reveal, { SectionHeading } from "./Reveal";
import { projects } from "@/data/resume";

const accents = {
  rose: "from-[#ffe3ec] to-[#fff4f7]",
  lilac: "from-[#ece5ff] to-[#f8f5ff]",
  peach: "from-[#ffe8d9] to-[#fff7f1]",
  mint: "from-[#dcf3e8] to-[#f3fbf7]",
} as const;

export default function Work() {
  return (
    <section id="work" className="relative bg-white/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" title="Things I've" accent="built." />
          <Reveal>
            <p className="max-w-sm text-muted">
              Enterprise products used every day: storefronts, checkout, dashboards and portals, built for speed and accessibility.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * (i % 2)}>
              <article className="group h-full overflow-hidden rounded-[2rem] border border-line bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(120,40,80,0.45)]">
                <div className={`relative h-60 overflow-hidden bg-gradient-to-br ${accents[p.accent]} p-6 sm:h-64`}>
                  <div className="h-full transition duration-700 group-hover:scale-[1.03] group-hover:-rotate-1">
                    <Mock kind={p.kind} />
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-xs font-bold tracking-[0.2em] text-rose-deep uppercase">{p.org}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/80 ring-1 ring-line">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col overflow-hidden rounded-2xl border border-white bg-white/90 shadow-[0_20px_50px_-25px_rgba(60,30,70,0.5)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a8a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd36e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7ed99b]" />
        <span className="ml-3 h-3 flex-1 rounded-full bg-cream" />
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}

const bar = "rounded-full bg-line";

function Mock({ kind }: { kind: string }) {
  if (kind === "storefront")
    return (
      <Window>
        <div className="flex h-full gap-3">
          <div className="w-1/4 space-y-2 pt-1">
            {[70, 55, 80, 45, 60].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-sm ${i < 2 ? "bg-rose" : "border border-line"}`} />
                <span className={`h-2 ${bar}`} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-cream p-1.5">
                <div className={`aspect-square rounded-lg ${i % 3 === 0 ? "bg-[#ffd6e2]" : i % 3 === 1 ? "bg-[#e6ddff]" : "bg-[#ffe6d4]"}`} />
                <div className={`mt-1.5 h-1.5 w-4/5 ${bar}`} />
                <div className="mt-1 h-1.5 w-1/2 rounded-full bg-rose/60" />
              </div>
            ))}
          </div>
        </div>
      </Window>
    );
  if (kind === "checkout")
    return (
      <Window>
        <div className="flex h-full gap-3">
          <div className="flex-1 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-cream p-2">
                <span className={`h-8 w-8 rounded-lg ${i === 1 ? "bg-[#e6ddff]" : "bg-[#ffd6e2]"}`} />
                <span className="flex-1 space-y-1">
                  <span className={`block h-1.5 w-3/4 ${bar}`} />
                  <span className={`block h-1.5 w-1/3 ${bar}`} />
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 rounded-xl border border-dashed border-[#b9a6f3] px-2 py-1.5 text-[9px] font-bold text-[#6d4fd1]">
              PROMO APPLIED · −15%
            </div>
          </div>
          <div className="w-2/5 space-y-2 rounded-xl bg-cream p-2.5">
            {["Subtotal", "Shipping", "Tax"].map((l) => (
              <div key={l} className="flex justify-between text-[9px] font-semibold text-muted">
                {l}
                <span className={`h-1.5 w-6 ${bar}`} />
              </div>
            ))}
            <div className="border-t border-line pt-2 text-[10px] font-bold text-ink">Total</div>
            <div className="rounded-lg bg-ink py-1.5 text-center text-[9px] font-bold text-white">Checkout</div>
          </div>
        </div>
      </Window>
    );
  if (kind === "dashboard")
    return (
      <Window>
        <div className="grid h-full grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-cream p-2">
              <div className={`h-1.5 w-1/2 ${bar}`} />
              <div className="mt-1.5 font-display text-sm font-semibold text-ink">{["Open", "SLA", "Done"][i]}</div>
            </div>
          ))}
          <div className="col-span-2 flex items-end gap-1.5 rounded-xl bg-cream p-2.5">
            {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#ffb48a] to-[#ffd8c2]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="space-y-1.5 rounded-xl bg-cream p-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 ${bar}`} style={{ width: `${90 - i * 15}%` }} />
            ))}
          </div>
        </div>
      </Window>
    );
  return (
    <Window>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {["Requested by", "Category", "Risk", "Window"].map((l) => (
            <div key={l}>
              <p className="text-[8px] font-bold tracking-wider text-muted uppercase">{l}</p>
              <div className="mt-1 h-5 rounded-md border border-line bg-cream" />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {["Low", "Medium", "High"].map((l, i) => (
            <span key={l} className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${i === 1 ? "bg-[#bfe8d3] text-[#1f6b47]" : "bg-cream text-muted"}`}>
              {l}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <span className="rounded-md border border-line px-3 py-1 text-[8px] font-bold text-muted">Save draft</span>
          <span className="rounded-md bg-[#2f9e6a] px-3 py-1 text-[8px] font-bold text-white">Submit for CAB</span>
        </div>
      </div>
    </Window>
  );
}
