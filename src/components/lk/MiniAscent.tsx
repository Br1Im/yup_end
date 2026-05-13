"use client";

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
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-[11px] h-px bg-[color:var(--line)]" />
        <div
          className="absolute left-0 top-[11px] h-px bg-[color:var(--lime)] shadow-[0_0_8px_rgba(205,255,61,0.6)]"
          style={{
            width: `${(currentIndex / Math.max(1, stages.length - 1)) * 100}%`,
          }}
        />

        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
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
              >
                <span
                  className={
                    "size-[22px] rounded-full border-2 flex items-center justify-center mb-2 transition-colors " +
                    (isCurrent
                      ? "bg-[color:var(--lime)] border-[color:var(--lime)] shadow-[0_0_14px_rgba(205,255,61,0.55)]"
                      : isPast
                        ? "bg-[color:var(--lime)]/30 border-[color:var(--lime)]"
                        : "bg-[color:var(--bg-2)] border-[color:var(--line-strong)]")
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
    </section>
  );
}
