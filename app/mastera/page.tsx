import type { Metadata } from 'next';
import { getCategories, getCities, getMasters } from '@/lib/data';
import type { Category, City } from '@/lib/types';
import MasterCard from '@/components/MasterCard';
import CategoryGrid from '@/components/CategoryGrid';
import { cityName } from '@/lib/labels';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Каталог мастеров Казахстана',
  description:
    'Все мастера Jondey: сантехники, электрики, мастера по технике и авто. Рейтинги и отзывы реальных заказчиков.',
};

export default async function MastersPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const sp = await searchParams;
  const cityId = sp.city ? Number(sp.city) : undefined;
  const [masters, categories, cities] = await Promise.all([
    getMasters({ cityId }),
    getCategories(),
    getCities(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Каталог мастеров</h1>
      <p className="text-slate-500 mt-2">
        Выберите специалиста по направлению или городу.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">По категориям</h2>
        <CategoryGrid categories={categories} />
      </section>

      <CityFilter cities={cities} active={cityId} />

      <section className="mt-6">
        {masters.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {masters.map((m) => (
              <MasterCard key={m.user_id} master={m} catMap={catMap} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Мастеров пока нет. Загляните позже или установите приложение.
          </div>
        )}
      </section>
    </div>
  );
}

function CityFilter({ cities, active }: { cities: City[]; active?: number }) {
  if (cities.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Город</h2>
      <div className="flex flex-wrap gap-2">
        <a
          href="/mastera"
          className={`rounded-full px-3.5 py-1.5 text-sm border ${
            active == null
              ? 'bg-brand text-white border-brand'
              : 'bg-white border-slate-200 hover:border-brand/40'
          }`}
        >
          Все города
        </a>
        {cities.map((c) => (
          <a
            key={c.id}
            href={`/mastera?city=${c.id}`}
            className={`rounded-full px-3.5 py-1.5 text-sm border ${
              active === c.id
                ? 'bg-brand text-white border-brand'
                : 'bg-white border-slate-200 hover:border-brand/40'
            }`}
          >
            {cityName(c)}
          </a>
        ))}
      </div>
    </section>
  );
}
