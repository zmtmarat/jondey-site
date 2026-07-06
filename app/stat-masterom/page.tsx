import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Стать мастером — получайте заказы | Jondey',
  description:
    'Станьте мастером Jondey: скачайте приложение, укажите направления и город, получайте заявки рядом и откликайтесь со своей ценой. Бесплатно, от 18 лет.',
  alternates: { canonical: '/stat-masterom' },
};

const PERKS = [
  ['📩', 'Заявки рядом', 'По вашим направлениям и городу'],
  ['💰', 'Своя цена', 'Откликаетесь с удобной для вас ценой'],
  ['⭐', 'Репутация', 'Отзывы, рейтинг и статус мастера'],
];

export default function BecomeMasterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Стать мастером</h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Уже <b>более 1000 человек</b> нашли работу на Jondey. Присоединяйтесь:
          укажите, что умеете, и принимайте заказы рядом. Бесплатно, свободный
          график, оплата напрямую.
        </p>
      </div>

      <div className="mt-7 grid sm:grid-cols-3 gap-3">
        {PERKS.map(([icon, title, text]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
          >
            <div className="text-2xl">{icon}</div>
            <div className="mt-1 font-semibold text-sm">{title}</div>
            <div className="text-xs text-slate-500 mt-0.5">{text}</div>
          </div>
        ))}
      </div>

      {/* Регистрация — только в приложении */}
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand to-[#0d2c5c] p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Регистрация — в приложении</h2>
        <p className="mt-3 text-white/85 max-w-lg mx-auto">
          Скачайте приложение Jondey, выберите роль «Мастер», отметьте свои
          направления и город — и начинайте принимать заказы. Это займёт пару
          минут.
        </p>
        <Link
          href="/skachat"
          style={{ backgroundColor: '#ffb300', color: '#0d2c5c' }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold shadow-lg hover:brightness-105 transition"
        >
          Скачать приложение
        </Link>
        <p className="mt-4 text-xs text-white/70">
          Регистрация бесплатная, для граждан от 18 лет.
        </p>
      </div>
    </div>
  );
}
