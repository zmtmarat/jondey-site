'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { chromeContent } from '@/lib/content/chrome';
import { HTML_LANG } from '@/lib/i18n';

/* Шапка: закреплённая, без перегруза. Направления — в выпадающем меню.
   Подписи переключаются на казахский на /kk (главная переведена полностью;
   внутренние страницы пока на русском — ссылки ведут туда же). */

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dirOpen, setDirOpen] = useState(false);
  const pathname = usePathname();
  const isKk = pathname?.startsWith('/kk') ?? false;
  const locale = isKk ? 'kk' : 'ru';
  const t = chromeContent(locale);

  // Корневой layout статичен и объявляет lang="ru"; на казахской странице
  // приводим его в соответствие, чтобы скринридеры читали текст по-казахски.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const close = () => {
    setOpen(false);
    setDirOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href={isKk ? '/kk' : '/'}
          onClick={close}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo-mark.png"
            alt="Jondey"
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="text-[19px] font-bold tracking-[-0.01em] text-brand-900">
            Jondey
          </span>
        </Link>

        {/* Десктоп-навигация */}
        <nav
          aria-label={t.mainNav}
          className="hidden items-center gap-1 text-[14.5px] font-medium text-ink-soft lg:flex"
        >
          <div
            className="relative"
            onMouseEnter={() => setDirOpen(true)}
            onMouseLeave={() => setDirOpen(false)}
          >
            <button
              type="button"
              aria-expanded={dirOpen}
              aria-haspopup="true"
              onClick={() => setDirOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 hover:text-brand-700"
            >
              {t.directions}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden
                className={`transition-transform ${dirOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {dirOpen && (
              <div className="absolute left-0 top-full w-[340px] pt-2">
                <ul className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface p-2 shadow-[var(--shadow-lg)]">
                  {t.dirs.map((d) => (
                    <li key={d.href}>
                      <Link
                        href={d.href}
                        onClick={close}
                        className="block rounded-[var(--radius-sm)] px-3 py-2.5 hover:bg-surface-3"
                      >
                        <span className="block text-[14.5px] font-semibold text-ink">
                          {d.label}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-ink-muted">
                          {d.hint}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {t.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-[var(--radius-sm)] px-3 py-2 hover:text-brand-700"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {/* Переключатель языка */}
          <div
            className="hidden items-center rounded-[var(--radius-sm)] border border-line p-0.5 text-[13px] font-semibold sm:flex"
            role="group"
            aria-label={t.langGroup}
          >
            <Link
              href="/"
              hrefLang="ru"
              data-jd-event="lang_ru"
              aria-current={!isKk ? 'true' : undefined}
              className={`rounded-[6px] px-2.5 py-1 ${
                !isKk ? 'bg-brand-900 text-white' : 'text-ink-muted hover:text-ink'
              }`}
            >
              РУС
            </Link>
            <Link
              href="/kk"
              hrefLang="kk"
              data-jd-event="lang_kk"
              aria-current={isKk ? 'true' : undefined}
              className={`rounded-[6px] px-2.5 py-1 ${
                isKk ? 'bg-brand-900 text-white' : 'text-ink-muted hover:text-ink'
              }`}
            >
              ҚАЗ
            </Link>
          </div>

          <Link
            href="/skachat"
            data-jd-event="header_download_app"
            className="inline-flex items-center rounded-[var(--radius-md)] bg-accent-500 px-4 py-2.5 text-[14px] font-semibold text-brand-950 transition-colors hover:bg-accent-400"
          >
            {t.download}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-line text-ink lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav aria-label={t.mobileNav} className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <p className="px-1 pb-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
              {t.directions}
            </p>
            {t.dirs.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                onClick={close}
                className="block rounded-[var(--radius-sm)] px-1 py-3 text-[15px] font-semibold text-ink"
              >
                {d.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            {[...t.nav, ...t.more].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={close}
                className="block rounded-[var(--radius-sm)] px-1 py-2.5 text-[15px] text-ink-soft"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              <Link
                href="/"
                onClick={close}
                hrefLang="ru"
                className={`flex-1 rounded-[var(--radius-sm)] border border-line py-2 text-center text-[14px] font-semibold ${
                  !isKk ? 'bg-brand-900 text-white' : 'text-ink-soft'
                }`}
              >
                РУС
              </Link>
              <Link
                href="/kk"
                onClick={close}
                hrefLang="kk"
                className={`flex-1 rounded-[var(--radius-sm)] border border-line py-2 text-center text-[14px] font-semibold ${
                  isKk ? 'bg-brand-900 text-white' : 'text-ink-soft'
                }`}
              >
                ҚАЗ
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
