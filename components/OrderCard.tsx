import Link from 'next/link';
import type { Category, City, OrderListing } from '@/lib/types';
import { budgetText, catIcon, catName, cityName, preferredTimeName } from '@/lib/labels';

export default function OrderCard({
  order,
  catMap,
  cityMap,
}: {
  order: OrderListing;
  catMap: Map<number, Category>;
  cityMap: Map<number, City>;
}) {
  const cat = catMap.get(order.category_id);
  const city = order.city_id != null ? cityMap.get(order.city_id) : null;
  const urgent = order.preferred_time === 'asap';

  return (
    <Link
      href={`/zayavka/${order.id}`}
      className="block rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{catIcon(cat?.slug)}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{catName(cat)}</span>
            {urgent && (
              <span className="text-xs font-semibold text-red-600">🔥 Срочно</span>
            )}
          </div>
          <h3 className="font-semibold mt-0.5 line-clamp-2">{order.title}</h3>
          {order.description && (
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {order.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold text-brand-dark">
              {budgetText(order.budget_min, order.budget_max)}
            </span>
            {city && <span className="text-slate-500">📍 {cityName(city)}</span>}
            {order.preferred_time && (
              <span className="text-slate-500">
                ⏱ {preferredTimeName(order.preferred_time)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
