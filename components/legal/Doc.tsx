import Link from 'next/link';
import type { ReactNode } from 'react';

/* Каркас правовых и справочных страниц: заголовок, дата, оглавление,
   пронумерованные разделы. Один H1, далее H2 на раздел. */

export function DocPage({
  title,
  lead,
  updated,
  toc,
  children,
}: {
  title: string;
  lead?: string;
  updated?: string;
  toc?: { id: string; title: string }[];
  children: ReactNode;
}) {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-[30px] sm:text-[38px] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
          {title}
        </h1>
        {lead && (
          <p className="prose-measure mt-4 text-[16px] leading-7 text-ink-soft">
            {lead}
          </p>
        )}
        {updated && (
          <p className="mt-4 text-[13px] text-ink-muted">Обновлено: {updated}</p>
        )}

        {toc && toc.length > 0 && (
          <nav
            aria-label="Содержание"
            className="mt-8 rounded-[var(--radius-lg)] border border-line bg-surface-3 p-5"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
              Содержание
            </p>
            <ol className="mt-3 space-y-1.5">
              {toc.map((t, i) => (
                <li key={t.id} className="text-[14.5px]">
                  <a
                    href={`#${t.id}`}
                    className="text-ink-soft hover:text-brand-700"
                  >
                    <span className="mr-2 text-ink-muted tabular-nums">
                      {i + 1}.
                    </span>
                    {t.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function DocSection({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n?: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[20px] sm:text-[23px] font-bold leading-snug tracking-[-0.01em] text-ink">
        {n !== undefined && (
          <span className="mr-2 text-brand-600 tabular-nums">{n}.</span>
        )}
        {title}
      </h2>
      <div className="prose-measure mt-4 space-y-4 text-[15.5px] leading-7 text-ink-soft">
        {children}
      </div>
    </section>
  );
}

/** Маркированный список внутри раздела. */
export function DocList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Выделенный блок: важное предупреждение или подсказка. */
export function DocNote({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warn';
  children: ReactNode;
}) {
  const cls =
    tone === 'warn'
      ? 'border-warning/30 bg-warning-soft'
      : 'border-brand-200 bg-brand-50';
  return (
    <div
      className={`rounded-[var(--radius-md)] border ${cls} p-4 text-[14.5px] leading-6 text-ink`}
    >
      {children}
    </div>
  );
}

/** Внутренняя ссылка в тексте документа. */
export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto:');
  const cls = 'font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900';
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
