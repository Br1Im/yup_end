const ITEMS = [
  {
    q: "Это очередная подписка на «успех»?",
    a: "Нет. YUP не продаёт мотивацию и не раздаёт значки. Это инструмент дисциплины: чёткий маршрут, ежедневный шаг, видимый прогресс. Хочешь идти — идёшь. Не хочешь — никто не спасёт.",
  },
  {
    q: "Где берётся контент — вы делаете свои курсы?",
    a: "Нет. AI собирает маршрут из уже существующих лучших ресурсов: книги, курсы, видео, статьи, тренировки. Ты платишь не за контент — за маршрут.",
  },
  {
    q: "Что если я пропущу день или неделю?",
    a: "План перестраивается. Никаких сожжённых стриков и токсичных уведомлений. Возвращаешься — продолжаешь с точки, где темп тебе по силам сегодня.",
  },
  {
    q: "Сколько времени в день нужно?",
    a: "Минимум — 20 минут. Можно час, можно три. AI считает твоё реальное расписание и не забивает день под завязку. Главное — каждый день, а не один раз героически.",
  },
  {
    q: "Это подходит и парням, и девушкам?",
    a: "Да. YUP не про «успешный успех» и не про мягкие аффирмации. Это про цель и путь к ней — одинаково для всех, кто хочет дойти.",
  },
  {
    q: "Когда будет доступен?",
    a: "Работаем над первой версией. Запись в waitlist выше — позовём первой волной, без рассылок и распродаж.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative bg-[color:var(--paper)] scroll-mt-20"
    >
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">Вопросы</span>
            <h2 className="display mt-5 text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em] text-[color:var(--ink)]">
              Часто спрашивают.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[color:var(--muted)] text-base leading-relaxed">
              Если ответа здесь нет — можно написать прямо в почту:
              <a
                className="text-[color:var(--ember)] hover:underline ml-1"
                href="mailto:hi@yup.app"
              >
                hi@yup.app
              </a>
            </p>
          </div>
        </div>

        <ul className="mt-14 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {ITEMS.map((it) => (
            <li key={it.q}>
              <details className="group py-6">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="text-lg md:text-xl font-medium text-[color:var(--ink)] group-open:text-[color:var(--ember)] transition-colors">
                    {it.q}
                  </span>
                  <span className="mt-1 size-7 shrink-0 rounded-md border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] transition-transform group-open:rotate-45 group-open:border-[color:var(--ember)] group-open:text-[color:var(--ember)]">
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
                <p className="mt-4 text-[color:var(--muted)] leading-relaxed pr-10 max-w-2xl">
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
