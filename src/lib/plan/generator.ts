import type {
  ArcStage,
  Duration,
  MinutesPerDay,
  Plan,
  PlanIntake,
  SphereId,
  SphereIntake,
  Step,
} from "./types";

/**
 * Deterministic mock generator: turns intake → Plan with arc + daily template.
 * Replaced later by a real LLM call.
 */
export function generatePlan(intake: PlanIntake, now: Date = new Date()): Plan {
  const id = makeId();
  const iso = now.toISOString();
  return {
    id,
    version: 1,
    createdAt: iso,
    startedAt: iso,
    durationDays: intake.durationDays,
    intake,
    arc: makeArc(intake.durationDays),
    dailyTemplate: makeDailyTemplate(intake),
  };
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `plan-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function makeArc(durationDays: Duration): ArcStage[] {
  if (durationDays === 90) {
    return [
      {
        id: "base",
        startDay: 1,
        endDay: 14,
        labelKey: "lk.ascent.c1.label",
        titleKey: "lk.ascent.c1.t",
      },
      {
        id: "camp1",
        startDay: 15,
        endDay: 42,
        labelKey: "lk.ascent.c2.label",
        titleKey: "lk.ascent.c2.t",
      },
      {
        id: "summit",
        startDay: 43,
        endDay: 90,
        labelKey: "lk.ascent.c4.label",
        titleKey: "lk.ascent.c4.t",
      },
    ];
  }

  if (durationDays === 180) {
    return [
      { id: "base", startDay: 1, endDay: 21, labelKey: "lk.ascent.c1.label", titleKey: "lk.ascent.c1.t" },
      { id: "camp1", startDay: 22, endDay: 70, labelKey: "lk.ascent.c2.label", titleKey: "lk.ascent.c2.t" },
      { id: "camp2", startDay: 71, endDay: 130, labelKey: "lk.ascent.c3.label", titleKey: "lk.ascent.c3.t" },
      { id: "summit", startDay: 131, endDay: 180, labelKey: "lk.ascent.c4.label", titleKey: "lk.ascent.c4.t" },
    ];
  }

  return [
    { id: "base", startDay: 1, endDay: 30, labelKey: "lk.ascent.c1.label", titleKey: "lk.ascent.c1.t" },
    { id: "camp1", startDay: 31, endDay: 120, labelKey: "lk.ascent.c2.label", titleKey: "lk.ascent.c2.t" },
    { id: "camp2", startDay: 121, endDay: 240, labelKey: "lk.ascent.c3.label", titleKey: "lk.ascent.c3.t" },
    { id: "summit", startDay: 241, endDay: 365, labelKey: "lk.ascent.c4.label", titleKey: "lk.ascent.c4.t" },
  ];
}

/** Approximate default distribution. Sum ≈ 1. */
const SPHERE_WEIGHTS: Record<SphereId, number> = {
  lang: 0.2,
  body: 0.35,
  knowledge: 0.25,
  habits: 0.13,
  mind: 0.07,
};

function makeDailyTemplate(intake: PlanIntake): Step[] {
  const total = intake.context.minutesPerDay;
  const allocations = allocateMinutes(total);
  const steps: Step[] = [];
  let idx = 1;
  for (const sphere of ["lang", "body", "knowledge", "habits", "mind"] as const) {
    steps.push(
      makeStep(`s${idx}`, sphere, intake.spheres[sphere], allocations[sphere]),
    );
    idx += 1;
  }
  return steps;
}

function allocateMinutes(
  total: MinutesPerDay,
): Record<SphereId, number> {
  const raw: Record<SphereId, number> = {
    lang: total * SPHERE_WEIGHTS.lang,
    body: total * SPHERE_WEIGHTS.body,
    knowledge: total * SPHERE_WEIGHTS.knowledge,
    habits: total * SPHERE_WEIGHTS.habits,
    mind: total * SPHERE_WEIGHTS.mind,
  };
  // Round to nearest 5 except mind which clamps to >= 3.
  const rounded: Record<SphereId, number> = {
    lang: roundTo(raw.lang, 1),
    body: roundTo(raw.body, 5),
    knowledge: roundTo(raw.knowledge, 5),
    habits: roundTo(raw.habits, 1),
    mind: Math.max(3, Math.round(raw.mind)),
  };
  return rounded;
}

function roundTo(value: number, step: number): number {
  return Math.max(step, Math.round(value / step) * step);
}

type StepTemplate = {
  title: string;
  note: string;
};

function makeStep(
  id: string,
  sphere: SphereId,
  intake: SphereIntake | undefined,
  minutes: number,
): Step {
  const tpl = pickTemplate(sphere, intake);
  return {
    id,
    sphere,
    title: tpl.title,
    note: tpl.note,
    minutes,
  };
}

function pickTemplate(
  sphere: SphereId,
  intake: SphereIntake | undefined,
): StepTemplate {
  const title = intake?.title?.trim();
  switch (sphere) {
    case "lang":
      return {
        title: title || "Язык: 15 карточек Anki",
        note:
          intake?.to
            ? `Anki + 10 минут говорения. Цель: ${intake.from ?? "сейчас"} → ${intake.to}.`
            : "Anki, deck по уровню, повторение + новые слова.",
      };
    case "body":
      return {
        title: title || "Базовая сила: присед + жим",
        note:
          intake?.to
            ? `5×5 база, прогрессия по плану. Цель: ${intake.from ?? "сейчас"} → ${intake.to}.`
            : "5×5 присед / тяга / жим, кор. План B.",
      };
    case "knowledge":
      return {
        title: title || "Глубокое чтение — 25 мин",
        note:
          intake?.to
            ? `25 мин чтения + 3 строки выписки. Цель: ${intake.to}.`
            : "25 мин чтения + 3 строки выписки в журнал.",
      };
    case "habits":
      return {
        title: title || "Утро без телефона",
        note:
          intake?.to
            ? `Ритуал: вода, окно, журнал. Без ленты. Цель: ${intake.to}.`
            : "После подъёма — вода, окно, дневник. Без ленты.",
      };
    case "mind":
      return {
        title: title || "Вечерняя рефлексия — 3 строки",
        note: "Что зашло. Что слилось. Что меняем завтра.",
      };
  }
}

export function stageForDay(plan: Plan, day: number): ArcStage {
  for (const stage of plan.arc) {
    if (day >= stage.startDay && day <= stage.endDay) {
      return stage;
    }
  }
  return plan.arc[plan.arc.length - 1];
}

export function dayOfPlan(plan: Plan, now: Date = new Date()): number {
  const start = new Date(plan.startedAt);
  const startUtc = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate(),
  );
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const diff = Math.floor((todayUtc - startUtc) / 86400000);
  return Math.min(Math.max(diff + 1, 1), plan.durationDays);
}

export function dateKey(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function totalMinutes(steps: Step[]): number {
  return steps.reduce((acc, s) => acc + s.minutes, 0);
}
