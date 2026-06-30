'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Category, City } from '@/lib/types';
import { catName, cityName, catImage, catIcon } from '@/lib/labels';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function RequestForm({
  categories,
  cities,
}: {
  categories: Category[];
  cities: City[];
}) {
  const [categoryId, setCategoryId] = useState('');
  const [catQuery, setCatQuery] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const num = (v: string) => {
    const d = v.replace(/[^0-9]/g, '');
    return d ? parseInt(d, 10) : null;
  };

  const filteredCats = useMemo(() => {
    const q = catQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => catName(c).toLowerCase().includes(q));
  }, [categories, catQuery]);

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    const base = q
      ? cities.filter((c) => cityName(c).toLowerCase().includes(q))
      : cities;
    return base.slice(0, 8);
  }, [cities, cityQuery]);

  // Геолокация браузера → город (через Nominatim).
  function detectCity() {
    if (!navigator.geolocation) {
      setError('Геолокация недоступна в этом браузере.');
      return;
    }
    setError('');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=ru&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          const a = data.address ?? {};
          const detected = String(
            a.city || a.town || a.village || a.county || '',
          ).toLowerCase();
          const match = cities.find((c) => {
            const n = cityName(c).toLowerCase();
            return n && (detected.includes(n) || n.includes(detected));
          });
          if (match) {
            setCityId(String(match.id));
            setCityQuery(cityName(match));
            setCityOpen(false);
          } else {
            setError('Не удалось определить город — выберите из списка.');
          }
        } catch {
          setError('Не удалось определить город — выберите из списка.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setError('Доступ к геолокации отклонён.');
      },
      { timeout: 8000 },
    );
  }

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
    const b = num(budget);
    const { error: err } = await supabase.from('web_requests').insert({
      name: name.trim() || null,
      phone: phone.trim(),
      city_id: cityId || null,
      category_id: categoryId || null,
      description: description.trim(),
      // Единый бюджет сохраняем как «до» (целевая цена заказчика).
      budget_min: null,
      budget_max: b,
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
  const selectedCat = categories.find((c) => String(c.id) === categoryId);

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Категория — фото-сетка с поиском, как в приложении */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Категория</label>
        <input
          value={catQuery}
          onChange={(e) => setCatQuery(e.target.value)}
          placeholder="🔍 Поиск: сантехник, ремонт, доставка…"
          className={field + ' mb-3'}
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto p-0.5">
          {filteredCats.map((c) => {
            const img = catImage(c.slug);
            const active = String(c.id) === categoryId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(active ? '' : String(c.id))}
                className={
                  'group relative overflow-hidden rounded-xl aspect-square ring-2 transition ' +
                  (active
                    ? 'ring-brand'
                    : 'ring-transparent hover:ring-brand/40')
                }
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={catName(c)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-brand-light text-3xl">
                    {catIcon(c.slug)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-1 left-1.5 right-1.5 text-left text-[11px] font-semibold leading-tight text-white drop-shadow">
                  {catName(c)}
                </span>
                {active && (
                  <span className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-[11px] text-white">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
          {filteredCats.length === 0 && (
            <p className="col-span-full py-4 text-center text-sm text-slate-400">
              Ничего не найдено
            </p>
          )}
        </div>
        {selectedCat && (
          <p className="mt-2 text-sm text-slate-500">
            Выбрано: <b className="text-brand">{catName(selectedCat)}</b>
          </p>
        )}
      </div>

      {/* Город — поиск + геолокация */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Город</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              value={cityQuery}
              onChange={(e) => {
                setCityQuery(e.target.value);
                setCityId('');
                setCityOpen(true);
              }}
              onFocus={() => setCityOpen(true)}
              placeholder="Начните вводить город…"
              className={field}
            />
            {cityOpen && filteredCities.length > 0 && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                {filteredCities.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCityId(String(c.id));
                      setCityQuery(cityName(c));
                      setCityOpen(false);
                    }}
                    className="block w-full px-4 py-2.5 text-left hover:bg-brand/5"
                  >
                    {cityName(c)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={detectCity}
            disabled={locating}
            className="shrink-0 rounded-xl border border-brand/40 px-4 font-medium text-brand hover:bg-brand/5 transition disabled:opacity-60"
            title="Определить мой город"
          >
            {locating ? '…' : '📍 Мой город'}
          </button>
        </div>
      </div>

      {/* Что нужно */}
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

      {/* Бюджет — одно поле */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Ваш бюджет, ₸</label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          inputMode="numeric"
          placeholder="Сколько готовы заплатить (необязательно)"
          className={field}
        />
        <p className="mt-1 text-xs text-slate-400">
          Назовите свою цену — мастера откликнутся со своими предложениями.
        </p>
      </div>

      {/* Контакты */}
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
