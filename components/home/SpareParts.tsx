import Image from 'next/image';
import type { HomeContent } from '@/lib/content/home';
import { Btn, Icon, Section, SectionHead } from './ui';

/* Отдельный продающий блок запчастей: сценарий «один запрос → предложения». */

export default function SpareParts({ c }: { c: HomeContent }) {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHead
            eyebrow={c.parts.eyebrow}
            title={c.parts.title}
            lead={c.parts.lead}
          />

          {/* Сценарий — нумерованная последовательность */}
          <ol className="mt-8 space-y-3">
            {c.parts.flow.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-900 text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-6 text-ink-soft">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {c.parts.eyebrow}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.parts.kinds.map((k) => (
                <li
                  key={k}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink-soft"
                >
                  <Icon name="gear" className="h-3.5 w-3.5 text-brand-600" />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-[14px] leading-6 text-ink-muted prose-measure">
            {c.parts.note}
          </p>

          <div className="mt-8">
            <Btn href="/zapchasti" variant="primary" event="parts_create_request">
              {c.parts.cta}
              <Icon name="arrow" className="h-[18px] w-[18px]" />
            </Btn>
          </div>
        </div>

        {/* Реальный экран каталога запчастей */}
        <div className="relative mx-auto w-full max-w-[300px]">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[36px] bg-brand-100/60 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5 shadow-[var(--shadow-xl)]">
            <Image
              src="/images/app/parts.png"
              alt={c.hero.screensAlt.parts}
              width={720}
              height={1560}
              sizes="(max-width: 1024px) 70vw, 300px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
