import { masterRank } from '@/lib/rank';

// Бейдж статуса мастера (по числу категорий). Лаконичный значок-«молния» +
// подпись, в виде премиального чипа. Ничего не рисует, если категорий мало.
export default function RankBadge({
  categoryCount,
  className = '',
}: {
  categoryCount: number;
  className?: string;
}) {
  const rank = masterRank(categoryCount);
  if (!rank) return null;
  return (
    <span
      title={`Работает в ${categoryCount} направлениях`}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold leading-none ${rank.className} ${className}`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />
      </svg>
      {rank.label}
    </span>
  );
}
