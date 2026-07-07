import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBrand, getBrandReps, getBrands, getCities } from '@/lib/data';
import { cityName } from '@/lib/labels';
import type { City, Company } from '@/lib/types';

export const revalidate = 300;

const CAT_LABEL: Record<string, string> = {
  transport: 'Автозапчасти',
  spectech: 'Спецтехника',
  moto: 'Мототехника',
};

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) return { title: 'Бренд не найден | Jondey' };
  const cat = brand.category_slug ? CAT_LABEL[brand.category_slug] : 'запчасти';
  return {
    title: `${brand.name} — ${cat} в Казахстане, представители и наличие | Jondey`,
    description:
      brand.description ??
      `${brand.name}: авторизованные представители, наличие и цены в Казахстане. Связь с продавцом в приложении Jondey.`,
    alternates: { canonical: `https://jondey.kz/brands/${brand.slug}` },
  };
}

function repCity(company: Company, cities: City[]): string {
  const id = company.city_ids?.[0];
  if (!id) return '';
  const c = cities.find((x) => String(x.id) === String(id));
  return c ? cityName(c) : '';
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const [reps, cities] = await Promise.all([
    getBrandReps(brand.id),
    getCities(),
  ]);

  const cat = brand.category_slug ? CAT_LABEL[brand.category_slug] : null;

  return (
    <main>
      <section className="bg-gradient-to-br from-brand to-[#0d2c5c] text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <Link href="/brands" className="text-white/70 text-sm hover:text-white">
            ← Все бренды
          </Link>
          <div className="mt-4 flex items-center gap-4">
            {brand.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="w-16 h-16 rounded-2xl bg-white object-contain p-1.5 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center text-3xl font-extrabold shrink-0">
                {brand.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{brand.name}</h1>
              <div className="mt-1 text-white/80 text-sm">
                {[cat, brand.country].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>
          {brand.description && (
            <p className="mt-5 max-w-2xl text-white/85 text-[15px] leading-relaxed">
              {brand.description}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-slate-900">
          Авторизованные представители в Казахстане
        </h2>

        {reps.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
            <div className="text-3xl mb-2">🤝</div>
            <p className="text-slate-700 font-medium">
              Пока нет авторизованных представителей {brand.name}
            </p>
            <p className="text-slate-500 text-sm mt-1 mb-4 max-w-md mx-auto">
              Продаёте запчасти или технику {brand.name}? Станьте первым
              авторизованным представителем и получайте клиентов со всего
              Казахстана.
            </p>
            <Link
              href="/skachat"
              className="inline-block rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white"
            >
              Стать представителем
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {reps.map((c) => {
              const city = repCity(c, cities);
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3">
                    {c.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.logo_url}
                        alt={c.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center font-bold shrink-0">
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500">
                        {[c.legal_type?.toUpperCase(), city]
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 self-start rounded-full bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 border border-green-200">
                    ✓ Авторизованный представитель
                  </span>
                  {c.about && (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {c.about}
                    </p>
                  )}
                  <Link
                    href="/skachat"
                    className="mt-3 rounded-xl bg-brand/10 text-brand text-center py-2 text-sm font-semibold hover:bg-brand/15"
                  >
                    Связаться в приложении
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <section className="mt-12 grid sm:grid-cols-2 gap-4">
          <Link
            href="/zapchasti"
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand/40 transition"
          >
            <div className="font-semibold text-slate-900">🔧 Найти запчасть</div>
            <p className="mt-1 text-sm text-slate-600">
              Поиск деталей по марке, модели и году в каталоге Jondey.
            </p>
          </Link>
          <Link
            href="/brands"
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand/40 transition"
          >
            <div className="font-semibold text-slate-900">🏭 Другие бренды</div>
            <p className="mt-1 text-sm text-slate-600">
              Все бренды запчастей и спецтехники на Jondey.
            </p>
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Brand',
            name: brand.name,
            description: brand.description ?? undefined,
            url: `https://jondey.kz/brands/${brand.slug}`,
          }),
        }}
      />
    </main>
  );
}
