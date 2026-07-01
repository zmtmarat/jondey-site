// Крупные города Казахстана по населению — показываем их первыми/по умолчанию,
// а мелкие прячем под «Больше городов». Один список для главной и каталога.
export const MAJOR_CITIES = [
  'Алматы', 'Шымкент', 'Астана', 'Нур-Султан', 'Караганда', 'Актобе',
  'Тараз', 'Павлодар', 'Усть-Каменогорск', 'Семей', 'Атырау', 'Костанай',
  'Кызылорда', 'Уральск', 'Петропавловск', 'Актау', 'Темиртау', 'Туркестан',
  'Кокшетау', 'Талдыкорган', 'Экибастуз', 'Рудный', 'Жезказган',
];

export function cityRank(name: string): number {
  const n = name.toLowerCase();
  const i = MAJOR_CITIES.findIndex((m) => n.includes(m.toLowerCase()));
  return i === -1 ? 999 : i;
}

export function isMajorCity(name: string): boolean {
  return cityRank(name) !== 999;
}
