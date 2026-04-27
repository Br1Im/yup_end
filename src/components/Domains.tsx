import { Languages, Activity, BookOpen, Compass, Brain } from "lucide-react";

const DOMAINS = [
  {
    icon: Languages,
    title: "Язык",
    text: "Английский, испанский, немецкий. Цель — свободно говорить, не сидеть в гранках. Маршрут чередует слова, разговор, погружение.",
  },
  {
    icon: Activity,
    title: "Тело",
    text: "Сила, выносливость, форма. Тренировки подстраиваются под неделю, сон и восстановление. Нагрузка растёт, но не ломает.",
  },
  {
    icon: BookOpen,
    title: "Знания",
    text: "Книги, курсы, статьи — отобраны под цель. По 20–30 минут в день. Заметки, повторения, реальное применение.",
  },
  {
    icon: Compass,
    title: "Привычки",
    text: "Маленькие, ежедневные, без агрессивных стриков. Сорвался — план не разрушается, а перестраивается под текущее состояние.",
  },
  {
    icon: Brain,
    title: "Голова",
    text: "Дыхание, рефлексия, медитация. Не ради галочки — как способ снять напряжение и держать фокус на цели.",
  },
];

export function Domains() {
  return (
    <section
      id="domains"
      className="relative bg-[color:var(--paper)] scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="max-w-3xl">
          <span className="eyebrow">Сферы роста</span>
          <h2 className="display mt-5 text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em] text-[color:var(--ink)]">
            Пять сфер.
            <br />
            <span className="italic text-[color:var(--ember)]">
              Один человек.
            </span>
          </h2>
          <p className="mt-6 text-[color:var(--ink-2)] text-base md:text-lg max-w-2xl leading-relaxed">
            YUP не привязывает тебя к одной нише. Можно идти параллельно
            по нескольким сферам — план учтёт, что у тебя один день и
            одна голова.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--line)]/60">
          {DOMAINS.map((d) => (
            <li
              key={d.title}
              className="relative bg-[color:var(--paper)] p-8 group hover:bg-[color:var(--paper-soft)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-md border border-[color:var(--line)] flex items-center justify-center text-[color:var(--ink)] group-hover:border-[color:var(--ember)] group-hover:text-[color:var(--ember)] transition-colors">
                  <d.icon className="size-[18px]" strokeWidth={1.6} />
                </div>
                <span className="text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--muted)] font-semibold">
                  Сфера
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-tight text-[color:var(--ink)]">
                {d.title}
              </h3>
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed text-[0.95rem]">
                {d.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
