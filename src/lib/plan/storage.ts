"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { DayNote, JournalEntry, Plan, Progress, Step } from "./types";
import { dateKey, weekKey } from "./generator";

const PLAN_KEY = "yup.plan";
const PROGRESS_KEY = "yup.progress";
const INTAKE_PREFILL_KEY = "yup.intake.prefill";

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

let planCache: { raw: string | null; value: Plan | null } | null = null;
let progressCache:
  | { raw: string | null; planId: string; value: Progress }
  | null = null;

function readPlan(): Plan | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PLAN_KEY);
  if (planCache && planCache.raw === raw) return planCache.value;
  let value: Plan | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Plan;
      if (parsed && parsed.version === 1) value = parsed;
    } catch {
      value = null;
    }
  }
  planCache = { raw, value };
  return value;
}

function emptyProgress(planId: string): Progress {
  return { planId, byDay: {}, lastVisit: new Date(0).toISOString() };
}

function readProgress(planId: string): Progress {
  if (typeof window === "undefined") return emptyProgress(planId);
  const raw = window.localStorage.getItem(PROGRESS_KEY);
  if (
    progressCache &&
    progressCache.raw === raw &&
    progressCache.planId === planId
  ) {
    return progressCache.value;
  }
  let value: Progress = emptyProgress(planId);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Progress;
      if (parsed.planId === planId) value = parsed;
    } catch {
      // keep empty
    }
  }
  progressCache = { raw, planId, value };
  return value;
}

function invalidateCaches() {
  planCache = null;
  progressCache = null;
}

export function savePlan(plan: Plan) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  window.localStorage.removeItem(PROGRESS_KEY);
  invalidateCaches();
  emit();
}

export function clearPlan() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PLAN_KEY);
  window.localStorage.removeItem(PROGRESS_KEY);
  invalidateCaches();
  emit();
}

/**
 * Stash the current plan's intake so the /start onboarding can rehydrate it
 * for a “rebuild plan” flow. Survives only the current tab session.
 */
export function setIntakePrefill(intake: import("./types").PlanIntake) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(INTAKE_PREFILL_KEY, JSON.stringify(intake));
  } catch {
    // ignore quota/serialization errors
  }
}

export function consumeIntakePrefill():
  | import("./types").PlanIntake
  | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(INTAKE_PREFILL_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(INTAKE_PREFILL_KEY);
    return JSON.parse(raw) as import("./types").PlanIntake;
  } catch {
    return null;
  }
}

/**
 * Patch the current plan's intake context (focus window, minutes per day,
 * obstacles). Returns the updated plan or null if there's no plan saved.
 */
export function updateIntakeContext(
  patch: Partial<import("./types").PlanIntake["context"]>,
): Plan | null {
  if (typeof window === "undefined") return null;
  const current = readPlan();
  if (!current) return null;
  const next: Plan = {
    ...current,
    intake: {
      ...current.intake,
      context: { ...current.intake.context, ...patch },
    },
  };
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
  return next;
}

/**
 * Serialize the current plan + progress into a portable snapshot the user
 * can download / paste into another browser. Returns null when there's no
 * plan to export.
 */
export function exportSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  const plan = readPlan();
  if (!plan) return null;
  const progress = readProgress(plan.id);
  const snapshot = {
    kind: "yup-snapshot" as const,
    version: 1 as const,
    exportedAt: new Date().toISOString(),
    plan,
    progress,
  };
  return JSON.stringify(snapshot, null, 2);
}

type Snapshot = {
  kind: "yup-snapshot";
  version: 1;
  exportedAt: string;
  plan: Plan;
  progress: Progress;
};

/**
 * Restore a plan + progress from a snapshot JSON string. Returns true on
 * success. Validation is intentionally loose — we trust the snapshot since
 * it was exported by the same app, but we reject anything that doesn't have
 * the expected shape.
 */
export function importSnapshot(raw: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(raw) as Partial<Snapshot>;
    if (
      parsed?.kind !== "yup-snapshot" ||
      parsed.version !== 1 ||
      !parsed.plan ||
      parsed.plan.version !== 1 ||
      !parsed.progress
    ) {
      return false;
    }
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(parsed.plan));
    window.localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ ...parsed.progress, planId: parsed.plan.id }),
    );
    invalidateCaches();
    emit();
    return true;
  } catch {
    return false;
  }
}

export function setStepDone(planId: string, stepId: string, done: boolean) {
  if (typeof window === "undefined") return;
  const current = readProgress(planId);
  const key = dateKey();
  const existing = new Set(current.byDay[key] ?? []);
  if (done) existing.add(stepId);
  else existing.delete(stepId);
  const next: Progress = {
    ...current,
    byDay: { ...current.byDay, [key]: Array.from(existing) },
    lastVisit: new Date().toISOString(),
  };
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
}

/**
 * Persist an inline edit to one of the plan's daily-template steps.
 * Only `title`, `note`, and `minutes` are mutable; `id` and `sphere` are stable.
 */
export function updatePlanStep(
  stepId: string,
  changes: Partial<Pick<Step, "title" | "note" | "minutes">>,
) {
  if (typeof window === "undefined") return;
  const current = readPlan();
  if (!current) return;
  const nextSteps = current.dailyTemplate.map((s) =>
    s.id === stepId ? { ...s, ...changes } : s,
  );
  const next: Plan = { ...current, dailyTemplate: nextSteps };
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
}

/** Append a Quick Ask note to today's progress bucket. */
export function addDayNote(planId: string, text: string): DayNote | null {
  if (typeof window === "undefined") return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  const current = readProgress(planId);
  const key = dateKey();
  const entry: DayNote = { text: trimmed, addedAt: new Date().toISOString() };
  const notes = { ...(current.notes ?? {}) };
  notes[key] = [...(notes[key] ?? []), entry];
  const next: Progress = {
    ...current,
    notes,
    lastVisit: new Date().toISOString(),
  };
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
  return entry;
}

/** Save (or clear) the evening reflection for the given date. */
export function setJournalEntry(
  planId: string,
  date: string,
  entry: Omit<JournalEntry, "closedAt"> | null,
) {
  if (typeof window === "undefined") return;
  const current = readProgress(planId);
  const journals = { ...(current.journals ?? {}) };
  if (entry === null) {
    delete journals[date];
  } else {
    journals[date] = { ...entry, closedAt: new Date().toISOString() };
  }
  const next: Progress = {
    ...current,
    journals,
    lastVisit: new Date().toISOString(),
  };
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
}

/** Use the weekly streak-freeze on `date` if one is still available. */
export function consumeStreakFreeze(planId: string, date: string): boolean {
  if (typeof window === "undefined") return false;
  const current = readProgress(planId);
  const freezes = { ...(current.freezes ?? {}) };
  // Use noon to dodge DST edge cases when parsing the local date string.
  const [y, m, d] = date.split("-").map(Number);
  const wk = weekKey(new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0));
  if (freezes[wk]) return false;
  freezes[wk] = date;
  const next: Progress = {
    ...current,
    freezes,
    lastVisit: new Date().toISOString(),
  };
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  invalidateCaches();
  emit();
  return true;
}

export function isFreezeAvailable(
  progress: Progress | null,
  date: Date = new Date(),
): boolean {
  if (!progress) return true;
  const wk = weekKey(date);
  return !(progress.freezes ?? {})[wk];
}

export function computeStreak(plan: Plan, now: Date = new Date()): number {
  if (typeof window === "undefined") return 0;
  const progress = readProgress(plan.id);
  const freezes = progress.freezes ?? {};
  let streak = 0;
  const cursor = new Date(now);
  for (let i = 0; i < plan.durationDays; i += 1) {
    const key = dateKey(cursor);
    const done = progress.byDay[key] ?? [];
    const isFrozen = Object.values(freezes).includes(key);
    if (i === 0 && done.length === 0 && !isFrozen) {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (done.length > 0 || isFrozen) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function usePlan(): { plan: Plan | null; ready: boolean } {
  const plan = useSyncExternalStore(subscribe, readPlan, () => null);
  // ready flips true after first client render to avoid SSR/CSR mismatch
  // (server always returns null from getServerSnapshot).
  // We use a tiny effect-based flag through subscribe so hook reruns once hydrated.
  return { plan, ready: typeof window !== "undefined" };
}

export function useProgress(planId: string | null): Progress | null {
  return useSyncExternalStore(
    subscribe,
    () => (planId ? readProgress(planId) : null),
    () => null,
  );
}

export function useTodayDone(planId: string | null): string[] {
  const progress = useProgress(planId);
  const key = dateKey();
  return progress?.byDay[key] ?? [];
}

/** Hook that triggers a re-render once after first paint — handy when readers
 *  need the "ready" flag separately from the snapshot. */
export function useHydrated(): boolean {
  const value = useSyncExternalStore(
    (cb) => {
      const id = window.requestAnimationFrame(() => cb());
      return () => window.cancelAnimationFrame(id);
    },
    () => true,
    () => false,
  );
  return value;
}

export function useTouchOnVisit(planId: string | null) {
  useEffect(() => {
    if (!planId || typeof window === "undefined") return;
    const current = readProgress(planId);
    const next: Progress = {
      ...current,
      lastVisit: new Date().toISOString(),
    };
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  }, [planId]);
}
