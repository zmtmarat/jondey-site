import type { Metadata } from 'next';
import { getCategories, getCities, getOrders } from '@/lib/data';
import type { Category, City } from '@/lib/types';
import OrderCard from '@/components/OrderCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Заявки на услуги и ремонт',
  description:
    'Актуальные заявки заказчиков: ремонт, сантехника, уборка, грузчики и другое по всему Казахстану. Откликнитесь в приложении Jondey.',
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; city?: string }>;
}) {
  const sp = await searchParams;
  const categoryId = sp.cat ? Number(sp.cat) : undefined;
  const cityId = sp.city ? Number(sp.city) : undefined;
  const [orders, categories, cities] = await Promise.all([
    getOrders({ categoryId, cityId }),
    getCategories(),
    getCities(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const cityMap = new Map<number, City>(cities.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Заявки на услуги</h1>
      <p className="text-slate-500 mt-2">
        Свежие заявки от заказчиков. Чтобы откликнуться — установите приложение.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/zayavki"
          className={`rounded-full px-3.5 py-1.5 text-sm border ${
            categoryId == null
              ? 'bg-brand text-white border-brand'
              : 'bg-white border-slate-200 hover:border-brand/40'
          }`}
        >
          Все категории
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href={`/zayavki?cat=${c.id}`}
            className={`rounded-full px-3.5 py-1.5 text-sm border ${
              categoryId === c.id
                ? 'bg-brand text-white border-brand'
                : 'bg-white border-slate-200 hover:border-brand/40'
            }`}
          >
            {c.name_ru || c.slug}
          </a>
        ))}
      </div>

      <section className="mt-6">
        {orders.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} catMap={catMap} cityMap={cityMap} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Активных заявок пока нет.
          </div>
        )}
      </section>
    </div>
  );
}
