export const SPHERE_IDS = ["lang", "body", "knowledge", "habits", "mind"] as const;
export type SphereId = (typeof SPHERE_IDS)[number];

export const DURATION_OPTIONS = [90, 180, 365] as const;
export type Duration = (typeof DURATION_OPTIONS)[number];

export const TIME_OPTIONS = [15, 30, 45, 60, 90] as const;
export type MinutesPerDay = (typeof TIME_OPTIONS)[number];

export const FOCUS_WINDOWS = ["morning", "day", "evening"] as const;
export type FocusWindow = (typeof FOCUS_WINDOWS)[number];

export const FOCUS_WINDOW_LABELS: Record<FocusWindow, string> = {
  morning: "06:00–12:00",
  day: "12:00–18:00",
  evening: "18:00–22:00",
};

export const OBSTACLES = [
  "procrastination",
  "rhythm",
  "deadlines",
  "invisible",
  "social",
  "sleep",
] as const;
export type Obstacle = (typeof OBSTACLES)[number];

export type SphereIntake = {
  /** Short headline, e.g. "Испанский B1 → B2" */
  title?: string;
  /** Starting state, e.g. "B1" */
  from?: string;
  /** Target state, e.g. "B2" */
  to?: string;
};

export type PlanIntake = {
  goal: string;
  spheres: Partial<Record<SphereId, SphereIntake>>;
  context: {
    minutesPerDay: MinutesPerDay;
    focusWindow: FocusWindow;
    obstacles: Obstacle[];
  };
  durationDays: Duration;
};

export type ArcStage = {
  id: "base" | "camp1" | "camp2" | "camp3" | "summit";
  startDay: number;
  endDay: number;
  /** e.g. "База", "Лагерь I" */
  labelKey: string;
  /** e.g. "Старт", "Маршрут" — what happens here */
  titleKey: string;
};

export type Step = {
  id: string;
  sphere: SphereId;
  title: string;
  note: string;
  minutes: number;
};

export type Plan = {
  id: string;
  version: 1;
  createdAt: string;
  startedAt: string;
  durationDays: Duration;
  intake: PlanIntake;
  arc: ArcStage[];
  dailyTemplate: Step[];
};

export type DayProgress = {
  /** ISO date key, e.g. "2026-05-13" */
  date: string;
  /** Step ids that are done */
  done: string[];
};

export type Progress = {
  planId: string;
  /** date string -> step ids */
  byDay: Record<string, string[]>;
  lastVisit: string;
};
