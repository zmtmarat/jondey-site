'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  ['/uslugi', 'Услуги'],
  ['/mastera', 'Мастера'],
  ['/dostavka', 'Доставка'],
  ['/kompanii', 'Компании'],
  ['/zayavki', 'Заявки'],
  ['/forum', 'Обсуждения'],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
        <Link href="/" onClick={close} className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo-mark.png"
            alt="Jondey"
            width={40}
            height={40}
            priority
            className="w-10 h-10"
          />
          <span className="text-xl font-extrabold text-[#16306b]">Jondey</span>
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-600">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto shrink-0 flex items-center gap-2">
          <Link
            href="/stat-masterom"
            className="hidden sm:inline-flex items-center rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5 transition"
          >
            Стать мастером
          </Link>
          <Link
            href="/sozdat-zayavku"
            className="inline-flex items-center rounded-lg bg-brand px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-dark transition"
          >
            Создать заявку
          </Link>

          {/* Бургер — только на мобиле */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className="sm:hidden grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню — аккуратный выпадающий список */}
      {open && (
        <nav className="sm:hidden border-t border-slate-100 bg-white shadow-lg">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col">
            {NAV.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="py-3 text-slate-700 font-medium border-b border-slate-100 hover:text-brand"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/stat-masterom"
              onClick={close}
              className="py-3 font-semibold text-brand border-b border-slate-100"
            >
              Стать мастером
            </Link>
            <Link
              href="/skachat"
              onClick={close}
              className="py-3 text-slate-700 font-medium"
            >
              Скачать приложение
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
