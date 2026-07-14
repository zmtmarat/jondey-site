import type { Metadata } from 'next';
import Link from 'next/link';
import { DocPage, DocSection, DocList, DocNote, DocLink } from '@/components/legal/Doc';
import { LEGAL_UPDATED, SUPPORT_EMAIL, SUPPORT_PHONE_DIGITS } from '@/lib/legal';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Партнёрская программа',
  description:
    'Партнёрство с Jondey: для компаний и магазинов, брендов и производителей, сервисных центров и автопарков. Как разместить бизнес и подтвердить представительство бренда.',
  alternates: { canonical: `${SITE_URL}/partneram` },
};

const TOC = [
  { id: 'who', title: 'Кому подходит' },
  { id: 'shops', title: 'Компании и магазины' },
  { id: 'brands', title: 'Бренды и производители' },
  { id: 'fleet', title: 'Автопарки и спецтехника' },
  { id: 'how', title: 'Как начать' },
  { id: 'terms', title: 'Условия' },
  { id: 'contact', title: 'Связаться' },
];

export default function PartneramPage() {
  return (
    <main>
      <DocPage
        title="Партнёрская программа"
        lead="Jondey подключает бизнес к потоку заявок по всему Казахстану. Заказчик описывает задачу — вы отвечаете ценой. Разместиться можно бесплатно."
        updated={LEGAL_UPDATED}
        toc={TOC}
      >
        <DocSection id="who" n={1} title="Кому подходит">
          <DocList
            items={[
              'Магазинам автозапчастей и запчастей для спецтехники, бытовой техники, электроники.',
              'Сервисным центрам и мастерским.',
              'Компаниям доставки, грузоперевозок и владельцам спецтехники.',
              'Производителям и официальным представителям брендов.',
              'Отдельным мастерам, которые хотят получать заказы рядом с собой.',
            ]}
          />
        </DocSection>

        <DocSection id="shops" n={2} title="Компании и магазины">
          <p>
            Разместите компанию в каталоге Jondey — на сайте и в приложении. После
            модерации вы получаете бейдж «Проверенная компания» и начинаете
            получать запросы от покупателей.
          </p>
          <DocList
            items={[
              'Каталог товаров и запчастей с реальными ценами и совместимостью.',
              'Запросы по марке, модели и году — прямо от заказчиков.',
              'Чат с покупателем, рейтинг и отзывы.',
              'Профиль компании с БИН, контактами и адресом.',
            ]}
          />
          <p>
            Разместить бизнес:{' '}
            <DocLink href="/kompanii">раздел «Компании и магазины»</DocLink>.
          </p>
        </DocSection>

        <DocSection id="brands" n={3} title="Бренды и производители">
          <p>
            Если вы владеете брендом или являетесь его официальным
            представителем, подтвердите это в Jondey. Подтверждённые представители
            получают бейдж авторизованного представителя, а покупатели видят, что
            имеют дело с официальным продавцом.
          </p>
          <DocList
            items={[
              'Страница бренда на сайте и в приложении.',
              'Подтверждение представительства через модерацию администратора.',
              'Защита от подделок: покупатели отличают официального продавца.',
            ]}
          />
          <p>
            Подробнее:{' '}
            <DocLink href="/brands">раздел «Бренды и представители»</DocLink>.
          </p>
        </DocSection>

        <DocSection id="fleet" n={4} title="Автопарки и спецтехника">
          <DocList
            items={[
              'Размещайте автовышки, краны, эвакуаторы, манипуляторы и грузовой транспорт.',
              'Получайте заявки на выезд с точным адресом и задачей.',
              'Указывайте тип техники, грузоподъёмность и зону работы.',
            ]}
          />
          <p>
            Разделы:{' '}
            <DocLink href="/dostavka">доставка и перевозки</DocLink> и{' '}
            <DocLink href="/uslugi">спецтехника и услуги</DocLink>.
          </p>
        </DocSection>

        <DocSection id="how" n={5} title="Как начать">
          <DocList
            items={[
              'Установите приложение Jondey и зарегистрируйтесь.',
              'В профиле включите роль исполнителя, компании или магазина.',
              'Заполните данные: наименование, БИН, контакты, товары или услуги.',
              'Отправьте профиль на модерацию — обычно это занимает 1–2 рабочих дня.',
              'После одобрения начинайте получать заявки и отвечать на них.',
            ]}
          />
          <p>
            <DocLink href="/skachat">Скачать приложение</DocLink>.
          </p>
        </DocSection>

        <DocSection id="terms" n={6} title="Условия">
          <DocNote>
            Размещение и получение заявок сейчас бесплатны. О любых платных
            возможностях мы предупредим заранее — скрытых списаний нет.
          </DocNote>
          <DocList
            items={[
              'Jondey не участвует в расчётах: оплату вы получаете от заказчика напрямую.',
              'Партнёр сам отвечает за качество товаров и услуг, наличие лицензий и налоговые обязательства.',
              'Правила размещения описаны в Правилах сервиса; отношения регулируются Пользовательским соглашением.',
            ]}
          />
          <p>
            <DocLink href="/pravila">Правила сервиса</DocLink> ·{' '}
            <DocLink href="/soglashenie">Пользовательское соглашение</DocLink>
          </p>
        </DocSection>

        <DocSection id="contact" n={7} title="Связаться">
          <p>
            Вопросы по партнёрству и подключению крупного каталога:
          </p>
          <DocList
            items={[
              <>
                Почта:{' '}
                <DocLink href={`mailto:${SUPPORT_EMAIL}?subject=Партнёрство Jondey`}>
                  {SUPPORT_EMAIL}
                </DocLink>
              </>,
              <>
                WhatsApp:{' '}
                <DocLink href={`https://wa.me/${SUPPORT_PHONE_DIGITS}`}>
                  написать в поддержку
                </DocLink>
              </>,
            ]}
          />
        </DocSection>

        <div className="rounded-[var(--radius-lg)] border border-line bg-brand-900 p-6 text-white">
          <p className="text-[18px] font-semibold">
            Готовы получать заявки от клиентов по всему Казахстану?
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/skachat"
              data-jd-event="partners_download"
              className="inline-flex items-center rounded-[var(--radius-md)] bg-accent-500 px-5 py-2.5 text-[14px] font-semibold text-brand-950 hover:bg-accent-400"
            >
              Скачать приложение
            </Link>
            <Link
              href="/kompanii"
              className="inline-flex items-center rounded-[var(--radius-md)] border border-white/25 px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-white/10"
            >
              Разместить бизнес
            </Link>
          </div>
        </div>
      </DocPage>
    </main>
  );
}
