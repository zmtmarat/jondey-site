import Link from 'next/link';
import Image from 'next/image';
import { SUPPORT_WHATSAPP } from '@/lib/contacts';

/* Подвал. Только существующие страницы — битых ссылок нет.
   Разделы, которых ещё нет (Соглашение, База знаний, API, Партнёрская
   программа), сознательно не выводим до их создания. */

const SUPPORT_EMAIL = 'zmtmarat@gmail.com';

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Пользователям',
    links: [
      ['/mastera', 'Найти мастера'],
      ['/zapchasti', 'Найти запчасть'],
      ['/dostavka', 'Заказать доставку'],
      ['/uslugi', 'Вызвать спецтехнику'],
      ['/sozdat-zayavku', 'Создать заявку'],
      ['/zayavki', 'Все заявки'],
    ],
  },
  {
    title: 'Исполнителям',
    links: [
      ['/stat-masterom', 'Стать исполнителем'],
      ['/rabota', 'Работа и заказы'],
      ['/skachat', 'Скачать приложение'],
    ],
  },
  {
    title: 'Бизнесу',
    links: [
      ['/kompanii', 'Компании и магазины'],
      ['/brands', 'Бренды и представители'],
    ],
  },
  {
    title: 'О Jondey',
    links: [
      ['/o-nas', 'О сервисе'],
      ['/#how', 'Как это работает'],
      ['/forum', 'Обсуждения'],
      ['/politika', 'Политика конфиденциальности'],
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.6fr]">
          {/* Бренд + контакты */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-mark.png"
                alt="Jondey"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-[17px] font-bold text-brand-900">Jondey</span>
            </div>
            <p className="mt-3 max-w-xs text-[14px] leading-6 text-ink-muted">
              Мастера, доставка, спецтехника и запчасти по всему Казахстану — в
              одном приложении.
            </p>

            <div className="mt-5 space-y-1.5 text-[14px]">
              {SUPPORT_WHATSAPP && (
                <a
                  href={`https://wa.me/${SUPPORT_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-jd-event="footer_support_whatsapp"
                  className="block text-ink-soft hover:text-brand-700"
                >
                  WhatsApp: +7 777 798 98 98
                </a>
              )}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-jd-event="footer_support_email"
                className="block text-ink-soft hover:text-brand-700"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div
              className="mt-5 inline-flex items-center rounded-[var(--radius-sm)] border border-line p-0.5 text-[13px] font-semibold"
              role="group"
              aria-label="Язык сайта"
            >
              <Link href="/" className="rounded-[6px] px-2.5 py-1 text-ink-soft hover:text-ink">
                РУС
              </Link>
              <Link href="/kk" className="rounded-[6px] px-2.5 py-1 text-ink-soft hover:text-ink">
                ҚАЗ
              </Link>
            </div>
          </div>

          {/* Разделы */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-[14px] text-ink-soft hover:text-brand-700"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jondey. ТОО «RIDS EMPIRE», БИН 170240016026.</p>
          <p>Приложение доступно на казахском и русском языках.</p>
        </div>
      </div>
    </footer>
  );
}
