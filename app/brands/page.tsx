import type { Metadata } from 'next';
import Link from 'next/link';
import { getBrands } from '@/lib/data';
import type { WebBrand } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Бренды запчастей и спецтехники в Казахстане | Jondey',
  description:
    'Каталог брендов автозапчастей и спецтехники: Bosch, Denso, XCMG, SANY, Cummins и другие. Найдите авторизованных представителей и наличие в Казахстане.',
  alternates: { canonical: 'https://jondey.kz/brands' },
};

export const revalidate = 300;

const CAT_LABEL: Record<string, string> = {
  transport: 'Автозапчасти',
  spectech: 'Спецтехника',
  moto: 'Мототехника',
};

function BrandLogo({ brand, size = 56 }: { brand: WebBrand; size?: number }) {
  if (brand.logo_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={brand.logo_url}
        alt={brand.name}
        style={{ width: size, height: size }}
        className="rounded-xl object-contain bg-white border border-slate-200 p-1 shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-brand/10 text-brand grid place-items-center font-extrabold text-xl shrink-0"
    >
      {brand.name.charAt(0)}
    </div>
  );
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main>
      <section className="bg-gradient-to-br from-brand to-[#0d2c5c] text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold mb-4">
            🏭 Бренды-производители
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Бренды запчастей и спецтехники
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 text-[15px] leading-relaxed">
            Оригинальные запчасти и техника от известных брендов. Каждый бренд —
            это авторизованные представители в Казахстане с наличием и ценами.
            Свяжитесь с продавцом прямо в приложении Jondey.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/brands/${b.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-brand/40 transition flex flex-col"
            >
              <div className="flex items-center gap-3">
                <BrandLogo brand={b} />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    {b.name}
                    {b.is_featured && (
                      <span className="text-[10px] rounded bg-amber-100 text-amber-700 px-1.5 py-0.5 font-semibold">
                        ТОП
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {[b.category_slug ? CAT_LABEL[b.category_slug] : null, b.country]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
              </div>
              {b.description && (
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {b.description}
                </p>
              )}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                {b.partner_count > 0 ? (
                  <span className="text-green-700 font-medium">
                    ✓ {b.partner_count} представит.
                  </span>
                ) : (
                  <span>Ищем представителей</span>
                )}
                {b.part_count > 0 && <span>{b.part_count} в наличии</span>}
              </div>
            </Link>
          ))}
        </div>

        {brands.length === 0 && (
          <p className="text-center text-slate-500 py-16">
            Бренды скоро появятся.
          </p>
        )}

        <section className="mt-14 rounded-2xl bg-brand/5 border border-brand/15 p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Ваш бренд или магазин запчастей?
          </h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto text-sm">
            Станьте авторизованным представителем на Jondey: бренд-страница,
            бейдж доверия и поток клиентов со всего Казахстана.
          </p>
          <Link
            href="/skachat"
            className="mt-5 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark transition"
          >
            Стать представителем
          </Link>
        </section>
      </div>
    </main>
  );
}
