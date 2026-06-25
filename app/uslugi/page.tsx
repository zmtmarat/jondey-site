import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getServices } from '@/lib/data';
import type { Category, Service } from '@/lib/types';
import { catIcon, catName } from '@/lib/labels';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Все услуги — ремонт, уборка, авто, техника',
  description:
    'Полный каталог услуг Jondey по Казахстану: ремонт техники, сантехника, авто и спецтехника, уборка, электроника и другое. Выберите услугу и получите предложения от мастеров.',
};

export default async function ServicesCatalogPage() {
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  const byCat = new Map<number, Service[]>();
  for (const s of services) {
    (byCat.get(s.category_id) ?? byCat.set(s.category_id, []).get(s.category_id)!).push(s);
  }
  const popular = services.filter((s) => s.popular).slice(0, 14);
  // Категории, у которых есть услуги — в порядке справочника.
  const cats = categories.filter((c) => (byCat.get(c.id)?.length ?? 0) > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Все услуги</h1>
      <p className="text-slate-500 mt-2">
        Выберите конкретную услугу — покажем мастеров и поможем создать заявку.
      </p>

      {popular.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Популярные услуги
          </h2>
          <div className="flex flex-wrap gap-2">
            {popular.map((s) => (
              <Link
                key={s.id}
                href={`/uslugi/${s.slug}`}
                className="rounded-full bg-brand-light text-brand-dark px-4 py-2 text-sm font-medium hover:bg-brand hover:text-white transition"
              >
                {s.name_ru}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {cats.map((c: Category) => {
          const list = (byCat.get(c.id) ?? []).slice().sort((a, b) =>
            a.name_ru.localeCompare(b.name_ru, 'ru'),
          );
          return (
            <div
              key={c.id}
              className="rounded-2xl bg-white border border-slate-200 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{catIcon(c.slug)}</span>
                <Link
                  href={`/mastera/${c.slug}`}
                  className="font-bold text-lg hover:text-brand"
                >
                  {catName(c)}
                </Link>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                {list.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/uslugi/${s.slug}`}
                      className="text-slate-600 hover:text-brand text-sm"
                    >
                      {s.name_ru}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {cats.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Каталог услуг скоро наполнится.
        </div>
      )}
    </div>
  );
}
