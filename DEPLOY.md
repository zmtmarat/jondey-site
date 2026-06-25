# Деплой сайта Jondey (Vercel)

Сайт — статический Next.js на общем Supabase. Рекомендуемый хостинг — **Vercel**
(бесплатный тариф для старта, мгновенный деплой, авто-HTTPS).

## Вариант A — через GitHub (рекомендуется)
1. Создай репозиторий на GitHub, например `jondey-site` (можно приватный).
2. Запушь код:
   ```bash
   cd c:\dev\jondey-site
   git remote add origin https://github.com/<ник>/jondey-site.git
   git push -u origin main
   ```
3. Зайди на **vercel.com** → войди через GitHub → **Add New → Project** → выбери
   репозиторий `jondey-site` → **Import**.
4. В **Environment Variables** добавь (значения из `c:\dev\jondey\env.json`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = адрес сайта (сначала `https://<проект>.vercel.app`,
     потом сменишь на `https://jondey.kz`)
5. **Deploy**. Через ~1–2 минуты сайт будет на `https://<проект>.vercel.app`.

## Вариант B — без GitHub, через Vercel CLI
```bash
npm i -g vercel
cd c:\dev\jondey-site
vercel            # войти, ответить на вопросы — деплой превью
vercel --prod     # боевой деплой
```
Переменные окружения задать на vercel.com (Project → Settings → Environment Variables).

## Домен jondey.kz
1. Vercel → Project → **Settings → Domains** → добавь `jondey.kz` и `www.jondey.kz`.
2. У регистратора домена пропиши DNS, как покажет Vercel (A/CNAME).
3. Обнови переменную `NEXT_PUBLIC_SITE_URL=https://jondey.kz` и сделай Redeploy
   (чтобы canonical/sitemap/robots указывали на боевой домен).

## После деплоя
- Проверь `/`, `/uslugi`, `/mastera`, `/kompanii`, `/zayavki`.
- Отправь `https://<домен>/sitemap.xml` в **Google Search Console** и **Yandex
  Вебмастер** — чтобы услуги попали в индекс (бесплатный трафик).
