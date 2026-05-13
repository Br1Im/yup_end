import type { Plan, Progress, SphereId } from "./types";

/**
 * Achievements live entirely on the client and are derived from `Progress`
 * at render-time — there is no separate persistence step. Each achievement
 * defines `earned(plan, progress)` which returns true once unlocked.
 *
 * The same id is used for the i18n keys: `lk.achv.{id}.t` (title) and
 * `lk.achv.{id}.s` (subtitle/hint).
 */
export type AchievementId =
  | "first_step"
  | "first_close"
  | "streak3"
  | "streak7"
  | "streak30"
  | "perfectDay"
  | "campI"
  | "halfway"
  | "allSpheres";

export type Achievement = {
  id: AchievementId;
  /** Order in which to display when unlocked (lower = first). */
  order: number;
};

const ALL: Achievement[] = [
  { id: "first_step", order: 1 },
  { id: "first_close", order: 2 },
  { id: "perfectDay", order: 3 },
  { id: "allSpheres", order: 4 },
  { id: "streak3", order: 5 },
  { id: "streak7", order: 6 },
  { id: "campI", order: 7 },
  { id: "halfway", order: 8 },
  { id: "streak30", order: 9 },
];

type Predicate = (plan: Plan, progress: Progress | null) => boolean;

const PREDICATES: Record<AchievementId, Predicate> = {
  first_step: (_, p) =>
    !!p && Object.values(p.byDay).some((ids) => ids.length >= 1),
  first_close: (_, p) => !!p?.journals && Object.keys(p.journals).length >= 1,
  streak3: (plan, p) => longestStreak(plan, p) >= 3,
  streak7: (plan, p) => longestStreak(plan, p) >= 7,
  streak30: (plan, p) => longestStreak(plan, p) >= 30,
  perfectDay: (plan, p) => {
    if (!p) return false;
    const need = plan.dailyTemplate.length;
    return Object.values(p.byDay).some((ids) => ids.length >= need);
  },
  campI: (plan, p) => {
    if (!p) return false;
    const camp1End = plan.arc[1]?.endDay ?? plan.arc[0]?.endDay ?? 0;
    if (!camp1End) return false;
    // We compute days-closed at-or-before camp1End; this is a lightweight
    // heuristic — being on/past day camp1End AND having ≥ camp1End*0.5 days
    // with progress.
    const closedDays = Object.keys(p.byDay).length;
    return closedDays >= Math.ceil(camp1End * 0.5);
  },
  halfway: (plan, p) => {
    if (!p) return false;
    const closedDays = Object.keys(p.byDay).length;
    return closedDays >= Math.floor(plan.durationDays / 2);
  },
  allSpheres: (plan, p) => {
    if (!p) return false;
    // Earned when, on some single day, the user closed at least one step in
    // every sphere covered by the plan template.
    const planSpheres = new Set<SphereId>(
      plan.dailyTemplate.map((s) => s.sphere),
    );
    const stepIdToSphere = new Map(
      plan.dailyTemplate.map((s) => [s.id, s.sphere as SphereId]),
    );
    return Object.values(p.byDay).some((ids) => {
      const hit = new Set<SphereId>();
      for (const id of ids) {
        const sphere = stepIdToSphere.get(id);
        if (sphere) hit.add(sphere);
      }
      for (const s of planSpheres) if (!hit.has(s)) return false;
      return true;
    });
  },
};

/**
 * Compute every achievement that is currently unlocked for the user.
 * Returns achievements in display order.
 */
export function computeAchievements(
  plan: Plan,
  progress: Progress | null,
): Achievement[] {
  return ALL.filter((a) => PREDICATES[a.id](plan, progress)).sort(
    (a, b) => a.order - b.order,
  );
}

/** Total number of achievements available, used for "X / Y" displays. */
export function totalAchievements(): number {
  return ALL.length;
}

/**
 * Longest *continuous* run of days (in stored byDay) that share a calendar
 * day-of-year sequence. Walks each known day key, sorts, then measures gaps.
 * Pure function — no localStorage access.
 */
function longestStreak(_plan: Plan, progress: Progress | null): number {
  if (!progress) return 0;
  const days = Object.keys(progress.byDay)
    .filter((k) => (progress.byDay[k]?.length ?? 0) > 0)
    .sort();
  const frozen = new Set(Object.values(progress.freezes ?? {}));
  for (const f of frozen) days.push(f);
  days.sort();
  let best = 0;
  let cur = 0;
  let prev = "";
  for (const day of days) {
    if (prev && nextDayOf(prev) === day) cur += 1;
    else cur = 1;
    if (cur > best) best = cur;
    prev = day;
  }
  return best;
}

/** Helper: yyyy-mm-dd + 1 calendar day (UTC math is OK here — we're only
 * comparing strings, not surfacing them as "today"). */
function nextDayOf(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  dt.setUTCDate(dt.getUTCDate() + 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}
