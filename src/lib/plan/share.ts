import type { PlanIntake } from "./types";
import { DURATION_OPTIONS, FOCUS_WINDOWS, OBSTACLES, SPHERE_IDS } from "./types";

/**
 * Share-link payload. We share only the `intake` (what the user described) —
 * NOT the generated arc/dailyTemplate — so the receiver regenerates a fresh
 * plan locally with their own start date. This keeps the URL short and means
 * future improvements to the generator naturally apply to shared plans.
 *
 * Version is bumped if the intake shape changes incompatibly.
 */
type SharePayloadV1 = {
  v: 1;
  intake: PlanIntake;
};

const PARAM_KEY = "plan";

/** Encode an intake to a URL-safe base64 string. */
export function encodeIntakeToShare(intake: PlanIntake): string {
  const payload: SharePayloadV1 = { v: 1, intake };
  const json = JSON.stringify(payload);
  if (typeof window === "undefined") {
    // Server-side fallback: Buffer-style base64 isn't available here either,
    // but encodeIntakeToShare is only called from the client. Guard anyway.
    return "";
  }
  // Encode UTF-8 string → base64 → URL-safe form.
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const b64 = window.btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decode a `?plan=...` share string back to a PlanIntake.
 * Returns null on any decoding/shape error so the consumer can show a
 * fallback notice instead of crashing.
 */
export function decodeIntakeFromShare(raw: string): PlanIntake | null {
  if (!raw || typeof window === "undefined") return null;
  try {
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "===".slice((b64.length + 3) % 4);
    const bin = window.atob(padded);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as Partial<SharePayloadV1>;
    if (parsed.v !== 1 || !parsed.intake) return null;
    return sanitizeIntake(parsed.intake);
  } catch {
    return null;
  }
}

/**
 * Build a full share URL (origin + /start?plan=...) for the current intake.
 * Returns null if there's no window (SSR) so callers can hide the affordance.
 */
export function buildShareUrl(intake: PlanIntake): string | null {
  if (typeof window === "undefined") return null;
  const encoded = encodeIntakeToShare(intake);
  if (!encoded) return null;
  const url = new URL("/start", window.location.origin);
  url.searchParams.set(PARAM_KEY, encoded);
  return url.toString();
}

/** Read the `?plan=...` query param from the current URL, if any. */
export function readSharedIntakeFromLocation(): PlanIntake | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const raw = url.searchParams.get(PARAM_KEY);
  if (!raw) return null;
  return decodeIntakeFromShare(raw);
}

/**
 * Strip down a decoded intake to the fields we trust, with defaults so the
 * `/start` form always renders something sensible even on malformed input.
 */
function sanitizeIntake(raw: PlanIntake): PlanIntake | null {
  const goal = typeof raw.goal === "string" ? raw.goal.slice(0, 600) : "";
  if (!goal.trim()) return null;
  const identity =
    typeof raw.identity === "string" ? raw.identity.slice(0, 240) : undefined;

  const spheres: PlanIntake["spheres"] = {};
  for (const id of SPHERE_IDS) {
    const s = raw.spheres?.[id];
    if (!s) continue;
    spheres[id] = {
      title: clipString(s.title, 80),
      from: clipString(s.from, 60),
      to: clipString(s.to, 60),
    };
  }

  const minutesPerDay = pickFromTuple(
    [15, 30, 45, 60, 90] as const,
    raw.context?.minutesPerDay,
    30,
  );
  const focusWindow = pickFromTuple(FOCUS_WINDOWS, raw.context?.focusWindow, "morning");
  const obstacles = Array.isArray(raw.context?.obstacles)
    ? raw.context.obstacles.filter((o) =>
        (OBSTACLES as readonly string[]).includes(o),
      )
    : [];
  const durationDays = pickFromTuple(DURATION_OPTIONS, raw.durationDays, 90);

  return {
    goal,
    identity,
    spheres,
    context: { minutesPerDay, focusWindow, obstacles },
    durationDays,
  };
}

function clipString(v: string | undefined, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

function pickFromTuple<T extends readonly (string | number)[]>(
  allowed: T,
  candidate: unknown,
  fallback: T[number],
): T[number] {
  return (allowed as readonly (string | number)[]).includes(
    candidate as string | number,
  )
    ? (candidate as T[number])
    : fallback;
}
