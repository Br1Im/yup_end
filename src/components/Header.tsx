import Link from "next/link";

const NAV = [
  { href: "#how", label: "Как это работает" },
  { href: "#domains", label: "Сферы" },
  { href: "#journey", label: "Путь" },
  { href: "#faq", label: "Вопросы" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--background)]/70 border-b border-[color:var(--line)]/60">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="pixel text-base text-[color:var(--foreground)]">YUP</span>
          <span className="hidden sm:inline text-xs text-[color:var(--muted)]">
            спокойное саморазвитие
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-[color:var(--muted)]">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[color:var(--foreground)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#waitlist" className="btn-primary text-sm py-2 px-4">
          В путь
        </a>
      </div>
    </header>
  );
}
