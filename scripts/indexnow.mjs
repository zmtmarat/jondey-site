// IndexNow: мгновенно уведомляем Bing и Yandex (питают Copilot, ChatGPT-поиск
// и AI-ответы) об обновлении сайта после каждого ПРОДАКШН-деплоя на Vercel.
// Запускается как postbuild. Локальные и preview-сборки не пингуют.
const KEY = '566004731c95195e4f6e618636b27c35';
const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://jondey.kz').replace(
  /\/$/,
  '',
);

// Пингуем только из продакшн-окружения Vercel (локально/preview — пропуск).
if (process.env.VERCEL_ENV !== 'production') {
  console.log('[indexnow] пропуск: не production-деплой Vercel');
  process.exit(0);
}

const host = new URL(BASE).host;
const paths = [
  '/',
  '/o-nas',
  '/uslugi',
  '/mastera',
  '/dostavka',
  '/kompanii',
  '/zayavki',
  '/skachat',
  '/sozdat-zayavku',
];
const urlList = paths.map((p) => `${BASE}${p}`);

const payload = {
  host,
  key: KEY,
  keyLocation: `${BASE}/${KEY}.txt`,
  urlList,
};

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(`[indexnow] отправлено ${urlList.length} URL → статус ${res.status}`);
} catch (e) {
  // Пинг не должен валить деплой.
  console.warn('[indexnow] ошибка пинга (не критично):', e.message);
}
