'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Category, City } from '@/lib/types';
import { catName, cityName } from '@/lib/labels';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function RequestForm({
  categories,
  cities,
}: {
  categories: Category[];
  cities: City[];
}) {
  const [categoryId, setCategoryId] = useState('');
  const [cityId, setCityId] = useState('');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const num = (v: string) => {
    const d = v.replace(/[^0-9]/g, '');
    return d ? parseInt(d, 10) : null;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (description.trim().length < 5) {
      setError('Опишите задачу подробнее (хотя бы пару слов).');
      return;
    }
    if (phone.trim().replace(/[^0-9]/g, '').length < 10) {
      setError('Укажите корректный номер телефона.');
      return;
    }
    setStatus('sending');
    const { error: err } = await supabase.from('web_requests').insert({
      name: name.trim() || null,
      phone: phone.trim(),
      city_id: cityId || null,
      category_id: categoryId || null,
      description: description.trim(),
      budget_min: num(budgetMin),
      budget_max: num(budgetMax),
    });
    if (err) {
      setStatus('error');
      setError('Не удалось отправить. Попробуйте ещё раз или установите приложение.');
      return;
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl">✅</div>
        <h2 className="mt-3 text-2xl font-bold">Заявка отправлена!</h2>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          Мы получили вашу заявку. Чтобы видеть отклики мастеров с ценами,
          переписываться и выбрать лучшего — установите приложение Jondey.
        </p>
        <Link
          href="/skachat"
          className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark transition"
        >
          Установить приложение
        </Link>
      </div>
    );
  }

  const field =
    'w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition';

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Категория</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={field}
          >
            <option value="">Выберите направление</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {catName(c)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Город</label>
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className={field}
          >
            <option value="">Выберите город</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {cityName(c)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Что нужно сделать? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Напр.: не морозит холодильник Samsung, нужен мастер на дом в выходные"
          className={field}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Бюджет от, ₸
          </label>
          <input
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            inputMode="numeric"
            placeholder="необязательно"
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Бюджет до, ₸
          </label>
          <input
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            inputMode="numeric"
            placeholder="необязательно"
            className={field}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Ваше имя</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="необязательно"
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            placeholder="+7 ___ ___ __ __"
            className={field}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg hover:bg-brand-dark transition disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
      <p className="text-xs text-slate-400 text-center">
        Отправляя заявку, вы соглашаетесь, что мастера Jondey смогут связаться с
        вами по указанному телефону.
      </p>
    </form>
  );
}
