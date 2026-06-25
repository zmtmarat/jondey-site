import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/// Анонимный клиент Supabase для публичной витрины (тот же бэкенд, что у
/// мобильного приложения). Доступ ограничен RLS — сайт видит только публичные
/// данные (опубликованные заявки, каталог мастеров, отзывы, справочники).
export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});
