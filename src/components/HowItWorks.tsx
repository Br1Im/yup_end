const STEPS = [
  {
    n: "01",
    title: "Скажи, куда идёшь",
    body: "Опиши цель словами — без анкет на час. Хочешь свободно говорить по-английски, набрать форму, прочесть 12 книг, успокоить голову.",
  },
  {
    n: "02",
    title: "AI собирает тропу",
    body: "За пару минут — персональный маршрут на месяц. Из лучших ресурсов: курсы, книги, практики, видео. Никакого спама контентом.",
  },
  {
    n: "03",
    title: "Идёшь по 15 минут в день",
    body: "Каждое утро — короткий список шагов на сегодня. Учитывает сон, занятость, вчерашнее настроение. Один день пропустил — план мягко сдвигается.",
  },
  {
    n: "04",
    title: "Видишь, как растёшь",
    body: "Карта прогресса как горная тропа. Базовый лагерь → плечо → вершина. Спокойно, наглядно, без серий-стриков и давления.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-[color:var(--background-deep)]/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage-deep)]">
            Маршрут
          </p>
          <h2 className="serif mt-4 text-4xl md:text-5xl leading-tight text-[color:var(--foreground)]">
            Четыре шага —
            <br />
            и ты уже в пути.
          </h2>
        </div>

        <ol className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-12">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative pl-16 border-l border-[color:var(--line)]"
            >
              <span
                className="absolute -left-[1px] top-0 pixel text-xs text-[color:var(--peach-deep)] bg-[color:var(--background-deep)] px-2 py-1"
                style={{ transform: "translateX(-50%)" }}
              >
                {s.n}
              </span>
              <h3 className="serif text-2xl text-[color:var(--foreground)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
