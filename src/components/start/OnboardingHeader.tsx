"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { PeakMark } from "../PeakMark";

type Props = {
  currentStep: 1 | 2 | 3;
  totalSteps: number;
};

export function OnboardingHeader({ currentStep, totalSteps }: Props) {
  const { t } = useI18n();
  const progress = currentStep / totalSteps;

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between text-white">
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

        <div className="hidden sm:flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase font-semibold">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <span className="text-white/55">{t("start.head.eyebrow")}</span>
          <span className="h-3 w-px bg-[color:var(--line)]" />
          <span className="text-white">
            {t("start.progress.of", { cur: currentStep, total: totalSteps })}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />
        </div>
      </div>

      <div
        className="h-px bg-[color:var(--line)] relative overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-y-0 left-0 bg-[color:var(--lime)] shadow-[0_0_12px_rgba(205,255,61,0.5)] transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="sm:hidden border-b border-[color:var(--line)] px-4 py-2 text-[0.66rem] tracking-[0.2em] uppercase font-semibold text-white/55 flex items-center justify-between">
        <span className="text-white/55">{t("start.head.eyebrow")}</span>
        <span className="text-[color:var(--lime)]">
          {t("start.progress.of", { cur: currentStep, total: totalSteps })}
        </span>
      </div>
    </header>
  );
}
