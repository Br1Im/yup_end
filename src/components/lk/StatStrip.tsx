"use client";

import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  done: number;
  total: number;
  streak: number;
  loadMinutes: number;
};

export function StatStrip({ done, total, streak, loadMinutes }: Props) {
  const { t } = useI18n();

  const items = [
    {
      label: t("lk.stat.streak.label"),
      value: String(streak),
      suffix: t("lk.stat.streak.suffix"),
    },
    {
      label: t("lk.stat.completed.label"),
      value: t("lk.stat.completed.value", { done, total }),
    },
    {
      label: t("lk.stat.load.label"),
      value: String(loadMinutes),
      suffix: t("lk.stat.load.suffix"),
    },
    {
      label: t("lk.stat.peakwindow.label"),
      value: t("lk.stat.peakwindow.value"),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--line)] border-y border-[color:var(--line)]">
      {items.map((s) => (
        <div
          key={s.label}
          className="bg-[color:var(--bg)] px-5 py-6 sm:px-7 sm:py-8"
        >
          <div className="eyebrow text-white/45 text-[0.62rem]">{s.label}</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="display text-3xl sm:text-4xl text-white">
              {s.value}
            </span>
            {s.suffix ? (
              <span className="text-xs text-white/45 tracking-[0.2em] uppercase font-semibold">
                {s.suffix}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
