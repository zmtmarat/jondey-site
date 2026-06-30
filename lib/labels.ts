import type { Category, City } from './types';

/// Локализованное имя категории (русский — основной язык витрины).
export function catName(c?: Category | null): string {
  if (!c) return 'Услуга';
  return c.name_ru || c.name_kk || c.slug;
}

export function cityName(c?: City | null): string {
  return c?.name_ru || c?.name_kk || '';
}

export function legalTypeName(slug?: string | null): string {
  return slug === 'ip' ? 'ИП' : 'ТОО';
}

export function workModeName(slug?: string | null): string {
  switch (slug) {
    case 'visit':
      return 'Выезд к заказчику';
    case 'at_home':
      return 'Приём у себя';
    case 'both':
      return 'Выезд и приём у себя';
    default:
      return '';
  }
}

export function preferredTimeName(slug?: string | null): string {
  switch (slug) {
    case 'asap':
      return 'Срочно';
    case 'today':
      return 'Сегодня';
    case 'tomorrow':
      return 'Завтра';
    case 'flexible':
      return 'По договорённости';
    default:
      return '';
  }
}

export function crewName(slug?: string | null): string {
  switch (slug) {
    case 'one':
      return 'Один мастер';
    case 'few':
      return '2–3 человека';
    case 'team':
      return 'Бригада (4+)';
    default:
      return '';
  }
}

/// Фотография категории (если есть) — фотореалистичные снимки в едином стиле.
const CATEGORY_IMAGES: Record<string, string> = {
  delivery: '/images/categories/delivery.png',
  transport: '/images/categories/transport.png',
  plumbing: '/images/categories/plumbing.png',
  electric: '/images/categories/electric.png',
  appliances: '/images/categories/appliances.png',
  computer: '/images/categories/computer.png',
  electronics: '/images/categories/electronics.png',
  window: '/images/categories/window.png',
  realestate: '/images/categories/realestate.png',
  equipment: '/images/categories/equipment.png',
  moto: '/images/categories/moto.png',
  console: '/images/categories/console.png',
  micromobility: '/images/categories/micromobility.png',
  mechanics: '/images/categories/mechanics.png',
  leather: '/images/categories/leather.png',
  cleaning: '/images/cleaning.png',
  labor: '/images/movers.png',
  furniture: '/images/categories/furniture.jpg',
};

export function catImage(slug?: string | null): string | null {
  return CATEGORY_IMAGES[slug ?? ''] ?? null;
}

/// Иконка категории по slug (эмодзи — без шрифтовых зависимостей).
export function catIcon(slug?: string | null): string {
  const map: Record<string, string> = {
    delivery: '🚚',
    appliances: '🔌',
    plumbing: '🚿',
    electronics: '📱',
    console: '🎮',
    computer: '💻',
    window: '🪟',
    realestate: '🏠',
    moto: '🏍️',
    leather: '👞',
    transport: '🚗',
    equipment: '🛠️',
    cleaning: '🧹',
    labor: '📦',
    furniture: '🪑',
  };
  return map[slug ?? ''] ?? '🛠️';
}

/// Название типа транспорта водителя (доставка).
export function vehicleTypeName(slug?: string | null): string {
  switch (slug) {
    case 'foot':
      return 'Пеший курьер';
    case 'moped':
      return 'Мопед / мото';
    case 'car':
      return 'Легковая';
    case 'gazelle':
      return 'Газель';
    case 'truck':
      return 'Грузовая';
    case 'refrigerator':
      return 'Рефрижератор';
    default:
      return slug ?? '';
  }
}

/// Эмодзи типа транспорта.
export function vehicleEmoji(slug?: string | null): string {
  switch (slug) {
    case 'foot':
      return '🚶';
    case 'moped':
      return '🛵';
    case 'car':
      return '🚗';
    case 'gazelle':
      return '🚐';
    case 'truck':
      return '🚚';
    case 'refrigerator':
      return '❄️';
    default:
      return '🚚';
  }
}

export function formatMoney(n?: number | null): string {
  if (n == null) return '';
  return n.toLocaleString('ru-RU');
}

export function budgetText(
  min?: number | null,
  max?: number | null,
): string {
  if (min != null && max != null) return `${formatMoney(min)}–${formatMoney(max)} ₸`;
  if (max != null) return `до ${formatMoney(max)} ₸`;
  if (min != null) return `от ${formatMoney(min)} ₸`;
  return 'Договорная';
}

export function ratingText(avg?: number | null, count?: number): string {
  if (avg == null || !count) return 'Новый мастер';
  return `${avg.toFixed(1)} ★ · ${count} ${pluralReviews(count)}`;
}

function pluralReviews(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'отзыв';
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return 'отзыва';
  return 'отзывов';
}
