import { Languages, Activity, BookOpen, Compass, Brain } from "lucide-react";

const DOMAINS = [
  {
    icon: Languages,
    title: "Язык",
    text: "Английский, испанский, немецкий. Свободно говорить, а не сидеть в грамматике. Слова, разговор, погружение.",
  },
  {
    icon: Activity,
    title: "Тело",
    text: "Сила, выносливость, форма. Тренировки подстраиваются под сон и восстановление. Нагрузка растёт, не ломает.",
  },
  {
    icon: BookOpen,
    title: "Знания",
    text: "Книги, курсы, статьи — отобраны под цель. 20–30 минут в день. Заметки, повторения, реальное применение.",
  },
  {
    icon: Compass,
    title: "Привычки",
    text: "Маленькие, ежедневные, без агрессивных стриков. Сорвался — план перестраивается, а не разрушается.",
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
      className="relative bg-[color:var(--bg)] scroll-mt-20 text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">Сферы роста</span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9vw,8.5rem)] leading-[0.86]">
          <span className="block">ПЯТЬ СФЕР.</span>
          <span className="block text-[color:var(--lime)]">ОДИН ЧЕЛОВЕК.</span>
        </h2>

        <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
          YUP не привязывает тебя к одной нише. Можно идти параллельно по
          нескольким сферам — план учтёт, что у тебя один день и одна голова.
        </p>

        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--line)]">
          {DOMAINS.map((d) => (
            <li
              key={d.title}
              className="relative bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-7 group transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white group-hover:border-[color:var(--lime)] group-hover:text-[color:var(--lime)] transition-colors">
                  <d.icon className="size-[18px]" strokeWidth={1.7} />
                </div>
                <span className="text-[0.66rem] tracking-[0.22em] uppercase text-white/35 font-semibold">
                  / 0{DOMAINS.indexOf(d) + 1}
                </span>
              </div>
              <h3 className="display mt-8 text-2xl text-white">{d.title}</h3>
              <p className="mt-3 text-white/55 leading-relaxed text-[0.9rem]">
                {d.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
