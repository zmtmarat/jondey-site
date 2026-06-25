import type { Category, City } from './types';

/// Локализованное имя категории (русский — основной язык витрины).
export function catName(c?: Category | null): string {
  if (!c) return 'Услуга';
  return c.name_ru || c.name_kk || c.slug;
}

export function cityName(c?: City | null): string {
  return c?.name_ru || c?.name_kk || '';
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

/// Иконка категории по slug (эмодзи — без шрифтовых зависимостей).
export function catIcon(slug?: string | null): string {
  const map: Record<string, string> = {
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
  };
  return map[slug ?? ''] ?? '🛠️';
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
