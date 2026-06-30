import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getForumTopics } from '@/lib/data';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Обсуждения о ремонте — форум Jondey',
  description:
    'Сообщество Jondey: обсуждайте ремонт, делитесь идеями, опытом и фото. Задавайте вопросы и помогайте советом другим.',
  alternates: { canonical: '/forum' },
};

function shortDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function ForumPage() {
  const topics = await getForumTopics(60);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Обсуждения</h1>
          <p className="mt-2 text-slate-500">
            Сообщество о ремонте: идеи, опыт, вопросы и фото.
          </p>
        </div>
        <Link
          href="/forum/novoe"
          className="shrink-0 inline-flex items-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition"
        >
          + Создать
        </Link>
      </div>

      {topics.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          Пока нет обсуждений. Создайте первое — спросите совета или поделитесь
          ремонтом.
          <div className="mt-4">
            <Link
              href="/forum/novoe"
              className="inline-flex rounded-xl bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark transition"
            >
              Создать обсуждение
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/forum/${t.id}`}
              className="flex gap-3 rounded-2xl bg-white border border-slate-200 p-4 hover:shadow-md hover:border-brand/40 transition"
            >
              {t.image_url && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={t.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
              )}
              <div className="min-w-0">
                <h2 className="font-bold leading-snug line-clamp-2">{t.title}</h2>
                {t.body && (
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                    {t.body}
                  </p>
                )}
                <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                  <span>{t.author_name || 'Гость'}</span>
                  <span>{shortDate(t.created_at)}</span>
                  <span>💬 {t.comment_count ?? 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
