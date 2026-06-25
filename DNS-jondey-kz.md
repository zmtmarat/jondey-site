# Перенос jondey.kz на Vercel (ps.kz / Plesk) — точные шаги

Текущее состояние (проверено 2026-06-26):
- `jondey.kz` → A **194.39.65.25** + есть **AAAA (IPv6)** `2a00:5da0:1000::167` (заглушка ps.kz)
- `www.jondey.kz` → CNAME на `jondey.kz`
- NS: **ns1/ns2/ns3.ps.kz** → DNS меняем в панели **ps.kz** (или в Plesk, если он управляет зоной домена)

Цель: открывать **https://jondey.kz** с Vercel. SSL Vercel выпустит сам.

---

## Шаг 1. Vercel — добавить домен
1. Vercel → проект **jondey-site** → **Settings → Domains → Add**.
2. Добавить `jondey.kz`, затем `www.jondey.kz`.
3. Vercel покажет нужные записи. Обычно:
   - A для `jondey.kz` → **76.76.21.21**
   - CNAME для `www` → **cname.vercel-dns.com**
   > Если Vercel показывает другое значение A — используйте ЕГО.

## Шаг 2. ps.kz — изменить DNS-записи
Зайти: **ps.kz → Личный кабинет → Домены → jondey.kz → DNS / Управление зоной**
(или Plesk → Сайты и домены → jondey.kz → Параметры DNS, если зона там).

Сделать ровно так:
| Действие | Тип | Имя | Значение |
|---|---|---|---|
| **ИЗМЕНИТЬ** | A | `@` (jondey.kz) | `76.76.21.21` |
| **УДАЛИТЬ** ⚠️ | AAAA | `@` (jondey.kz) | `2a00:5da0:1000::167` |
| **ИЗМЕНИТЬ** | CNAME | `www` | `cname.vercel-dns.com.` |

- ⚠️ **AAAA удалить обязательно** — иначе IPv6-браузеры пойдут на старый сервер.
- ⚠️ **НЕ трогать MX и почтовые записи** (mail, mx, SPF/TXT) — иначе сломается почта.
- Сохранить. Применение DNS: от 10 минут до пары часов (TTL).

## Шаг 3. Vercel — финал
1. Дождаться зелёной галочки (Valid Configuration) у `jondey.kz`.
2. Сделать `jondey.kz` основным (Production), `www` — редирект на него.
3. **Settings → Environment Variables**: `NEXT_PUBLIC_SITE_URL = https://jondey.kz` → **Redeploy**
   (чтобы sitemap, canonical и OG-ссылки были на боевом домене).

## Шаг 4. SEO
- Google Search Console → добавить `https://jondey.kz` → sitemap `https://jondey.kz/sitemap.xml`.

---

### Проверка (я сделаю, когда пропишешь записи)
```
Resolve-DnsName jondey.kz   → 76.76.21.21
curl -I https://jondey.kz   → 200, сервер Vercel
```
