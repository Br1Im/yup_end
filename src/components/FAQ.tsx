const ITEMS = [
  {
    q: "Это очередная подписка на «успех»?",
    a: "Нет. YUP не продаёт мотивацию. Мы строим спокойный план, который ты можешь поддерживать годами — без догмы и стриков.",
  },
  {
    q: "Где берётся контент — вы делаете курсы?",
    a: "Нет. AI собирает план из лучших уже существующих ресурсов: книги, курсы, видео, статьи. Ты не платишь за дублирование — платишь за маршрут.",
  },
  {
    q: "Что если я пропущу день или неделю?",
    a: "План мягко сдвигается. Никаких потерянных стриков, никаких уведомлений в стиле «ты подвёл сову». Ты возвращаешься — мы продолжаем.",
  },
  {
    q: "Сколько времени в день нужно?",
    a: "Минимум — 15 минут. Можно час, можно три. AI уважает твоё расписание и не забивает день под завязку.",
  },
  {
    q: "Когда будет доступен?",
    a: "Сейчас работаем над первой версией. Запись в waitlist выше — позовём в первую волну, без спама.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--peach-deep)] text-center">
          Вопросы
        </p>
        <h2 className="serif mt-4 text-4xl md:text-5xl leading-tight text-[color:var(--foreground)] text-center">
          Часто спрашивают.
        </h2>

        <ul className="mt-14 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {ITEMS.map((it) => (
            <li key={it.q}>
              <details className="group py-6">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="serif text-xl text-[color:var(--foreground)]">
                    {it.q}
                  </span>
                  <span className="mt-1 size-6 shrink-0 rounded-full border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] transition-transform group-open:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-[color:var(--muted)] leading-relaxed pr-10">
                  {it.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
