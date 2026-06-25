/// Базовый URL сайта. На проде задаётся переменной NEXT_PUBLIC_SITE_URL
/// (например https://jondey.kz). По умолчанию — для локали/превью.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://jondey.kz';
