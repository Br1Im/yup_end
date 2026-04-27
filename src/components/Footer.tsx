export function Footer() {
  return (
    <footer className="relative bg-[color:var(--ink)] text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold tracking-[0.18em]">
                YUP
              </span>
              <span className="text-[0.7rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
                путь к вершине
              </span>
            </div>
            <p className="display mt-8 text-3xl md:text-5xl text-white max-w-xl leading-[1.0] tracking-[-0.02em]">
              «Гора не ждёт.
              <br />
              <span className="italic text-[color:var(--ember)]">
                Она просто стоит.
              </span>
              »
            </p>
            <p className="mt-6 text-white/55 max-w-md text-sm leading-relaxed">
              YUP — серьёзный инструмент саморазвития для тех, кто
              устал распыляться. Один маршрут. Один шаг в день. Одна
              вершина за раз.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[0.7rem] tracking-[0.22em] uppercase text-white/40 font-semibold">
              Маршрут
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a href="#how" className="hover:text-white transition-colors">
                  Как устроен маршрут
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  className="hover:text-white transition-colors"
                >
                  Сферы роста
                </a>
              </li>
              <li>
                <a
                  href="#journey"
                  className="hover:text-white transition-colors"
                >
                  Восхождение
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Вопросы
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[0.7rem] tracking-[0.22em] uppercase text-white/40 font-semibold">
              Связь
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href="mailto:hi@yup.app"
                  className="hover:text-white transition-colors"
                >
                  hi@yup.app
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="hover:text-white transition-colors"
                >
                  Записаться в первую волну
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/40">
          <span>© {new Date().getFullYear()} YUP. Иди до конца.</span>
          <span className="tracking-[0.18em] uppercase">
            Made for the climb
          </span>
        </div>
      </div>
    </footer>
  );
}
