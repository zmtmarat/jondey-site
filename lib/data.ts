import { supabase } from './supabase';
import type {
  Category,
  City,
  Company,
  CompanyMaster,
  ForumComment,
  ForumTopic,
  Master,
  MasterAbout,
  OrderListing,
  Review,
  Service,
  WebBrand,
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

// ─── Доставка (водители + запросы) ───────────────────────────────────────────

// Водители — мастера категории «delivery» с типами транспорта из master_profiles.
export async function getDrivers(opts: { cityId?: number } = {}): Promise<
  Master[]
> {
  const cat = await getCategoryBySlug('delivery');
  if (!cat) return [];
  const masters = await getMasters({ categoryId: cat.id, cityId: opts.cityId });
  if (masters.length === 0) return [];
  // Подмешиваем типы транспорта (vehicle_types) из master_profiles.
  const ids = masters.map((m) => m.user_id);
  const { data } = await supabase
    .from('master_profiles')
    .select('user_id, vehicle_types')
    .in('user_id', ids);
  const vmap = new Map<string, string[]>(
    (data ?? []).map((r: { user_id: string; vehicle_types: string[] | null }) => [
      r.user_id,
      r.vehicle_types ?? [],
    ]),
  );
  return masters.map((m) => ({
    ...m,
    vehicle_types: vmap.get(m.user_id) ?? [],
  }));
}

export async function getDeliveryOrders(limit = 30): Promise<OrderListing[]> {
  const cat = await getCategoryBySlug('delivery');
  if (!cat) return [];
  return getOrders({ categoryId: cat.id, limit });
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

// ─── Услуги (глубокий каталог) ───────────────────────────────────────────────

const SERVICE_COLS = 'id, category_id, slug, name_ru, name_kk, popular';

export async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select(SERVICE_COLS)
    .order('name_ru');
  return (data ?? []) as Service[];
}

export async function getService(slug: string): Promise<Service | null> {
  const { data } = await supabase
    .from('services')
    .select(SERVICE_COLS)
    .eq('slug', slug)
    .maybeSingle();
  return (data as Service) ?? null;
}

export async function getServicesByCategory(
  categoryId: number,
): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select(SERVICE_COLS)
    .eq('category_id', categoryId)
    .order('name_ru');
  return (data ?? []) as Service[];
}

// ─── Компании (ТОО/ИП) ───────────────────────────────────────────────────────

const COMPANY_COLS =
  'id, name, legal_type, bin, phone, about, logo_url, category_ids, city_ids, years_on_market, masters_count';

export async function getCompanies(opts: {
  categoryId?: number;
  cityId?: number;
}): Promise<Company[]> {
  let q = supabase
    .from('companies')
    .select(COMPANY_COLS)
    .eq('moderation_status', 'approved')
    .order('created_at', { ascending: false });
  if (opts.categoryId != null) {
    q = q.contains('category_ids', [String(opts.categoryId)]);
  }
  if (opts.cityId != null) q = q.contains('city_ids', [String(opts.cityId)]);
  const { data } = await q;
  return (data ?? []) as Company[];
}

export async function getCompany(id: string): Promise<Company | null> {
  const { data } = await supabase
    .from('companies')
    .select(COMPANY_COLS)
    .eq('id', id)
    .eq('moderation_status', 'approved')
    .maybeSingle();
  return (data as Company) ?? null;
}

export async function getCompanyRoster(
  companyId: string,
): Promise<CompanyMaster[]> {
  const { data } = await supabase
    .from('company_masters')
    .select('id, company_id, full_name, experience_years, specialization, photo_url')
    .eq('company_id', companyId)
    .order('created_at');
  return (data ?? []) as CompanyMaster[];
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

// ─── Форум / обсуждения ──────────────────────────────────────────────────────

export async function getForumTopics(limit = 50): Promise<ForumTopic[]> {
  const { data } = await supabase
    .from('forum_topics')
    .select('id, author_name, title, body, image_url, created_at, forum_comments(count)')
    .eq('status', 'visible')
    .order('created_at', { ascending: false })
    .limit(limit);
  return ((data ?? []) as Record<string, unknown>[]).map((t) => ({
    id: t.id as number,
    author_name: (t.author_name as string) ?? null,
    title: t.title as string,
    body: (t.body as string) ?? null,
    image_url: (t.image_url as string) ?? null,
    created_at: (t.created_at as string) ?? null,
    comment_count:
      (Array.isArray(t.forum_comments) && t.forum_comments[0]
        ? (t.forum_comments[0] as { count: number }).count
        : 0) ?? 0,
  }));
}

export async function getForumTopic(id: string): Promise<ForumTopic | null> {
  const { data } = await supabase
    .from('forum_topics')
    .select('id, author_name, title, body, image_url, created_at')
    .eq('id', id)
    .eq('status', 'visible')
    .maybeSingle();
  return (data as ForumTopic) ?? null;
}

export async function getForumComments(
  topicId: string,
): Promise<ForumComment[]> {
  const { data } = await supabase
    .from('forum_comments')
    .select('id, topic_id, author_name, body, created_at')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });
  return (data ?? []) as ForumComment[];
}

// ─── Запчасти (витрина web_parts: в наличии + одобренные магазины) ────────────

export async function getParts(opts?: {
  q?: string;
  category?: string;
}): Promise<import('./types').WebPart[]> {
  let query = supabase.from('web_parts').select('*').limit(60);
  if (opts?.category) query = query.eq('category_slug', opts.category);
  if (opts?.q) {
    // Санитайзим ввод (для or-фильтра PostgREST) — только буквы/цифры/пробелы.
    const q = opts.q.replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
    if (q) {
      query = query.or(
        `part_type.ilike.%${q}%,brand.ilike.%${q}%,model.ilike.%${q}%`,
      );
    }
  }
  const { data } = await query;
  return (data ?? []) as import('./types').WebPart[];
}

// ─── Бренды-производители (модель C: авторизованные представители) ─────────────

export async function getBrands(): Promise<WebBrand[]> {
  const { data } = await supabase.from('web_brands').select('*');
  const list = (data ?? []) as WebBrand[];
  return list.sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
    if (b.part_count !== a.part_count) return b.part_count - a.part_count;
    return a.name.localeCompare(b.name, 'ru');
  });
}

export async function getBrand(slug: string): Promise<WebBrand | null> {
  const { data } = await supabase
    .from('web_brands')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as WebBrand) ?? null;
}

// Авторизованные представители бренда (одобренные компании).
export async function getBrandReps(brandId: string): Promise<Company[]> {
  const { data: links } = await supabase
    .from('brand_partners')
    .select('company_id')
    .eq('brand_id', brandId)
    .eq('status', 'approved');
  const ids = (links ?? []).map((l: { company_id: string }) => l.company_id);
  if (ids.length === 0) return [];
  const { data } = await supabase
    .from('companies')
    .select(COMPANY_COLS)
    .in('id', ids)
    .eq('moderation_status', 'approved');
  return (data ?? []) as Company[];
}
