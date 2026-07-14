import Image from 'next/image';
import type { HomeContent } from '@/lib/content/home';
import { Btn, Icon, Section, SectionHead } from './ui';

/* Блок приложения. Кнопки магазинов НЕ показываем как рабочие, пока
   приложение не опубликовано — вместо неработающей кнопки честная
   формулировка и действующая ссылка на веб-версию (PWA). */

export default function AppDownload({ c }: { c: HomeContent }) {
  return (
    <Section id="app">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <SectionHead title={c.app.title} lead={c.app.lead} />

          <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {c.app.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-[14.5px] text-ink-soft"
              >
                <Icon name="check" className="h-4 w-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Btn href="/app" variant="primary" event="app_open_web" external>
              <Icon name="phone" className="h-[18px] w-[18px]" />
              {c.app.webCta}
            </Btn>

            {/* Google Play — честно: готовится к публикации, кнопки-заглушки нет */}
            <span className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line-strong px-4 py-2.5 text-[13.5px] text-ink-muted">
              {c.app.playNote}
            </span>
          </div>

          <p className="mt-4 text-[14px] leading-6 text-ink-muted prose-measure">
            {c.app.webNote} {c.app.iosHint}
          </p>
        </div>

        {/* QR ведёт на рабочую веб-версию */}
        <div className="mx-auto flex w-full max-w-sm flex-col items-center rounded-[var(--radius-2xl)] border border-line bg-surface-3 p-8 text-center">
          <div className="rounded-[var(--radius-lg)] bg-white p-4 shadow-[var(--shadow-sm)]">
            <Image
              src="/images/qr-app.png"
              alt="QR-код на веб-версию приложения Jondey"
              width={180}
              height={180}
              loading="lazy"
              className="h-[180px] w-[180px]"
            />
          </div>
          <p className="mt-5 text-[14px] leading-6 text-ink-soft">
            {c.app.qrNote}
          </p>
        </div>
      </div>
    </Section>
  );
}
