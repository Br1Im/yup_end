"use client";

import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";
import {
  FOCUS_WINDOWS,
  OBSTACLES,
  TIME_OPTIONS,
  type FocusWindow,
  type MinutesPerDay,
  type Obstacle,
  type PlanIntake,
} from "@/lib/plan/types";

type Props = {
  context: PlanIntake["context"];
  onChange: (patch: Partial<PlanIntake["context"]>) => void;
};

const WINDOW_LABEL: Record<FocusWindow, TranslationKey> = {
  morning: "start.s2.window.morning",
  day: "start.s2.window.day",
  evening: "start.s2.window.evening",
};

const OBSTACLE_LABEL: Record<Obstacle, TranslationKey> = {
  procrastination: "start.s2.obs.procrastination",
  rhythm: "start.s2.obs.rhythm",
  deadlines: "start.s2.obs.deadlines",
  invisible: "start.s2.obs.invisible",
  social: "start.s2.obs.social",
  sleep: "start.s2.obs.sleep",
};

export function StepContext({ context, onChange }: Props) {
  const { t } = useI18n();

  const toggleObstacle = (id: Obstacle) => {
    const set = new Set(context.obstacles);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange({ obstacles: Array.from(set) });
  };

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("start.s2.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2rem,5vw,3.6rem)] leading-[0.92]">
            {t("start.s2.title")}
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-6 max-w-2xl text-white/65 leading-relaxed">
            {t("start.s2.lead")}
          </p>
        </Reveal>
      </div>

      <Reveal variant="soft" delay={2}>
        <div>
          <span className="eyebrow text-white/55 text-[0.62rem] block mb-4">
            {t("start.s2.time.label")}
          </span>
          <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-2xl">
            {TIME_OPTIONS.map((minutes) => {
              const active = context.minutesPerDay === minutes;
              return (
                <button
                  key={minutes}
                  type="button"
                  onClick={() =>
                    onChange({ minutesPerDay: minutes as MinutesPerDay })
                  }
                  aria-pressed={active}
                  className={
                    "py-3 sm:py-4 rounded-full border transition-colors flex flex-col items-center justify-center gap-0.5 " +
                    (active
                      ? "bg-[color:var(--lime)]/10 border-[color:var(--lime)] text-[color:var(--lime)] shadow-[0_0_16px_rgba(205,255,61,0.25)]"
                      : "bg-[color:var(--bg-2)] border-[color:var(--line-strong)] text-white/70 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)]")
                  }
                >
                  <span className="display text-lg sm:text-xl leading-none">
                    {minutes}
                  </span>
                  <span className="text-[0.62rem] tracking-[0.18em] uppercase font-semibold opacity-70">
                    {t("start.s2.time.suffix")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal variant="soft" delay={3}>
        <div>
          <span className="eyebrow text-white/55 text-[0.62rem] block mb-4">
            {t("start.s2.window.label")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
            {FOCUS_WINDOWS.map((win) => {
              const active = context.focusWindow === win;
              return (
                <button
                  key={win}
                  type="button"
                  onClick={() => onChange({ focusWindow: win })}
                  aria-pressed={active}
                  className={
                    "py-3 px-4 rounded-full border transition-colors text-sm " +
                    (active
                      ? "bg-[color:var(--lime)]/10 border-[color:var(--lime)] text-[color:var(--lime)]"
                      : "bg-[color:var(--bg-2)] border-[color:var(--line-strong)] text-white/70 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)]")
                  }
                >
                  {t(WINDOW_LABEL[win])}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal variant="soft" delay={4}>
        <div>
          <span className="eyebrow text-white/55 text-[0.62rem] block mb-3">
            {t("start.s2.obstacles.label")}
          </span>
          <p className="text-white/55 leading-relaxed text-sm mb-4 max-w-2xl">
            {t("start.s2.obstacles.lead")}
          </p>
          <div className="flex flex-wrap gap-2 max-w-3xl">
            {OBSTACLES.map((id) => {
              const active = context.obstacles.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleObstacle(id)}
                  aria-pressed={active}
                  className={
                    "px-4 py-2 rounded-full border transition-colors text-sm " +
                    (active
                      ? "bg-[color:var(--lime)]/10 border-[color:var(--lime)] text-[color:var(--lime)]"
                      : "bg-[color:var(--bg-2)] border-[color:var(--line-strong)] text-white/70 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)]")
                  }
                >
                  {t(OBSTACLE_LABEL[id])}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
