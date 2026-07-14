import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getCities } from '@/lib/data';
import { catName } from '@/lib/labels';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/JsonLd';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'О сервисе Jondey — маркетплейс услуг и ремонта в Казахстане',
  description:
    'Что такое Jondey: как работает маркетплейс бытовых услуг и ремонта в Казахстане. Модель «назови цену — мастера откликнутся», города, категории, языки, стоимость.',
  alternates: { canonical: '/o-nas' },
};

export default async function AboutPage() {
  const [categories, cities] = await Promise.all([getCategories(), getCities()]);
  const catNames = categories.map((c) => catName(c)).filter(Boolean);
  const cityNames = cities.map((c) => c.name_ru).filter(Boolean);

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О сервисе Jondey',
    url: `${SITE_URL}/o-nas`,
    inLanguage: 'ru-KZ',
    about: {
      '@type': 'Organization',
      name: 'Jondey',
      url: SITE_URL,
      description:
        'Маркетплейс бытовых услуг и ремонта в Казахстане: заказчик называет цену, исполнители откликаются сами.',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      knowsLanguage: ['ru', 'kk'],
    },
  };

  const Fact = ({ q, a }: { q: string; a: string }) => (
    <div className="rounded-2xl bg-white border border-slate-200 p-5">
      <h3 className="font-bold text-slate-900">{q}</h3>
      <p className="mt-1.5 text-slate-600">{a}</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={aboutLd} />

      <h1 className="text-3xl sm:text-4xl font-extrabold">О сервисе Jondey</h1>
      <p className="mt-4 text-lg text-slate-600">
        <strong>Jondey</strong> — это маркетплейс бытовых услуг и ремонта в
        Казахстане. Заказчик описывает задачу и называет свою цену, а проверенные
        исполнители — частные мастера и компании (ТОО/ИП) — сами откликаются со
        своей ценой и сроками. Не вы ищете мастера, а мастера приходят к вам.
      </p>

      <div className="mt-8 grid gap-3">
        <Fact
          q="Как работает Jondey?"
          a="Это «обратный аукцион услуг». Вы публикуете заявку с описанием и ценой (или оставляете цену открытой). Свободные исполнители поблизости получают её по геолокации и предлагают свои условия. Вы сравниваете цены, рейтинги и отзывы — и выбираете."
        />
        <Fact
          q="Сколько это стоит?"
          a="Для заказчика Jondey бесплатен — без предоплаты и скрытых комиссий. Оплата работы идёт напрямую исполнителю по договорённости."
        />
        <Fact
          q="В каких городах работает?"
          a={`Jondey работает по всему Казахстану${
            cityNames.length ? ': ' + cityNames.slice(0, 10).join(', ') : ''
          }${cityNames.length > 10 ? ' и другие города' : '.'}`}
        />
        <Fact
          q="Какие услуги можно заказать?"
          a={`Услуги мастеров (сантехника, электрика, ремонт техники и авто, отделка, уборка), запрос запчастей у магазинов и вызов спецтехники на объект${
            catNames.length ? '. Полный список категорий: ' + catNames.join(', ') + '.' : '.'
          }`}
        />
        <Fact
          q="На каких языках?"
          a="Интерфейс приложения доступен на русском и казахском языках."
        />
        <Fact
          q="Что отличает Jondey?"
          a="Чат заказчик↔исполнитель, реальные отзывы и рейтинги, отслеживание «мастер в пути» на карте, а также возможность отклика от лица компании, которая сама распределяет заказы между своими мастерами."
        />
        <Fact
          q="Как стать исполнителем?"
          a="Установите приложение, выберите свои категории и город, включите статус «на связи» — и получайте заявки поблизости. Это бесплатно и без рекламных бюджетов."
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/sozdat-zayavku"
          style={{ backgroundColor: '#ffb300', color: '#0d2c5c' }}
          className="rounded-xl px-6 py-3 font-bold hover:brightness-105 transition"
        >
          Создать заявку
        </Link>
        <Link
          href="/skachat"
          className="rounded-xl bg-brand text-white px-6 py-3 font-semibold hover:bg-brand-dark transition"
        >
          Скачать приложение
        </Link>
      </div>
    </div>
  );
}
