"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PeakMark } from "./PeakMark";

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { href: "#how", label: t("header.nav.route") },
    { href: "#domains", label: t("header.nav.spheres") },
    { href: "#journey", label: t("header.nav.ascent") },
    { href: "#faq", label: t("header.nav.faq") },
  ];

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-40 transition-all duration-300 " +
        (scrolled
          ? "bg-[color:var(--bg)]/80 backdrop-blur-md border-b border-[color:var(--line)]"
          : "bg-transparent")
      }
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-white">
        {/* Left: nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[color:var(--lime)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Center: wordmark with mini peak */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-end gap-1.5 group"
          aria-label="YUP"
        >
          <span className="display text-2xl tracking-[-0.03em] text-white leading-none">
            YUP
          </span>
          <PeakMark size={14} className="mb-0.5" />
        </Link>

        {/* Right: locale + CTA */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <a href="#waitlist" className="btn-pill group">
            <span className="hidden sm:inline">
              {t("header.cta.signup")}{" "}
              <span className="text-[color:var(--muted)]">
                {t("header.cta.signup.suffix")}
              </span>
            </span>
            <span className="sm:hidden">{t("header.cta.signup")}</span>
            <span className="size-7 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] flex items-center justify-center shadow-[0_0_18px_rgba(205,255,61,0.55)] group-hover:rotate-45 transition-transform">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
