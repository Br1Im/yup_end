"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#how", label: "Маршрут" },
  { href: "#domains", label: "Сферы" },
  { href: "#journey", label: "Восхождение" },
  { href: "#faq", label: "Вопросы" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300 " +
        (scrolled
          ? "bg-[color:var(--paper)]/85 backdrop-blur-md border-b border-[color:var(--line)]/60 text-[color:var(--ink)]"
          : "bg-transparent text-white")
      }
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="text-[1.05rem] font-bold tracking-[0.18em]"
            aria-label="YUP"
          >
            YUP
          </span>
          <span
            className={
              "hidden sm:inline text-[0.7rem] tracking-[0.22em] uppercase " +
              (scrolled ? "text-[color:var(--muted)]" : "text-white/55")
            }
          >
            путь к вершине
          </span>
        </Link>

        <nav
          className={
            "hidden md:flex items-center gap-8 text-sm " +
            (scrolled ? "text-[color:var(--muted)]" : "text-white/70")
          }
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "transition-colors " +
                (scrolled
                  ? "hover:text-[color:var(--ink)]"
                  : "hover:text-white")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className={
            scrolled
              ? "btn-ember text-sm py-2 px-4"
              : "btn-ember text-sm py-2 px-4"
          }
        >
          В путь
        </a>
      </div>
    </header>
  );
}
