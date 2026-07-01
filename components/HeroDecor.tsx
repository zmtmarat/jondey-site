'use client';

import { useEffect, useRef } from 'react';

// Декоративные 3D-инструменты в hero — живой разброс (не в линию): разные
// позиции, повороты, размеры; дальние слегка размыты/прозрачны для глубины.
// Покачивание + параллакс за мышью. Скрыто на мобиле (<lg), не мешает кликам.
type Tool = {
  src: string;
  pos: React.CSSProperties;
  size: number;
  speed: number;
  dur: number;
  rot: number;
  blur?: number;
  opacity?: number;
  flip?: boolean;
};

const B = '/images/decor';
const TOOLS: Tool[] = [
  // Левая сторона — разбросано по высоте и по горизонтали
  { src: `${B}/wrench.png`, pos: { top: '7%', left: '7%' }, size: 104, speed: 16, dur: 7, rot: -14 },
  { src: `${B}/roller.png`, pos: { top: '31%', left: '15%' }, size: 74, speed: -12, dur: 9, rot: 12, blur: 1.4, opacity: 0.75 },
  { src: `${B}/level.png`, pos: { top: '60%', left: '4%' }, size: 122, speed: 22, dur: 8, rot: -7 },
  { src: `${B}/hammer.png`, pos: { top: '46%', left: '17%' }, size: 66, speed: 10, dur: 8.5, rot: -22, blur: 1.6, opacity: 0.7 },
  { src: `${B}/screwdriver.png`, pos: { top: '80%', left: '13%' }, size: 84, speed: -14, dur: 6.5, rot: 20, flip: true },
  // Правая сторона
  { src: `${B}/drill.png`, pos: { top: '9%', right: '6%' }, size: 110, speed: -15, dur: 7.5, rot: 12 },
  { src: `${B}/screwdriver.png`, pos: { top: '58%', right: '4%' }, size: 104, speed: -12, dur: 6.5, rot: -16 },
  { src: `${B}/hammer.png`, pos: { top: '33%', right: '15%' }, size: 80, speed: 18, dur: 8.5, rot: -8, blur: 1, opacity: 0.8 },
  { src: `${B}/wrench.png`, pos: { top: '80%', right: '12%' }, size: 70, speed: 14, dur: 8, rot: 24, blur: 1.4, opacity: 0.72, flip: true },
  { src: `${B}/roller.png`, pos: { top: '20%', right: '16%' }, size: 66, speed: -10, dur: 9, rot: -18, blur: 1.2, opacity: 0.72 },
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
          style={{ ...t.pos, width: t.size, height: t.size, opacity: t.opacity ?? 1 }}
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
              style={{
                transform: `rotate(${t.rot}deg)${t.flip ? ' scaleX(-1)' : ''}`,
                filter: `drop-shadow(0 12px 22px rgba(0,0,0,0.10))${
                  t.blur ? ` blur(${t.blur}px)` : ''
                }`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
