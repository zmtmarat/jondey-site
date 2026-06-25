import Link from 'next/link';
import type { Master } from '@/lib/types';
import { ratingText, vehicleEmoji, vehicleTypeName } from '@/lib/labels';
import Stars from './Stars';

export default function DriverCard({ driver }: { driver: Master }) {
  const name = driver.full_name?.trim() || 'Водитель';
  const vehicles = driver.vehicle_types ?? [];

  return (
    <Link
      href={`/master/${driver.user_id}`}
      className="block rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
    >
      <div className="flex gap-3">
        {driver.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={driver.avatar_url}
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
            {driver.verified && (
              <span title="Проверенный исполнитель" className="text-brand">
                ✓
              </span>
            )}
          </div>
          <div className="text-sm text-slate-500 mt-0.5">
            {driver.avg_rating != null && driver.review_count > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Stars rating={driver.avg_rating} />
                <span>{ratingText(driver.avg_rating, driver.review_count)}</span>
              </span>
            ) : (
              'Новый исполнитель'
            )}
          </div>
          {driver.completed_orders > 0 && (
            <div className="text-xs text-slate-400 mt-0.5">
              Выполнено доставок: {driver.completed_orders}
            </div>
          )}
        </div>
      </div>
      {vehicles.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {vehicles.map((v) => (
            <span
              key={v}
              className="text-xs bg-brand-light text-brand-dark rounded-full px-2.5 py-1"
            >
              {vehicleEmoji(v)} {vehicleTypeName(v)}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
