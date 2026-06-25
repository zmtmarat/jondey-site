# Jondey — сайт (витрина + SEO)

Веб-витрина маркетплейса Jondey на **Next.js (App Router)** поверх **того же
Supabase**, что и мобильное приложение. Серверный рендеринг → индексируется
Google (страницы «мастера по категории», «заявки» и т.д.).

## Стек
- Next.js 16 (App Router, серверные компоненты, SSR/ISR)
- TypeScript + Tailwind CSS v4
- `@supabase/supabase-js` (анонимный клиент, RLS)

## Запуск локально
```bash
npm install
npm run dev      # http://localhost:3000
```
`.env.local` уже содержит `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## ⚠️ Один шаг в Supabase (обязательно для данных)
Витрина читает данные анонимно. Чтобы опубликованные заявки/мастера/отзывы
показывались посетителям и Google — выполните один раз в **Supabase → SQL Editor**
файл [`db/web-public-access.sql`](db/web-public-access.sql). До этого страницы
работают, но списки пустые.

Безопасность сохранена: аноним видит только публичное (опубликованные заявки,
каталог мастеров **без телефона**, отзывы, справочники). Точные адреса, телефоны,
чужие/закрытые заказы и чаты остаются под RLS.

## Структура
- `app/` — страницы: главная, `/mastera` (+`/mastera/[category]`), `/master/[id]`,
  `/zayavki` (+`/zayavka/[id]`), `/skachat`; `sitemap.ts`, `robots.ts`.
- `components/` — Header, Footer, MasterCard, OrderCard, CategoryGrid, Stars.
- `lib/` — `supabase.ts` (клиент), `data.ts` (запросы), `types.ts`, `labels.ts`.

## Деплой
Рекомендуется **Vercel** (бесплатно для старта): импортировать репозиторий,
добавить переменные `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
привязать домен `jondey.kz`. Поменяйте `SITE` в `layout.tsx`/`sitemap.ts`/`robots.ts`
на боевой домен.

## Что дальше
- Русские SEO-слаги категорий (santehnik вместо plumbing).
- Казахская версия (`/kk`).
- Вход/регистрация на сайте (Supabase Auth) и подача заявки прямо с сайта.
- Хостинг APK / ссылки на App Store и Google Play на `/skachat`.
