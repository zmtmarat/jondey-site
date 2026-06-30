import type { Metadata } from 'next';
import { getCategories, getCities } from '@/lib/data';
import MasterForm from '@/components/MasterForm';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Стать мастером — получайте заказы | Jondey',
  description:
    'Зарегистрируйтесь мастером на Jondey: выберите направления работы и город, получайте заявки рядом и откликайтесь со своей ценой. Бесплатно, без рекламных бюджетов.',
  alternates: { canonical: '/stat-masterom' },
};

const PERKS = [
  ['📩', 'Заявки рядом', 'По вашим направлениям и городу'],
  ['💰', 'Своя цена', 'Откликаетесь с удобной для вас ценой'],
  ['⭐', 'Репутация', 'Отзывы, рейтинг и статус мастера'],
];

export default async function BecomeMasterPage() {
  const [categories, cities] = await Promise.all([
    getCategories(),
    getCities(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Стать мастером</h1>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Выберите направления, в которых работаете, и город — и получайте
          заявки рядом. Чем больше направлений, тем выше статус и больше заказов.
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

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <MasterForm categories={categories} cities={cities} />
      </div>
    </div>
  );
}
