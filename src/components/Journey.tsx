const CAMPS = [
  {
    n: "00",
    label: "База",
    title: "Старт",
    when: "День 1–7",
    text: "Цель названа. AI слушает, что ты хочешь, и выдаёт первую короткую тропу — на 7 дней. Лёгкий вход, чтобы поверить в темп.",
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
    text: "Привычки уже стоят. Появляются результаты — слова, форма, ясность в голове. Дальше — последний рывок к гребню.",
  },
  {
    n: "III",
    label: "Вершина",
    title: "Summit",
    when: "Год+",
    text: "Цель взята. Видно, как далеко ушёл. YUP перестаёт быть наставником и становится напарником в следующем восхождении.",
  },
];

export function Journey() {
  return (
    <section
      id="journey"
      className="relative bg-[color:var(--stone-1)] text-white scroll-mt-20 overflow-hidden"
    >
      {/* subtle topographic line texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        aria-hidden
      >
        <defs>
          <pattern
            id="topo"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 30 Q15 10 30 30 T60 30" stroke="#d6603d" strokeWidth="0.6" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-white/55">Восхождение</span>
            <h2 className="display mt-5 text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em] text-white">
              От базы
              <br />
              <span className="italic text-[color:var(--gold)]">
                до твоей вершины.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="text-white/60 text-base leading-relaxed">
              Восхождение — не марафон выходного дня. Это тихая система,
              которая держит тебя в движении, когда мотивация
              заканчивается. А она всегда заканчивается.
            </p>
          </div>
        </div>

        {/* Trail visualization */}
        <div className="mt-20 relative">
          {/* vertical trail spine on desktop is implicit via cards staircase */}
          <ol className="grid md:grid-cols-4 gap-px bg-white/10">
            {CAMPS.map((c, i) => (
              <li
                key={c.n}
                className="relative bg-[color:var(--stone-1)] p-7 md:p-8 group hover:bg-[color:var(--stone-2)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--ember)] font-semibold">
                    {c.label}
                  </span>
                  <span className="hairline-dotted flex-1 opacity-60" />
                </div>

                <div className="mt-7 flex items-baseline gap-3">
                  <span
                    className="display text-5xl text-white/30"
                    aria-hidden
                  >
                    {c.n}
                  </span>
                  <h3 className="display text-3xl text-white tracking-tight">
                    {c.title}
                  </h3>
                </div>

                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45 font-semibold">
                  {c.when}
                </div>

                <p className="mt-4 text-white/65 leading-relaxed text-[0.95rem]">
                  {c.text}
                </p>

                {/* Connector dot at top-left for visual rhythm */}
                <span
                  className="absolute -top-1.5 left-7 size-3 rounded-full bg-[color:var(--ember)] shadow-[0_0_0_4px_rgba(214,96,61,0.18)]"
                  style={{
                    transform: `translateY(${i * -2}px)`,
                  }}
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
