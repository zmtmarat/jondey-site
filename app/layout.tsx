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
    default: 'Jondey — мастера по ремонту и услугам в Казахстане',
    template: '%s · Jondey',
  },
  description:
    'Найдите проверенного мастера по ремонту техники, сантехники, авто и бытовым услугам в Казахстане. Отзывы, рейтинги, прямой контакт.',
  applicationName: 'Jondey',
  category: 'services',
  authors: [{ name: 'Jondey' }],
  creator: 'Jondey',
  publisher: 'Jondey',
  keywords: [
    'мастер на дом',
    'ремонт техники',
    'сантехник',
    'электрик',
    'услуги Казахстан',
    'Алматы',
    'Астана',
    'приложение услуг Казахстан',
    'заказать мастера',
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
            slogan: 'Ремонт всего — в одном приложении',
            description:
              'Маркетплейс услуг в Казахстане: ремонт, доставка, клининг, грузоперевозки. Назовите цену — исполнители откликнутся сами.',
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
            operatingSystem: 'Android, iOS',
            applicationCategory: 'LifestyleApplication',
            url: SITE_URL,
            downloadUrl: `${SITE_URL}/skachat`,
            installUrl: `${SITE_URL}/skachat`,
            inLanguage: ['ru', 'kk'],
            description:
              'Приложение Jondey: закажите услугу или находите клиентов как исполнитель. Опишите задачу и назовите цену — мастера откликнутся сами. Чат, рейтинги, отзывы и отслеживание «мастер в пути» на карте.',
            featureList: [
              'Заявка на услугу с вашей ценой',
              'Отклики проверенных мастеров и компаний',
              'Чат заказчик-исполнитель',
              'Рейтинги и реальные отзывы',
              'Отслеживание мастера на карте',
              'Доставка с авто',
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
