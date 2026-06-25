import Link from 'next/link';
import type { Category } from '@/lib/types';
import { catIcon, catName } from '@/lib/labels';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/mastera/${c.slug}`}
          className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
        >
          <span className="text-2xl">{catIcon(c.slug)}</span>
          <span className="font-medium">{catName(c)}</span>
        </Link>
      ))}
    </div>
  );
}
