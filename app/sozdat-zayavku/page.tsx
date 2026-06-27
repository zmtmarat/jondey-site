import type { Metadata } from 'next';
import { getCategories, getCities } from '@/lib/data';
import RequestForm from '@/components/RequestForm';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Создать заявку — назовите свою цену | Jondey',
  description:
    'Опишите задачу и назовите свою цену — мастера Jondey по всему Казахстану откликнутся сами. Ремонт, сантехника, электрика, клининг, доставка. Без обзвона объявлений.',
  alternates: { canonical: '/sozdat-zayavku' },
};

const STEPS = [
  ['📝', 'Опишите задачу', 'Что нужно сделать и в каком городе'],
  ['💬', 'Получите отклики', 'Мастера предложат свою цену и сроки'],
  ['⭐', 'Выберите лучшего', 'Сравните отзывы и рейтинги'],
];

export default async function CreateRequestPage() {
  const [categories, cities] = await Promise.all([
    getCategories(),
    getCities(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Создать заявку
        </h1>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Опишите задачу и назовите свою цену — мастера откликнутся сами.
          Сравните отзывы и выберите лучшего. Для заказчика бесплатно.
        </p>
      </div>

      <div className="mt-7 grid sm:grid-cols-3 gap-3">
        {STEPS.map(([icon, title, text]) => (
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
        <RequestForm categories={categories} cities={cities} />
      </div>
    </div>
  );
}
