-- ============================================================================
--  Публичный доступ для САЙТА (анонимные посетители = витрина + SEO).
--  Выполнить ОДИН раз в Supabase → SQL Editor.
--  Логика: аноним видит только публичное (опубликованные заявки, каталог
--  мастеров без телефона, отзывы, справочники). Приватные данные (точный
--  адрес, телефоны, чужие заказы, чаты) остаются закрыты — их защищает RLS.
-- ============================================================================

-- 1. Витрина мастеров БЕЗ ТЕЛЕФОНА (телефон — только в приложении, чтобы
--    не сливать базу контактов скрейперам).
create or replace view public.web_masters as
  select user_id, full_name, avatar_url, city_id, category_ids,
         completed_orders, review_count, distinct_clients, avg_rating, verified
  from public.public_masters;

grant select on public.web_masters to anon, authenticated;

-- 2. Анонимное чтение публичных данных (роль anon).
--    RESTRICTIVE-политика orders_select_scope действует только на authenticated,
--    поэтому для anon нужна отдельная permissive-политика «только published».
do $$ begin
  -- справочники
  if not exists (select 1 from pg_policies where tablename='categories' and policyname='web_categories_anon') then
    create policy web_categories_anon on public.categories for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='cities' and policyname='web_cities_anon') then
    create policy web_cities_anon on public.cities for select to anon using (true);
  end if;
  -- опубликованные заявки (объявления)
  if not exists (select 1 from pg_policies where tablename='orders' and policyname='web_orders_anon') then
    create policy web_orders_anon on public.orders for select to anon
      using (status = 'published' and archived_at is null);
  end if;
  -- отзывы (публичные)
  if not exists (select 1 from pg_policies where tablename='reviews' and policyname='web_reviews_anon') then
    create policy web_reviews_anon on public.reviews for select to anon using (true);
  end if;
  -- проф-данные мастера: о себе / опыт / режим работы
  if not exists (select 1 from pg_policies where tablename='master_profiles' and policyname='web_master_profiles_anon') then
    create policy web_master_profiles_anon on public.master_profiles for select to anon using (true);
  end if;
end $$;
