"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { AscentTimeline } from "@/components/lk/AscentTimeline";
import { LkEmpty } from "@/components/lk/LkEmpty";
import { LkHeader } from "@/components/lk/LkHeader";
import { LkOutro } from "@/components/lk/LkOutro";
import { QuickAsk } from "@/components/lk/QuickAsk";
import {
  SphereProgress,
  type SphereStat,
} from "@/components/lk/SphereProgress";
import { StatStrip } from "@/components/lk/StatStrip";
import { TodayHero } from "@/components/lk/TodayHero";
import { TodaySteps } from "@/components/lk/TodaySteps";
import {
  dateKey,
  dayOfPlan,
  stageForDay,
  totalMinutes,
} from "@/lib/plan/generator";
import {
  computeStreak,
  setStepDone,
  useProgress,
  usePlan,
} from "@/lib/plan/storage";
import { SPHERE_IDS, type SphereId } from "@/lib/plan/types";
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
    const stageLabel = stage.id; // resolved via i18n in header below
    return { day, stage, todayDone, stageLabel };
  }, [plan, progress]);

  if (!plan || !computed) return null;
  const { day, stage, todayDone } = computed;

  const totalSteps = plan.dailyTemplate.length;
  const doneCount = plan.dailyTemplate.filter((s) =>
    todayDone.has(s.id),
  ).length;
  const loadMinutes = totalMinutes(plan.dailyTemplate);
  const streak = computeStreak(plan);

  const sphereStats: SphereStat[] = SPHERE_IDS.map((sphere) =>
    buildSphereStat(sphere, plan, progress?.byDay ?? {}, day, t),
  );

  return (
    <>
      <LkHeader
        day={day}
        total={plan.durationDays}
        stageLabel={t(stage.labelKey as TranslationKey)}
      />
      <main>
        <TodayHero />
        <StatStrip
          done={doneCount}
          total={totalSteps}
          streak={streak}
          loadMinutes={loadMinutes}
        />
        <TodaySteps
          steps={plan.dailyTemplate}
          done={todayDone}
          onToggle={(id) => setStepDone(plan.id, id, !todayDone.has(id))}
        />
        <AscentTimeline
          stages={plan.arc}
          currentStageId={stage.id}
          currentDay={day}
          totalDays={plan.durationDays}
        />
        <SphereProgress items={sphereStats} />
        <QuickAsk />
        <LkOutro />
      </main>
    </>
  );
}

function buildSphereStat(
  sphere: SphereId,
  plan: ReturnType<typeof usePlan>["plan"],
  byDay: Record<string, string[]>,
  currentDay: number,
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string,
): SphereStat {
  if (!plan) {
    return {
      sphere,
      metric: "",
      streakLabel: "",
      progress: 0,
    };
  }
  const step = plan.dailyTemplate.find((s) => s.sphere === sphere);
  const intake = plan.intake.spheres[sphere];

  const completedDays = Object.values(byDay).filter((dayIds) =>
    step ? dayIds.includes(step.id) : false,
  ).length;

  const denom = Math.max(1, currentDay);
  const pct = Math.min(100, Math.round((completedDays / denom) * 100));

  const metric =
    intake?.title?.trim() ||
    (intake?.from && intake?.to
      ? `${intake.from} → ${intake.to}`
      : step?.title || t(`domains.${sphere}.t` as TranslationKey));

  const streakLabel = t("lk.spheres.streak.days", { days: completedDays });

  return {
    sphere,
    metric,
    streakLabel,
    progress: pct,
  };
}
