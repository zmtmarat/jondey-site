import Link from 'next/link';
import type { DirectionKey, HomeContent } from '@/lib/content/home';
import { Icon, Section, SectionHead } from './ui';

/* Четыре главных направления. У каждой карточки — своя визуальная
   идентичность (иконка + акцентная линия), польза вместо названия функции
   и явное действие. Не четыре одинаковые пустые карточки. */

const STYLE: Record<
  DirectionKey,
  { icon: 'wrench' | 'truck' | 'crane' | 'gear'; accent: string; ring: string }
> = {
  masters: {
    icon: 'wrench',
    accent: 'bg-brand-600',
    ring: 'group-hover:border-brand-400',
  },
  delivery: {
    icon: 'truck',
    accent: 'bg-success',
    ring: 'group-hover:border-success/50',
  },
  equipment: {
    icon: 'crane',
    accent: 'bg-warning',
    ring: 'group-hover:border-warning/50',
  },
  parts: {
    icon: 'gear',
    accent: 'bg-brand-900',
    ring: 'group-hover:border-brand-900/40',
  },
};

export default function Directions({ c }: { c: HomeContent }) {
  return (
    <Section id="directions" tone="muted">
      <SectionHead title={c.directions.title} lead={c.directions.lead} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {c.directions.items.map((d, i) => {
          const s = STYLE[d.key];
          return (
            <Link
              key={d.key}
              href={d.href}
              data-jd-event={`direction_${d.key}`}
              className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-6 sm:p-7 shadow-[var(--shadow-xs)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)] ${s.ring} jd-rise jd-delay-${Math.min(i + 1, 4)}`}
            >
              {/* Акцентная линия — визуальная идентичность направления */}
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 ${s.accent}`}
              />

              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] ${s.accent} text-white`}
                >
                  <Icon name={s.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {d.eyebrow}
                </span>
              </div>

              <h3 className="mt-5 text-[20px] font-bold text-ink">{d.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-soft">
                {d.outcome}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {d.examples.map((e) => (
                  <li
                    key={e}
                    className="rounded-full bg-surface-3 px-2.5 py-1 text-[12.5px] text-ink-muted"
                  >
                    {e}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-700 transition-transform duration-150 group-hover:translate-x-0.5">
                {d.cta}
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
