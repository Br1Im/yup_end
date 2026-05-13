"use client";

import { Activity, BookOpen, Brain, Compass, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";
import type { SphereId } from "@/lib/plan/types";

const SPHERE_ICON: Record<SphereId, LucideIcon> = {
  lang: Languages,
  body: Activity,
  knowledge: BookOpen,
  habits: Compass,
  mind: Brain,
};

const SPHERE_LABEL: Record<SphereId, TranslationKey> = {
  lang: "domains.lang.t",
  body: "domains.body.t",
  knowledge: "domains.knowledge.t",
  habits: "domains.habits.t",
  mind: "domains.mind.t",
};

export type SphereStat = {
  sphere: SphereId;
  /** Short metric line, e.g. "Испанский B1 → B2" or "23 шага / 90". */
  metric: string;
  /** Tiny label under bar, e.g. "12 дней". */
  streakLabel: string;
  /** 0–100. */
  progress: number;
};

type Props = {
  items: SphereStat[];
};

export function SphereProgress({ items }: Props) {
  const { t } = useI18n();

  return (
    <section
      id="spheres"
      className="relative bg-[color:var(--bg)] text-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">
            {t("lk.spheres.eyebrow")}
          </span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2.4rem,7vw,6rem)] leading-[0.86]">
            <span className="block">{t("lk.spheres.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">
              {t("lk.spheres.title.l2")}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--line)]">
          {items.map((s, i) => {
            const Icon = SPHERE_ICON[s.sphere];
            return (
              <Reveal
                as="li"
                variant="soft"
                delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                key={s.sphere}
                className="bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-7 group transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="size-11 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white group-hover:border-[color:var(--lime)] group-hover:text-[color:var(--lime)] transition-colors">
                    <Icon className="size-[18px]" strokeWidth={1.7} />
                  </div>
                  <span className="text-[0.66rem] tracking-[0.22em] uppercase text-white/35 group-hover:text-[color:var(--lime)] font-semibold transition-colors">
                    / 0{i + 1}
                  </span>
                </div>
                <h3 className="display mt-8 text-2xl text-white group-hover:text-[color:var(--lime)] transition-colors">
                  {t(SPHERE_LABEL[s.sphere])}
                </h3>
                <p className="mt-2 text-white/55 leading-relaxed text-[0.85rem]">
                  {s.metric}
                </p>

                <div className="mt-5">
                  <div className="h-1 w-full bg-[color:var(--line)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[color:var(--lime)] rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-[0.66rem] tracking-[0.2em] uppercase text-white/35 font-semibold">
                      {s.streakLabel}
                    </span>
                    <span className="text-[0.66rem] tracking-[0.2em] uppercase text-[color:var(--lime)] font-semibold">
                      {s.progress}%
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
