import type { HomeContent } from '@/lib/content/home';
import { Section, SectionHead } from './ui';

/* Пять шагов. На desktop — горизонтальная связанная последовательность
   с линией прогресса, на mobile — вертикальная. */

export default function HowItWorks({ c }: { c: HomeContent }) {
  return (
    <Section id="how">
      <SectionHead title={c.how.title} lead={c.how.lead} />

      <ol className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-5">
        {/* Линия прогресса — только на широких экранах */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-line lg:block"
        />

        {c.how.steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-3 lg:block">
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-[15px] font-bold text-brand-700 shadow-[var(--shadow-xs)]">
                {i + 1}
              </span>
              <h3 className="text-[16px] font-bold text-ink lg:mt-4">
                {s.title}
              </h3>
            </div>
            <p className="mt-2 pl-13 text-[14.5px] leading-6 text-ink-soft lg:pl-0">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
