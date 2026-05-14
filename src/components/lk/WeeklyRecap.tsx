"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CalendarRange } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { Plan, Progress, SphereId } from "@/lib/plan/types";
import { buildLastWeekRecap } from "@/lib/plan/recap";
import type { TranslationKey } from "@/i18n/translations";

const SPHERE_LABELS: Record<SphereId, TranslationKey> = {
  lang: "lk.spheres.lang.label",
  body: "lk.spheres.body.label",
  knowledge: "lk.spheres.knowledge.label",
  habits: "lk.spheres.habits.label",
  mind: "lk.spheres.mind.label",
};

type Props = {
  plan: Plan;
  progress: Progress | null;
};

export function WeeklyRecap({ plan, progress }: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const recap = buildLastWeekRecap(plan, progress);
  if (!recap) return null;
  // Only show the card when there's at least one day with activity, otherwise
  // we're just showing an empty grid that adds noise to the dashboard.
  if (recap.activeDays === 0 && recap.closedDays === 0) return null;

  const leaderLabel = recap.leader ? t(SPHERE_LABELS[recap.leader]) : null;
  const laggardLabel = recap.laggard ? t(SPHERE_LABELS[recap.laggard]) : null;

  return (
    <section
      className="rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-4 sm:p-5"
      style={{
        transition:
          "opacity 540ms ease-out, transform 640ms cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.recap.eyebrow")}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-semibold text-white/45">
          <CalendarRange className="size-3" strokeWidth={1.7} />
          {recap.weekKey}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        <Stat
          value={`${recap.completionPct}%`}
          label={t("lk.recap.stat.completion")}
        />
        <Stat
          value={`${recap.closedDays}/7`}
          label={t("lk.recap.stat.closed")}
        />
        <Stat
          value={`${recap.activeDays}/7`}
          label={t("lk.recap.stat.active")}
        />
      </div>

      <div className="space-y-1.5">
        {recap.spheres.map((s) => (
          <SphereBar
            key={s.sphere}
            label={t(SPHERE_LABELS[s.sphere])}
            pct={s.pct}
            done={s.done}
            total={s.total}
            highlight={
              s.sphere === recap.leader
                ? "leader"
                : s.sphere === recap.laggard
                  ? "laggard"
                  : "none"
            }
          />
        ))}
      </div>

      {(leaderLabel || laggardLabel) && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {leaderLabel ? (
            <Callout
              icon={
                <ArrowUpRight
                  className="size-3.5 text-[color:var(--lime)]"
                  strokeWidth={2}
                />
              }
              label={t("lk.recap.leader")}
              value={leaderLabel}
            />
          ) : null}
          {laggardLabel ? (
            <Callout
              icon={
                <ArrowDownRight
                  className="size-3.5 text-white/55"
                  strokeWidth={2}
                />
              }
              label={t("lk.recap.laggard")}
              value={laggardLabel}
            />
          ) : null}
        </div>
      )}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg)] p-3">
      <div className="display text-xl sm:text-2xl text-white leading-none">
        {value}
      </div>
      <div className="mt-1 text-[0.55rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
        {label}
      </div>
    </div>
  );
}

function SphereBar({
  label,
  pct,
  done,
  total,
  highlight,
}: {
  label: string;
  pct: number;
  done: number;
  total: number;
  highlight: "leader" | "laggard" | "none";
}) {
  const barColor =
    highlight === "leader"
      ? "bg-[color:var(--lime)]"
      : highlight === "laggard"
        ? "bg-white/35"
        : "bg-white/55";
  return (
    <div>
      <div className="flex items-center justify-between text-[0.7rem] mb-1">
        <span className="text-white/75">{label}</span>
        <span className="text-white/45 tabular-nums">
          {done} / {total} · {pct}%
        </span>
      </div>
      <div className="h-1 rounded-full bg-[color:var(--line)] overflow-hidden">
        <div
          className={`h-full ${barColor}`}
          style={{
            width: `${pct}%`,
            transition: "width 720ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
}

function Callout({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-0.5">
        {icon}
        <span className="text-[0.55rem] tracking-[0.22em] uppercase font-semibold text-white/55">
          {label}
        </span>
      </div>
      <div className="text-sm text-white/85">{value}</div>
    </div>
  );
}
