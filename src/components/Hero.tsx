import { Mountain } from "./Mountain";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex flex-col"
      style={{ isolation: "isolate" }}
    >
      {/* Mountain backdrop, anchored at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] -z-10">
        <Mountain className="w-full h-full block" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[color:var(--background)] via-[color:var(--background)]/70 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 md:pt-28 flex-1 flex flex-col">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-[color:var(--muted)] bg-[color:var(--background)]/85 border border-[color:var(--line)] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[color:var(--peach)]" />
            один план — все сферы роста
          </span>

          <h1 className="serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[color:var(--foreground)]">
            Восхождение
            <br />к лучшей версии
            <br />
            <span className="italic text-[color:var(--sage-deep)]">себя.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[color:var(--muted)] max-w-xl leading-relaxed">
            <span className="pixel text-[color:var(--foreground)]">YUP</span> —
            тёплая платформа для саморазвития. AI собирает персональную тропу
            из всего: язык, тело, знания, привычки, психология. Ты идёшь шаг
            за шагом — без выгорания.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#waitlist" className="btn-primary">
              Начать восхождение
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#how" className="btn-ghost">
              Как это работает
            </a>
          </div>
        </div>

        {/* Stats anchored near bottom of hero, on top of meadow */}
        <div className="mt-auto pt-16 pb-10">
          <div className="inline-flex items-center gap-8 text-sm text-[color:var(--muted)] bg-[color:var(--background)]/75 backdrop-blur-sm border border-[color:var(--line)] rounded-2xl px-6 py-4">
            <Stat value="5 сфер" label="в одном плане" />
            <span className="w-px h-8 bg-[color:var(--line)]" />
            <Stat value="15 мин" label="в день — и ты идёшь" />
            <span className="w-px h-8 bg-[color:var(--line)]" />
            <Stat value="∞" label="скорость — твоя" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-0.5">
      <div className="serif text-xl text-[color:var(--foreground)]">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}
