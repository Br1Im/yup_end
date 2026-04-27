const STEPS = [
  {
    n: "01",
    title: "Назови вершину",
    text: "Опиши цель словами — без анкет на час. Говорить по-английски. Подтянуться 20 раз. Прочесть 12 книг. Выйти из тревоги. Это и есть вершина.",
  },
  {
    n: "02",
    title: "AI прокладывает маршрут",
    text: "За пару минут — персональный путь на месяц вперёд. Конкретные шаги, лучшие источники, реалистичный темп. Никакого спама контентом ради контента.",
  },
  {
    n: "03",
    title: "Идёшь каждый день",
    text: "Утром — список шагов на сегодня. Учитывает сон, ритм, вчерашнее состояние. Пропустил день — план перестраивается, не ломается.",
  },
  {
    n: "04",
    title: "Берёшь вершину",
    text: "Чёткий ритм. Замеры. Видимый прогресс. И сразу — следующая, выше. YUP не оставляет тебя на плато.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-[color:var(--bg-2)] text-white scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">Как устроен маршрут</span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9vw,8.5rem)] leading-[0.86]">
          <span className="block">ЧЕТЫРЕ ШАГА.</span>
          <span className="block text-[color:var(--lime)]">И ТЫ УЖЕ ИДЁШЬ.</span>
        </h2>

        <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
          Никаких опросников на час и абстрактных «персонализаций». Ты
          называешь цель — система отвечает конкретным маршрутом и первым
          шагом, который можно сделать прямо сейчас.
        </p>

        <ol className="mt-20 grid md:grid-cols-2 gap-x-px gap-y-px bg-[color:var(--line)]">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="group relative bg-[color:var(--bg)] hover:bg-[color:var(--bg-3)] p-8 md:p-10 transition-colors"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="display text-5xl md:text-6xl text-white/80 group-hover:text-[color:var(--lime)] transition-colors">
                  {s.n}
                </span>
                <span className="size-9 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/40 group-hover:text-[color:var(--lime)] group-hover:border-[color:var(--lime)] transition-colors mt-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="display mt-12 text-2xl md:text-3xl text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed text-sm md:text-base max-w-md">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
