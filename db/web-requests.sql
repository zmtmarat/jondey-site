-- ─────────────────────────────────────────────────────────────────────────────
-- Заявки с САЙТА (десктоп/веб). Аноним с сайта может ОТПРАВИТЬ заявку,
-- но НЕ может читать чужие (внутри телефоны — приватно). Читает владелец/админ
-- через дашборд. Выполнить в Supabase SQL Editor. Идемпотентно.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists web_requests (
  id          bigint generated always as identity primary key,
  name        text,
  phone       text not null,
  city_id     text,
  category_id text,
  description text,
  budget_min  int,
  budget_max  int,
  status      text not null default 'new',   -- new / contacted / converted / spam
  created_at  timestamptz not null default now()
);

alter table web_requests enable row level security;

-- Любой с сайта может отправить заявку (insert), но не читать/менять.
drop policy if exists web_requests_insert_anon on web_requests;
create policy web_requests_insert_anon on web_requests
  for insert to anon, authenticated with check (true);

-- Чтения для anon НЕТ намеренно (телефоны клиентов не должны утекать).
-- Заявки смотрит владелец в Supabase Dashboard → Table Editor → web_requests.
