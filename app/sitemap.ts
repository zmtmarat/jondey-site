import type { MetadataRoute } from 'next';
import { getBrands, getCategories, getServices } from '@/lib/data';
import { SITE_URL as SITE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, services, brands] = await Promise.all([
    getCategories(),
    getServices(),
    getBrands(),
  ]);
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      changeFrequency: 'daily',
      priority: 1,
      alternates: { languages: { 'ru-KZ': `${SITE}/`, 'kk-KZ': `${SITE}/kk` } },
    },
    {
      url: `${SITE}/kk`,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: { languages: { 'ru-KZ': `${SITE}/`, 'kk-KZ': `${SITE}/kk` } },
    },
    { url: `${SITE}/o-nas`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/sozdat-zayavku`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/stat-masterom`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/rabota`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/uslugi`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/mastera`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/zapchasti`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/brands`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE}/dostavka`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/kompanii`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/zayavki`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE}/forum`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE}/skachat`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/partneram`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/pomoshch`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/kontakty`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/soglashenie`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/pravila`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/politika`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/udalenie-akkaunta`, changeFrequency: 'yearly', priority: 0.3 },
  ];
  const catUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/mastera/${c.slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
  // Каждая услуга — отдельная SEO-страница (long-tail трафик из Google).
  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE}/uslugi/${s.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  // Страница каждого бренда — SEO под «запчасти <бренд>».
  const brandUrls: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE}/brands/${b.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  return [...staticUrls, ...catUrls, ...serviceUrls, ...brandUrls];
}
