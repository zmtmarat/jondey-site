import type { HomeContent } from '@/lib/content/home';
import type { StatItem } from '@/lib/stats';
import { Section, SectionHead } from './ui';

/* Показатели платформы. Рендерим ТОЛЬКО реальные подтверждённые значения
   (см. lib/stats.ts — метрики ниже порога не приходят). Если подтверждённых
   показателей нет — секция не выводится вовсе. */

export default function Stats({
  c,
  items,
}: {
  c: HomeContent;
  items: StatItem[];
}) {
  if (items.length === 0) return null;

  const nf = new Intl.NumberFormat('ru-RU');

  return (
    <Section>
      <SectionHead title={c.stats.title} lead={c.stats.lead} center />

      <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {items.slice(0, 4).map((s) => (
          <div
            key={s.key}
            className="rounded-[var(--radius-lg)] border border-line bg-surface px-5 py-6 text-center shadow-[var(--shadow-xs)]"
          >
            <dt className="sr-only">{c.stats.labels[s.key]}</dt>
            <dd>
              <span className="block text-[30px] sm:text-[36px] font-bold tracking-[-0.02em] text-brand-900 tabular-nums">
                {nf.format(s.value)}
              </span>
              <span className="mt-1 block text-[13.5px] leading-5 text-ink-muted">
                {c.stats.labels[s.key]}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
