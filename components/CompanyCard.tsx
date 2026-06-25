import Link from 'next/link';
import type { Category, Company } from '@/lib/types';
import { catName, legalTypeName } from '@/lib/labels';

export default function CompanyCard({
  company,
  catMap,
}: {
  company: Company;
  catMap: Map<number, Category>;
}) {
  const cats = company.category_ids
    .map((id) => catMap.get(Number(id)))
    .filter(Boolean) as Category[];

  return (
    <Link
      href={`/kompaniya/${company.id}`}
      className="block rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
    >
      <div className="flex gap-3 items-center">
        {company.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={company.logo_url}
            alt={company.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-brand text-white grid place-items-center text-2xl">
            🏢
          </div>
        )}
        <div className="min-w-0">
          <div className="font-semibold truncate">{company.name}</div>
          <span className="inline-block mt-1 text-xs bg-brand-light text-brand-dark rounded-full px-2.5 py-0.5">
            Компания · {legalTypeName(company.legal_type)}
          </span>
        </div>
      </div>
      {cats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cats.slice(0, 4).map((c) => (
            <span
              key={c.id}
              className="text-xs bg-slate-100 text-slate-600 rounded-full px-2.5 py-1"
            >
              {catName(c)}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
