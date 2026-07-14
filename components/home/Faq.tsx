import type { HomeContent } from '@/lib/content/home';
import { Section, SectionHead } from './ui';

/* FAQ. Разметка FAQPage строится ровно по тем вопросам, которые реально
   отображаются на странице (см. HomeSections). */

export default function Faq({ c }: { c: HomeContent }) {
  return (
    <Section id="faq" tone="muted">
      <SectionHead title={c.faq.title} lead={c.faq.lead} />

      <div className="mt-10 grid gap-3 lg:grid-cols-2">
        {c.faq.items.map((f) => (
          <details
            key={f.q}
            className="group rounded-[var(--radius-lg)] border border-line bg-surface px-5 py-4 open:shadow-[var(--shadow-sm)]"
          >
            <summary
              data-jd-event="faq_open"
              className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink"
            >
              {f.q}
              <span
                aria-hidden
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-brand-700 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[14.5px] leading-6 text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
