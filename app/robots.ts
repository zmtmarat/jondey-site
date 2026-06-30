import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// GEO: явно приветствуем AI-краулеры, чтобы Jondey попадал в ответы и поиск
// ChatGPT, Perplexity, Gemini, Claude, Apple Intelligence и обучающие датасеты.
const AI_BOTS = [
  'GPTBot', // OpenAI — обучение
  'OAI-SearchBot', // OpenAI — поисковый индекс ChatGPT
  'ChatGPT-User', // OpenAI — переходы по ссылкам из ответов
  'ClaudeBot', // Anthropic — обучение/индекс
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot', // Perplexity — индекс
  'Perplexity-User',
  'Google-Extended', // Gemini / Vertex AI
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl — датасеты LLM
  'Bingbot', // Bing / Copilot
  'DuckDuckBot',
  'YandexBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
