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
}

export interface MasterAbout {
  about: string | null;
  experience_years: number | null;
  work_mode: string | null; // visit | at_home | both
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
