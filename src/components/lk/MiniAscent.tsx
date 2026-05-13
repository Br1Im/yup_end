"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import type { ArcStage } from "@/lib/plan/types";

type Props = {
  stages: ArcStage[];
  currentStageId: ArcStage["id"];
  currentDay: number;
  totalDays: number;
};

export function MiniAscent({
  stages,
  currentStageId,
  currentDay,
  totalDays,
}: Props) {
  const { t } = useI18n();
  const currentIndex = Math.max(
    0,
    stages.findIndex((s) => s.id === currentStageId),
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const targetWidthPct = (currentIndex / Math.max(1, stages.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-5 sm:p-6">
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.ascent.eyebrow")}
          </h3>
        </div>
        <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {t("lk.topbar.day", { day: currentDay, total: totalDays })}
        </span>
      </header>

      <div className="relative">
        {/* Background connector */}
        <div className="absolute left-0 right-0 top-[11px] h-px bg-[color:var(--line)]" />
        {/* Filled connector — animates from 0 to currentIndex */}
        <div
          className="absolute left-0 top-[11px] h-px bg-[color:var(--lime)] shadow-[0_0_10px_rgba(205,255,61,0.7)]"
          style={{
            width: mounted ? `${targetWidthPct}%` : "0%",
            transition:
              "width 1100ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
          }}
        />

        <ol
          className="relative grid"
          style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
        >
          {stages.map((stage, i) => {
            const isCurrent = stage.id === currentStageId;
            const isPast = i < currentIndex;
            return (
              <li
                key={stage.id}
                className={
                  "flex flex-col items-center text-center px-1 " +
                  (i === 0
                    ? "items-start text-left"
                    : i === stages.length - 1
                      ? "items-end text-right"
                      : "")
                }
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 420ms ease-out ${i * 100}ms, transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms`,
                }}
              >
                <span
                  className={
                    "size-[22px] rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-500 " +
                    (isCurrent
                      ? "bg-[color:var(--lime)] border-[color:var(--lime)]"
                      : isPast
                        ? "bg-[color:var(--lime)]/30 border-[color:var(--lime)]"
                        : "bg-[color:var(--bg-2)] border-[color:var(--line-strong)]")
                  }
                  style={
                    isCurrent
                      ? {
                          boxShadow: "0 0 14px rgba(205,255,61,0.55)",
                          animation: "yup-ascent-pulse 2.4s ease-in-out infinite",
                        }
                      : undefined
                  }
                >
                  {isCurrent ? (
                    <span className="size-1.5 rounded-full bg-[color:var(--bg)]" />
                  ) : null}
                </span>
                <span
                  className={
                    "text-[0.6rem] tracking-[0.2em] uppercase font-semibold " +
                    (isCurrent
                      ? "text-[color:var(--lime)]"
                      : isPast
                        ? "text-white/55"
                        : "text-white/35")
                  }
                >
                  {t(stage.labelKey as TranslationKey)}
                </span>
                <span className="mt-0.5 text-[0.62rem] text-white/35 font-semibold">
                  {stage.startDay}–{stage.endDay}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        @keyframes yup-ascent-pulse {
          0%, 100% { box-shadow: 0 0 14px rgba(205,255,61,0.55); }
          50%      { box-shadow: 0 0 22px rgba(205,255,61,0.85); }
        }
      `}</style>
    </section>
  );
}
