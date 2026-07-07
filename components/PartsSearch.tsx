'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getParts } from '@/lib/data';
import type { WebPart } from '@/lib/types';

type Cat = { slug: string; name: string; image: string | null };

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
  categories: Cat[];
  initial: WebPart[];
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [items, setItems] = useState<WebPart[]>(initial);
  const [loading, setLoading] = useState(false);

  async function run(nextCat = cat, nextQ = q) {
    setLoading(true);
    const data = await getParts({ q: nextQ, category: nextCat || undefined });
    setItems(data);
    setLoading(false);
  }

  function toggleCat(slug: string) {
    const next = cat === slug ? '' : slug;
    setCat(next);
    run(next);
  }

  return (
    <div>
      {/* Категории картинками */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((c) => {
          const active = cat === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => toggleCat(c.slug)}
              className={`group rounded-2xl border p-2 text-center transition ${
                active
                  ? 'border-brand ring-2 ring-brand/30 bg-brand/5'
                  : 'border-slate-200 hover:border-brand/40 bg-white'
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-2xl">🔧</div>
                )}
              </div>
              <div
                className={`mt-1.5 text-[11px] leading-tight font-medium ${active ? 'text-brand' : 'text-slate-700'}`}
              >
                {c.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Поиск */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="mt-6 flex flex-col sm:flex-row gap-3"
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

      {/* Результаты */}
      <div className="mt-6">
        {loading ? (
          <p className="text-slate-500 py-10 text-center">Ищем…</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-slate-700 font-medium">
              Пока ничего не нашли по этому запросу
            </p>
            <p className="text-slate-500 text-sm mt-1 mb-4">
              Оставьте запрос в приложении — магазины сами пришлют вам цены на
              нужную деталь.
            </p>
            <Link
              href="/skachat"
              className="inline-block rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white"
            >
              Заказать в приложении
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col hover:shadow-md transition"
              >
                <div className="flex gap-3">
                  {p.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.photo_url}
                      alt={p.part_type}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-brand/10 grid place-items-center text-brand shrink-0">
                      🔧
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800">
                      {p.part_type}
                    </div>
                    {compat(p) && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {compat(p)}
                      </div>
                    )}
                    <div className="mt-1 flex items-center gap-2">
                      {p.price != null && (
                        <span className="text-brand font-bold">
                          {p.price.toLocaleString('ru-RU')} ₸
                        </span>
                      )}
                      <span className="text-[11px] rounded-md bg-slate-100 px-1.5 py-0.5 text-slate-600">
                        {p.condition === 'used' ? 'Б/у' : 'Новая'}
                      </span>
                    </div>
                  </div>
                </div>
                {p.company_name && (
                  <div className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    🏪 {p.company_name}
                  </div>
                )}
                {p.authorized && (
                  <div className="mt-1.5 inline-flex items-center gap-1 self-start rounded-full bg-green-50 text-green-700 text-[11px] font-semibold px-2 py-0.5 border border-green-200">
                    ✓ Авторизованный представитель
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
    </div>
  );
}
