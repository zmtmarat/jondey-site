import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getCompanies } from '@/lib/data';
import type { Category } from '@/lib/types';
import CompanyCard from '@/components/CompanyCard';
import { catName } from '@/lib/labels';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Компании по ремонту и услугам',
  description:
    'Проверенные компании (ТОО/ИП) по ремонту спецтехники, бытовой техники, натяжным потолкам, клинингу и другим услугам в Казахстане.',
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const sp = await searchParams;
  const categoryId = sp.cat ? Number(sp.cat) : undefined;
  const [companies, categories] = await Promise.all([
    getCompanies({ categoryId }),
    getCategories(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));

  // Компании по категориям без дублей (каждая — в первой своей категории).
  const shownCompanies = new Set<string>();
  const companyGroups = categories
    .map((cat) => {
      const inCat = companies.filter((c) =>
        c.category_ids.includes(String(cat.id)),
      );
      const fresh = inCat.filter((c) => !shownCompanies.has(c.id));
      fresh.forEach((c) => shownCompanies.add(c.id));
      return { cat, fresh, total: inCat.length };
    })
    .filter((g) => g.fresh.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Компании</h1>
      <p className="text-slate-500 mt-2">
        Проверенные компании-исполнители: ТОО и ИП с модерацией.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/kompanii"
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
            href={`/kompanii?cat=${c.id}`}
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

      {companies.length === 0 ? (
        <section className="mt-6">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Проверенных компаний пока нет. Зарегистрируйте компанию в приложении.
          </div>
        </section>
      ) : categoryId != null ? (
        // Уже отфильтровано по одной категории — плоская сетка.
        <section className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((c) => (
              <CompanyCard key={c.id} company={c} catMap={catMap} />
            ))}
          </div>
        </section>
      ) : (
        // Все компании — группируем по категориям без дублей.
        <section className="mt-8 space-y-9">
          {companyGroups.map(({ cat, fresh, total }) => (
            <div key={cat.id}>
              <div className="flex items-end justify-between mb-3">
                <h2 className="text-xl font-bold">{catName(cat)}</h2>
                {total > fresh.slice(0, 6).length && (
                  <Link
                    href={`/kompanii?cat=${cat.id}`}
                    className="text-sm text-brand font-medium hover:underline"
                  >
                    Все ({total}) →
                  </Link>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fresh.slice(0, 6).map((c) => (
                  <CompanyCard key={c.id} company={c} catMap={catMap} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
