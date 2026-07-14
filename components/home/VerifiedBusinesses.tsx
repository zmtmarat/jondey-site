import type { HomeContent } from '@/lib/content/home';
import { Btn, CheckItem, Icon, Section, SectionHead } from './ui';

/* Доверие к магазинам и компаниям. Никаких выдуманных партнёров:
   объясняем систему проверки, а не показываем фиктивный список логотипов. */

const BADGE_STYLE = [
  { icon: 'building' as const, tone: 'bg-brand-50 text-brand-700 border-brand-200' },
  { icon: 'shield' as const, tone: 'bg-success-soft text-success border-success/25' },
  { icon: 'star' as const, tone: 'bg-accent-50 text-warning border-accent-100' },
];

export default function VerifiedBusinesses({ c }: { c: HomeContent }) {
  return (
    <Section>
      <SectionHead title={c.verified.title} lead={c.verified.lead} />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {c.verified.badges.map((b, i) => {
          const s = BADGE_STYLE[i] ?? BADGE_STYLE[0];
          return (
            <article
              key={b.title}
              className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-xs)]"
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold ${s.tone}`}
              >
                <Icon name={s.icon} className="h-4 w-4" />
                {b.title}
              </span>
              <p className="mt-4 text-[14.5px] leading-6 text-ink-soft">
                {b.text}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 rounded-[var(--radius-xl)] border border-line bg-surface-3 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="text-[17px] font-bold text-ink">
            {c.verified.seeTitle}
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {c.verified.seeItems.map((i) => (
              <CheckItem key={i}>{i}</CheckItem>
            ))}
          </ul>
        </div>
        <Btn href="/kompanii" variant="secondary" event="business_connect_shop">
          {c.verified.cta}
        </Btn>
      </div>

      <p className="mt-6 text-[13.5px] leading-6 text-ink-muted prose-measure">
        {c.verified.disclaimer}
      </p>
    </Section>
  );
}
