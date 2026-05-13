"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Flame, ListChecks, Clock, Sun, Snowflake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  streak: number;
  done: number;
  total: number;
  loadMinutes: number;
  /** e.g. "09:00–11:30". */
  windowLabel: string;
  freezeAvailable: boolean;
};

type Item = {
  icon: LucideIcon;
  label: string;
  value: string;
  suffix?: string;
  pct?: number;
  badge?: ReactNode;
};

export function StatusBar({
  streak,
  done,
  total,
  loadMinutes,
  windowLabel,
  freezeAvailable,
}: Props) {
  const { t, tp } = useI18n();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const items: Item[] = [
    {
      icon: Flame,
      label: t("lk.stat.streak.label"),
      value: String(streak),
      suffix: tp("lk.stat.streak.suffix", streak),
      pct: Math.min(100, streak * 5),
      badge: freezeAvailable ? (
        <span
          className="inline-flex items-center gap-1 text-[0.55rem] tracking-[0.18em] uppercase text-[color:var(--lime)] font-semibold"
          title={t("lk.freeze.hint")}
        >
          <Snowflake className="size-2.5" strokeWidth={2} />
          {t("lk.freeze.available")}
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-1 text-[0.55rem] tracking-[0.18em] uppercase text-white/35 font-semibold"
          title={t("lk.freeze.hint")}
        >
          <Snowflake className="size-2.5" strokeWidth={2} />
          {t("lk.freeze.used")}
        </span>
      ),
    },
    {
      icon: ListChecks,
      label: t("lk.stat.completed.label"),
      value: `${done} / ${total}`,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
    },
    {
      icon: Clock,
      label: t("lk.stat.load.label"),
      value: String(loadMinutes),
      suffix: tp("lk.stat.load.suffix", loadMinutes),
    },
    {
      icon: Sun,
      label: t("lk.stat.peakwindow.label"),
      value: windowLabel,
    },
  ];

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((s, i) => {
        const Icon = s.icon;
        return (
          <li
            key={s.label}
            className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-4 sm:p-5 transition-colors hover:border-[color:var(--lime)]/40"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 460ms ease-out ${i * 90}ms, transform 520ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 90}ms`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow text-white/45 text-[0.58rem] truncate">
                {s.label}
              </span>
              <Icon
                className="size-3.5 text-white/45 shrink-0"
                strokeWidth={1.7}
              />
            </div>
            <div className="mt-2.5 flex items-baseline gap-1.5">
              <span className="display text-2xl sm:text-3xl text-white leading-none">
                {s.value}
              </span>
              {s.suffix ? (
                <span className="text-[0.62rem] text-white/45 tracking-[0.18em] uppercase font-semibold">
                  {s.suffix}
                </span>
              ) : null}
            </div>
            {typeof s.pct === "number" ? (
              <div className="mt-3 h-1 w-full rounded-full bg-[color:var(--line)] overflow-hidden">
                <div
                  className="h-full bg-[color:var(--lime)] rounded-full"
                  style={{
                    width: mounted ? `${s.pct}%` : "0%",
                    transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${250 + i * 110}ms`,
                  }}
                />
              </div>
            ) : (
              <div className="mt-3 h-1" />
            )}
            {s.badge ? <div className="mt-2">{s.badge}</div> : null}
          </li>
        );
      })}
    </ul>
  );
}
