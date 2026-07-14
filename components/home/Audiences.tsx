import Image from 'next/image';
import type { HomeContent } from '@/lib/content/home';
import { Btn, CheckItem, Icon, Section, SectionHead } from './ui';

/* Две аудитории: исполнители и бизнес. Никаких обещаний дохода или
   гарантированного потока заказов — только фактические возможности. */

export function ForPerformers({ c }: { c: HomeContent }) {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[280px] lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[36px] bg-brand-100/70 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5 shadow-[var(--shadow-xl)]">
            <Image
              src="/images/app/masters.png"
              alt={c.hero.screensAlt.orders}
              width={720}
              height={1560}
              sizes="(max-width: 1024px) 65vw, 280px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          <SectionHead
            eyebrow={c.performers.eyebrow}
            title={c.performers.title}
            lead={c.performers.lead}
          />
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {c.performers.items.map((i) => (
              <CheckItem key={i}>{i}</CheckItem>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href="/stat-masterom" variant="primary" event="performer_signup">
              {c.performers.cta}
            </Btn>
            <Btn href="/skachat" variant="ghost" event="performer_download_app">
              {c.performers.ctaSecondary}
            </Btn>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function ForBusiness({ c }: { c: HomeContent }) {
  return (
    <Section>
      <div className="rounded-[var(--radius-2xl)] border border-line bg-brand-900 px-6 py-10 sm:px-10 sm:py-12 text-white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <SectionHead
              eyebrow={c.business.eyebrow}
              title={c.business.title}
              lead={c.business.lead}
              invert
            />
            <div className="mt-8">
              <Btn href="/kompanii" variant="primary" event="business_connect_company">
                {c.business.cta}
                <Icon name="arrow" className="h-[18px] w-[18px]" />
              </Btn>
            </div>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {c.business.items.map((i) => (
              <CheckItem key={i} invert>
                {i}
              </CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
