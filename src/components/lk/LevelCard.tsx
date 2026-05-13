"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { PeakMark } from "../PeakMark";

type Props = {
  stageLabel: string;
  stageTitle: string;
  day: number;
  total: number;
};

export function LevelCard({ stageLabel, stageTitle, day, total }: Props) {
  const { t } = useI18n();
  const pct = Math.min(100, Math.round((day / total) * 100));

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <article
      className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-5 sm:p-6 h-full flex flex-col gap-5 transition-all duration-500"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_75%_-10%,rgba(205,255,61,0.18),transparent_60%)]" />

      <header className="relative flex items-center justify-between">
        <span className="eyebrow text-[color:var(--lime)] text-[0.6rem]">
          {stageLabel}
        </span>
        <span
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-12deg)",
            transition:
              "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms," +
              "opacity 400ms ease-out 300ms",
            display: "inline-flex",
          }}
        >
          <PeakMark size={11} />
        </span>
      </header>

      <div className="relative">
        <div className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {t("lk.level.title")}
        </div>
        <h2 className="display-tight mt-2 text-3xl sm:text-4xl text-white leading-[0.96]">
          {stageTitle}
        </h2>
      </div>

      <div className="relative grid grid-cols-2 gap-4 text-white">
        <div>
          <div className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
            {t("lk.level.day")}
          </div>
          <div className="display mt-1 text-2xl sm:text-3xl">
            {day}
            <span className="text-white/35 text-base sm:text-lg"> / {total}</span>
          </div>
        </div>
        <div>
          <div className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
            {t("lk.level.xp")}
          </div>
          <div className="display mt-1 text-2xl sm:text-3xl text-[color:var(--lime)]">
            {pct}
            <span className="text-white/35 text-base sm:text-lg">%</span>
          </div>
        </div>
      </div>

      <div className="relative mt-auto">
        <div className="h-1.5 w-full rounded-full bg-[color:var(--line)] overflow-hidden">
          <div
            className="h-full bg-[color:var(--lime)] shadow-[0_0_12px_rgba(205,255,61,0.5)] rounded-full"
            style={{
              width: mounted ? `${pct}%` : "0%",
              transition: "width 1200ms cubic-bezier(0.22, 1, 0.36, 1) 500ms",
            }}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between text-[0.6rem] tracking-[0.22em] uppercase font-semibold">
          <span className="text-white/45">{t("lk.level.toSummit")}</span>
          <span className="text-white/65">
            {total - day} {t("lk.level.daysShort")}
          </span>
        </div>
      </div>
    </article>
  );
}
