"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, type Locale } from "@/i18n/translations";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={
        "inline-flex items-center gap-1 rounded-full border border-[color:var(--line-strong)] p-1 text-[0.7rem] tracking-[0.18em] uppercase font-semibold " +
        (className ?? "")
      }
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l: Locale) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={
              "px-2.5 py-1 rounded-full transition-colors " +
              (active
                ? "bg-[color:var(--lime)] text-[color:var(--bg)]"
                : "text-white/60 hover:text-white")
            }
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
