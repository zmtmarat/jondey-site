// Возвращает понятное сообщение, если ошибка Supabase — это наша серверная
// анти-спам/валидация (raise из триггеров). Иначе '' → показываем общий текст.
export function antispamMessage(message?: string): string {
  const m = (message || '').trim();
  if (!m) return '';
  return /Слишком много|Слишком длинн|телефон|ссыл|Заголовок|Комментарий|имя|описание/i.test(
    m,
  )
    ? m
    : '';
}
