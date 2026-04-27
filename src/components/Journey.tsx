const CAMPS = [
  {
    n: "00",
    label: "База",
    title: "Старт",
    when: "День 1–7",
    text: "Цель названа. AI выдаёт первую тропу — на 7 дней. Лёгкий вход, чтобы поверить в темп.",
  },
  {
    n: "I",
    label: "Лагерь",
    title: "Маршрут",
    when: "1–3 месяц",
    text: "Ритм каждого дня. План адаптируется под жизнь — командировки, болезнь, сорванный сон. Главное — не остановиться.",
  },
  {
    n: "II",
    label: "Лагерь",
    title: "Плечо",
    when: "3–6 месяц",
    text: "Привычки стоят. Появляются результаты — слова, форма, ясность. Дальше — последний рывок к гребню.",
  },
  {
    n: "III",
    label: "Вершина",
    title: "Summit",
    when: "Год+",
    text: "Цель взята. Видно, как далеко ушёл. YUP становится напарником в следующем восхождении.",
  },
];

export function Journey() {
  return (
    <section
      id="journey"
      className="relative bg-[color:var(--bg-2)] text-white scroll-mt-20 overflow-hidden"
    >
      {/* topographic faint pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden
      >
        <defs>
          <pattern id="topo" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M0 30 Q15 10 30 30 T60 30"
              stroke="#cdff3d"
              strokeWidth="0.7"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">Восхождение</span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9vw,8.5rem)] leading-[0.86]">
          <span className="block">ОТ БАЗЫ —</span>
          <span className="block text-[color:var(--lime)]">ДО ВЕРШИНЫ.</span>
        </h2>

        <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
          Восхождение — не марафон выходного дня. Это система, которая держит
          тебя в движении, когда мотивация заканчивается. А она всегда
          заканчивается.
        </p>

        <ol className="mt-20 grid md:grid-cols-4 gap-px bg-[color:var(--line)]">
          {CAMPS.map((c, i) => (
            <li
              key={c.n}
              className="relative bg-[color:var(--bg)] p-7 md:p-8 group hover:bg-[color:var(--bg-3)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--lime)] font-semibold">
                  {c.label}
                </span>
                <span className="flex-1 h-px bg-[color:var(--line)]" />
              </div>

              <div className="mt-7 flex items-baseline gap-3">
                <span className="display text-5xl text-white/25">{c.n}</span>
                <h3 className="display text-2xl md:text-3xl text-white">
                  {c.title}
                </h3>
              </div>

              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/40 font-semibold">
                {c.when}
              </div>

              <p className="mt-4 text-white/60 leading-relaxed text-[0.92rem]">
                {c.text}
              </p>

              <span
                className="absolute -top-1.5 left-7 size-3 rounded-full bg-[color:var(--lime)] shadow-[0_0_0_4px_rgba(205,255,61,0.18),0_0_18px_rgba(205,255,61,0.6)]"
                style={{ transform: `translateY(${i * -2}px)` }}
                aria-hidden
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
