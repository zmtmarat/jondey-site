'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getParts } from '@/lib/data';
import type { WebPart } from '@/lib/types';

function compat(p: WebPart) {
  const years =
    p.year_from && p.year_to
      ? `${p.year_from}–${p.year_to}`
      : p.year_from
        ? `с ${p.year_from}`
        : p.year_to
          ? `до ${p.year_to}`
          : '';
  return [p.brand, p.model, years].filter(Boolean).join(' · ');
}

export default function PartsSearch({
  categories,
  initial,
}: {
  categories: { slug: string; name: string }[];
  initial: WebPart[];
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [items, setItems] = useState<WebPart[]>(initial);
  const [loading, setLoading] = useState(false);

  async function run(nextCat = cat) {
    setLoading(true);
    const data = await getParts({ q, category: nextCat || undefined });
    setItems(data);
    setLoading(false);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="flex flex-col sm:flex-row gap-3 mb-5"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Деталь, марка или модель — напр. стартер camry"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Найти
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setCat('');
            run('');
          }}
          className={`rounded-full px-3 py-1.5 text-sm border ${cat === '' ? 'bg-brand text-white border-brand' : 'border-slate-300 text-slate-600'}`}
        >
          Все
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => {
              setCat(c.slug);
              run(c.slug);
            }}
            className={`rounded-full px-3 py-1.5 text-sm border ${cat === c.slug ? 'bg-brand text-white border-brand' : 'border-slate-300 text-slate-600'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-500 py-8 text-center">Ищем…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
          <p className="text-slate-600 mb-3">
            По запросу пока ничего не нашли. Оставьте запрос в приложении — магазины
            пришлют цены.
          </p>
          <Link
            href="/skachat"
            className="inline-block rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Заказать в приложении
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col"
            >
              <div className="flex gap-3">
                {p.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo_url}
                    alt={p.part_type}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-brand/10 grid place-items-center text-brand">
                    🔧
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800">{p.part_type}</div>
                  {compat(p) && (
                    <div className="text-xs text-slate-500 mt-0.5">{compat(p)}</div>
                  )}
                  {p.price != null && (
                    <div className="text-brand font-bold mt-1">
                      {p.price.toLocaleString('ru-RU')} ₸
                    </div>
                  )}
                </div>
              </div>
              {p.company_name && (
                <div className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  🏪 {p.company_name}
                </div>
              )}
              <Link
                href="/skachat"
                className="mt-3 rounded-xl bg-brand/10 text-brand text-center py-2 text-sm font-semibold hover:bg-brand/15"
              >
                Связаться в приложении
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
