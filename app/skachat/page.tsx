import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Скачать приложение Jondey',
  description:
    'Установите приложение Jondey, чтобы заказывать услуги или зарабатывать как исполнитель. Android и iOS.',
  alternates: { canonical: '/skachat' },
};

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white px-6 py-12 sm:px-12 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <Image
            src="/logo-mark.png"
            alt="Jondey"
            width={88}
            height={88}
            priority
            className="mx-auto w-20 h-20 rounded-2xl bg-white/10 p-2"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-5">
            Приложение Jondey
          </h1>
          <p className="text-white/90 mt-3 max-w-xl mx-auto">
            Заказывайте услуги или находите клиентов как исполнитель. Чат,
            отзывы, оплата по договорённости и отслеживание мастера на карте —
            всё в одном приложении.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {/* iPhone → веб-версия (PWA) */}
            <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-5">
              <div className="text-sm font-semibold text-white/80"> Для iPhone</div>
              <a
                href="/app"
                className="mt-3 flex items-center justify-center rounded-xl bg-accent text-brand-dark px-5 py-3 font-bold shadow-lg hover:brightness-105 transition"
              >
                🚀 Открыть веб-версию
              </a>
              <p className="text-white/70 text-xs mt-3 leading-relaxed">
                Открой в <b>Safari</b> → «Поделиться» → <b>«На экран „Домой"»</b>.
                Запустится как приложение — установка из App Store не нужна.
              </p>
            </div>
            {/* Android → приложение / Google Play */}
            <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-5">
              <div className="text-sm font-semibold text-white/80">🤖 Для Android</div>
              <span className="mt-3 flex items-center justify-center rounded-xl bg-black/30 ring-1 ring-white/30 px-5 py-3 font-semibold cursor-default">
                ▶ Google Play — скоро
              </span>
              <p className="text-white/70 text-xs mt-3 leading-relaxed">
                Полноценное приложение с уведомлениями — уже готово, скоро в
                Google Play. Нужен раньше — напишите в поддержку, пришлём файл.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Две аудитории */}
      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-xl font-bold">Заказчику</h2>
          <p className="text-slate-500 mt-1">
            Опишите задачу и назовите цену — исполнители откликнутся сами.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>🔍 Каталог мастеров с рейтингами и отзывами</li>
            <li>💬 Чат: договоритесь о цене и времени</li>
            <li>🗺️ «Мастер в пути» — следите на карте</li>
            <li>💸 Бесплатно, без предоплаты</li>
          </ul>
          <Link
            href="/mastera"
            className="mt-5 inline-flex rounded-xl bg-brand text-white px-5 py-2.5 font-semibold hover:bg-brand-dark transition"
          >
            Смотреть мастеров
          </Link>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-xl font-bold">Исполнителю</h2>
          <p className="text-slate-500 mt-1">
            Получайте заявки рядом и предлагайте свою цену. Больше клиентов — без
            рекламы.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>📩 Заявки по вашим категориям и городу</li>
            <li>📍 «На связи» — заказы поблизости по геолокации</li>
            <li>⭐ Профиль с отзывами и рейтингом</li>
            <li>🔧 Запросы на запчасти и вызовы спецтехники</li>
          </ul>
          <Link
            href="/stat-masterom"
            className="mt-5 inline-flex rounded-xl bg-slate-900 text-white px-5 py-2.5 font-semibold hover:bg-black transition"
          >
            Стать исполнителем
          </Link>
        </div>
      </div>
    </div>
  );
}
