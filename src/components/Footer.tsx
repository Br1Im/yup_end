export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="pixel text-base text-[color:var(--foreground)]">
              YUP
            </span>
            <span className="text-xs text-[color:var(--muted)]">
              спокойное саморазвитие
            </span>
          </div>
          <p className="mt-3 text-sm text-[color:var(--muted)] max-w-xs">
            Восхождение к лучшей версии себя — по тёплой летней тропе, не по
            гонке.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-sm text-[color:var(--muted)]">
          <a href="#how" className="hover:text-[color:var(--foreground)] transition-colors">
            Как это работает
          </a>
          <a href="#domains" className="hover:text-[color:var(--foreground)] transition-colors">
            Сферы
          </a>
          <a href="#journey" className="hover:text-[color:var(--foreground)] transition-colors">
            Путь
          </a>
          <a href="#faq" className="hover:text-[color:var(--foreground)] transition-colors">
            Вопросы
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-[color:var(--muted)]">
        © {new Date().getFullYear()} YUP. Сделано с теплом, берёзой и горой.
      </div>
    </footer>
  );
}
