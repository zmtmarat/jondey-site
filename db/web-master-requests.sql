-- ─────────────────────────────────────────────────────────────────────────────
-- Заявки «СТАТЬ МАСТЕРОМ» с сайта. Аноним может ОТПРАВИТЬ анкету (имя, телефон,
-- город, выбранные категории, опыт), но НЕ читать чужие. Дальше мастер
-- доустанавливает приложение и завершает регистрацию. Идемпотентно.
-- Выполнить в Supabase SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists web_master_requests (
  id               bigint generated always as identity primary key,
  name             text,
  phone            text not null,
  city_id          text,
  category_ids     text[],         -- выбранные направления (id категорий строками)
  about            text,
  experience_years int,
  status           text not null default 'new',  -- new / contacted / converted / spam
  created_at       timestamptz not null default now()
);

alter table web_master_requests enable row level security;

drop policy if exists web_master_requests_insert_anon on web_master_requests;
create policy web_master_requests_insert_anon on web_master_requests
  for insert to anon, authenticated with check (true);

-- Чтения для anon НЕТ намеренно (телефоны не должны утекать).
-- Анкеты смотрит владелец в Supabase Dashboard → Table Editor → web_master_requests.
