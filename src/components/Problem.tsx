export function Problem() {
  return (
    <section id="why" className="relative bg-[color:var(--bg)] text-white">
      {/* Massive billboard */}
      <div className="relative mx-auto max-w-7xl px-6 pt-28 md:pt-40 pb-20">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">
            Почему саморазвитие проваливается
          </span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9.5vw,9rem)] leading-[0.86]">
          <span className="block">ДЕСЯТЬ ПРИЛОЖЕНИЙ.</span>
          <span className="block text-[color:var(--lime)]">
            НИ ОДНОЙ ВЕРШИНЫ.
          </span>
        </h2>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <p className="md:col-span-6 md:col-start-1 text-white/70 leading-relaxed">
            Языки в одном, тренировки во втором, заметки в третьем, медитация
            в четвёртом. Каждое требует тебя целиком. Каждое тянет в свою
            сторону. Ни одно не знает, что у тебя 24 часа в сутках и сегодня
            ты вымотан.
          </p>
          <p className="md:col-span-5 md:col-start-8 text-white/85 leading-relaxed">
            YUP смотрит на цель, не на трекер. Один маршрут. Один план на
            день. Один вектор —{" "}
            <span className="text-[color:var(--lime)] font-semibold">вверх</span>.
          </p>
        </div>

        {/* 3 problem cards */}
        <ul className="mt-20 grid md:grid-cols-3 gap-px bg-[color:var(--line)]">
          <PCard
            n="01"
            t="Распыление"
            d="5+ инструментов, ни одной завершённой цели. YUP объединяет всё в один маршрут."
          />
          <PCard
            n="02"
            t="Перегруз"
            d="План на 3 часа в день. Ты сдаёшься на третий. YUP считает реальную загрузку."
          />
          <PCard
            n="03"
            t="Тишина"
            d="Никто не замечает, что ты двигаешься. Кроме тебя. YUP видит и подстраивает темп."
          />
        </ul>
      </div>
    </section>
  );
}

function PCard({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <li className="group bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-8 transition-colors">
      <div className="flex items-start justify-between">
        <span className="display text-2xl text-[color:var(--lime)]">{n}</span>
        <span className="size-8 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/40 group-hover:text-[color:var(--lime)] group-hover:border-[color:var(--lime)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H8M17 7v9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <h3 className="display mt-10 text-2xl">{t}</h3>
      <p className="mt-4 text-sm text-white/60 leading-relaxed">{d}</p>
    </li>
  );
}
