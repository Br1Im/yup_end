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
    a: "Минимум — 20 минут. Можно час, можно три. AI считает твоё реальное расписание. Главное — каждый день, а не один раз героически.",
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
    <section id="faq" className="relative bg-[color:var(--bg)] scroll-mt-20 text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">FAQ</span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9vw,8rem)] leading-[0.86]">
          <span className="block">ЧАСТО</span>
          <span className="block text-[color:var(--lime)]">СПРАШИВАЮТ.</span>
        </h2>

        <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
          Если ответа нет — пиши на почту:
          <a
            className="text-[color:var(--lime)] hover:underline ml-1"
            href="mailto:hi@yup.app"
          >
            hi@yup.app
          </a>
        </p>

        <ul className="mt-14 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {ITEMS.map((it) => (
            <li key={it.q}>
              <details className="group py-7">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="display text-lg md:text-2xl text-white group-open:text-[color:var(--lime)] transition-colors">
                    {it.q}
                  </span>
                  <span className="mt-1 size-9 shrink-0 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/50 transition-transform group-open:rotate-45 group-open:border-[color:var(--lime)] group-open:text-[color:var(--lime)]">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-white/65 leading-relaxed pr-10 max-w-3xl">
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
