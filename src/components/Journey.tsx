const CAMPS = [
  {
    name: "Базовый лагерь",
    sub: "Первая неделя",
    body: "Знакомство. AI слушает, что ты хочешь, и предлагает первую короткую тропу — на 7 дней.",
  },
  {
    name: "Тропа",
    sub: "1–3 месяц",
    body: "Ритм каждого дня. План адаптируется под жизнь — командировки, болезнь, отпуск.",
  },
  {
    name: "Плечо",
    sub: "3–6 месяц",
    body: "Привычки уже стоят. Появляются результаты — слова свободнее, тело сильнее, голова тише.",
  },
  {
    name: "Вершина",
    sub: "Год и дальше",
    body: "Ты идёшь сам. YUP больше как проводник, чем как наставник. Видишь, как далеко ушёл.",
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative bg-[color:var(--background-deep)]/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--peach-deep)]">
            Путь
          </p>
          <h2 className="serif mt-4 text-4xl md:text-5xl leading-tight text-[color:var(--foreground)]">
            От базового лагеря —
            <br />к своей вершине.
          </h2>
        </div>

        {/* Trail visualization */}
        <div className="relative mt-20">
          {/* Dashed trail line */}
          <svg
            className="absolute inset-x-0 top-6 hidden md:block"
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "80px" }}
            aria-hidden
          >
            <path
              d="M 50 70 C 200 70, 250 30, 380 30 S 600 70, 720 40 S 900 10, 970 10"
              stroke="var(--peach-deep)"
              strokeWidth="2"
              strokeDasharray="2 6"
              fill="none"
              opacity="0.7"
            />
          </svg>

          <ol className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            {CAMPS.map((c, i) => (
              <li key={c.name} className="relative">
                <div
                  className="size-3.5 rounded-full bg-[color:var(--peach-deep)] ring-4 ring-[color:var(--background-deep)] mx-auto md:mx-0"
                  style={{
                    transform:
                      i === 0
                        ? "translateY(54px)"
                        : i === 1
                          ? "translateY(14px)"
                          : i === 2
                            ? "translateY(34px)"
                            : "translateY(-6px)",
                  }}
                />
                <div className="mt-6 text-center md:text-left">
                  <div className="pixel text-[10px] text-[color:var(--peach-deep)] uppercase">
                    {c.sub}
                  </div>
                  <h3 className="serif mt-2 text-2xl text-[color:var(--foreground)]">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[color:var(--muted)] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
