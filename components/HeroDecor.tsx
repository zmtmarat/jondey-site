'use client';

import { useEffect, useRef } from 'react';

// Декоративные 3D-инструменты в пустых зонах hero. Лёгкое покачивание +
// параллакс за мышью. Скрыто на мобиле (<lg), не мешает кликам.
type Tool = {
  src: string;
  pos: React.CSSProperties;
  size: number;
  speed: number; // сила реакции на мышь
  dur: number; // длительность покачивания, с
};

const TOOLS: Tool[] = [
  { src: '/images/decor/wrench.png', pos: { top: '10%', left: '2%' }, size: 104, speed: 16, dur: 7 },
  { src: '/images/decor/roller.png', pos: { top: '45%', left: '5%' }, size: 96, speed: -20, dur: 9 },
  { src: '/images/decor/level.png', pos: { top: '70%', left: '3%' }, size: 118, speed: 22, dur: 8 },
  { src: '/images/decor/drill.png', pos: { top: '13%', right: '3%' }, size: 110, speed: -15, dur: 7.5 },
  { src: '/images/decor/hammer.png', pos: { top: '47%', right: '5%' }, size: 96, speed: 24, dur: 8.5 },
  { src: '/images/decor/screwdriver.png', pos: { top: '68%', right: '2%' }, size: 106, speed: -12, dur: 6.5 },
];

export default function HeroDecor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-speed]'));
    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      for (const it of items) {
        const s = Number(it.dataset.speed || 0);
        it.style.setProperty('--px', `${((e.clientX - cx) / cx) * s}px`);
        it.style.setProperty('--py', `${((e.clientY - cy) / cy) * s}px`);
      }
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden lg:block pointer-events-none absolute inset-0 z-0"
    >
      {TOOLS.map((t, i) => (
        <div
          key={i}
          data-speed={t.speed}
          className="decor-parallax absolute"
          style={{ ...t.pos, width: t.size, height: t.size }}
        >
          <div
            className="decor-float h-full w-full"
            style={{ animationDuration: `${t.dur}s` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.src}
              alt=""
              className="h-full w-full object-contain"
              style={{ filter: 'drop-shadow(0 12px 22px rgba(0,0,0,0.10))' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
