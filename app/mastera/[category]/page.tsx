import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getCategories,
  getCategoryBySlug,
  getMasters,
} from '@/lib/data';
import type { Category } from '@/lib/types';
import { catImage, catName } from '@/lib/labels';
import { SITE_URL } from '@/lib/site';
import MasterCard from '@/components/MasterCard';
import JsonLd from '@/components/JsonLd';

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  const name = catName(cat);
  const img = catImage(cat?.slug);
  return {
    title: `${name} — мастера и услуги`,
    description: `Лучшие мастера в категории «${name}» в Казахстане: рейтинги, отзывы и прямой контакт на Jondey.`,
    alternates: { canonical: `/mastera/${category}` },
    openGraph: img ? { images: [`${SITE_URL}${img}`] } : undefined,
  };
}

export default async function CategoryMastersPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const [masters, categories] = await Promise.all([
    getMasters({ categoryId: cat.id }),
    getCategories(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const name = catName(cat);
  const img = catImage(cat.slug);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Каталог мастеров',
        item: `${SITE_URL}/mastera`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}/mastera/${cat.slug}`,
      },
    ],
  };

  return (
    <div>
      <JsonLd data={breadcrumb} />
      {/* Фото-хедер категории */}
      <section className="relative h-56 sm:h-72 w-full overflow-hidden bg-brand">
        {img && (
          <Image
            src={img}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 mx-auto max-w-6xl px-4 flex flex-col justify-end pb-6">
          <nav className="text-sm text-white/80 mb-2">
            <Link href="/mastera" className="hover:text-white">
              Каталог мастеров
            </Link>{' '}
            / <span className="text-white">{name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
            {name} — мастера
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-slate-500">
          Специалисты по направлению «{name}». Отсортированы по рейтингу и числу
          выполненных заказов.
        </p>

        <section className="mt-6">
          {masters.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {masters.map((m) => (
                <MasterCard key={m.user_id} master={m} catMap={catMap} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              В этой категории пока нет мастеров. Установите приложение, чтобы
              стать первым.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
