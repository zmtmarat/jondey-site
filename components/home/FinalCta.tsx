import type { HomeContent } from '@/lib/content/home';
import { Btn } from './ui';

/* Финальный экран — короткий, без лишнего текста. */

export default function FinalCta({ c }: { c: HomeContent }) {
  return (
    <section className="bg-brand-950">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="mx-auto max-w-3xl text-[26px] leading-[1.2] sm:text-[36px] sm:leading-[1.15] font-bold tracking-[-0.01em] text-white">
          {c.finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-brand-200">
          {c.finalCta.lead}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Btn href="/skachat" variant="primary" event="final_download_app">
            {c.finalCta.primary}
          </Btn>
          <Btn href="/sozdat-zayavku" variant="onDark" event="final_create_request">
            {c.finalCta.secondary}
          </Btn>
          <Btn href="/stat-masterom" variant="onDark" event="final_become_performer">
            {c.finalCta.tertiary}
          </Btn>
        </div>
      </div>
    </section>
  );
}
