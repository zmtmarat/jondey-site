import type { Metadata } from 'next';
import Link from 'next/link';
import {
  OPERATOR,
  OPERATOR_BIN,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DIGITS,
  LEGAL_UPDATED,
} from '@/lib/legal';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Связаться с поддержкой Jondey: WhatsApp, электронная почта. Реквизиты оператора ТОО «RIDS EMPIRE». Ответ в течение одного рабочего дня.',
  alternates: { canonical: `${SITE_URL}/kontakty` },
};

const CARDS = [
  {
    title: 'WhatsApp',
    value: SUPPORT_PHONE,
    href: `https://wa.me/${SUPPORT_PHONE_DIGITS}`,
    hint: 'Самый быстрый способ. Пишите с 9:00 до 21:00 (Астана).',
    event: 'contacts_whatsapp',
    icon: (
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.9-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.5.2.5.4.1.2.1.7-.1 1.2Z" />
    ),
  },
  {
    title: 'Электронная почта',
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    hint: 'Для жалоб, удаления аккаунта и вопросов бизнеса. Ответ — в течение рабочего дня.',
    event: 'contacts_email',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
];

const QUICK: [string, string][] = [
  ['/udalenie-akkaunta', 'Удалить аккаунт'],
  ['/pravila', 'Пожаловаться на нарушение'],
  ['/kompanii', 'Разместить бизнес или магазин'],
  ['/brands', 'Стать представителем бренда'],
  ['/politika', 'Вопрос о персональных данных'],
];

export default function KontaktyPage() {
  return (
    <main className="bg-surface">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Контакты Jondey',
          url: `${SITE_URL}/kontakty`,
          about: {
            '@type': 'Organization',
            name: 'Jondey',
            email: SUPPORT_EMAIL,
            telephone: SUPPORT_PHONE,
          },
        }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-[30px] sm:text-[38px] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
          Контакты
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-ink-soft">
          Поддержка Jondey отвечает на казахском и русском языках. По большинству
          вопросов быстрее всего написать в WhatsApp.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CARDS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-jd-event={c.event}
              className="group rounded-[var(--radius-lg)] border border-line bg-surface p-5 transition-colors hover:border-brand-300 hover:bg-surface-3"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {c.icon}
                </svg>
              </span>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                {c.title}
              </p>
              <p className="mt-1 text-[17px] font-semibold text-ink group-hover:text-brand-700">
                {c.value}
              </p>
              <p className="mt-2 text-[14px] leading-6 text-ink-soft">{c.hint}</p>
            </a>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-[20px] font-bold text-ink">Частые обращения</h2>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line">
            {QUICK.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between px-4 py-3.5 text-[15px] text-ink-soft transition-colors hover:bg-surface-3 hover:text-brand-700"
                >
                  {label}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface-3 p-5 text-[14.5px] leading-7 text-ink-soft">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Реквизиты
          </h2>
          <p className="mt-3">
            Оператор сервиса: {OPERATOR}
            <br />
            БИН: {OPERATOR_BIN}
            <br />
            Республика Казахстан
          </p>
          <p className="mt-3 text-[13px] text-ink-muted">
            Данные обновлены: {LEGAL_UPDATED}
          </p>
        </section>
      </div>
    </main>
  );
}
