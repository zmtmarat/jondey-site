'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function NewTopicForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hp, setHp] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (hp) return; // honeypot
    if (title.trim().length < 3) {
      setError('Напишите тему обсуждения.');
      return;
    }
    setSending(true);
    try {
      let imageUrl: string | null = null;
      if (file) {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const path = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
        const up = await supabase.storage.from('forum').upload(path, file, {
          contentType: file.type || 'image/jpeg',
          upsert: false,
        });
        if (!up.error) {
          imageUrl = supabase.storage.from('forum').getPublicUrl(path)
            .data.publicUrl;
        }
      }
      const { data, error: err } = await supabase
        .from('forum_topics')
        .insert({
          author_name: name.trim() || 'Гость',
          title: title.trim(),
          body: body.trim() || null,
          image_url: imageUrl,
        })
        .select('id')
        .single();
      if (err) throw err;
      router.push(`/forum/${data.id}`);
      router.refresh();
    } catch {
      setSending(false);
      setError('Не удалось опубликовать. Попробуйте ещё раз.');
    }
  }

  const field =
    'w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition';

  return (
    <form onSubmit={submit} className="space-y-4">
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

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Тема <span className="text-red-500">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={140}
          placeholder="Напр.: Чем выровнять стены в новостройке?"
          className={field}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Сообщение</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={4000}
          placeholder="Расскажите подробнее, поделитесь опытом или вопросом…"
          className={field}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Фото (необязательно)</label>
        <input
          type="file"
          accept="image/*"
          onChange={onPick}
          className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-white file:font-medium hover:file:bg-brand-dark"
        />
        {preview && (
          <div className="relative mt-3 h-40 w-full overflow-hidden rounded-xl">
            <Image src={preview} alt="превью" fill className="object-cover" sizes="100vw" unoptimized />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Ваше имя</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="необязательно"
          className={field}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg hover:bg-brand-dark transition disabled:opacity-60"
      >
        {sending ? 'Публикуем…' : 'Опубликовать обсуждение'}
      </button>
      <p className="text-xs text-slate-400 text-center">
        Будьте вежливы. Спам и оскорбления удаляются.
      </p>
    </form>
  );
}
