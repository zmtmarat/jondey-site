'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SUPPORT_WHATSAPP } from '@/lib/contacts';
import { chromeContent } from '@/lib/content/chrome';

/* Подвал. Только существующие страницы — битых ссылок нет.
   Разделы, которых ещё нет (Соглашение, База знаний, API, Партнёрская
   программа), сознательно не выводим до их создания. */

const SUPPORT_EMAIL = 'zmtmarat@gmail.com';

export default function Footer() {
  const pathname = usePathname();
  const isKk = pathname?.startsWith('/kk') ?? false;
  const t = chromeContent(isKk ? 'kk' : 'ru');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.6fr]">
          {/* Бренд + контакты */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-mark.png"
                alt="Jondey"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-[17px] font-bold text-brand-900">Jondey</span>
            </div>
            <p className="mt-3 max-w-xs text-[14px] leading-6 text-ink-muted">
              {t.tagline}
            </p>

            <div className="mt-5 space-y-1.5 text-[14px]">
              {SUPPORT_WHATSAPP && (
                <a
                  href={`https://wa.me/${SUPPORT_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-jd-event="footer_support_whatsapp"
                  className="block text-ink-soft hover:text-brand-700"
                >
                  WhatsApp: +7 777 798 98 98
                </a>
              )}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-jd-event="footer_support_email"
                className="block text-ink-soft hover:text-brand-700"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div
              className="mt-5 inline-flex items-center rounded-[var(--radius-sm)] border border-line p-0.5 text-[13px] font-semibold"
              role="group"
              aria-label={t.langGroup}
            >
              <Link
                href="/"
                hrefLang="ru"
                aria-current={!isKk ? 'true' : undefined}
                className={`rounded-[6px] px-2.5 py-1 ${
                  !isKk ? 'bg-brand-900 text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                РУС
              </Link>
              <Link
                href="/kk"
                hrefLang="kk"
                aria-current={isKk ? 'true' : undefined}
                className={`rounded-[6px] px-2.5 py-1 ${
                  isKk ? 'bg-brand-900 text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                ҚАЗ
              </Link>
            </div>
          </div>

          {/* Разделы */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.cols.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink-soft hover:text-brand-700"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <nav
          aria-label={isKk ? 'Құқықтық құжаттар' : 'Правовые документы'}
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6"
        >
          {t.legal.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-muted hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 flex flex-col gap-2 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jondey. ТОО «RIDS EMPIRE», БИН 170240016026.</p>
          <p>{t.appLangs}</p>
        </div>
      </div>
    </footer>
  );
}
