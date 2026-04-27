"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PeakMark } from "./PeakMark";

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const NAV = [
    { href: "#how", label: t("header.nav.route") },
    { href: "#domains", label: t("header.nav.spheres") },
    { href: "#journey", label: t("header.nav.ascent") },
    { href: "#faq", label: t("header.nav.faq") },
  ];

  return (
    <>
      <header
        className={
          "fixed top-0 inset-x-0 z-40 transition-all duration-300 " +
          (scrolled || open
            ? "bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]"
            : "bg-transparent")
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between text-white">
          {/* Left: hamburger (mobile) / nav (desktop) */}
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden size-9 -ml-1 flex items-center justify-center rounded-full border border-[color:var(--line-strong)] text-white/80 hover:text-[color:var(--lime)] hover:border-[color:var(--lime)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                {open ? (
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2 5h12M2 11h12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm text-white/70">
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
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-end gap-1.5 group"
            aria-label="YUP"
          >
            <span className="display text-xl sm:text-2xl tracking-[-0.03em] text-white leading-none">
              YUP
            </span>
            <PeakMark size={13} className="mb-0.5" />
          </Link>

          {/* Right: locale (desktop) + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher className="hidden md:inline-flex" />
            <a
              href="#waitlist"
              className="btn-pill group !py-1.5 sm:!py-2 !pl-3 sm:!pl-4 !pr-1.5 text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">
                {t("header.cta.signup")}{" "}
                <span className="text-[color:var(--muted)]">
                  {t("header.cta.signup.suffix")}
                </span>
              </span>
              <span className="sm:hidden">{t("header.cta.signup.short")}</span>
              <span className="size-6 sm:size-7 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] flex items-center justify-center shadow-[0_0_18px_rgba(205,255,61,0.55)] group-hover:rotate-45 transition-transform">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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

      {/* Mobile sheet */}
      <div
        className={
          "fixed inset-0 z-30 md:hidden transition-opacity duration-300 " +
          (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full"
        />
        <div
          className={
            "absolute top-14 inset-x-0 bg-[color:var(--bg)]/95 backdrop-blur-xl border-b border-[color:var(--line)] transition-transform duration-300 " +
            (open ? "translate-y-0" : "-translate-y-2")
          }
        >
          <nav className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display text-3xl text-white/85 hover:text-[color:var(--lime)] transition-colors py-2 border-b border-[color:var(--line)]"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 flex items-center justify-between gap-4">
              <LocaleSwitcher />
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="btn-lime text-sm"
              >
                {t("header.cta.signup")}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
