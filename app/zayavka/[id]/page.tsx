import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getCities, getOrder } from '@/lib/data';
import {
  budgetText,
  catIcon,
  catName,
  cityName,
  crewName,
  preferredTimeName,
} from '@/lib/labels';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return { title: 'Заявка' };
  return {
    title: order.title,
    description: order.description?.slice(0, 160) || order.title,
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const [categories, cities] = await Promise.all([
    getCategories(),
    getCities(),
  ]);
  const cat = categories.find((c) => c.id === order.category_id);
  const city = cities.find((c) => c.id === order.city_id);

  const rows: [string, string][] = [];
  if (cat) rows.push(['Категория', catName(cat)]);
  if (order.item_type) rows.push(['Что нужно', order.item_type]);
  if (order.brand) rows.push(['Марка / бренд', order.brand]);
  rows.push(['Бюджет', budgetText(order.budget_min, order.budget_max)]);
  if (city) rows.push(['Город', cityName(city)]);
  if (order.settlement) rows.push(['Населённый пункт', order.settlement]);
  if (order.preferred_time)
    rows.push(['Когда нужно', preferredTimeName(order.preferred_time)]);
  if (order.crew) rows.push(['Исполнителей', crewName(order.crew)]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/zayavki" className="hover:text-brand">
          Заявки
        </Link>{' '}
        / <span className="text-slate-700 line-clamp-1 inline">{order.title}</span>
      </nav>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="text-2xl">{catIcon(cat?.slug)}</span>
          <span>{catName(cat)}</span>
          {order.preferred_time === 'asap' && (
            <span className="font-semibold text-red-600">🔥 Срочно</span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold mt-2">{order.title}</h1>
        {order.description && (
          <p className="mt-3 text-slate-700 whitespace-pre-line">
            {order.description}
          </p>
        )}

        <dl className="mt-6 divide-y divide-slate-100">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 text-sm">
              <dt className="text-slate-500">{k}</dt>
              <dd className="font-medium text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-xl bg-brand-light p-4 text-sm text-brand-dark">
          Чтобы откликнуться на заявку, установите приложение Jondey —{' '}
          <Link href="/skachat" className="font-semibold underline">
            скачать
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
