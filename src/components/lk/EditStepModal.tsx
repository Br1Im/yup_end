"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { updatePlanStep } from "@/lib/plan/storage";
import type { Step } from "@/lib/plan/types";

type Props = {
  step: Step;
  onClose: () => void;
};

const MIN_MINUTES = 5;
const MAX_MINUTES = 240;

/**
 * Lightweight inline editor for a single daily-template step.
 * Title, note and minutes are editable; sphere and id are stable.
 * Persists through `updatePlanStep`, then closes via `onClose`.
 */
export function EditStepModal({ step, onClose }: Props) {
  const { t } = useI18n();
  const [title, setTitle] = useState(step.title);
  const [note, setNote] = useState(step.note);
  const [minutes, setMinutes] = useState(step.minutes);
  const [mounted, setMounted] = useState(false);
  const portalReady = typeof document !== "undefined";

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    updatePlanStep(step.id, {
      title: trimmedTitle,
      note: note.trim(),
      minutes: clampMinutes(minutes),
    });
    onClose();
  };

  const dirty =
    title.trim() !== step.title ||
    note.trim() !== step.note ||
    clampMinutes(minutes) !== step.minutes;

  if (!portalReady) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editstep-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{
          transition: "opacity 280ms ease-out",
          opacity: mounted ? 1 : 0,
        }}
        onClick={onClose}
        aria-hidden
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-6 sm:p-7 shadow-[0_0_60px_rgba(205,255,61,0.18)]"
        style={{
          transition:
            "opacity 320ms ease-out, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "scale(1) translateY(0)"
            : "scale(0.94) translateY(12px)",
        }}
      >
        <header className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
              <span className="eyebrow text-white/55 text-[0.6rem]">
                {t("lk.editstep.eyebrow")}
              </span>
            </div>
            <h2
              id="editstep-title"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-white"
            >
              {t("lk.editstep.title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/45 hover:text-white transition-colors"
            aria-label={t("lk.editstep.cancel")}
          >
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </header>

        <div className="space-y-4">
          <label className="block">
            <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/55 font-semibold">
              {t("lk.editstep.title.label")}
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              maxLength={80}
              className="mt-1.5 w-full bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[color:var(--lime)] transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/55 font-semibold">
              {t("lk.editstep.note.label")}
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={200}
              rows={2}
              className="mt-1.5 w-full bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[color:var(--lime)] transition-colors resize-none"
            />
          </label>
          <label className="block">
            <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/55 font-semibold">
              {t("lk.editstep.minutes.label")}
            </span>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="number"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Number.parseInt(e.target.value, 10) || 0)
                }
                min={MIN_MINUTES}
                max={MAX_MINUTES}
                step={5}
                className="w-24 bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[color:var(--lime)] transition-colors"
              />
              <span className="text-xs text-white/45">
                {t("lk.editstep.minutes.hint")}
              </span>
            </div>
          </label>
        </div>

        <footer className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/55 hover:text-white transition-colors px-4 py-2"
          >
            {t("lk.editstep.cancel")}
          </button>
          <button
            type="submit"
            disabled={!dirty || !title.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-5 py-2.5 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Pencil className="size-4" strokeWidth={2} />
            {t("lk.editstep.save")}
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}

function clampMinutes(m: number): number {
  if (!Number.isFinite(m)) return MIN_MINUTES;
  return Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, Math.round(m)));
}
