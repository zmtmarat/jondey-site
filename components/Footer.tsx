import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand text-white font-extrabold">
              J
            </span>
            <span className="text-lg font-extrabold text-brand-dark">Jondey</span>
          </div>
          <p className="text-slate-500">
            Маркетплейс услуг по ремонту и бытовым работам в Казахстане.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-700">Разделы</h4>
          <ul className="space-y-2 text-slate-500">
            <li>
              <Link href="/mastera" className="hover:text-brand">
                Каталог мастеров
              </Link>
            </li>
            <li>
              <Link href="/kompanii" className="hover:text-brand">
                Компании
              </Link>
            </li>
            <li>
              <Link href="/zayavki" className="hover:text-brand">
                Заявки
              </Link>
            </li>
            <li>
              <Link href="/skachat" className="hover:text-brand">
                Скачать приложение
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-700">Документы</h4>
          <ul className="space-y-2 text-slate-500">
            <li>
              <a
                href="https://zmtmarat.github.io/-jondey-privacy/"
                className="hover:text-brand"
                target="_blank"
                rel="noopener noreferrer"
              >
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Jondey. Все права защищены.
      </div>
    </footer>
  );
}
