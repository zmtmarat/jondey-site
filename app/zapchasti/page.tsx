import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getParts } from '@/lib/data';
import { catImage } from '@/lib/labels';
import PartsSearch from '@/components/PartsSearch';

export const metadata: Metadata = {
  title: 'Запчасти в Казахстане — найти деталь на авто, технику, телефон | Jondey',
  description:
    'Найдите запчасть по марке, модели и году: стартеры, генераторы, экраны, компрессоры. Магазины присылают цены. Заказ и связь — в приложении Jondey.',
  alternates: { canonical: 'https://jondey.kz/zapchasti' },
};

export const revalidate = 300;

// Категории с каталогом запчастей.
const PARTS_SLUGS = [
  'transport',
  'spectech',
  'moto',
  'micromobility',
  'appliances',
  'electronics',
  'console',
  'computer',
];

// Названия в контексте запчастей (spectech = «Спецтехника», не «вызов»).
const PARTS_LABELS: Record<string, string> = {
  transport: 'Транспорт',
  spectech: 'Спецтехника',
  moto: 'Мототехника',
  micromobility: 'Электротранспорт',
  appliances: 'Бытовая техника',
  electronics: 'Электроника и гаджеты',
  console: 'Игровые приставки',
  computer: 'Компьютеры и ноутбуки',
};

export default async function ZapchastiPage() {
  const [cats, initial] = await Promise.all([getCategories(), getParts()]);
  const bySlug = new Map(cats.map((c) => [c.slug, c]));
  const partsCats = PARTS_SLUGS.filter((s) => bySlug.has(s)).map((slug) => ({
    slug,
    name: PARTS_LABELS[slug] ?? bySlug.get(slug)?.name_ru ?? slug,
    image: catImage(slug),
  }));

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-[#0d2c5c] text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold mb-4">
            🔧 Маркетплейс запчастей
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Найти запчасть
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 text-[15px] leading-relaxed">
            Запчасти на авто, спецтехнику, мототехнику, бытовую технику и
            гаджеты от магазинов Казахстана. Выберите марку, модель и деталь —
            или оставьте запрос, и магазины сами пришлют вам цены.
          </p>
          <Link
            href="/brands"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 px-4 py-2.5 text-sm font-semibold transition"
          >
            🏭 Бренды и авторизованные представители →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <PartsSearch categories={partsCats} initial={initial} />

        <section className="mt-14 grid sm:grid-cols-3 gap-4">
          {[
            ['1. Выберите деталь', 'Категория, марка и модель вашей техники.'],
            ['2. Смотрите наличие', 'Подходящие запчасти от проверенных магазинов с ценами.'],
            ['3. Свяжитесь и закажите', 'Напишите или позвоните магазину прямо в приложении.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="font-semibold text-slate-900">{t}</div>
              <p className="mt-2 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
