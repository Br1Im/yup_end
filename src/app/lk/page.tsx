"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { CloseDayCard } from "@/components/lk/CloseDayCard";
import { HistoryHeatmap } from "@/components/lk/HistoryHeatmap";
import { IdentityEpigraph } from "@/components/lk/IdentityEpigraph";
import { LevelCard } from "@/components/lk/LevelCard";
import { LkEmpty } from "@/components/lk/LkEmpty";
import { LkHeader } from "@/components/lk/LkHeader";
import { MountainAscent } from "@/components/lk/MountainAscent";
import { QuestList } from "@/components/lk/QuestList";
import { QuickAsk } from "@/components/lk/QuickAsk";
import { RadarChart } from "@/components/lk/RadarChart";
import { StatusBar } from "@/components/lk/StatusBar";
import {
  dateKey,
  dayOfPlan,
  stageForDay,
  totalMinutes,
} from "@/lib/plan/generator";
import {
  computeStreak,
  isFreezeAvailable,
  setStepDone,
  useProgress,
  usePlan,
} from "@/lib/plan/storage";
import {
  FOCUS_WINDOW_LABELS,
  SPHERE_IDS,
  type SphereId,
} from "@/lib/plan/types";
import type { Plan } from "@/lib/plan/types";
import type { TranslationKey } from "@/i18n/translations";

function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function LkPage() {
  const { plan } = usePlan();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <>
        <LkHeader day={1} />
        <main className="min-h-[calc(100vh-3.5rem)] bg-[color:var(--bg)]" />
      </>
    );
  }

  if (!plan) {
    return (
      <>
        <LkHeader day={1} />
        <main>
          <LkEmpty />
        </main>
      </>
    );
  }

  return <LoadedDashboard />;
}

function LoadedDashboard() {
  const { t } = useI18n();
  const { plan } = usePlan();
  const progress = useProgress(plan?.id ?? null);

  const computed = useMemo(() => {
    if (!plan) return null;
    const day = dayOfPlan(plan);
    const stage = stageForDay(plan, day);
    const todayKey = dateKey();
    const todayDone = new Set(progress?.byDay[todayKey] ?? []);
    return { day, stage, todayDone };
  }, [plan, progress]);

  if (!plan || !computed) return null;
  const { day, stage, todayDone } = computed;

  const totalSteps = plan.dailyTemplate.length;
  const doneCount = plan.dailyTemplate.filter((s) =>
    todayDone.has(s.id),
  ).length;
  const loadMinutes = totalMinutes(plan.dailyTemplate);
  const streak = computeStreak(plan);
  const stageLabel = t(stage.labelKey as TranslationKey);
  const stageTitle = t(stage.titleKey as TranslationKey);
  const windowLabel =
    FOCUS_WINDOW_LABELS[plan.intake.context.focusWindow] ?? "—";
  const identity = plan.intake.identity?.trim() ?? "";
  const todayKey = dateKey();
  const todayEntry = progress?.journals?.[todayKey] ?? null;
  const freezeAvailable = isFreezeAvailable(progress);

  const radarPoints = SPHERE_IDS.map((sphere) => ({
    sphere,
    value: spherePercent(sphere, plan, progress?.byDay ?? {}, day),
  }));

  return (
    <>
      <LkHeader
        day={day}
        total={plan.durationDays}
        stageLabel={stageLabel}
        intake={plan.intake}
      />
      <main className="min-h-[calc(100vh-3.5rem)] bg-[color:var(--bg)] text-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
          {/* Greeting / day header */}
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="space-y-4">
              <div className="eyebrow text-white/55 text-[0.65rem] flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[color:var(--lime)] animate-pulse" />
                {t("lk.topbar.greeting")}
              </div>
              <h1 className="display-tight text-3xl sm:text-5xl text-white leading-[0.96]">
                {t("lk.hero.title.l1")}{" "}
                <span className="text-[color:var(--lime)]">
                  {t("lk.hero.title.l2")}
                </span>
              </h1>
              {identity ? <IdentityEpigraph identity={identity} /> : null}
            </div>
            <div className="text-[0.62rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
              {t("lk.level.day")} {day} / {plan.durationDays}
            </div>
          </div>

          {/* Hero band: Level / Radar / Quests */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.4fr)] gap-3 sm:gap-4 items-stretch">
            <LevelCard
              stageLabel={stageLabel}
              stageTitle={stageTitle}
              day={day}
              total={plan.durationDays}
            />

            <article className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-4 sm:p-5 flex flex-col">
              <header className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
                  <h3 className="eyebrow text-white text-[0.65rem]">
                    {t("lk.radar.eyebrow")}
                  </h3>
                </div>
                <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
                  {t("lk.radar.sphere", { n: SPHERE_IDS.length })}
                </span>
              </header>
              <div className="flex-1 flex items-center justify-center min-h-[240px]">
                <RadarChart points={radarPoints} size={280} />
              </div>
            </article>

            <QuestList
              steps={plan.dailyTemplate}
              done={todayDone}
              onToggle={(id) => setStepDone(plan.id, id, !todayDone.has(id))}
            />
          </section>

          {/* Status bar */}
          <StatusBar
            streak={streak}
            done={doneCount}
            total={totalSteps}
            loadMinutes={loadMinutes}
            windowLabel={windowLabel}
            freezeAvailable={freezeAvailable}
          />

          {/* Mountain + history grid */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-3 sm:gap-4 items-stretch">
            <MountainAscent
              stages={plan.arc}
              currentStageId={stage.id}
              currentDay={day}
              totalDays={plan.durationDays}
            />
            <div className="flex flex-col gap-3 sm:gap-4">
              <HistoryHeatmap
                totalStepsPerDay={totalSteps}
                byDay={progress?.byDay ?? {}}
                journals={progress?.journals ?? {}}
                freezes={progress?.freezes ?? {}}
              />
              <CloseDayCard
                planId={plan.id}
                doneToday={doneCount}
                totalSteps={totalSteps}
                todayEntry={todayEntry}
              />
            </div>
          </section>

          {/* Quick ask */}
          <QuickAsk />
        </div>
      </main>
    </>
  );
}

function spherePercent(
  sphere: SphereId,
  plan: Plan,
  byDay: Record<string, string[]>,
  currentDay: number,
): number {
  const step = plan.dailyTemplate.find((s) => s.sphere === sphere);
  if (!step) return 0;
  const completedDays = Object.values(byDay).filter((ids) =>
    ids.includes(step.id),
  ).length;
  const denom = Math.max(1, currentDay);
  return Math.min(100, Math.round((completedDays / denom) * 100));
}
