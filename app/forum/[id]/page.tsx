import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getForumTopic, getForumComments } from '@/lib/data';
import CommentForm from '@/components/CommentForm';

export const revalidate = 0; // всегда свежие комментарии

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const topic = await getForumTopic(id);
  return {
    title: topic ? `${topic.title} — обсуждение Jondey` : 'Обсуждение',
    description: topic?.body?.slice(0, 160) ?? 'Обсуждение о ремонте на Jondey.',
    alternates: { canonical: `/forum/${id}` },
  };
}

function shortDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = await getForumTopic(id);
  if (!topic) notFound();
  const comments = await getForumComments(id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/forum" className="text-sm text-slate-500 hover:text-brand">
        ← К обсуждениям
      </Link>

      <article className="mt-3 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-extrabold leading-snug">{topic.title}</h1>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
          <span className="font-medium text-slate-600">
            {topic.author_name || 'Гость'}
          </span>
          <span>{shortDate(topic.created_at)}</span>
        </div>
        {topic.body && (
          <p className="mt-4 whitespace-pre-wrap text-slate-700">{topic.body}</p>
        )}
        {topic.image_url && (
          <div className="relative mt-4 w-full overflow-hidden rounded-xl">
            <Image
              src={topic.image_url}
              alt={topic.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        )}
      </article>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">
          Ответы {comments.length > 0 && `· ${comments.length}`}
        </h2>
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span className="font-medium text-slate-600">
                  {c.author_name || 'Гость'}
                </span>
                <span>{shortDate(c.created_at)}</span>
              </div>
              <p className="whitespace-pre-wrap text-slate-700 text-sm">
                {c.body}
              </p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-slate-400">
              Пока нет ответов. Будьте первым!
            </p>
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <CommentForm topicId={topic.id} />
        </div>
      </section>
    </div>
  );
}
