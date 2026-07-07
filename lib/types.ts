// Типы данных витрины — повторяют схему Supabase (общий бэкенд с приложением).

export interface Category {
  id: number;
  slug: string;
  name_ru: string | null;
  name_kk: string | null;
  parent_id: number | null;
}

export interface City {
  id: number;
  name_ru: string | null;
  name_kk: string | null;
}

export interface Master {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  city_id: number | null;
  category_ids: string[];
  completed_orders: number;
  review_count: number;
  distinct_clients: number;
  avg_rating: number | null;
  verified: boolean;
  // Только для водителей доставки (из master_profiles.vehicle_types).
  vehicle_types?: string[];
}

export interface MasterAbout {
  about: string | null;
  experience_years: number | null;
  work_mode: string | null; // visit | at_home | both
}

export interface Service {
  id: number;
  category_id: number;
  slug: string;
  name_ru: string;
  name_kk: string | null;
  popular: boolean;
}

export interface Company {
  id: string;
  name: string;
  legal_type: string; // too | ip
  bin: string | null;
  phone: string | null;
  about: string | null;
  logo_url: string | null;
  category_ids: string[];
  city_ids: string[];
  years_on_market: number | null;
  masters_count: number | null;
}

export interface CompanyMaster {
  id: number;
  company_id: string;
  full_name: string;
  experience_years: number | null;
  specialization: string | null;
  photo_url: string | null;
}

export interface Review {
  id: number | string;
  rating: number;
  text: string | null;
  created_at: string | null;
}

export interface OrderListing {
  id: string;
  title: string;
  description: string;
  category_id: number;
  city_id: number | null;
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  settlement: string | null;
  preferred_time: string | null;
  crew: string | null;
  item_type: string | null;
  brand: string | null;
  created_at: string | null;
}

export interface ForumTopic {
  id: number;
  author_name: string | null;
  title: string;
  body: string | null;
  image_url: string | null;
  created_at: string | null;
  comment_count?: number;
}

export interface ForumComment {
  id: number;
  topic_id: number;
  author_name: string | null;
  body: string;
  created_at: string | null;
}

export interface WebPart {
  id: string;
  category_slug: string;
  part_type: string;
  brand: string | null;
  model: string | null;
  year_from: number | null;
  year_to: number | null;
  title: string | null;
  price: number | null;
  condition: string;
  photo_url: string | null;
  company_name: string | null;
  company_id?: string | null;
  authorized?: boolean;
}

export interface WebBrand {
  id: string;
  slug: string;
  name: string;
  category_slug: string | null;
  country: string | null;
  logo_url: string | null;
  description: string | null;
  is_featured: boolean;
  partner_count: number;
  part_count: number;
}
