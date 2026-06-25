import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jondey — мастера по ремонту и услугам в Казахстане',
    template: '%s · Jondey',
  },
  description:
    'Найдите проверенного мастера по ремонту техники, сантехники, авто и бытовым услугам в Казахстане. Отзывы, рейтинги, прямой контакт.',
  keywords: [
    'мастер на дом',
    'ремонт техники',
    'сантехник',
    'электрик',
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
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            description:
              'Маркетплейс услуг в Казахстане: ремонт, доставка, клининг, грузоперевозки. Назовите цену — исполнители откликнутся сами.',
            areaServed: { '@type': 'Country', name: 'Kazakhstan' },
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
