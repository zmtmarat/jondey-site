import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import SupportWidget from '@/components/SupportWidget';
import YandexMetrica from '@/components/YandexMetrica';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Jondey — мастера, доставка, спецтехника и запчасти по всему Казахстану',
    template: '%s · Jondey',
  },
  description:
    'Jondey — приложение, где можно вызвать мастера, заказать доставку и грузоперевозку, вызвать спецтехнику и получить предложения магазинов на нужную запчасть. По всему Казахстану, на казахском и русском.',
  applicationName: 'Jondey',
  category: 'services',
  authors: [{ name: 'Jondey' }],
  creator: 'Jondey',
  publisher: 'Jondey',
  keywords: [
    'вызвать мастера',
    'ремонт техники',
    'сантехник',
    'электрик',
    'доставка и грузоперевозки',
    'спецтехника',
    'запчасти',
    'автозапчасти Казахстан',
    'услуги Казахстан',
    'Алматы',
    'Астана',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Jondey',
    locale: 'ru_RU',
    images: ['/images/team.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Jondey',
            alternateName: 'Жондеу',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            slogan: 'Всё для дома, автомобиля и бизнеса — в одном приложении',
            description:
              'Маркетплейс услуг и запчастей в Казахстане: мастера, доставка и грузоперевозки, спецтехника, запчасти от магазинов. Опишите задачу — исполнители сами предложат цену.',
            foundingDate: '2025',
            areaServed: { '@type': 'Country', name: 'Kazakhstan' },
            knowsLanguage: ['ru', 'kk'],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              url: `${SITE_URL}/skachat`,
              availableLanguage: ['Russian', 'Kazakh'],
            },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Jondey',
            url: SITE_URL,
            inLanguage: 'ru-KZ',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/mastera?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'MobileApplication',
            name: 'Jondey',
            // iOS-приложение пока не опубликовано — не заявляем его.
            operatingSystem: 'Android, Web',
            applicationCategory: 'BusinessApplication',
            url: SITE_URL,
            downloadUrl: `${SITE_URL}/skachat`,
            installUrl: `${SITE_URL}/skachat`,
            inLanguage: ['ru', 'kk'],
            description:
              'Приложение Jondey: вызовите мастера, закажите доставку или спецтехнику, получите от магазинов цены на нужную запчасть. Опишите задачу — исполнители сами предложат цену. Чат, рейтинги, отзывы и отслеживание исполнителя на карте.',
            featureList: [
              'Заявка на услугу с вашей ценой',
              'Отклики мастеров, перевозчиков и магазинов',
              'Запрос запчасти по марке, модели и году',
              'Вызов спецтехники на объект',
              'Чат заказчик-исполнитель',
              'Рейтинги и отзывы',
              'Отслеживание исполнителя на карте',
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KZT',
            },
            areaServed: { '@type': 'Country', name: 'Kazakhstan' },
            publisher: { '@type': 'Organization', name: 'Jondey' },
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SupportWidget />
        <YandexMetrica />
        <Analytics />
      </body>
    </html>
  );
}
