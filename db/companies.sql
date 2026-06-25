-- ============================================================================
--  Компании (ТОО/ИП) — исполнители-юрлица с модерацией.
--  Общая таблица для приложения и сайта. Выполнить ОДИН раз в Supabase.
--  Появляются в каталоге (и в приложении, и на сайте) только после одобрения
--  модератором (moderation_status = 'approved').
-- ============================================================================

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  legal_type text not null default 'too',     -- 'too' | 'ip'
  bin text,                                    -- БИН/ИИН (12 цифр)
  phone text,
  about text,
  logo_url text,
  category_ids text[] not null default '{}',
  city_ids text[] not null default '{}',
  moderation_status text not null default 'pending',  -- pending|approved|rejected
  moderation_note text,
  created_at timestamptz not null default now()
);

-- одна компания на пользователя
create unique index if not exists companies_owner_uidx on public.companies(owner_id);

alter table public.companies enable row level security;

-- одобренные видны всем (каталог приложения + сайт, в т.ч. анонимам)
create policy companies_public_read on public.companies for select to anon, authenticated
  using (moderation_status = 'approved');

-- владелец видит свою компанию в любом статусе
create policy companies_owner_read on public.companies for select to authenticated
  using (owner_id = auth.uid());

-- владелец создаёт свою (только в статусе pending)
create policy companies_owner_insert on public.companies for insert to authenticated
  with check (owner_id = auth.uid() and moderation_status = 'pending');

-- владелец редактирует свою; любое изменение → снова на модерацию (pending)
create policy companies_owner_update on public.companies for update to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid() and moderation_status = 'pending');

-- модератор (profiles.is_admin) видит все и меняет статус (approve/reject)
create policy companies_admin_all on public.companies for all to authenticated
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));
