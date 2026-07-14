// Локали сайта. Русский — корневой (/), казахский — /kk.
// Существующие маршруты не меняются: kk-версия добавляется поверх, без ломки URL.

export const LOCALES = ['ru', 'kk'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ru';

/** Префикс путей для локали: ru → '', kk → '/kk'. */
export function localePrefix(locale: Locale): string {
  return locale === 'ru' ? '' : `/${locale}`;
}

/** Строит ссылку с учётом локали (внутренние маршруты). */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/')) return href;
  // Главная kk — /kk; остальные страницы пока только на русском (см. отчёт).
  if (href === '/') return locale === 'ru' ? '/' : '/kk';
  return href;
}

/** Атрибут lang для <html> и hreflang. */
export const HTML_LANG: Record<Locale, string> = { ru: 'ru-KZ', kk: 'kk-KZ' };
