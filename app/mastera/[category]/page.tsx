import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCategories,
  getCategoryBySlug,
  getMasters,
} from '@/lib/data';
import type { Category } from '@/lib/types';
import { catName } from '@/lib/labels';
import MasterCard from '@/components/MasterCard';

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  const name = catName(cat);
  return {
    title: `${name} — мастера и услуги`,
    description: `Лучшие мастера в категории «${name}» в Казахстане: рейтинги, отзывы и прямой контакт на Jondey.`,
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-slate-500 mb-3">
        <Link href="/mastera" className="hover:text-brand">
          Каталог мастеров
        </Link>{' '}
        / <span className="text-slate-700">{name}</span>
      </nav>
      <h1 className="text-3xl font-extrabold">{name} — мастера</h1>
      <p className="text-slate-500 mt-2">
        Специалисты по направлению «{name}». Отсортированы по рейтингу и числу
        выполненных заказов.
      </p>

      <section className="mt-8">
        {masters.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {masters.map((m) => (
              <MasterCard key={m.user_id} master={m} catMap={catMap} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            В этой категории пока нет мастеров. Установите приложение, чтобы стать
            первым.
          </div>
        )}
      </section>
    </div>
  );
}
