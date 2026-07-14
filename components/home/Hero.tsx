import Image from 'next/image';
import type { HomeContent } from '@/lib/content/home';
import { Btn, Icon } from './ui';

/**
 * Первый экран. Слева — суть продукта и действия, справа — композиция из
 * реальных экранов приложения (не стоковое фото мастера: Jondey шире).
 * Контент первого экрана — серверный, без зависимости от тяжёлого JS.
 */
export default function Hero({ c }: { c: HomeContent }) {
  const screens = [
    { src: '/images/app/create.png', alt: c.hero.screensAlt.create },
    { src: '/images/app/orders.png', alt: c.hero.screensAlt.orders },
    { src: '/images/app/parts.png', alt: c.hero.screensAlt.parts },
  ];

  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Фон: мягкая сетка + очень лёгкий брендовый градиент. Не мешает тексту. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-brand-100/70 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 pt-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20 lg:pb-24">
        {/* Текстовая колонка */}
        <div className="jd-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {c.hero.eyebrow}
          </p>

          <h1 className="mt-4 text-[34px] leading-[1.1] sm:text-[46px] lg:text-[52px] lg:leading-[1.08] font-bold tracking-[-0.02em] text-ink">
            {c.hero.h1}
          </h1>

          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft prose-measure">
            {c.hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="/skachat" variant="primary" event="hero_download_app">
              <Icon name="phone" className="h-[18px] w-[18px]" />
              {c.hero.ctaPrimary}
            </Btn>
            <Btn href="/sozdat-zayavku" variant="secondary" event="hero_create_request">
              {c.hero.ctaSecondary}
            </Btn>
            <Btn href="#how" variant="ghost" event="hero_how_it_works">
              {c.hero.ctaTertiary}
            </Btn>
          </div>

          {/* Проверяемые преимущества вместо неподтверждённых цифр */}
          <ul className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {c.hero.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[14px] text-ink-muted">
                <Icon name="check" className="h-4 w-4 shrink-0 text-success" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Композиция экранов приложения */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="relative flex items-end justify-center gap-3 sm:gap-5">
            {screens.map((s, i) => {
              const center = i === 0;
              return (
                <div
                  key={s.src}
                  className={[
                    'relative overflow-hidden rounded-[26px] bg-white ring-1 ring-black/5',
                    center
                      ? 'z-10 w-[46%] shadow-[var(--shadow-xl)]'
                      : 'w-[34%] shadow-[var(--shadow-lg)] opacity-95',
                    i === 1 ? 'order-first -mr-4 mb-8 rotate-[-3deg]' : '',
                    i === 2 ? '-ml-4 mb-8 rotate-[3deg]' : '',
                  ].join(' ')}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={720}
                    height={1560}
                    priority={center}
                    sizes="(max-width: 1024px) 45vw, 260px"
                    className="h-auto w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
