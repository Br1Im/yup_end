import type { Plan, Progress, SphereId } from "./types";
import { SPHERE_IDS } from "./types";
import { dateKey, weekKey } from "./generator";

export type RecapDay = {
  /** "YYYY-MM-DD" */
  date: string;
  /** Step ids the user closed that day */
  done: string[];
  /** Whether the day had a journal entry */
  closed: boolean;
  /** Whether the day was covered by a streak freeze */
  frozen: boolean;
};

export type RecapSphereStat = {
  sphere: SphereId;
  done: number;
  total: number;
  /** Percentage 0..100 */
  pct: number;
};

export type WeeklyRecap = {
  /** ISO-week key, e.g. "2026-W19" */
  weekKey: string;
  /** Local-date strings for each of the 7 days (Mon..Sun). */
  days: RecapDay[];
  /** Days where the user closed at least one step. */
  activeDays: number;
  /** Days the user closed via journal entry. */
  closedDays: number;
  /** Days covered by a streak freeze. */
  frozenDays: number;
  /** Closed steps / (planned steps * active days). */
  completionPct: number;
  /** Per-sphere breakdown — useful for "leader / laggard" callouts. */
  spheres: RecapSphereStat[];
  /** Best sphere (highest pct, with at least one done step). null if all zero. */
  leader: SphereId | null;
  /** Worst sphere (lowest pct, with at least one *planned* step). */
  laggard: SphereId | null;
};

/**
 * Build the last *completed* ISO week's recap (Mon..Sun).
 * Returns null when the plan hasn't been running long enough to have a full
 * week of data, so the UI can hide the card cleanly.
 */
export function buildLastWeekRecap(
  plan: Plan,
  progress: Progress | null,
  now: Date = new Date(),
): WeeklyRecap | null {
  if (!progress) return null;

  // Find the most recent past Sunday at local-midnight.
  const lastSunday = startOfLastWeekSunday(now);
  const monday = new Date(lastSunday);
  monday.setDate(monday.getDate() - 6);

  const planStart = startOfDay(new Date(plan.startedAt));
  if (monday.getTime() < planStart.getTime()) return null;

  const days: RecapDay[] = [];
  const cursor = new Date(monday);
  for (let i = 0; i < 7; i += 1) {
    const key = dateKey(cursor);
    const done = progress.byDay?.[key] ?? [];
    const closed = Boolean(progress.journals?.[key]);
    const frozen = Object.values(progress.freezes ?? {}).includes(key);
    days.push({ date: key, done, closed, frozen });
    cursor.setDate(cursor.getDate() + 1);
  }

  const activeDays = days.filter((d) => d.done.length > 0).length;
  const closedDays = days.filter((d) => d.closed).length;
  const frozenDays = days.filter((d) => d.frozen).length;

  // Per-sphere counts: how many of that sphere's daily-template steps were
  // closed across the week.
  const planned = countTemplateBySphere(plan);
  const doneCounts = countDoneBySphere(plan, days);
  const spheres: RecapSphereStat[] = SPHERE_IDS.map((sphere) => {
    const total = (planned[sphere] ?? 0) * activeDays || planned[sphere] || 0;
    const done = doneCounts[sphere] ?? 0;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { sphere, done, total, pct };
  });

  const stepsPlannedPerDay = plan.dailyTemplate.length;
  const totalPlanned = stepsPlannedPerDay * Math.max(activeDays, 1);
  const totalDone = days.reduce((acc, d) => acc + d.done.length, 0);
  const completionPct =
    totalPlanned > 0
      ? Math.min(100, Math.round((totalDone / totalPlanned) * 100))
      : 0;

  const positives = spheres.filter((s) => s.done > 0);
  const leader =
    positives.length > 0
      ? positives.reduce((a, b) => (a.pct >= b.pct ? a : b)).sphere
      : null;
  const planneds = spheres.filter((s) => s.total > 0);
  const laggard =
    planneds.length > 0
      ? planneds.reduce((a, b) => (a.pct <= b.pct ? a : b)).sphere
      : null;

  return {
    weekKey: weekKey(monday),
    days,
    activeDays,
    closedDays,
    frozenDays,
    completionPct,
    spheres,
    leader,
    laggard,
  };
}

/** Local-midnight start of the most recent Sunday strictly before `now`. */
function startOfLastWeekSunday(now: Date): Date {
  const d = startOfDay(now);
  const dow = d.getDay(); // 0=Sun..6=Sat
  // Number of days back to land on the *previous* Sunday — never today.
  const offset = dow === 0 ? 7 : dow;
  d.setDate(d.getDate() - offset);
  return d;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function countTemplateBySphere(plan: Plan): Record<SphereId, number> {
  const out: Record<SphereId, number> = {
    lang: 0,
    body: 0,
    knowledge: 0,
    habits: 0,
    mind: 0,
  };
  for (const step of plan.dailyTemplate) out[step.sphere] += 1;
  return out;
}

function countDoneBySphere(
  plan: Plan,
  days: RecapDay[],
): Record<SphereId, number> {
  const byId = new Map(plan.dailyTemplate.map((s) => [s.id, s.sphere]));
  const out: Record<SphereId, number> = {
    lang: 0,
    body: 0,
    knowledge: 0,
    habits: 0,
    mind: 0,
  };
  for (const day of days) {
    for (const id of day.done) {
      const sphere = byId.get(id);
      if (sphere) out[sphere] += 1;
    }
  }
  return out;
}
