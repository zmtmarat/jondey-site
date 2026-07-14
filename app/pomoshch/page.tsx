import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { SUPPORT_EMAIL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'База знаний и помощь',
  description:
    'Ответы на вопросы о Jondey: как создать заявку, как выбрать исполнителя, как работают запчасти и запросы, безопасность сделки, отзывы и рейтинг, для бизнеса.',
  alternates: { canonical: `${SITE_URL}/pomoshch` },
};

type QA = { q: string; a: string };
type Group = { id: string; title: string; items: QA[] };

const GROUPS: Group[] = [
  {
    id: 'start',
    title: 'Начало работы',
    items: [
      {
        q: 'Что такое Jondey?',
        a: 'Jondey — приложение, где в одном месте можно вызвать мастера, получить от магазинов цены на нужную запчасть и вызвать спецтехнику. Вы описываете задачу — исполнители сами предлагают цену.',
      },
      {
        q: 'Сколько стоит пользоваться?',
        a: 'Для заказчиков сервис бесплатный. Разместить заявку, получить отклики и списаться с исполнителем ничего не стоит. Оплату за саму работу вы передаёте исполнителю напрямую.',
      },
      {
        q: 'Как установить приложение?',
        a: 'Приложение для Android доступно по ссылке на странице «Скачать». Для iPhone работает веб-версия — её можно добавить на главный экран как обычное приложение.',
      },
      {
        q: 'Нужна ли регистрация?',
        a: 'Смотреть заявки и каталог можно без регистрации. Чтобы разместить заявку, откликнуться или написать в чат, нужно войти по номеру телефона или через Google.',
      },
    ],
  },
  {
    id: 'orders',
    title: 'Заявки и заказы',
    items: [
      {
        q: 'Как создать заявку?',
        a: 'Нажмите «Создать заявку», выберите направление, опишите задачу, укажите город и при желании фото и цену-ориентир. Заявку увидят подходящие исполнители и пришлют отклики.',
      },
      {
        q: 'Как выбрать исполнителя?',
        a: 'Сравните отклики: цену, рейтинг, отзывы и статус «Проверен». Напишите понравившемуся исполнителю в чат, уточните детали и договоритесь.',
      },
      {
        q: 'Можно ли отменить заявку?',
        a: 'Да, заявку можно отменить до начала работ. Если вы уже договорились с исполнителем, предупредите его в чате.',
      },
      {
        q: 'Как завершить заказ?',
        a: 'После выполнения работы откройте заказ и нажмите «Сделано», затем поставьте оценку и оставьте отзыв. Если что-то пошло не так, вы можете отказаться и описать причину.',
      },
    ],
  },
  {
    id: 'parts',
    title: 'Запчасти',
    items: [
      {
        q: 'Как найти запчасть?',
        a: 'Создайте запрос: выберите категорию техники, укажите марку, модель и год, добавьте фото детали или комментарий. Магазины получат запрос и пришлют свои предложения с ценами.',
      },
      {
        q: 'Подбор идёт только по авто?',
        a: 'Нет. Кроме автозапчастей есть запчасти для спецтехники и мототехники, бытовая техника, телефоны и электроника, компьютеры и ноутбуки.',
      },
      {
        q: 'Что делать, если деталь не подошла?',
        a: 'Условия возврата зависят от продавца — уточните их до покупки. Если продавец нарушил договорённость, оставьте отзыв и подайте жалобу через кнопку «Пожаловаться».',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Безопасность и доверие',
    items: [
      {
        q: 'Безопасно ли платить через приложение?',
        a: 'Jondey не проводит платежи — вы платите исполнителю напрямую. Поэтому не переводите крупную предоплату незнакомому исполнителю до начала работ, а всю договорённость фиксируйте в чате.',
      },
      {
        q: 'Что означает бейдж «Проверен»?',
        a: 'Он означает, что администрация проверила документы исполнителя, а для компаний — наименование, БИН и контакты. Это подтверждение статуса, но не гарантия качества — смотрите ещё и на отзывы.',
      },
      {
        q: 'Как пожаловаться на нарушение?',
        a: 'Откройте заявку, отклик, сообщение, отзыв или профиль и нажмите «Пожаловаться». Приложите доказательства. Срочные случаи — мошенничество, угрозы — пишите сразу на почту поддержки.',
      },
      {
        q: 'Как удалить аккаунт?',
        a: 'В приложении: Профиль → Удалить аккаунт. Либо отправьте запрос на почту поддержки. Удаление бесплатно и необратимо.',
      },
    ],
  },
  {
    id: 'reviews',
    title: 'Отзывы и рейтинг',
    items: [
      {
        q: 'Кто может оставить отзыв?',
        a: 'Только участник реально состоявшейся в Jondey сделки. Отзывы с чужих или фиктивных аккаунтов, а также накрутка запрещены — такой рейтинг обнуляется.',
      },
      {
        q: 'Можно ли удалить несправедливый отзыв?',
        a: 'Отзыв удаляется, только если он нарушает правила: содержит оскорбления, персональные данные, рекламу или не относится к сделке. Честный негативный отзыв удалить нельзя.',
      },
    ],
  },
  {
    id: 'business',
    title: 'Для бизнеса',
    items: [
      {
        q: 'Как разместить компанию или магазин?',
        a: 'Включите в профиле роль компании, укажите наименование, БИН, контакты и товары, отправьте на модерацию. После одобрения вы получаете бейдж «Проверенная компания» и запросы от покупателей.',
      },
      {
        q: 'Как подтвердить, что мы представитель бренда?',
        a: 'В разделе «Бренды» отправьте заявку на представительство и приложите подтверждающие документы. После одобрения администратором вы получаете бейдж авторизованного представителя.',
      },
      {
        q: 'Есть ли плата для бизнеса?',
        a: 'Сейчас размещение и получение заявок бесплатны. О любых платных возможностях мы предупредим заранее.',
      },
    ],
  },
];

export default function PomoshchPage() {
  const all = GROUPS.flatMap((g) => g.items);
  return (
    <main className="bg-surface">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/pomoshch#faq`,
          inLanguage: 'ru-KZ',
          mainEntity: all.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-[30px] sm:text-[38px] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
          База знаний и помощь
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-ink-soft">
          Ответы на частые вопросы о том, как устроен Jondey. Не нашли нужное —{' '}
          <Link
            href="/kontakty"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            напишите в поддержку
          </Link>
          .
        </p>

        {/* Быстрый переход по разделам */}
        <nav aria-label="Разделы" className="mt-8 flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-line bg-surface-3 px-3.5 py-1.5 text-[13.5px] font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700"
            >
              {g.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="text-[21px] font-bold tracking-[-0.01em] text-ink">
                {g.title}
              </h2>
              <div className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line">
                {g.items.map((qa) => (
                  <details key={qa.q} className="group px-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold text-ink marker:content-none">
                      {qa.q}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                        className="shrink-0 text-ink-muted transition-transform group-open:rotate-45"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <p className="pb-4 text-[15px] leading-7 text-ink-soft">
                      {qa.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-[var(--radius-lg)] border border-line bg-surface-3 p-6">
          <h2 className="text-[18px] font-bold text-ink">Остались вопросы?</h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-soft">
            Напишите нам — поддержка отвечает на казахском и русском в течение
            рабочего дня.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/kontakty"
              className="inline-flex items-center rounded-[var(--radius-md)] bg-brand-900 px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-800"
            >
              Контакты поддержки
            </Link>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              data-jd-event="help_email"
              className="inline-flex items-center rounded-[var(--radius-md)] border border-line px-5 py-2.5 text-[14px] font-semibold text-ink-soft hover:text-brand-700"
            >
              Написать на почту
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
