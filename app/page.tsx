import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getCities, getOrders, getTopMasters } from '@/lib/data';
import type { Category, City } from '@/lib/types';
import CategoryGrid from '@/components/CategoryGrid';
import MasterCard from '@/components/MasterCard';
import OrderCard from '@/components/OrderCard';
import JsonLd from '@/components/JsonLd';
import { catIcon, catName, cityName } from '@/lib/labels';

const FAQ: [string, string][] = [
  [
    'Сколько стоит разместить заявку?',
    'Для заказчика Jondey бесплатен. Вы описываете задачу, называете свою цену (или оставляете её открытой) и получаете отклики от исполнителей — без предоплаты и скрытых комиссий.',
  ],
  [
    'Как выбрать мастера?',
    'После публикации заявки свободные специалисты сами предлагают цену и сроки. Вы сравниваете их рейтинги, отзывы и стоимость — и выбираете того, кому доверяете. Не нужно обзванивать десятки объявлений.',
  ],
  [
    'В каких городах работает Jondey?',
    'Jondey работает по всему Казахстану — Алматы, Астана, Шымкент и другие города. Заявки автоматически показываются исполнителям в вашем городе и поблизости.',
  ],
  [
    'Можно ли заказать доставку или грузоперевозку?',
    'Да. В разделе «Доставка» вы отмечаете точку отправления на карте, адрес доставки и что везти — а водители с подходящим транспортом (от курьера до грузовой) откликаются со своей ценой.',
  ],
  [
    'Как стать исполнителем?',
    'Установите приложение, выберите свои направления и город — и получайте заявки рядом. Включите статус «на связи», чтобы вам приходили заказы поблизости по геолокации.',
  ],
];

export const revalidate = 120; // обновлять витрину раз в 2 минуты

export default async function HomePage() {
  const [categories, masters, orders, cities] = await Promise.all([
    getCategories(),
    getTopMasters(8),
    getOrders({ limit: 6 }),
    getCities(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const cityMap = new Map<number, City>(cities.map((c) => [c.id, c]));

  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        {/* Мягкие тёплые блики, без синего фона */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-12 -left-24 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand ring-1 ring-brand/15">
            ⚡ Единый сервис ремонта и услуг в Казахстане
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold leading-[1.05] text-slate-900">
            Ремонт всего —
            <br className="hidden sm:block" /> в одном приложении
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Сантехника, электрика, техника, авто, уборка и доставка по всему
            Казахстану. Опишите задачу и назовите свою цену — мастера
            откликнутся сами, без обзвона десятков объявлений.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/sozdat-zayavku"
              style={{ backgroundColor: '#ffb300', color: '#0d2c5c' }}
              className="rounded-xl px-7 py-3.5 font-bold shadow-lg shadow-amber-500/25 hover:brightness-105 transition"
            >
              Создать заявку
            </Link>
            <Link
              href="/mastera"
              style={{ color: '#1f2937' }}
              className="rounded-xl bg-white px-7 py-3.5 font-semibold ring-1 ring-slate-300 hover:bg-slate-50 transition"
            >
              Найти мастера
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              ✓ Проверенные исполнители
            </span>
            <span className="inline-flex items-center gap-1.5">
              ⭐ Реальные отзывы и рейтинги
            </span>
            <span className="inline-flex items-center gap-1.5">
              💸 Без предоплаты, для заказчика бесплатно
            </span>
          </div>

          {/* Быстрый вход по категориям — лёгкие чипы на белом */}
          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {categories.slice(0, 10).map((c) => (
                <Link
                  key={c.id}
                  href={`/mastera/${c.slug}`}
                  style={{ color: '#334155' }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium ring-1 ring-slate-200 hover:bg-slate-200 transition"
                >
                  <span className="text-base">{catIcon(c.slug)}</span>
                  {catName(c)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="-mt-16 mb-2 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 relative aspect-[16/10] sm:aspect-[12/5]">
          <Image
            src="/images/team.png"
            alt="Команда проверенных мастеров Jondey"
            fill
            priority
            className="object-cover object-[50%_28%]"
            sizes="100vw"
          />
        </div>

        <section className="py-8">
          <h2 className="text-2xl font-bold">Как это работает</h2>
          <p className="text-slate-500 mt-1 mb-6">
            Не вы ищете мастера — мастера приходят к вам.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              ['1', '📝', 'Опишите задачу и назовите цену', 'Коротко расскажите, что нужно, и укажите свой бюджет — или оставьте цену открытой.'],
              ['2', '💬', 'Получите отклики мастеров', 'Свободные специалисты сами предложат цену и сроки. Без обзвона десятков объявлений.'],
              ['3', '⭐', 'Выберите лучшего', 'Сравните цены, отзывы и рейтинг — и выберите того, кому доверяете.'],
            ].map(([n, icon, title, text]) => (
              <div key={n} className="rounded-2xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-brand text-white font-bold">
                    {n}
                  </span>
                  <span className="text-2xl">{icon}</span>
                </div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-slate-500 text-sm">
            Для заказчика — бесплатно. Никаких звонков вслепую.
          </p>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-bold mb-1">Любая помощь — от ремонта до переезда</h2>
          <p className="text-slate-500 mb-6">
            Найдём проверенного исполнителя под вашу задачу.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                img: '/images/master.png',
                title: 'Мастера по ремонту',
                text: 'Сантехника, электрика, техника, авто',
                href: '/mastera',
              },
              {
                img: '/images/movers.png',
                title: 'Грузчики и переезд',
                text: 'Перевозки, погрузка, демонтаж',
                href: '/mastera/labor',
              },
              {
                img: '/images/cleaning.png',
                title: 'Клининг и уборка',
                text: 'Квартиры, офисы, после ремонта',
                href: '/mastera/cleaning',
              },
              {
                img: '/images/categories/delivery.png',
                title: 'Доставка с авто',
                text: 'Перевезти вещи, передать груз',
                href: '/dostavka',
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-md hover:border-brand/40 transition"
              >
                <div className="relative aspect-[4/3] bg-brand-light">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold group-hover:text-brand">{c.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{c.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-6">
          <h2 className="text-2xl font-bold mb-5">Категории услуг</h2>
          {categories.length > 0 ? (
            <CategoryGrid categories={categories} />
          ) : (
            <EmptyHint />
          )}
        </section>

        {masters.length > 0 && (
          <section className="py-6">
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl font-bold">Топ-мастера</h2>
              <Link href="/mastera" className="text-brand font-medium hover:underline">
                Все мастера →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {masters.map((m) => (
                <MasterCard key={m.user_id} master={m} catMap={catMap} />
              ))}
            </div>
          </section>
        )}

        {orders.length > 0 && (
          <section className="py-10">
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl font-bold">Свежие заявки</h2>
              <Link href="/zayavki" className="text-brand font-medium hover:underline">
                Все заявки →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {orders.map((o) => (
                <OrderCard key={o.id} order={o} catMap={catMap} cityMap={cityMap} />
              ))}
            </div>
          </section>
        )}

        <section className="py-10">
          <h2 className="text-2xl font-bold mb-5">Частые вопросы</h2>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-2xl bg-white border border-slate-200 p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold list-none">
                  {q}
                  <span className="ml-3 text-brand transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {cities.length > 0 && (
          <section className="py-10 border-t border-slate-100">
            <h2 className="text-2xl font-bold mb-1">
              Найдите специалистов в вашем районе
            </h2>
            <p className="text-slate-500 mb-6">
              Мастера по всему Казахстану — выберите свой город.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3">
              {cities.slice(0, 23).map((c) => (
                <Link
                  key={c.id}
                  href={`/mastera?city=${c.id}`}
                  style={{ color: '#475569' }}
                  className="text-sm hover:text-brand transition"
                >
                  {cityName(c)}
                </Link>
              ))}
              <Link
                href="/mastera"
                className="text-sm font-semibold text-brand hover:underline"
              >
                Больше городов +
              </Link>
            </div>
          </section>
        )}

        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(([q, a]) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }}
        />
      </div>
    </div>
  );
}

function EmptyHint() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      Витрина скоро наполнится. Установите приложение, чтобы разместить заявку
      или предложить услуги.
    </div>
  );
}
