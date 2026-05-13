"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { dateKey, shiftDate } from "@/lib/plan/generator";
import type { JournalEntry } from "@/lib/plan/types";

type Props = {
  totalStepsPerDay: number;
  byDay: Record<string, string[]>;
  journals: Record<string, JournalEntry>;
  freezes: Record<string, string>;
  daysToShow?: number;
};

type Cell = {
  date: string;
  done: number;
  closed: boolean;
  frozen: boolean;
  inFuture: boolean;
  inPlan: boolean;
};

/**
 * 14-day (configurable) heatmap of daily completion. Each cell shows the
 * `done / total` ratio as a fill, a corner pin for closed days (journal), and
 * a snowflake glyph for streak-freeze days.
 */
export function HistoryHeatmap({
  totalStepsPerDay,
  byDay,
  journals,
  freezes,
  daysToShow = 14,
}: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const today = new Date();
  const cells: Cell[] = useMemo(() => {
    const list: Cell[] = [];
    const frozenDates = new Set(Object.values(freezes));
    for (let i = daysToShow - 1; i >= 0; i -= 1) {
      const date = dateKey(shiftDate(today, -i));
      const done = (byDay[date] ?? []).length;
      list.push({
        date,
        done,
        closed: !!journals[date],
        frozen: frozenDates.has(date),
        inFuture: false,
        inPlan: true,
      });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byDay, journals, freezes, daysToShow]);

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
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.history.eyebrow")}
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[0.55rem] tracking-[0.18em] uppercase text-white/40 font-semibold">
          <LegendDot fill="rgba(255,255,255,0.08)" />
          <span>{t("lk.history.legend.empty")}</span>
          <LegendDot fill="rgba(205,255,61,0.35)" />
          <span>{t("lk.history.legend.partial")}</span>
          <LegendDot fill="#CDFF3D" />
          <span>{t("lk.history.legend.full")}</span>
        </div>
      </header>

      <ul
        className="grid gap-1 sm:gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${daysToShow}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((c, i) => {
          const ratio = totalStepsPerDay
            ? Math.min(1, c.done / totalStepsPerDay)
            : 0;
          const filled = ratio > 0;
          const full = c.done >= totalStepsPerDay && totalStepsPerDay > 0;
          const tooltipParts = [
            t("lk.history.tooltip.done", { n: c.done }),
            c.closed ? t("lk.history.tooltip.closed") : "",
            c.frozen ? t("lk.history.tooltip.frozen") : "",
          ].filter(Boolean);
          return (
            <li
              key={c.date}
              className="relative aspect-square min-w-0"
              title={`${c.date}\n${tooltipParts.join("\n")}`}
              style={{
                transition: `opacity 420ms ease-out ${i * 50}ms, transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(4px)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[3px] border border-[color:var(--line)]"
                style={{
                  background: filled
                    ? full
                      ? "#CDFF3D"
                      : `rgba(205,255,61, ${0.18 + ratio * 0.45})`
                    : "rgba(255,255,255,0.04)",
                  boxShadow: full
                    ? "0 0 8px rgba(205,255,61,0.4)"
                    : undefined,
                }}
                aria-hidden
              />
              {c.closed ? (
                <span
                  className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-white/85"
                  aria-hidden
                />
              ) : null}
              {c.frozen ? (
                <span
                  className="absolute inset-0 flex items-center justify-center text-[0.6rem] text-white/85"
                  aria-hidden
                >
                  *
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[0.65rem] text-white/35 leading-relaxed">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white/85" />
          {t("lk.history.legend.closed")}
        </span>
        <span className="mx-3 text-white/20">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-white/85">*</span>
          {t("lk.history.legend.frozen")}
        </span>
      </p>
    </article>
  );
}

function LegendDot({ fill }: { fill: string }) {
  return (
    <span
      className="inline-block size-2 rounded-[3px]"
      style={{ background: fill }}
      aria-hidden
    />
  );
}
