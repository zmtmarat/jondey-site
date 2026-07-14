import Link from 'next/link';
import type { ReactNode } from 'react';

/* Примитивы дизайн-системы главной страницы. Единая сетка, отступы, состояния. */

export function Section({
  children,
  className = '',
  tone = 'default',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'muted' | 'brand';
  id?: string;
}) {
  const bg =
    tone === 'muted'
      ? 'bg-surface-3'
      : tone === 'brand'
        ? 'bg-brand-900 text-white'
        : 'bg-surface';
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  invert = false,
}: {
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-[0.12em] ${
        invert ? 'text-brand-200' : 'text-brand-600'
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <header className={center ? 'text-center' : ''}>
      {eyebrow && <Eyebrow invert={invert}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-2 text-[26px] leading-[1.2] sm:text-[34px] sm:leading-[1.15] font-bold tracking-[-0.01em] ${
          invert ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-3 text-[16px] sm:text-[17px] leading-relaxed prose-measure ${
            center ? 'mx-auto' : ''
          } ${invert ? 'text-brand-100' : 'text-ink-soft'}`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'onDark';

const BTN: Record<BtnVariant, string> = {
  primary:
    'bg-accent-500 text-brand-950 hover:bg-accent-400 active:bg-accent-600 shadow-[var(--shadow-md)]',
  secondary:
    'bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-950 shadow-[var(--shadow-sm)]',
  ghost:
    'border border-line-strong text-ink hover:border-brand-400 hover:text-brand-700 bg-surface',
  onDark:
    'border border-white/30 text-white hover:bg-white/10 active:bg-white/15',
};

export function Btn({
  href,
  children,
  variant = 'primary',
  className = '',
  event,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  /** Имя события аналитики (data-атрибут читает AnalyticsBridge). */
  event?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-[15px] font-semibold transition-colors duration-150 disabled:opacity-50 ${BTN[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} data-jd-event={event}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-jd-event={event}>
      {children}
    </Link>
  );
}

/** Единый набор иконок (24px, stroke 1.75) — без эмодзи. */
export function Icon({
  name,
  className = 'h-6 w-6',
}: {
  name:
    | 'wrench'
    | 'truck'
    | 'crane'
    | 'gear'
    | 'check'
    | 'shield'
    | 'star'
    | 'chat'
    | 'map'
    | 'phone'
    | 'building'
    | 'arrow';
  className?: string;
}) {
  const p: Record<string, ReactNode> = {
    wrench: (
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3l9.4-9.4Z M14.7 6.3 17.5 3.5a4 4 0 0 1 3 6.8" />
    ),
    truck: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),
    crane: (
      <>
        <path d="M4 20h16" />
        <path d="M6 20V6h12" />
        <path d="M18 6v5" />
        <path d="M6 6 3 11" />
        <path d="M15 11h6l-3 5h-3z" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
      </>
    ),
    check: <path d="m4 12.5 5 5L20 6.5" />,
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.2 3 7.5 7 9 4-1.5 7-4.8 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    star: (
      <path d="m12 4 2.5 5.1 5.6.8-4 4 .9 5.6L12 16.9 7 19.5l1-5.6-4-4 5.6-.8L12 4Z" />
    ),
    chat: <path d="M20 15a3 3 0 0 1-3 3H8l-4 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8Z" />,
    map: (
      <>
        <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
        <path d="M9 4v14M15 6v14" />
      </>
    ),
    phone: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
        <path d="M15 9h3a2 2 0 0 1 2 2v10" />
        <path d="M8 7h3M8 11h3M8 15h3" />
        <path d="M3 21h18" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {p[name]}
    </svg>
  );
}

/** Маркированный пункт с галочкой. */
export function CheckItem({
  children,
  invert = false,
}: {
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          invert ? 'bg-white/15 text-white' : 'bg-success-soft text-success'
        }`}
      >
        <Icon name="check" className="h-3 w-3" />
      </span>
      <span
        className={`text-[15px] leading-6 ${invert ? 'text-brand-100' : 'text-ink-soft'}`}
      >
        {children}
      </span>
    </li>
  );
}
