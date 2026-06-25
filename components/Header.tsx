import Link from 'next/link';
import Image from 'next/image';

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
          <Link href="/uslugi" className="hover:text-brand">
            Услуги
          </Link>
          <Link href="/mastera" className="hover:text-brand">
            Мастера
          </Link>
          <Link href="/kompanii" className="hover:text-brand">
            Компании
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
