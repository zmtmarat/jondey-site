import { getCities } from '@/lib/data';
import { getPlatformStats } from '@/lib/stats';
import { homeContent } from '@/lib/content/home';
import { HTML_LANG, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import AnalyticsBridge from '@/components/AnalyticsBridge';

import Hero from './Hero';
import Directions from './Directions';
import HowItWorks from './HowItWorks';
import SpareParts from './SpareParts';
import VerifiedBusinesses from './VerifiedBusinesses';
import Coverage from './Coverage';
import Stats from './Stats';
import { ForBusiness, ForPerformers } from './Audiences';
import Trust from './Trust';
import AppDownload from './AppDownload';
import Faq from './Faq';
import FinalCta from './FinalCta';

/**
 * Главная страница целиком. Один H1 (в Hero), далее H2 в каждой секции.
 * Данные — реальные: города из БД, показатели из lib/stats (без выдуманных цифр).
 */
export default async function HomeSections({ locale }: { locale: Locale }) {
  const c = homeContent(locale);
  const [cities, stats] = await Promise.all([getCities(), getPlatformStats()]);

  const home = locale === 'ru' ? SITE_URL : `${SITE_URL}/kk`;

  return (
    <>
      <AnalyticsBridge />

      <Hero c={c} />
      <Directions c={c} />
      <HowItWorks c={c} />
      <SpareParts c={c} />
      <VerifiedBusinesses c={c} />
      <Coverage c={c} cities={cities} />
      <Stats c={c} items={stats} />
      <ForPerformers c={c} />
      <ForBusiness c={c} />
      <Trust c={c} />
      <AppDownload c={c} />
      <Faq c={c} />
      <FinalCta c={c} />

      {/* Organization / WebSite / MobileApplication объявлены один раз в layout.
          Здесь — только FAQPage, ровно по вопросам, показанным на странице.
          AggregateRating НЕ используем: подтверждённых отзывов пока нет. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${home}#faq`,
          inLanguage: HTML_LANG[locale],
          mainEntity: c.faq.items.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  );
}
