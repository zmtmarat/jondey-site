# Подключение домена jondey.kz к Vercel (ps.kz + Plesk)

Цель: чтобы сайт открывался на **https://jondey.kz** (сейчас — `jondey-site.vercel.app`).
Делается один раз. SSL Vercel выпустит сам автоматически.

---

## Шаг 1. Добавить домен в Vercel
1. Vercel → проект **jondey-site** → **Settings → Domains**.
2. Нажать **Add**, ввести `jondey.kz` → Add. Повторить для `www.jondey.kz`.
3. Vercel покажет, какие DNS-записи нужны. Обычно:
   - **A** для `jondey.kz` (apex) → **76.76.21.21**
   - **CNAME** для `www` → **cname.vercel-dns.com**
   > Если Vercel показывает другие значения — берите ИХ (они приоритетны).

## Шаг 2. Прописать записи в Plesk (ps.kz)
1. Plesk → **Сайты и домены** → `jondey.kz` → **Параметры DNS** (DNS Settings).
2. Добавить/исправить записи:
   | Тип | Хост (имя) | Значение |
   |-----|-----------|----------|
   | A | `jondey.kz.` (или `@` / пусто) | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com.` |
3. **Удалить старую A-запись** для `@` и `www`, если она указывает на сервер Plesk
   (иначе домен будет открывать старый сайт-заглушку, а не Vercel).
4. ⚠️ **НЕ трогать записи MX и почтовые** (mail., autodiscover, SPF/TXT) —
   иначе сломается почта на домене.
5. Сохранить. Применение DNS — от нескольких минут до пары часов.

> Если DNS домена управляется НЕ в Plesk, а в панели ps.kz — добавьте те же
> записи там. Узнать где: у кого прописаны NS-серверы домена jondey.kz.

## Шаг 3. Финализировать в Vercel
1. Дождаться, пока в Vercel у `jondey.kz` появится зелёная галочка (Valid).
2. Сделать `jondey.kz` основным (Production), а `www` — редиректом на него
   (Vercel предложит кнопкой).
3. **Settings → Environment Variables**: задать/исправить
   `NEXT_PUBLIC_SITE_URL = https://jondey.kz` → **Redeploy**
   (чтобы sitemap, canonical и OG-ссылки использовали боевой домен).

## Шаг 4. SEO после подключения
1. **Google Search Console** → добавить ресурс `https://jondey.kz` →
   подтвердить (DNS TXT или HTML-файл) → отправить sitemap `https://jondey.kz/sitemap.xml`.
2. (Опц.) **Яндекс.Вебмастер** — то же самое.

---

### Проверка
```bash
nslookup jondey.kz        # должен вернуть 76.76.21.21
curl -I https://jondey.kz # 200 OK, сервер Vercel
```
Когда заработает — напиши, я обновлю `NEXT_PUBLIC_SITE_URL` и проверю sitemap/OG.
