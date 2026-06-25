import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Скачать приложение Jondey',
  description:
    'Установите приложение Jondey, чтобы заказывать услуги или зарабатывать как мастер. Android и iOS.',
};

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <span className="grid place-items-center w-20 h-20 rounded-3xl bg-brand text-white text-4xl font-extrabold mx-auto">
        J
      </span>
      <h1 className="text-3xl font-extrabold mt-6">Приложение Jondey</h1>
      <p className="text-slate-500 mt-3 max-w-xl mx-auto">
        Заказывайте услуги или находите клиентов как мастер. Чат, отзыви,
        отслеживание мастера на карте — всё в одном приложении.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="#"
          className="rounded-xl bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark transition"
        >
           App Store (скоро)
        </a>
        <a
          href="#"
          className="rounded-xl bg-slate-800 text-white px-6 py-3 font-semibold hover:bg-black transition"
        >
          ▶ Google Play (скоро)
        </a>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
        {[
          ['🔍', 'Найдите мастера', 'Каталог с рейтингами и отзывами.'],
          ['💬', 'Общайтесь в чате', 'Договоритесь о цене и времени.'],
          ['🗺️', 'Мастер в пути', 'Следите за мастером на карте.'],
        ].map(([icon, title, text]) => (
          <div
            key={title}
            className="rounded-2xl bg-white border border-slate-200 p-5"
          >
            <div className="text-3xl">{icon}</div>
            <h3 className="font-semibold mt-2">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
