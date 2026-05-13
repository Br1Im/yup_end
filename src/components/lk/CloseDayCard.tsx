"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Moon, Pencil, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { dateKey } from "@/lib/plan/generator";
import { setJournalEntry } from "@/lib/plan/storage";
import type { JournalEntry } from "@/lib/plan/types";

type Props = {
  planId: string;
  doneToday: number;
  totalSteps: number;
  todayEntry: JournalEntry | null;
};

/**
 * Card that prompts the user to close their day with a 3-line journal.
 * Opens a modal with three textareas; on submit, persists to localStorage.
 */
export function CloseDayCard({ planId, doneToday, totalSteps, todayEntry }: Props) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const closed = !!todayEntry;
  const closedAtLabel = todayEntry
    ? new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(todayEntry.closedAt))
    : "";

  return (
    <article
      className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-4 sm:p-5"
      style={{
        transition:
          "opacity 540ms ease-out, transform 640ms cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.closeday.eyebrow")}
          </h3>
        </div>
        <span className="text-[0.62rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {doneToday} / {totalSteps}
        </span>
      </header>

      {closed ? (
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--lime)]">
              {t("lk.closeday.closed")}
            </h4>
            <span className="text-xs text-white/45 font-semibold">
              {t("lk.closeday.closed.at", { time: closedAtLabel })}
            </span>
          </div>
          <JournalPreview entry={todayEntry} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-[color:var(--lime)] transition-colors"
          >
            <Pencil className="size-3.5" strokeWidth={1.7} />
            {t("lk.closeday.reopen")}
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {t("lk.closeday.title")}
            </h4>
            <p className="text-sm text-white/55 mt-1 max-w-lg leading-relaxed">
              {t("lk.closeday.lead")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-5 py-2.5 text-sm hover:brightness-110 transition self-start"
          >
            <Moon className="size-4" strokeWidth={2} />
            {t("lk.closeday.cta")}
          </button>
        </div>
      )}

      {open ? (
        <CloseDayModal
          planId={planId}
          existing={todayEntry}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </article>
  );
}

function JournalPreview({ entry }: { entry: JournalEntry }) {
  const items = [
    { label: "+", value: entry.good },
    { label: "−", value: entry.lost },
    { label: "→", value: entry.tomorrow },
  ].filter((i) => i.value?.trim().length);
  if (items.length === 0) return null;
  return (
    <ul className="text-sm text-white/65 space-y-1.5 leading-relaxed">
      {items.map((i, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="text-[color:var(--lime)] font-semibold w-3 shrink-0">
            {i.label}
          </span>
          <span className="line-clamp-2">{i.value}</span>
        </li>
      ))}
    </ul>
  );
}

function CloseDayModal({
  planId,
  existing,
  onClose,
}: {
  planId: string;
  existing: JournalEntry | null;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [good, setGood] = useState(existing?.good ?? "");
  const [lost, setLost] = useState(existing?.lost ?? "");
  const [tomorrow, setTomorrow] = useState(existing?.tomorrow ?? "");
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
    const today = dateKey();
    setJournalEntry(planId, today, {
      good: good.trim(),
      lost: lost.trim(),
      tomorrow: tomorrow.trim(),
    });
    onClose();
  };

  const canSubmit =
    good.trim().length > 0 ||
    lost.trim().length > 0 ||
    tomorrow.trim().length > 0;

  if (!portalReady) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="closeday-title"
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
        className="relative w-full max-w-xl rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-6 sm:p-8 shadow-[0_0_60px_rgba(205,255,61,0.18)]"
        style={{
          transition:
            "opacity 320ms ease-out, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)",
        }}
      >
        <header className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
              <span className="eyebrow text-white/55 text-[0.6rem]">
                {t("lk.closeday.eyebrow")}
              </span>
            </div>
            <h2
              id="closeday-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
            >
              {t("lk.closeday.title")}
            </h2>
            <p className="text-sm text-white/55 mt-1 max-w-md leading-relaxed">
              {t("lk.closeday.lead")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/45 hover:text-white transition-colors"
            aria-label={t("lk.closeday.cancel")}
          >
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </header>

        <div className="space-y-4">
          <FieldArea
            id="cd-good"
            label={t("lk.closeday.good.label")}
            placeholder={t("lk.closeday.good.ph")}
            value={good}
            onChange={setGood}
            accent="lime"
          />
          <FieldArea
            id="cd-lost"
            label={t("lk.closeday.lost.label")}
            placeholder={t("lk.closeday.lost.ph")}
            value={lost}
            onChange={setLost}
            accent="muted"
          />
          <FieldArea
            id="cd-tomorrow"
            label={t("lk.closeday.tomorrow.label")}
            placeholder={t("lk.closeday.tomorrow.ph")}
            value={tomorrow}
            onChange={setTomorrow}
            accent="lime"
          />
        </div>

        <footer className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/55 hover:text-white transition-colors px-4 py-2"
          >
            {t("lk.closeday.cancel")}
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-5 py-2.5 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Moon className="size-4" strokeWidth={2} />
            {t("lk.closeday.cta")}
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}

function FieldArea({
  id,
  label,
  placeholder,
  value,
  onChange,
  accent,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  accent: "lime" | "muted";
}) {
  const dotClass =
    accent === "lime"
      ? "bg-[color:var(--lime)]"
      : "bg-white/40";
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center gap-2 mb-1.5 text-xs text-white/70 font-semibold">
        <span className={`size-1.5 rounded-full ${dotClass}`} />
        {label}
      </span>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[color:var(--lime)] transition-colors resize-none"
      />
    </label>
  );
}
