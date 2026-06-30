// Статус мастера по широте профиля (числу категорий). Не «уровень-игрушка»,
// а солидный профессиональный статус: чем больше направлений — тем выше.
export type MasterRank = {
  label: string;
  // Tailwind-классы фона/текста бейджа.
  className: string;
};

export function masterRank(categoryCount: number): MasterRank | null {
  if (categoryCount >= 8) {
    return {
      label: 'Мастер-эксперт',
      className:
        'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm',
    };
  }
  if (categoryCount >= 5) {
    return {
      label: 'Универсал',
      className:
        'bg-gradient-to-r from-brand to-blue-600 text-white shadow-sm',
    };
  }
  if (categoryCount >= 3) {
    return {
      label: 'Профи',
      className: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    };
  }
  return null;
}
