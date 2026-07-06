import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Работа и подработка в Казахстане — станьте мастером Jondey | Вакансии для специалистов',
  description:
    'Ищете работу или подработку? Сантехник, электрик, автомеханик, курьер, мастер по ремонту техники и другие. Свободный график, оплата напрямую, без вложений. Регистрация бесплатная — заказы сами найдут вас.',
  alternates: { canonical: 'https://jondey.kz/rabota' },
  openGraph: {
    title: 'Работа и подработка в Казахстане — станьте мастером Jondey',
    description:
      'Свободный график, оплата напрямую, без вложений. Клиенты уже ищут таких специалистов, как вы.',
    url: 'https://jondey.kz/rabota',
  },
};

export const revalidate = 3600;

// Профессии/направления (для соискателей и SEO). slug → страница спроса.
const JOBS: [string, string][] = [
  ['Сантехник', 'plumbing'],
  ['Электрик', 'electric'],
  ['Мастер по ремонту бытовой техники', 'appliances'],
  ['Мастер по ремонту телефонов', 'electronics'],
  ['Компьютерный мастер', 'computer'],
  ['Автомеханик', 'transport'],
  ['Оператор спецтехники', 'spectech'],
  ['Курьер и водитель', 'delivery'],
  ['Грузчик и разнорабочий', 'labor'],
  ['Клинер, уборка', 'cleaning'],
  ['Сборщик мебели', 'furniture'],
  ['Установка окон', 'window'],
  ['Мастер по ремонту мото', 'moto'],
  ['Вскрытие замков', 'locksmith'],
];

const FAQ: [string, string][] = [
  [
    'Сколько можно заработать?',
    'Вы сами назначаете цену за свою работу и берёте столько заказов, сколько хотите. Оплата приходит напрямую от клиента — без комиссий и посредников.',
  ],
  [
    'Нужны ли вложения?',
    'Нет. Регистрация и приём заказов бесплатные. Не нужно платить за доступ к заявкам или размещение анкеты.',
  ],
  [
    'Как я буду получать заказы?',
    'Клиенты публикуют заявки, а вы откликаетесь на подходящие. Как только рядом появляется заказ по вашей специальности — приходит уведомление.',
  ],
  [
    'Подходит ли как подработка?',
    'Да. Свободный график — берите заказы, когда вам удобно, совмещайте с основной работой или учёбой.',
  ],
];

export default function RabotaPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-[#0d2c5c] text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold mb-4">
            Работа и подработка по всему Казахстану
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Ищете работу? Станьте мастером Jondey
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-[15px] sm:text-base leading-relaxed">
            Делайте то, что умеете, — и получайте за это достойную оплату.
            Расскажите, в чём вы мастер, и заказы сами найдут вас. Свободный
            график, оплата напрямую от клиента, без вложений и без обзвона
            десятков объявлений. Тысячи людей каждый день ищут именно таких
            специалистов, как вы.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/stat-masterom"
              style={{ backgroundColor: '#ffb300', color: '#0d2c5c' }}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold shadow-lg hover:brightness-105 transition"
            >
              Зарегистрироваться
            </Link>
            <Link
              href="/skachat"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 font-semibold text-white hover:bg-white/10 transition"
            >
              Скачать приложение
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span>✓ Бесплатная регистрация</span>
            <span>🕒 Свободный график</span>
            <span>💸 Оплата напрямую</span>
            <span>📩 Поток заявок рядом</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Профессии */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Кому подходит работа на Jondey
          </h2>
          <p className="text-slate-600 mt-2">
            Специалисты любых направлений находят клиентов рядом. Выберите своё
            и посмотрите, сколько заявок уже ждут исполнителя.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {JOBS.map(([name, slug]) => (
              <Link
                key={slug}
                href={`/mastera/${slug}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand hover:text-brand transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </section>

        {/* Почему */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Почему мастера выбирают Jondey
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['💸 Оплата напрямую', 'Клиент платит вам — без комиссий и посредников. Цену за работу назначаете вы сами.'],
              ['🕒 Свободный график', 'Берите заказы, когда удобно. Подходит и как основная работа, и как подработка.'],
              ['📩 Заказы приходят сами', 'Не нужно обзванивать объявления — заявки рядом с вами приходят уведомлением.'],
              ['🚀 Бесплатный старт', 'Регистрация и отклики бесплатны. Никаких вложений, чтобы начать зарабатывать.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white border border-slate-200 p-5">
                <div className="font-semibold text-slate-900">{t}</div>
                <p className="mt-2 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Как начать */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Как начать</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ['1. Зарегистрируйтесь', 'Заполните короткую анкету: имя, город и что вы умеете.'],
              ['2. Укажите специальности', 'Отметьте направления, в которых работаете, — так заявки будут точнее.'],
              ['3. Принимайте заказы', 'Откликайтесь на подходящие заявки и договаривайтесь с клиентом.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <div className="font-semibold text-brand">{t}</div>
                <p className="mt-2 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-2xl bg-white border border-slate-200 p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold list-none">
                  {q}
                  <span className="ml-3 text-brand transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="mt-12 rounded-3xl bg-gradient-to-br from-brand to-[#0d2c5c] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">Готовы начать зарабатывать?</h2>
          <p className="mt-3 text-white/85">
            Присоединяйтесь к мастерам Jondey — это займёт пару минут.
          </p>
          <Link
            href="/stat-masterom"
            style={{ backgroundColor: '#ffb300', color: '#0d2c5c' }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold shadow-lg hover:brightness-105 transition"
          >
            Стать мастером
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
  );
}
