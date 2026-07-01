import Link from 'next/link';
import type { Category } from '@/lib/types';
import { catIcon, catName } from '@/lib/labels';

// Автокарусель категорий: непрерывно едет по кругу (CSS-marquee), пауза при
// наведении, мягкое затухание по краям. Все категории.
export default function CategoryMarquee({
  categories,
}: {
  categories: Category[];
}) {
  if (categories.length === 0) return null;
  // Дублируем список — для бесшовной петли (сдвиг на 50% = одна копия).
  const chips = [...categories, ...categories];

  return (
    <div className="mt-6 sm:mt-8 -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="flex w-max gap-2 px-4 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
        {chips.map((c, i) => (
          <Link
            key={i}
            href={`/mastera/${c.slug}`}
            style={{ color: '#334155' }}
            className="shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium ring-1 ring-slate-200 hover:bg-slate-200 transition"
          >
            <span className="text-base">{catIcon(c.slug)}</span>
            {catName(c)}
          </Link>
        ))}
      </div>
    </div>
  );
}
