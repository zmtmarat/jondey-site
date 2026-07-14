import type { HomeContent } from '@/lib/content/home';
import { Icon, Section, SectionHead } from './ui';

/* Механизмы доверия — только реально существующие. Никаких юридически
   опасных обещаний («полная гарантия», «проверяем каждого»). */

const ICONS = ['star', 'shield', 'check', 'chat', 'building', 'phone'] as const;

export default function Trust({ c }: { c: HomeContent }) {
  return (
    <Section tone="muted">
      <SectionHead title={c.trust.title} lead={c.trust.lead} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.trust.items.map((t, i) => (
          <article
            key={t.title}
            className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-xs)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-brand-50 text-brand-700">
              <Icon name={ICONS[i % ICONS.length]} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-[16px] font-bold text-ink">{t.title}</h3>
            <p className="mt-2 text-[14.5px] leading-6 text-ink-soft">
              {t.text}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 rounded-[var(--radius-md)] border-l-2 border-brand-400 bg-surface px-5 py-4 text-[15px] leading-6 text-ink prose-measure">
        {c.trust.note}
      </p>
    </Section>
  );
}
