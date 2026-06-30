'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SUPPORT_WHATSAPP, SUPPORT_TELEGRAM } from '@/lib/contacts';

// Плавающая кнопка поддержки (справа снизу). Открывает панель с быстрыми
// действиями и контактами. Без бэкенда — лёгкий и бесплатный «чат поддержки».
export default function SupportWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-[fadeIn_.15s_ease-out]">
          <div className="bg-brand text-white px-4 py-3">
            <div className="font-bold">Чем помочь?</div>
            <div className="text-xs text-white/80">
              Ответим и подскажем по сервису
            </div>
          </div>
          <div className="p-3 space-y-2 text-sm">
            <Link
              href="/sozdat-zayavku"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 hover:bg-brand/5 transition"
            >
              📝 <span className="font-medium">Создать заявку</span>
            </Link>
            <Link
              href="/stat-masterom"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 hover:bg-brand/5 transition"
            >
              🛠️ <span className="font-medium">Стать мастером</span>
            </Link>
            <Link
              href="/o-nas"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 hover:bg-brand/5 transition"
            >
              ❓ <span className="font-medium">Как это работает</span>
            </Link>

            {(SUPPORT_WHATSAPP || SUPPORT_TELEGRAM) && (
              <div className="pt-1 border-t border-slate-100 mt-1 space-y-2">
                {SUPPORT_WHATSAPP && (
                  <a
                    href={`https://wa.me/${SUPPORT_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-green-800 hover:bg-green-100 transition"
                  >
                    💬 <span className="font-medium">Написать в WhatsApp</span>
                  </a>
                )}
                {SUPPORT_TELEGRAM && (
                  <a
                    href={`https://t.me/${SUPPORT_TELEGRAM}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2.5 text-sky-800 hover:bg-sky-100 transition"
                  >
                    ✈️ <span className="font-medium">Telegram</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Поддержка"
        className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-xl hover:bg-brand-dark transition"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.7 2 11.3c0 2.5 1.3 4.7 3.4 6.2-.1.9-.5 2.2-1.3 3.3-.2.3 0 .7.4.6 1.9-.4 3.4-1.1 4.4-1.7 1 .2 2 .3 3.1.3 5.5 0 10-3.7 10-8.3S17.5 3 12 3z" />
          </svg>
        )}
      </button>
    </div>
  );
}
