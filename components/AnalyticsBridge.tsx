'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Единая точка отправки событий. Любой элемент с data-jd-event="имя"
 * при клике отправляет событие в Vercel Analytics и (если подключена)
 * в Яндекс.Метрику как reachGoal. Персональные данные не передаются —
 * только имя события.
 */
type YmFn = (id: number, action: string, goal: string) => void;

declare global {
  interface Window {
    ym?: YmFn;
  }
}

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 0;

export default function AnalyticsBridge() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-jd-event]',
      );
      const name = el?.dataset.jdEvent;
      if (!name) return;
      try {
        track(name);
      } catch {
        /* аналитика не должна ломать интерфейс */
      }
      try {
        if (YM_ID && typeof window.ym === 'function') {
          window.ym(YM_ID, 'reachGoal', name);
        }
      } catch {
        /* no-op */
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
