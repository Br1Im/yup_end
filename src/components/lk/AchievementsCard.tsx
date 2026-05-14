"use client";

import { useEffect, useState } from "react";
import {
  Award,
  CalendarCheck2,
  Flag,
  Flame,
  Layers,
  Medal,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import {
  computeAchievements,
  totalAchievements,
  type AchievementId,
} from "@/lib/plan/achievements";
import type { Plan, Progress } from "@/lib/plan/types";

const ICONS: Record<AchievementId, LucideIcon> = {
  first_step: Sparkles,
  first_close: CalendarCheck2,
  streak3: Flame,
  streak7: Flame,
  streak30: Flame,
  perfectDay: Target,
  campI: Flag,
  halfway: Layers,
  allSpheres: Trophy,
};

export function AchievementsCard({
  plan,
  progress,
}: {
  plan: Plan;
  progress: Progress | null;
}) {
  const { t } = useI18n();
  const earned = computeAchievements(plan, progress);
  const total = totalAchievements();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

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
            {t("lk.achv.eyebrow")}
          </h3>
        </div>
        <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {earned.length} / {total}
        </span>
      </header>

      {earned.length === 0 ? (
        <div className="flex items-center gap-3 text-sm text-white/45">
          <Award className="size-4" strokeWidth={1.6} />
          {t("lk.achv.empty")}
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {earned.map((a, i) => {
            const Icon = ICONS[a.id] ?? Medal;
            return (
              <li
                key={a.id}
                title={t(`lk.achv.${a.id}.s` as TranslationKey)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--lime)]/40 bg-[color:var(--lime)]/[0.08] px-3 py-1.5 text-[0.7rem] font-semibold text-[color:var(--lime)]"
                style={{
                  transition: `opacity 380ms ease-out ${140 + i * 60}ms, transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1) ${140 + i * 60}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0.85)",
                }}
              >
                <Icon className="size-3.5" strokeWidth={2} />
                <span>{t(`lk.achv.${a.id}.t` as TranslationKey)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
