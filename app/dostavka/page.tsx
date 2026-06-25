import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCategories,
  getCities,
  getDeliveryOrders,
  getDrivers,
} from '@/lib/data';
import type { Category, City } from '@/lib/types';
import DriverCard from '@/components/DriverCard';
import OrderCard from '@/components/OrderCard';
import { vehicleEmoji, vehicleTypeName } from '@/lib/labels';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Доставка и грузоперевозки по Казахстану — назови свою цену | Jondey',
  description:
    'Доставка вещей, документов и грузов: курьеры, мопеды, легковые, газели и грузовые. Назовите цену и выберите исполнителя — без обзвона десятков объявлений. Перевезти диван или передать ключ — в Jondey.',
  alternates: { canonical: '/dostavka' },
};

const VEHICLES = ['foot', 'moped', 'car', 'gazelle', 'truck', 'refrigerator'];

const STEPS = [
  {
    n: '1',
    title: 'Отметьте точку на карте',
    text: 'Укажите, откуда забрать, прямо по геопозиции, и куда доставить. Добавьте фото груза и короткий комментарий.',
  },
  {
    n: '2',
    title: 'Получите предложения цены',
    text: 'Свободные водители рядом откликаются и называют свою цену. Вы видите рейтинг и отзывы каждого.',
  },
  {
    n: '3',
    title: 'Выберите и отслеживайте',
    text: 'Берёте подходящего по цене и отзывам — и следите за исполнителем на карте, пока он в пути.',
  },
];

export default async function DostavkaPage() {
  const [drivers, orders, categories, cities] = await Promise.all([
    getDrivers(),
    getDeliveryOrders(12),
    getCategories(),
    getCities(),
  ]);
  const catMap = new Map<number, Category>(categories.map((c) => [c.id, c]));
  const cityMap = new Map<number, City>(cities.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white px-6 py-12 sm:px-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            🚚 Доставка и грузоперевозки
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight">
            Назовите свою цену на доставку — водители откликнутся сами
          </h1>
          <p className="mt-4 text-white/90 text-lg">
            Перевезти диван, передать ключ или документы, организовать переезд.
            Не нужно обзванивать десятки объявлений — поставьте задачу и выберите
            исполнителя по цене и отзывам.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/skachat"
              className="inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-brand-dark hover:bg-white/90 transition"
            >
              Заказать доставку
            </Link>
            <Link
              href="/skachat"
              className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Я водитель — хочу заказы
            </Link>
          </div>
        </div>
      </section>

      {/* Какой транспорт */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Любой транспорт — под любой груз</h2>
        <p className="text-slate-500 mt-2">
          От пешего курьера до грузовой фуры. Водитель сам видит, что везти, и
          берётся, если ему по силам.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {VEHICLES.map((v) => (
            <div
              key={v}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
            >
              <div className="text-3xl">{vehicleEmoji(v)}</div>
              <div className="mt-2 text-sm font-medium text-slate-700">
                {vehicleTypeName(v)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Как это работает */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Как это работает</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="w-9 h-9 rounded-full bg-brand text-white grid place-items-center font-bold">
                {s.n}
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Водители */}
      <section className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Водители на связи</h2>
          <Link href="/mastera" className="text-sm text-brand hover:underline">
            Все исполнители →
          </Link>
        </div>
        {drivers.length > 0 ? (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((d) => (
              <DriverCard key={d.user_id} driver={d} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            Водители скоро появятся. Есть машина или мопед?{' '}
            <Link href="/skachat" className="text-brand font-medium">
              Подключитесь и получайте заказы
            </Link>
            .
          </div>
        )}
      </section>

      {/* Свежие запросы */}
      {orders.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Свежие запросы на доставку</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {orders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                catMap={catMap}
                cityMap={cityMap}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 rounded-3xl bg-slate-900 text-white px-6 py-10 sm:px-12 text-center">
        <h2 className="text-2xl font-bold">Нужно что-то перевезти?</h2>
        <p className="mt-2 text-white/80 max-w-xl mx-auto">
          Поставьте задачу за минуту, назовите цену — и выберите водителя из
          тех, кто откликнется. Быстро, прозрачно, без обзвона.
        </p>
        <Link
          href="/skachat"
          className="mt-6 inline-flex items-center rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark transition"
        >
          Скачать приложение
        </Link>
      </section>
    </div>
  );
}
