import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand text-white font-extrabold">
            J
          </span>
          <span className="text-xl font-extrabold text-brand-dark">Jondey</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link href="/mastera" className="hover:text-brand">
            Мастера
          </Link>
          <Link href="/zayavki" className="hover:text-brand">
            Заявки
          </Link>
        </nav>
        <div className="ml-auto">
          <Link
            href="/skachat"
            className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition"
          >
            Скачать приложение
          </Link>
        </div>
      </div>
    </header>
  );
}
