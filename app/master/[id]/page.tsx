import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getMaster } from '@/lib/data';
import type { Category } from '@/lib/types';
import {
  catName,
  ratingText,
  workModeName,
} from '@/lib/labels';
import { SITE_URL } from '@/lib/site';
import Stars from '@/components/Stars';
import JsonLd from '@/components/JsonLd';

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { master } = await getMaster(id);
  const name = master?.full_name?.trim() || 'Мастер';
  return {
    title: `${name} — отзывы и услуги`,
    description: `${name}: рейтинг ${
      master?.avg_rating?.toFixed(1) ?? '—'
    }, ${master?.review_count ?? 0} отзывов. Контакт и услуги на Jondey.`,
  };
}

export default async function MasterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ master, about, reviews }, categories] = await Promise.all([
    getMaster(id),
    getCategories(),
  ]);
  if (!master) notFound();

  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const name = master.full_name?.trim() || 'Мастер';
  const cats = master.category_ids
    .map((cid) => catMap.get(Number(cid)))
    .filter(Boolean) as Category[];

  const hasRating = master.avg_rating != null && master.review_count > 0;
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `${SITE_URL}/master/${master.user_id}`,
    jobTitle: cats.map((c) => catName(c)).join(', ') || 'Мастер',
    ...(master.avatar_url ? { image: master.avatar_url } : {}),
    ...(hasRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: master.avg_rating!.toFixed(1),
            reviewCount: master.review_count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(reviews.length > 0
      ? {
          review: reviews.slice(0, 10).map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Клиент Jondey' },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
            ...(r.text ? { reviewBody: r.text } : {}),
            ...(r.created_at ? { datePublished: r.created_at } : {}),
          })),
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/mastera" className="hover:text-brand">
          Каталог мастеров
        </Link>{' '}
        / <span className="text-slate-700">{name}</span>
      </nav>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex gap-4 items-center">
          {master.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={master.avatar_url}
              alt={name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand text-white grid place-items-center text-3xl font-bold">
              {name[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              {name}
              {master.verified && (
                <span title="Проверенный мастер" className="text-brand text-xl">
                  ✓
                </span>
              )}
            </h1>
            <div className="text-slate-500 mt-1">
              {master.avg_rating != null && master.review_count > 0 ? (
                <span className="inline-flex items-center gap-2">
                  <Stars rating={master.avg_rating} />
                  {ratingText(master.avg_rating, master.review_count)}
                </span>
              ) : (
                'Новый мастер'
              )}
            </div>
            {master.completed_orders > 0 && (
              <div className="text-sm text-slate-400 mt-0.5">
                Выполнено заказов: {master.completed_orders}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <Link
            href="/skachat"
            className="inline-flex rounded-xl bg-brand text-white px-5 py-2.5 font-semibold hover:bg-brand-dark transition"
          >
            📲 Связаться через приложение
          </Link>
        </div>

        {(about?.experience_years || about?.work_mode || about?.about) && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h2 className="font-bold mb-2">
              О мастере
              {about?.experience_years
                ? ` · опыт ${about.experience_years} лет`
                : ''}
            </h2>
            {about?.work_mode && (
              <p className="text-sm text-slate-600">
                🚗 {workModeName(about.work_mode)}
              </p>
            )}
            {about?.about && (
              <p className="mt-2 text-slate-700 whitespace-pre-line">
                {about.about}
              </p>
            )}
          </div>
        )}

        {cats.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h2 className="font-bold mb-3">Направления</h2>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link
                  key={c.id}
                  href={`/mastera/${c.slug}`}
                  className="text-sm bg-brand-light text-brand-dark rounded-full px-3 py-1.5 hover:bg-brand/10"
                >
                  {catName(c)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Отзывы {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl bg-white border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  {r.created_at && (
                    <span className="text-xs text-slate-400">
                      {new Date(r.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  )}
                </div>
                {r.text && <p className="mt-2 text-slate-700">{r.text}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">Пока нет отзывов.</p>
        )}
      </section>
    </div>
  );
}
