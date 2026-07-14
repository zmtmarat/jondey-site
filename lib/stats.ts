import { supabase } from './supabase';

/* ───────────────────────────────────────────────────────────────────────────
   Реальные показатели платформы. Никаких зашитых цифр.
   Значения берутся из БД; метрика показывается только если она достигла
   порога `min` — иначе (напр. 3 исполнителя) её не выводим, чтобы не вводить
   в заблуждение. По мере наполнения метрики появляются сами.
   ─────────────────────────────────────────────────────────────────────────── */

export type StatKey =
  | 'cities'
  | 'categories'
  | 'brands'
  | 'masters'
  | 'companies'
  | 'parts'
  | 'orders';

export interface StatItem {
  key: StatKey;
  value: number;
}

/** Порог, ниже которого метрику не показываем (данные неубедительны). */
const MIN_TO_SHOW: Record<StatKey, number> = {
  cities: 10,
  categories: 5,
  brands: 5,
  masters: 25,
  companies: 5,
  parts: 50,
  orders: 20,
};

/** Порядок вывода (сильные и стабильные — первыми). */
const ORDER: StatKey[] = [
  'cities',
  'categories',
  'brands',
  'masters',
  'companies',
  'parts',
  'orders',
];

async function count(
  table: string,
  apply?: (q: ReturnType<typeof buildQuery>) => ReturnType<typeof buildQuery>,
): Promise<number> {
  try {
    let q = buildQuery(table);
    if (apply) q = apply(q);
    const { count: c, error } = await q;
    if (error) return 0;
    return c ?? 0;
  } catch {
    return 0;
  }
}

function buildQuery(table: string) {
  return supabase.from(table).select('*', { count: 'exact', head: true });
}

/**
 * Возвращает только те показатели, которые реально подтверждены данными.
 * Пустой массив — секцию статистики не рендерим вовсе.
 */
export async function getPlatformStats(): Promise<StatItem[]> {
  const [cities, categories, brands, masters, companies, parts, orders] =
    await Promise.all([
      count('cities', (q) => q.eq('is_active', true)),
      count('categories', (q) => q.is('parent_id', null)),
      count('brands'),
      count('web_masters'),
      count('companies', (q) => q.eq('moderation_status', 'approved')),
      count('web_parts'),
      count('orders', (q) =>
        q.eq('status', 'published').is('archived_at', null),
      ),
    ]);

  const raw: Record<StatKey, number> = {
    cities,
    categories,
    brands,
    masters,
    companies,
    parts,
    orders,
  };

  return ORDER.filter((k) => raw[k] >= MIN_TO_SHOW[k]).map((k) => ({
    key: k,
    value: raw[k],
  }));
}
