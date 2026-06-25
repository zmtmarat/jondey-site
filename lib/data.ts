import { supabase } from './supabase';
import type {
  Category,
  City,
  Master,
  MasterAbout,
  OrderListing,
  Review,
} from './types';

// ─── Справочники ─────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('categories')
    .select('id, slug, name_ru, name_kk, parent_id')
    .is('parent_id', null);
  return (data ?? []) as Category[];
}

export async function getCities(): Promise<City[]> {
  const { data } = await supabase
    .from('cities')
    .select('id, name_ru, name_kk')
    .eq('is_active', true);
  const list = (data ?? []) as City[];
  list.sort((a, b) => (a.name_ru ?? '').localeCompare(b.name_ru ?? '', 'ru'));
  return list;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await supabase
    .from('categories')
    .select('id, slug, name_ru, name_kk, parent_id')
    .eq('slug', slug)
    .maybeSingle();
  return (data as Category) ?? null;
}

// ─── Мастера ─────────────────────────────────────────────────────────────────

// Витрина для сайта — без телефона (контакт только в приложении).
const MASTERS_VIEW = 'web_masters';
const MASTER_COLS =
  'user_id, full_name, avatar_url, city_id, category_ids, completed_orders, review_count, distinct_clients, avg_rating, verified';

function sortMasters(list: Master[]): Master[] {
  return [...list].sort((a, b) => {
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    const r = (b.avg_rating ?? -1) - (a.avg_rating ?? -1);
    if (r !== 0) return r;
    return b.completed_orders - a.completed_orders;
  });
}

export async function getTopMasters(limit = 8): Promise<Master[]> {
  const { data } = await supabase.from(MASTERS_VIEW).select(MASTER_COLS);
  return sortMasters((data ?? []) as Master[]).slice(0, limit);
}

export async function getMasters(opts: {
  categoryId?: number;
  cityId?: number;
}): Promise<Master[]> {
  let q = supabase.from(MASTERS_VIEW).select(MASTER_COLS);
  if (opts.categoryId != null) {
    q = q.contains('category_ids', [String(opts.categoryId)]);
  }
  if (opts.cityId != null) q = q.eq('city_id', opts.cityId);
  const { data } = await q;
  return sortMasters((data ?? []) as Master[]);
}

export async function getMaster(id: string): Promise<{
  master: Master | null;
  about: MasterAbout | null;
  reviews: Review[];
}> {
  const [m, a, r] = await Promise.all([
    supabase.from(MASTERS_VIEW).select(MASTER_COLS).eq('user_id', id).maybeSingle(),
    supabase
      .from('master_profiles')
      .select('about, experience_years, work_mode')
      .eq('user_id', id)
      .maybeSingle(),
    supabase
      .from('reviews')
      .select('id, rating, text, created_at')
      .eq('target_id', id)
      .order('created_at', { ascending: false })
      .limit(50),
  ]);
  return {
    master: (m.data as Master) ?? null,
    about: (a.data as MasterAbout) ?? null,
    reviews: (r.data ?? []) as Review[],
  };
}

// ─── Заявки (объявления) ─────────────────────────────────────────────────────

const ORDER_COLS =
  'id, title, description, category_id, city_id, budget_min, budget_max, currency, settlement, preferred_time, crew, item_type, brand, created_at';

export async function getOrders(opts: {
  categoryId?: number;
  cityId?: number;
  limit?: number;
}): Promise<OrderListing[]> {
  let q = supabase
    .from('orders')
    .select(ORDER_COLS)
    .eq('status', 'published')
    .is('archived_at', null)
    .order('created_at', { ascending: false })
    .limit(opts.limit ?? 40);
  if (opts.categoryId != null) q = q.eq('category_id', opts.categoryId);
  if (opts.cityId != null) q = q.eq('city_id', opts.cityId);
  const { data } = await q;
  return (data ?? []) as OrderListing[];
}

export async function getOrder(id: string): Promise<OrderListing | null> {
  const { data } = await supabase
    .from('orders')
    .select(ORDER_COLS)
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle();
  return (data as OrderListing) ?? null;
}
