import type { MetadataRoute } from 'next';
import { getCategories } from '@/lib/data';

const SITE = 'https://jondey.kz';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE}/mastera`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/zayavki`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE}/skachat`, changeFrequency: 'monthly', priority: 0.5 },
  ];
  const catUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/mastera/${c.slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
  return [...staticUrls, ...catUrls];
}
