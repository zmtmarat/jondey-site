-- ─────────────────────────────────────────────────────────────────────────────
-- ФОРУМ / ОБСУЖДЕНИЯ о ремонте. Анонимный постинг с именем, публичное чтение,
-- фото в Storage. Модерация — через колонку status (спам прячешь в Dashboard).
-- Выполнить в Supabase SQL Editor. Идемпотентно.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists forum_topics (
  id          bigint generated always as identity primary key,
  author_name text,
  title       text not null,
  body        text,
  image_url   text,
  status      text not null default 'visible',  -- visible / hidden (модерация)
  created_at  timestamptz not null default now()
);

create table if not exists forum_comments (
  id          bigint generated always as identity primary key,
  topic_id    bigint not null references forum_topics(id) on delete cascade,
  author_name text,
  body        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists forum_comments_topic_idx on forum_comments(topic_id);

alter table forum_topics   enable row level security;
alter table forum_comments enable row level security;

-- Читают все (только видимые темы). Создавать может любой (anon).
drop policy if exists forum_topics_read on forum_topics;
create policy forum_topics_read on forum_topics
  for select to anon, authenticated using (status = 'visible');

drop policy if exists forum_topics_insert on forum_topics;
create policy forum_topics_insert on forum_topics
  for insert to anon, authenticated with check (true);

drop policy if exists forum_comments_read on forum_comments;
create policy forum_comments_read on forum_comments
  for select to anon, authenticated using (true);

drop policy if exists forum_comments_insert on forum_comments;
create policy forum_comments_insert on forum_comments
  for insert to anon, authenticated with check (true);

-- ── Хранилище фото форума (публичный бакет, аноним может загружать) ──
insert into storage.buckets (id, name, public)
values ('forum', 'forum', true)
on conflict (id) do nothing;

drop policy if exists "forum upload anon" on storage.objects;
create policy "forum upload anon" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'forum');

drop policy if exists "forum read public" on storage.objects;
create policy "forum read public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'forum');

-- Модерация: спам прячешь так →
--   update forum_topics set status = 'hidden' where id = <id>;
