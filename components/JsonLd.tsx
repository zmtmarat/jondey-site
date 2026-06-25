// Встраивает структурированные данные Schema.org (JSON-LD) для богатых
// сниппетов Google. Рендерится на сервере, в <head>/<body> — без гидрации.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Данные формируются на сервере из доверенных источников.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
