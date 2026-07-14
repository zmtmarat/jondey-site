import type { Metadata } from 'next';
import HomeSections from '@/components/home/HomeSections';
import { homeContent } from '@/lib/content/home';
import { SITE_URL } from '@/lib/site';

const c = homeContent('kk');
const URL_KK = `${SITE_URL}/kk`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: URL_KK,
    languages: {
      'ru-KZ': SITE_URL,
      'kk-KZ': URL_KK,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    url: URL_KK,
    siteName: 'Jondey',
    title: c.meta.title,
    description: c.meta.description,
    locale: 'kk_KZ',
    alternateLocale: ['ru_KZ'],
  },
  twitter: {
    card: 'summary_large_image',
    title: c.meta.title,
    description: c.meta.description,
  },
};

export const revalidate = 300;

/** Казахская главная. Полноценный контент, а не сокращённый перевод. */
export default function HomePageKk() {
  return (
    <div lang="kk-KZ">
      <HomeSections locale="kk" />
    </div>
  );
}
