import type { Metadata } from 'next';
import { getCategories, getParts } from '@/lib/data';
import PartsSearch from '@/components/PartsSearch';

export const metadata: Metadata = {
  title: 'Запчасти в Казахстане — найти деталь на авто, технику, телефон | Jondey',
  description:
    'Найдите запчасть по марке, модели и году: стартеры, генераторы, экраны, компрессоры. Магазины присылают цены. Заказ и связь — в приложении Jondey.',
  alternates: { canonical: 'https://jondey.kz/zapchasti' },
};

export const revalidate = 300;

// Категории с каталогом запчастей (как в приложении).
const PARTS_SLUGS = [
  'transport',
  'spectech',
  'moto',
  'micromobility',
  'appliances',
  'electronics',
  'console',
  'computer',
];

export default async function ZapchastiPage() {
  const [cats, initial] = await Promise.all([getCategories(), getParts()]);
  const partsCats = cats
    .filter((c) => PARTS_SLUGS.includes(c.slug))
    .map((c) => ({ slug: c.slug, name: c.name_ru ?? c.slug }));

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Найти запчасть
      </h1>
      <p className="text-slate-600 mt-2 max-w-2xl">
        Запчасти на авто, спецтехнику, мототехнику, бытовую технику и телефоны от
        магазинов Казахстана. Ищите по марке, модели и году — или оставьте запрос,
        и магазины пришлют цены.
      </p>

      <div className="mt-6">
        <PartsSearch categories={partsCats} initial={initial} />
      </div>

      <section className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Как это работает</h2>
        <ol className="mt-3 space-y-2 text-slate-600 text-sm list-decimal list-inside">
          <li>Находите нужную деталь по марке и модели вашей машины.</li>
          <li>
            Нет в наличии — оставляете запрос (например «стартер на Camry 2006»).
          </li>
          <li>Магазины присылают цены, вы связываетесь и заказываете в приложении.</li>
        </ol>
      </section>
    </main>
  );
}
