import type { MetadataRoute } from 'next';
import { getCategories, getServices } from '@/lib/data';
import { SITE_URL as SITE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE}/sozdat-zayavku`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/uslugi`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/mastera`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/dostavka`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/kompanii`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/zayavki`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE}/skachat`, changeFrequency: 'monthly', priority: 0.5 },
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
  return [...staticUrls, ...catUrls, ...serviceUrls];
}
