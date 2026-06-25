import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCategories,
  getMasters,
  getService,
  getServices,
  getServicesByCategory,
} from '@/lib/data';
import Image from 'next/image';
import type { Category } from '@/lib/types';
import { catImage, catName } from '@/lib/labels';
import { SITE_URL } from '@/lib/site';
import MasterCard from '@/components/MasterCard';
import JsonLd from '@/components/JsonLd';

export const revalidate = 300;

// Статическая генерация всех страниц услуг — для индексации Google.
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Услуга' };
  const categories = await getCategories();
  const cat = categories.find((c) => c.id === service.category_id);
  const img = catImage(cat?.slug);
  return {
    title: `${service.name_ru} в Казахстане — цены и мастера`,
    description: `${service.name_ru}: проверенные мастера с отзывами и рейтингом. Создайте заявку на Jondey и получите предложения с ценами.`,
    alternates: { canonical: `/uslugi/${slug}` },
    openGraph: img ? { images: [`${SITE_URL}${img}`] } : undefined,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [categories, related, masters] = await Promise.all([
    getCategories(),
    getServicesByCategory(service.category_id),
    getMasters({ categoryId: service.category_id }),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const cat = catMap.get(service.category_id);
  const img = catImage(cat?.slug);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Услуги', item: `${SITE_URL}/uslugi` },
      ...(cat
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: catName(cat),
              item: `${SITE_URL}/mastera/${cat.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: cat ? 3 : 2,
        name: service.name_ru,
        item: `${SITE_URL}/uslugi/${service.slug}`,
      },
    ],
  };
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name_ru,
    serviceType: service.name_ru,
    url: `${SITE_URL}/uslugi/${service.slug}`,
    ...(cat ? { category: catName(cat) } : {}),
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    provider: { '@type': 'Organization', name: 'Jondey', url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={breadcrumb} />
      <JsonLd data={serviceLd} />
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/uslugi" className="hover:text-brand">
          Услуги
        </Link>
        {cat && (
          <>
            {' / '}
            <Link href={`/mastera/${cat.slug}`} className="hover:text-brand">
              {catName(cat)}
            </Link>
          </>
        )}
        {' / '}
        <span className="text-slate-700">{service.name_ru}</span>
      </nav>

      <section className="relative overflow-hidden rounded-2xl bg-brand text-white">
        {img && (
          <Image
            src={img}
            alt={service.name_ru}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/90 to-brand-dark/85" />
        <div className="relative p-8">
          <h1 className="text-3xl font-extrabold">
            {service.name_ru} в Казахстане
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Найдите проверенного мастера по услуге «{service.name_ru}». Реальные
            отзывы, рейтинги и прямой контакт. Создайте заявку — и получите
            предложения с ценами от специалистов.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/skachat"
              className="rounded-xl bg-white text-brand-dark px-6 py-3 font-semibold hover:bg-slate-100 transition"
            >
              Создать заявку
            </Link>
            {cat && (
              <Link
                href={`/mastera/${cat.slug}`}
                className="rounded-xl bg-brand-dark/40 ring-1 ring-white/40 px-6 py-3 font-semibold hover:bg-brand-dark/60 transition"
              >
                Все мастера: {catName(cat)}
              </Link>
            )}
          </div>
        </div>
      </section>

      {masters.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Мастера для услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {masters.slice(0, 9).map((m) => (
              <MasterCard key={m.user_id} master={m} catMap={catMap} />
            ))}
          </div>
        </section>
      )}

      {related.length > 1 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">
            Похожие услуги{cat ? ` · ${catName(cat)}` : ''}
          </h2>
          <div className="flex flex-wrap gap-2">
            {related
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/uslugi/${s.slug}`}
                  className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm hover:border-brand/40 hover:text-brand transition"
                >
                  {s.name_ru}
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
