export function Problem() {
  return (
    <section className="relative bg-[color:var(--paper)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <span className="eyebrow">Почему саморазвитие проваливается</span>
            <h2 className="display mt-5 text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em] text-[color:var(--ink)]">
              Десять приложений.
              <br />
              <span className="italic text-[color:var(--ember)]">
                Ни одной вершины.
              </span>
            </h2>
          </div>

          <div className="md:col-span-6 md:pt-3">
            <p className="text-base md:text-lg text-[color:var(--ink-2)] leading-relaxed">
              Языки в одном, тренировки во втором, заметки в третьем,
              медитация в четвёртом. Каждое приложение требует тебя
              целиком. Каждое тянет в свою сторону. Ни одно не знает,
              что у тебя 24 часа в сутках и сегодня ты вымотан.
            </p>
            <p className="mt-5 text-base md:text-lg text-[color:var(--ink-2)] leading-relaxed">
              YUP смотрит на цель, не на трекер. Один маршрут.
              Один план на день. Один вектор — вверх.
            </p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-[color:var(--line)]/70">
          <Pain
            n="01"
            title="Распыление"
            text="5+ инструментов, ни одной завершённой цели. YUP объединяет всё в один маршрут."
          />
          <Pain
            n="02"
            title="Перегруз"
            text="План на 3 часа в день. Ты сдаёшься на третий. YUP считает твою реальную загрузку."
          />
          <Pain
            n="03"
            title="Без обратной связи"
            text="Никто не замечает, что ты двигаешься. Кроме тебя. YUP видит и подстраивает темп."
          />
        </div>
      </div>
    </section>
  );
}

function Pain({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="bg-[color:var(--paper)] p-8">
      <div className="flex items-baseline gap-3">
        <span className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--ember)]">
          {n}
        </span>
        <span className="hairline-dotted flex-1" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[color:var(--ink)]">
        {title}
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed text-[0.95rem]">
        {text}
      </p>
    </div>
  );
}
