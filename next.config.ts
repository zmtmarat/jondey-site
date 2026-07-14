import type { NextConfig } from "next";

// Разрешённые внешние источники (Supabase, Yandex Metrica, Vercel).
const SUPABASE = "https://*.supabase.co";
const SUPABASE_WS = "wss://*.supabase.co";
const YM = "https://mc.yandex.ru https://mc.yandex.com https://yastatic.net";
const VERCEL =
  "https://vitals.vercel-insights.com https://*.vercel-scripts.com https://vercel.live";
// Flutter web (PWA на /app) — CanvasKit c gstatic, карта/адрес — OSM/Nominatim.
const GSTATIC = "https://www.gstatic.com https://fonts.gstatic.com";
const OSM =
  "https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org";

// Content-Security-Policy: script/style с 'unsafe-inline', чтобы не сломать
// Next и Яндекс.Метрику, но с жёсткими остальными директивами (никаких фреймов,
// object-src none, form-action self). frame-ancestors 'none' = защита от
// встраивания/кликджекинга и «зеркалирования» в iframe.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${YM} ${VERCEL} ${GSTATIC}`,
  `connect-src 'self' ${SUPABASE} ${SUPABASE_WS} ${YM} ${VERCEL} ${GSTATIC} ${OSM}`,
  "frame-src 'self' https://mc.yandex.ru",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // прячем X-Powered-By: Next.js
  compress: true,
  productionBrowserSourceMaps: false, // не отдаём source-maps (сложнее читать код)
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    // Веб-приложение (Flutter PWA) лежит в public/app; отдаём index.html по /app.
    return [{ source: "/app", destination: "/app/index.html" }];
  },
  async redirects() {
    // Направление «Доставка» убрано с витрины (отдельная тема, не конкурируем
    // с Яндексом). Старый URL и его подстраницы 301 → на главную, чтобы не
    // терять уже проиндексированные ссылки и не отдавать 404.
    return [
      { source: "/dostavka", destination: "/", permanent: true },
      { source: "/dostavka/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
