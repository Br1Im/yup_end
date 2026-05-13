"use client";

import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";
import type { ArcStage } from "@/lib/plan/types";

type Props = {
  stages: ArcStage[];
  currentStageId: ArcStage["id"];
  currentDay: number;
  totalDays: number;
};

export function AscentTimeline({
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
    <section className="relative bg-[color:var(--bg-2)] border-y border-[color:var(--line)] text-white">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">
            {t("lk.ascent.eyebrow")}
          </span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2.2rem,6vw,5rem)] leading-[0.86]">
            {t("lk.ascent.title")}
          </h2>
        </Reveal>

        <ol className="mt-12 relative">
          <span
            aria-hidden
            className="absolute left-[14px] top-3 bottom-3 w-px bg-[color:var(--line)]"
          />
          {stages.map((stage, i) => {
            const passed = i < currentIndex;
            const current = i === currentIndex;
            return (
              <Reveal
                as="li"
                variant="soft"
                delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                key={stage.id}
                className="relative pl-12 py-5 first:pt-1 last:pb-1"
              >
                <span
                  aria-hidden
                  className={
                    "absolute left-2 top-6 size-3 rounded-full transition-colors " +
                    (current
                      ? "bg-[color:var(--lime)] shadow-[0_0_14px_rgba(205,255,61,0.7)]"
                      : passed
                        ? "bg-white/70"
                        : "bg-[color:var(--bg-3)] border border-[color:var(--line-strong)]")
                  }
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={
                        "text-[0.66rem] tracking-[0.22em] uppercase font-semibold " +
                        (current
                          ? "text-[color:var(--lime)]"
                          : passed
                            ? "text-white/55"
                            : "text-white/30")
                      }
                    >
                      {t(stage.labelKey as TranslationKey)}
                    </span>
                    <h3
                      className={
                        "display text-base sm:text-lg " +
                        (current
                          ? "text-[color:var(--lime)]"
                          : passed
                            ? "text-white/80"
                            : "text-white/45")
                      }
                    >
                      {t(stage.titleKey as TranslationKey)}
                    </h3>
                  </div>
                  <span className="text-xs text-white/35 uppercase tracking-[0.18em] font-semibold">
                    {stage.startDay === stage.endDay
                      ? `${stage.startDay}`
                      : `${stage.startDay}–${stage.endDay}`}
                  </span>
                </div>
                {current ? (
                  <span className="mt-2 inline-flex items-center gap-2 text-[0.66rem] tracking-[0.22em] uppercase text-[color:var(--lime)] font-semibold">
                    <span className="size-1.5 rounded-full bg-[color:var(--lime)] animate-pulse" />
                    {t("lk.ascent.current")} ·{" "}
                    {t("lk.topbar.day", { day: currentDay, total: totalDays })}
                  </span>
                ) : null}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
