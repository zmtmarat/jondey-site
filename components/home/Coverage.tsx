import Link from 'next/link';
import type { HomeContent } from '@/lib/content/home';
import type { City } from '@/lib/types';
import { cityName } from '@/lib/labels';
import { cityRank } from '@/lib/cities';
import { Icon, Section, SectionHead } from './ui';

/* География. Вместо декоративной «карты-картинки» — лёгкая абстрактная сеть
   точек и связей (маршруты), она не тянет geo-данные и не грузит клиент.
   Города — реальные, из БД. Ложных обещаний покрытия не даём (см. note). */

export default function Coverage({
  c,
  cities,
}: {
  c: HomeContent;
  cities: City[];
}) {
  const top = [...cities]
    .sort((a, b) => cityRank(cityName(a)) - cityRank(cityName(b)))
    .slice(0, 24);

  return (
    <Section tone="brand">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHead
            title={c.coverage.title}
            lead={c.coverage.lead}
            invert
          />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold text-white ring-1 ring-white/15">
            <Icon name="map" className="h-4 w-4" />
            {c.coverage.tagline}
          </p>
          <p className="mt-6 text-[14px] leading-6 text-brand-200 prose-measure">
            {c.coverage.note}
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-200">
            {c.coverage.citiesTitle}
          </h3>

          {/* Абстрактная сеть «маршрутов» — фон блока городов */}
          <div className="relative mt-4 overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <svg
              aria-hidden
              viewBox="0 0 400 160"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
              preserveAspectRatio="none"
            >
              <g stroke="white" strokeWidth="0.6" fill="none">
                <path d="M20 120 L90 70 L170 95 L250 45 L330 80 L380 40" />
                <path d="M40 40 L120 30 L200 70 L290 110 L370 120" />
              </g>
              <g fill="white">
                {[
                  [20, 120],
                  [90, 70],
                  [170, 95],
                  [250, 45],
                  [330, 80],
                  [380, 40],
                  [40, 40],
                  [120, 30],
                  [200, 70],
                  [290, 110],
                  [370, 120],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />
                ))}
              </g>
            </svg>

            <ul className="relative flex flex-wrap gap-x-2 gap-y-2">
              {top.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/mastera?city=${city.id}`}
                    data-jd-event="coverage_city"
                    className="inline-block rounded-full bg-white/10 px-3 py-1.5 text-[13.5px] text-white transition-colors hover:bg-white/20"
                  >
                    {cityName(city)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/mastera"
                  data-jd-event="coverage_all_cities"
                  className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-3 py-1.5 text-[13.5px] font-semibold text-brand-950 transition-colors hover:bg-accent-400"
                >
                  {c.coverage.allCities}
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
