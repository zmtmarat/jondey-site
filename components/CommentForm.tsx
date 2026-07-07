'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { antispamMessage } from '@/lib/errors';

export default function CommentForm({ topicId }: { topicId: number }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [hp, setHp] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (hp) return;
    if (body.trim().length < 2) {
      setError('Напишите комментарий.');
      return;
    }
    setSending(true);
    const { error: err } = await supabase.from('forum_comments').insert({
      topic_id: topicId,
      author_name: name.trim() || 'Гость',
      body: body.trim(),
    });
    if (err) {
      setSending(false);
      setError(antispamMessage(err.message) || 'Не удалось отправить. Попробуйте ещё раз.');
      return;
    }
    setBody('');
    setSending(false);
    router.refresh();
  }

  const field =
    'w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition';

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <div aria-hidden style={{ position: 'absolute', left: '-9999px' }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        maxLength={2000}
        placeholder="Ваш ответ…"
        className={field}
      />
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="Имя (необязательно)"
          className={field + ' flex-1'}
        />
        <button
          type="submit"
          disabled={sending}
          className="shrink-0 rounded-xl bg-brand px-5 font-semibold text-white hover:bg-brand-dark transition disabled:opacity-60"
        >
          {sending ? '…' : 'Отправить'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
