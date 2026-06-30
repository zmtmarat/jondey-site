import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  ['/uslugi', 'Услуги'],
  ['/mastera', 'Мастера'],
  ['/dostavka', 'Доставка'],
  ['/kompanii', 'Компании'],
  ['/zayavki', 'Заявки'],
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
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
            className="inline-flex items-center rounded-lg border border-brand px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-brand hover:bg-brand/5 transition"
          >
            Стать мастером
          </Link>
          <Link
            href="/sozdat-zayavku"
            className="inline-flex items-center rounded-lg bg-brand px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-dark transition"
          >
            Создать заявку
          </Link>
        </div>
      </div>

      {/* Мобильная навигация — горизонтальная прокрутка (на узких экранах меню скрыто) */}
      <nav className="sm:hidden border-t border-slate-100 overflow-x-auto">
        <div className="flex gap-1 px-3 py-2 text-sm font-medium text-slate-600 whitespace-nowrap">
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-1.5 hover:bg-brand-light hover:text-brand-dark"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
