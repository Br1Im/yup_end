"use client";

import { Activity, BookOpen, Brain, Compass, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";
import type { PlanIntake, SphereId, SphereIntake } from "@/lib/plan/types";

type Props = {
  goal: string;
  spheres: PlanIntake["spheres"];
  onChange: (next: { goal?: string; spheres?: PlanIntake["spheres"] }) => void;
  errorVisible: boolean;
};

const SPHERE_META: {
  id: SphereId;
  icon: LucideIcon;
  labelKey: TranslationKey;
  hintKey: TranslationKey;
}[] = [
  {
    id: "lang",
    icon: Languages,
    labelKey: "start.s1.sphere.lang.label",
    hintKey: "start.s1.sphere.lang.hint",
  },
  {
    id: "body",
    icon: Activity,
    labelKey: "start.s1.sphere.body.label",
    hintKey: "start.s1.sphere.body.hint",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    labelKey: "start.s1.sphere.knowledge.label",
    hintKey: "start.s1.sphere.knowledge.hint",
  },
  {
    id: "habits",
    icon: Compass,
    labelKey: "start.s1.sphere.habits.label",
    hintKey: "start.s1.sphere.habits.hint",
  },
  {
    id: "mind",
    icon: Brain,
    labelKey: "start.s1.sphere.mind.label",
    hintKey: "start.s1.sphere.mind.hint",
  },
];

export function StepGoal({ goal, spheres, onChange, errorVisible }: Props) {
  const { t } = useI18n();

  const updateSphere = (id: SphereId, patch: Partial<SphereIntake>) => {
    const current = spheres[id] ?? {};
    const merged: SphereIntake = { ...current, ...patch };
    const isEmpty =
      !merged.title?.trim() && !merged.from?.trim() && !merged.to?.trim();
    const nextSpheres: PlanIntake["spheres"] = { ...spheres };
    if (isEmpty) {
      delete nextSpheres[id];
    } else {
      nextSpheres[id] = merged;
    }
    onChange({ spheres: nextSpheres });
  };

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("start.s1.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2rem,5vw,3.6rem)] leading-[0.92]">
            {t("start.s1.title")}
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-6 max-w-2xl text-white/65 leading-relaxed">
            {t("start.s1.lead")}
          </p>
        </Reveal>

        <Reveal variant="soft" delay={2}>
          <div className="mt-8">
            <label
              htmlFor="goal"
              className="block eyebrow text-white/55 text-[0.62rem] mb-3"
            >
              {t("start.s1.goal.label")}
            </label>
            <textarea
              id="goal"
              value={goal}
              onChange={(e) => onChange({ goal: e.target.value })}
              placeholder={t("start.s1.goal.placeholder")}
              rows={4}
              className="w-full bg-[color:var(--bg-2)] border border-[color:var(--line-strong)] rounded-2xl px-5 py-4 text-base text-white placeholder-white/35 focus:outline-none focus:border-[color:var(--lime)] transition-colors resize-none"
            />
            {errorVisible ? (
              <p className="mt-3 text-sm text-[color:var(--lime)]">
                {t("start.s1.error")}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>

      <div>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="size-2 rounded-full bg-[color:var(--lime)]/60" />
          <span className="eyebrow text-white/55">
            {t("start.s1.spheres.title")}
          </span>
        </div>
        <p className="text-white/55 leading-relaxed text-sm mb-6 max-w-2xl">
          {t("start.s1.spheres.optional")}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--line)] border border-[color:var(--line)]">
          {SPHERE_META.map(({ id, icon: Icon, labelKey, hintKey }) => {
            const data = spheres[id] ?? {};
            return (
              <li
                key={id}
                className="bg-[color:var(--bg-2)] p-5 sm:p-6 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/70">
                      <Icon className="size-4" strokeWidth={1.7} />
                    </div>
                    <span className="text-[0.66rem] tracking-[0.22em] uppercase text-white font-semibold">
                      {t(labelKey)}
                    </span>
                  </div>
                  <span className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35 font-semibold">
                    {t(hintKey)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={data.from ?? ""}
                    onChange={(e) =>
                      updateSphere(id, { from: e.target.value })
                    }
                    placeholder={t("start.s1.sphere.from")}
                    className="bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[color:var(--lime)] transition-colors"
                    aria-label={`${t(labelKey)} — ${t("start.s1.sphere.from")}`}
                  />
                  <input
                    type="text"
                    value={data.to ?? ""}
                    onChange={(e) =>
                      updateSphere(id, { to: e.target.value })
                    }
                    placeholder={t("start.s1.sphere.to")}
                    className="bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[color:var(--lime)] transition-colors"
                    aria-label={`${t(labelKey)} — ${t("start.s1.sphere.to")}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
