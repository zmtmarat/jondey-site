'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Category, City } from '@/lib/types';
import { catName, cityName, catImage, catIcon } from '@/lib/labels';
import RankBadge from './RankBadge';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function MasterForm({
  categories,
  cities,
}: {
  categories: Category[];
  cities: City[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [catQuery, setCatQuery] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [hp, setHp] = useState(''); // honeypot — заполняют только боты

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

  function toggleCat(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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
    // Honeypot: заполнено скрытое поле → бот. Тихо «успех», без записи.
    if (hp) {
      setStatus('done');
      return;
    }
    if (name.trim().length < 2) {
      setError('Укажите ваше имя.');
      return;
    }
    if (selected.size === 0) {
      setError('Выберите хотя бы одно направление работы.');
      return;
    }
    if (phone.trim().replace(/[^0-9]/g, '').length < 10) {
      setError('Укажите корректный номер телефона.');
      return;
    }
    setStatus('sending');
    const exp = experience.replace(/[^0-9]/g, '');
    const { error: err } = await supabase.from('web_master_requests').insert({
      name: name.trim(),
      phone: phone.trim(),
      city_id: cityId || null,
      category_ids: Array.from(selected),
      about: about.trim() || null,
      experience_years: exp ? parseInt(exp, 10) : null,
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
        <div className="text-4xl">🛠️</div>
        <h2 className="mt-3 text-2xl font-bold">Анкета отправлена!</h2>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          Установите приложение Jondey, чтобы завершить регистрацию, получать
          заявки рядом и откликаться со своей ценой.
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
    <form onSubmit={submit} className="space-y-5">
      {/* Honeypot — невидим людям, ловит ботов. */}
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
      {/* Направления — мультивыбор, с живым статусом */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium">
            В каких направлениях работаете?
          </label>
          {selected.size > 0 && (
            <span className="flex items-center gap-2 text-xs text-slate-500">
              Выбрано: {selected.size}
              <RankBadge categoryCount={selected.size} />
            </span>
          )}
        </div>
        <input
          value={catQuery}
          onChange={(e) => setCatQuery(e.target.value)}
          placeholder="🔍 Поиск: сантехник, электрик, спецтехника…"
          className={field + ' mb-3'}
        />
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-0.5">
          {filteredCats.map((c) => {
            const img = catImage(c.slug);
            const active = selected.has(String(c.id));
            return (
              <button
                key={c.id}
                type="button"
                title={catName(c)}
                onClick={() => toggleCat(String(c.id))}
                className={
                  'group relative overflow-hidden rounded-lg aspect-square ring-2 transition ' +
                  (active
                    ? 'ring-brand'
                    : 'ring-transparent hover:ring-brand/40')
                }
              >
                {img ? (
                  <Image
                    src={img}
                    alt={catName(c)}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 22vw, 110px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-brand-light text-2xl">
                    {catIcon(c.slug)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute bottom-0.5 left-1 right-1 text-left text-[10px] font-semibold leading-tight text-white drop-shadow line-clamp-2">
                  {catName(c)}
                </span>
                {active && (
                  <span className="absolute top-0.5 right-0.5 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] text-white">
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
        <p className="mt-2 text-xs text-slate-400">
          Чем больше направлений — тем выше статус и больше заявок.
        </p>
      </div>

      {/* Город — поиск + геолокация */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Город работы</label>
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

      {/* Опыт + о себе */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Опыт работы, лет
          </label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            inputMode="numeric"
            placeholder="необязательно"
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className={field}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">О себе</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={3}
          placeholder="Коротко о вашем опыте и услугах (необязательно)"
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg hover:bg-brand-dark transition disabled:opacity-60"
      >
        {status === 'sending' ? 'Отправляем…' : 'Стать мастером'}
      </button>
      <p className="text-xs text-slate-400 text-center">
        Регистрация бесплатна. После анкеты установите приложение, чтобы получать
        заявки и откликаться.
      </p>
    </form>
  );
}
