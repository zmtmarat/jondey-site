import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/lib/types';
import { catIcon, catImage, catName } from '@/lib/labels';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories.map((c) => {
        const img = catImage(c.slug);
        return (
          <Link
            key={c.id}
            href={`/mastera/${c.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-brand/40 transition"
          >
            {img ? (
              <Image
                src={img}
                alt={catName(c)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-light to-white text-5xl">
                {catIcon(c.slug)}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 pt-9">
              <span className="flex items-center gap-1.5 text-white font-semibold text-sm sm:text-[15px] drop-shadow">
                <span className="text-base">{catIcon(c.slug)}</span>
                {catName(c)}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
