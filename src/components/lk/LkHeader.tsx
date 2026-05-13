"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { PeakMark } from "../PeakMark";

export function LkHeader({ day }: { day: number }) {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between text-white">
        <Link
          href="/"
          className="flex items-end gap-1.5"
          aria-label="YUP — на главную"
        >
          <span className="display text-xl sm:text-2xl tracking-[-0.03em] text-white leading-none">
            YUP
          </span>
          <PeakMark size={13} className="mb-0.5" />
        </Link>

        <div className="hidden md:flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase font-semibold">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <span className="text-white/55">{t("lk.topbar.eyebrow")}</span>
          <span className="h-3 w-px bg-[color:var(--line)]" />
          <span className="text-white">{t("lk.topbar.day", { day })}</span>
          <span className="h-3 w-px bg-[color:var(--line)]" />
          <span className="text-[color:var(--lime)]">
            {t("lk.topbar.camp")}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <button
            type="button"
            className="btn-pill !py-1.5 sm:!py-2 !px-3 sm:!px-4 text-xs sm:text-sm"
          >
            {t("lk.header.logout")}
          </button>
        </div>
      </div>

      <div className="md:hidden border-t border-[color:var(--line)] px-4 py-2 flex items-center justify-between text-[0.66rem] tracking-[0.2em] uppercase font-semibold text-white/55">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          {t("lk.topbar.day", { day })}
        </span>
        <span className="text-[color:var(--lime)]">{t("lk.topbar.camp")}</span>
      </div>
    </header>
  );
}
