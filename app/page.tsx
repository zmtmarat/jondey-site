import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getCities, getOrders, getTopMasters } from '@/lib/data';
import type { Category, City } from '@/lib/types';
import CategoryGrid from '@/components/CategoryGrid';
import MasterCard from '@/components/MasterCard';
import OrderCard from '@/components/OrderCard';

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
      <section className="bg-gradient-to-b from-brand to-brand-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Мастера по ремонту и услугам
            <br className="hidden sm:block" /> по всему Казахстану
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Сантехники, электрики, мастера по технике, авто и уборке. Реальные
            отзывы, рейтинги и прямой контакт — без посредников.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/mastera"
              className="rounded-xl bg-white text-[#0d47a1] px-6 py-3 font-semibold hover:bg-slate-100 transition"
            >
              Найти мастера
            </Link>
            <Link
              href="/skachat"
              className="rounded-xl bg-brand-dark/40 ring-1 ring-white/40 px-6 py-3 font-semibold hover:bg-brand-dark/60 transition"
            >
              Скачать приложение
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="py-10">
          <h2 className="text-2xl font-bold mb-1">Любая помощь — от ремонта до переезда</h2>
          <p className="text-slate-500 mb-6">
            Найдём проверенного исполнителя под вашу задачу.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
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
