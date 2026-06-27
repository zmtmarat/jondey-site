import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getCompany, getCompanyRoster } from '@/lib/data';
import { catName, legalTypeName } from '@/lib/labels';

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = await getCompany(id);
  if (!c) return { title: 'Компания' };
  return {
    title: `${c.name} — ${legalTypeName(c.legal_type)}`,
    description: c.about?.slice(0, 160) || `${c.name}: услуги и контакты на Jondey.`,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);
  if (!company) notFound();

  const [categories, roster] = await Promise.all([
    getCategories(),
    getCompanyRoster(id),
  ]);
  const years = company.years_on_market ?? 0;
  const masters = company.masters_count ?? 0;
  const catMap = new Map(categories.map((c) => [String(c.id), c]));
  const cats = company.category_ids
    .map((cid) => catMap.get(cid))
    .filter(Boolean);
  const digits = company.phone?.replace(/[^0-9]/g, '') ?? '';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/kompanii" className="hover:text-brand">
          Компании
        </Link>{' '}
        / <span className="text-slate-700">{company.name}</span>
      </nav>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex gap-4 items-center">
          {company.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo_url}
              alt={company.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-brand text-white grid place-items-center text-4xl">
              🏢
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold">{company.name}</h1>
            <span className="inline-block mt-1 text-sm bg-brand-light text-brand-dark rounded-full px-3 py-1">
              Компания · {legalTypeName(company.legal_type)}
              {company.bin ? ` · ${company.bin}` : ''}
            </span>
          </div>
        </div>

        {(years > 0 || masters > 0) && (
          <div className="mt-4 flex gap-3">
            {years > 0 && (
              <div className="rounded-xl bg-brand-light px-4 py-2 text-center">
                <div className="text-lg font-bold text-brand-dark">{years}</div>
                <div className="text-xs text-slate-500">лет на рынке</div>
              </div>
            )}
            {masters > 0 && (
              <div className="rounded-xl bg-brand-light px-4 py-2 text-center">
                <div className="text-lg font-bold text-brand-dark">{masters}</div>
                <div className="text-xs text-slate-500">мастеров</div>
              </div>
            )}
          </div>
        )}

        {digits && (
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`tel:${company.phone}`}
              className="rounded-xl bg-brand text-white px-5 py-2.5 font-semibold hover:bg-brand-dark transition"
            >
              📞 Позвонить
            </a>
            <a
              href={`https://wa.me/${digits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-green-500 text-green-600 px-5 py-2.5 font-semibold hover:bg-green-50 transition"
            >
              WhatsApp
            </a>
          </div>
        )}

        {company.about && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h2 className="font-bold mb-2">О компании</h2>
            <p className="text-slate-700 whitespace-pre-line">{company.about}</p>
          </div>
        )}

        {roster.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h2 className="font-bold mb-3">Мастера компании</h2>
            <div className="space-y-2">
              {roster.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >
                  {m.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo_url}
                      alt={m.full_name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand text-white grid place-items-center font-bold">
                      {m.full_name[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{m.full_name}</div>
                    <div className="text-sm text-slate-500">
                      {[
                        m.specialization,
                        m.experience_years
                          ? `опыт ${m.experience_years} лет`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cats.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h2 className="font-bold mb-3">Направления</h2>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <span
                  key={c!.id}
                  className="text-sm bg-brand-light text-brand-dark rounded-full px-3 py-1.5"
                >
                  {catName(c)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
