import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
