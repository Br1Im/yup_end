const STEPS = [
  {
    n: "01",
    title: "Назови вершину",
    text: "Опиши цель словами — без анкет на час. Свободно говорить по-английски. Подтянуться 20 раз. Прочесть 12 книг по дизайну. Выйти из тревоги. Это и есть вершина.",
  },
  {
    n: "02",
    title: "AI прокладывает маршрут",
    text: "За пару минут — персональный путь на месяц вперёд. Конкретные шаги, лучшие источники, реалистичный темп. Никакого спама контентом ради контента.",
  },
  {
    n: "03",
    title: "Идёшь каждый день",
    text: "Утром — короткий список шагов на сегодня. Учитывает сон, рабочий ритм, вчерашнее состояние. Пропустил день — план мягко перестраивается, не ломается.",
  },
  {
    n: "04",
    title: "Берёшь вершину",
    text: "Чёткий ритм. Замеры. Видимый прогресс. И сразу — следующая, выше. YUP не отпускает тебя на плато.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-[color:var(--ink)] text-white scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-white/55">Маршрут</span>
            <h2 className="display mt-5 text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em] text-white">
              Четыре шага —
              <br />
              <span className="italic text-[color:var(--gold)]">
                и ты уже идёшь.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="text-white/60 text-base leading-relaxed">
              Никаких опросников на час и абстрактных «персонализаций». Ты
              называешь цель — система отвечает конкретным маршрутом и
              первым шагом, который можно сделать прямо сейчас.
            </p>
          </div>
        </div>

        <ol className="mt-20 grid md:grid-cols-2 gap-x-12 gap-y-16">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative pl-6 border-l border-white/15 hover:border-[color:var(--ember)]/80 transition-colors"
            >
              <div className="text-[0.72rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--ember)]">
                Шаг {s.n}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-white/65 leading-relaxed text-[0.97rem]">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
