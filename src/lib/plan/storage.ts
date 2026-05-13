"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { JournalEntry, Plan, Progress } from "./types";
import { dateKey, weekKey } from "./generator";

const PLAN_KEY = "yup.plan";
const PROGRESS_KEY = "yup.progress";

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
  const wk = weekKey(new Date(`${date}T12:00:00Z`));
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
      cursor.setUTCDate(cursor.getUTCDate() - 1);
      continue;
    }
    if (done.length > 0 || isFrozen) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
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
