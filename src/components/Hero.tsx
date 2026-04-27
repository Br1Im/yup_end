import { Mountain } from "./Mountain";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[color:var(--stone-1)] text-white min-h-[100svh] flex flex-col"
      style={{ isolation: "isolate" }}
    >
      {/* Mountain backdrop fills the section */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Mountain className="w-full h-full block" />
      </div>

      {/* Top vignette — keep nav legible */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--stone-1)]/95 to-transparent -z-10" />
      {/* Bottom hand-off into paper section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--paper)] -z-10" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 md:pt-44 flex-1 flex flex-col">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-white/60">
            <span className="size-1.5 rounded-full bg-[color:var(--ember)]" />
            <span className="mono-tag">путь · цель · вершина</span>
          </div>

          <h1 className="display mt-8 text-[3.4rem] sm:text-[4.4rem] md:text-[6rem] leading-[0.95] tracking-[-0.025em]">
            Подняться выше
            <br />
            <span className="italic text-[color:var(--gold)]">
              — это решение,
            </span>
            <br />
            не настроение.
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            YUP собирает один маршрут на все сферы роста — язык, тело,
            знания, привычки, голову. Без распыления, без бесконечного
            «начну с понедельника». Только цель, маршрут и шаг, который
            нужно сделать сегодня.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#waitlist" className="btn-ember">
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
                aria-hidden
              >
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
            <a href="#how" className="btn-ghost-light">
              Как устроен маршрут
            </a>
          </div>
        </div>

        {/* Bottom corner stat strip */}
        <div className="mt-auto pt-20 pb-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-10">
          <Pillar
            number="01"
            title="Одна цель"
            text="Всё, что не ведёт к ней — в сторону."
          />
          <Pillar
            number="02"
            title="Один маршрут"
            text="AI собирает путь под твою жизнь, а не наоборот."
          />
          <Pillar
            number="03"
            title="Один шаг в день"
            text="Не марафон по выходным — ежедневная дисциплина."
          />
          <Pillar
            number="04"
            title="Одна вершина"
            text="И сразу следующая. Останавливаться нельзя."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-white/15 pt-4 max-w-[18rem]">
      <div className="text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--ember)] font-semibold">
        {number}
      </div>
      <div className="mt-3 text-base font-semibold text-white">{title}</div>
      <div className="mt-1.5 text-sm text-white/55 leading-relaxed">{text}</div>
    </div>
  );
}
