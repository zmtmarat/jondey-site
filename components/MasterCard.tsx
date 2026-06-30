import Link from 'next/link';
import type { Category, Master } from '@/lib/types';
import { catName, ratingText } from '@/lib/labels';
import Stars from './Stars';
import RankBadge from './RankBadge';

export default function MasterCard({
  master,
  catMap,
}: {
  master: Master;
  catMap: Map<number, Category>;
}) {
  const name = master.full_name?.trim() || 'Мастер';
  const cats = master.category_ids
    .map((id) => catMap.get(Number(id)))
    .filter(Boolean) as Category[];

  return (
    <Link
      href={`/master/${master.user_id}`}
      className="block rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
    >
      <div className="flex gap-3">
        {master.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={master.avatar_url}
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-brand text-white grid place-items-center text-xl font-bold">
            {name[0]?.toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold truncate">{name}</span>
            {master.verified && (
              <span title="Проверенный мастер" className="text-brand shrink-0">
                ✓
              </span>
            )}
            <RankBadge
              categoryCount={master.category_ids.length}
              className="shrink-0"
            />
          </div>
          <div className="text-sm text-slate-500 mt-0.5">
            {master.avg_rating != null && master.review_count > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Stars rating={master.avg_rating} />
                <span>{ratingText(master.avg_rating, master.review_count)}</span>
              </span>
            ) : (
              'Новый мастер'
            )}
          </div>
          {master.completed_orders > 0 && (
            <div className="text-xs text-slate-400 mt-0.5">
              Выполнено заказов: {master.completed_orders}
            </div>
          )}
        </div>
      </div>
      {cats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cats.slice(0, 4).map((c) => (
            <span
              key={c.id}
              className="text-xs bg-brand-light text-brand-dark rounded-full px-2.5 py-1"
            >
              {catName(c)}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
