import type { Locale } from '@/lib/i18n';

/** Тексты шапки и подвала. Ссылки одни и те же — переводятся только подписи. */

export interface ChromeContent {
  directions: string;
  openMenu: string;
  closeMenu: string;
  mainNav: string;
  mobileNav: string;
  langGroup: string;
  download: string;
  tagline: string;
  appLangs: string;
  dirs: { href: string; label: string; hint: string }[];
  nav: { href: string; label: string }[];
  more: { href: string; label: string }[];
  cols: { title: string; links: { href: string; label: string }[] }[];
  legal: { href: string; label: string }[];
}

const CHROME: Record<Locale, ChromeContent> = {
  ru: {
    directions: 'Направления',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    mainNav: 'Основная навигация',
    mobileNav: 'Мобильная навигация',
    langGroup: 'Язык сайта',
    download: 'Скачать приложение',
    tagline:
      'Мастера, доставка, спецтехника и запчасти по всему Казахстану — в одном приложении.',
    appLangs: 'Приложение доступно на казахском и русском языках.',
    dirs: [
      {
        href: '/mastera',
        label: 'Мастера',
        hint: 'Ремонт, сантехника, электрика, авто',
      },
      {
        href: '/dostavka',
        label: 'Доставка и перевозки',
        hint: 'Курьер, газель, грузоперевозка',
      },
      {
        href: '/uslugi',
        label: 'Спецтехника и услуги',
        hint: 'Кран, автовышка, эвакуатор',
      },
      {
        href: '/zapchasti',
        label: 'Запчасти',
        hint: 'Один запрос — цены от магазинов',
      },
    ],
    nav: [
      { href: '/#how', label: 'Как это работает' },
      { href: '/stat-masterom', label: 'Исполнителям' },
      { href: '/kompanii', label: 'Бизнесу' },
      { href: '/brands', label: 'Бренды' },
    ],
    more: [
      { href: '/zayavki', label: 'Заявки' },
      { href: '/forum', label: 'Обсуждения' },
      { href: '/rabota', label: 'Работа' },
      { href: '/o-nas', label: 'О сервисе' },
    ],
    cols: [
      {
        title: 'Пользователям',
        links: [
          { href: '/mastera', label: 'Найти мастера' },
          { href: '/zapchasti', label: 'Найти запчасть' },
          { href: '/dostavka', label: 'Заказать доставку' },
          { href: '/uslugi', label: 'Вызвать спецтехнику' },
          { href: '/sozdat-zayavku', label: 'Создать заявку' },
          { href: '/zayavki', label: 'Все заявки' },
        ],
      },
      {
        title: 'Исполнителям',
        links: [
          { href: '/stat-masterom', label: 'Стать исполнителем' },
          { href: '/rabota', label: 'Работа и заказы' },
          { href: '/skachat', label: 'Скачать приложение' },
        ],
      },
      {
        title: 'Бизнесу',
        links: [
          { href: '/kompanii', label: 'Компании и магазины' },
          { href: '/brands', label: 'Бренды и представители' },
        ],
      },
      {
        title: 'О Jondey',
        links: [
          { href: '/o-nas', label: 'О сервисе' },
          { href: '/partneram', label: 'Партнёрская программа' },
          { href: '/pomoshch', label: 'База знаний' },
          { href: '/kontakty', label: 'Контакты' },
          { href: '/forum', label: 'Обсуждения' },
        ],
      },
    ],
    legal: [
      { href: '/soglashenie', label: 'Пользовательское соглашение' },
      { href: '/pravila', label: 'Правила сервиса' },
      { href: '/politika', label: 'Политика конфиденциальности' },
      { href: '/udalenie-akkaunta', label: 'Удаление аккаунта' },
    ],
  },

  kk: {
    directions: 'Бағыттар',
    openMenu: 'Мәзірді ашу',
    closeMenu: 'Мәзірді жабу',
    mainNav: 'Негізгі навигация',
    mobileNav: 'Мобильді навигация',
    langGroup: 'Сайт тілі',
    download: 'Қосымшаны жүктеу',
    tagline:
      'Шеберлер, жеткізу, арнайы техника және қосалқы бөлшектер — бүкіл Қазақстан бойынша, бір қосымшада.',
    appLangs: 'Қосымша қазақ және орыс тілдерінде қолжетімді.',
    dirs: [
      {
        href: '/mastera',
        label: 'Шеберлер',
        hint: 'Жөндеу, сантехника, электрика, көлік',
      },
      {
        href: '/dostavka',
        label: 'Жеткізу және тасымал',
        hint: 'Курьер, газель, жүк тасымалы',
      },
      {
        href: '/uslugi',
        label: 'Арнайы техника және қызметтер',
        hint: 'Кран, автомұнара, эвакуатор',
      },
      {
        href: '/zapchasti',
        label: 'Қосалқы бөлшектер',
        hint: 'Бір сұраныс — дүкендерден баға',
      },
    ],
    nav: [
      { href: '/kk#how', label: 'Қалай жұмыс істейді' },
      { href: '/stat-masterom', label: 'Орындаушыларға' },
      { href: '/kompanii', label: 'Бизнеске' },
      { href: '/brands', label: 'Брендтер' },
    ],
    more: [
      { href: '/zayavki', label: 'Өтінімдер' },
      { href: '/forum', label: 'Талқылаулар' },
      { href: '/rabota', label: 'Жұмыс' },
      { href: '/o-nas', label: 'Сервис туралы' },
    ],
    cols: [
      {
        title: 'Пайдаланушыларға',
        links: [
          { href: '/mastera', label: 'Шебер табу' },
          { href: '/zapchasti', label: 'Бөлшек табу' },
          { href: '/dostavka', label: 'Жеткізуге тапсырыс' },
          { href: '/uslugi', label: 'Арнайы техника шақыру' },
          { href: '/sozdat-zayavku', label: 'Өтінім жасау' },
          { href: '/zayavki', label: 'Барлық өтінімдер' },
        ],
      },
      {
        title: 'Орындаушыларға',
        links: [
          { href: '/stat-masterom', label: 'Орындаушы болу' },
          { href: '/rabota', label: 'Жұмыс және тапсырыстар' },
          { href: '/skachat', label: 'Қосымшаны жүктеу' },
        ],
      },
      {
        title: 'Бизнеске',
        links: [
          { href: '/kompanii', label: 'Компаниялар мен дүкендер' },
          { href: '/brands', label: 'Брендтер мен өкілдер' },
        ],
      },
      {
        title: 'Jondey туралы',
        links: [
          { href: '/o-nas', label: 'Сервис туралы' },
          { href: '/partneram', label: 'Серіктестік бағдарламасы' },
          { href: '/pomoshch', label: 'Білім қоры' },
          { href: '/kontakty', label: 'Байланыс' },
          { href: '/forum', label: 'Талқылаулар' },
        ],
      },
    ],
    legal: [
      { href: '/soglashenie', label: 'Пайдаланушы келісімі' },
      { href: '/pravila', label: 'Сервис ережелері' },
      { href: '/politika', label: 'Құпиялылық саясаты' },
      { href: '/udalenie-akkaunta', label: 'Аккаунтты жою' },
    ],
  },
};

export function chromeContent(locale: Locale): ChromeContent {
  return CHROME[locale];
}
