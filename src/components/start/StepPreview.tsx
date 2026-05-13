"use client";

import { Activity, BookOpen, Brain, Compass, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";
import { totalMinutes } from "@/lib/plan/generator";
import type { Plan, SphereId } from "@/lib/plan/types";

type Props = {
  plan: Plan;
};

const SPHERE_ICON: Record<SphereId, LucideIcon> = {
  lang: Languages,
  body: Activity,
  knowledge: BookOpen,
  habits: Compass,
  mind: Brain,
};

export function StepPreview({ plan }: Props) {
  const { t } = useI18n();
  const total = totalMinutes(plan.dailyTemplate);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <span className="eyebrow text-white/55">{t("start.s3.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.88]">
            <span className="block">{t("start.s3.title.l1")}</span>
            <span className="block text-[color:var(--lime)] text-glow-lime">
              {t("start.s3.title.l2")}
            </span>
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-6 max-w-2xl text-white/65 leading-relaxed">
            {t("start.s3.lead")}
          </p>
        </Reveal>
      </div>

      <Reveal variant="soft" delay={2}>
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="size-1.5 rounded-full bg-[color:var(--lime)]/60" />
            <span className="eyebrow text-white/55">
              {t("start.s3.arc.title")}
            </span>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[14px] top-3 bottom-3 w-px bg-[color:var(--line)]"
            />
            {plan.arc.map((stage, i) => {
              const isFirst = i === 0;
              return (
                <li
                  key={stage.id}
                  className="relative pl-12 py-4 first:pt-1 last:pb-1"
                >
                  <span
                    aria-hidden
                    className={
                      "absolute left-2 top-5 size-3 rounded-full " +
                      (isFirst
                        ? "bg-[color:var(--lime)] shadow-[0_0_14px_rgba(205,255,61,0.7)]"
                        : "bg-[color:var(--bg-3)] border border-[color:var(--line-strong)]")
                    }
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={
                          "text-[0.66rem] tracking-[0.22em] uppercase font-semibold " +
                          (isFirst
                            ? "text-[color:var(--lime)]"
                            : "text-white/40")
                        }
                      >
                        {t(stage.labelKey as TranslationKey)}
                      </span>
                      <h3
                        className={
                          "display text-base sm:text-lg " +
                          (isFirst
                            ? "text-[color:var(--lime)]"
                            : "text-white/55")
                        }
                      >
                        {t(stage.titleKey as TranslationKey)}
                      </h3>
                    </div>
                    <span className="text-xs text-white/35 uppercase tracking-[0.18em] font-semibold">
                      {stage.startDay === stage.endDay
                        ? `${stage.startDay}`
                        : `${stage.startDay}–${stage.endDay}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </Reveal>

      <Reveal variant="soft" delay={3}>
        <section>
          <div className="flex items-baseline justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-baseline gap-3">
              <span className="size-1.5 rounded-full bg-[color:var(--lime)]/60" />
              <span className="eyebrow text-white/55">
                {t("start.s3.daily.title")}
              </span>
            </div>
            <span className="text-[0.66rem] tracking-[0.22em] uppercase text-[color:var(--lime)] font-semibold">
              {t("start.s3.daily.subtitle", { total })}
            </span>
          </div>

          <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {plan.dailyTemplate.map((step, i) => {
              const Icon = SPHERE_ICON[step.sphere];
              return (
                <li
                  key={step.id}
                  className="flex items-start gap-4 sm:gap-6 py-5 sm:py-6"
                >
                  <div className="flex flex-col items-center gap-2 pt-1 shrink-0 w-9 sm:w-12">
                    <span className="text-[0.62rem] tracking-[0.22em] uppercase text-white/35 font-semibold">
                      / 0{i + 1}
                    </span>
                    <Icon
                      className="size-5 text-white/70"
                      strokeWidth={1.7}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[0.66rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--lime)]">
                        {t(`lk.steps.s${i + 1}.sphere` as TranslationKey)}
                      </span>
                      <span className="text-xs text-white/45 tracking-[0.2em] uppercase font-semibold">
                        {step.minutes} {t("lk.steps.minutes")}
                      </span>
                    </div>
                    <h3 className="display mt-2 text-xl text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-white/55 leading-relaxed text-sm max-w-2xl">
                      {step.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs text-white/40 leading-relaxed max-w-2xl">
            {t("start.s3.tip")}
          </p>
        </section>
      </Reveal>
    </div>
  );
}
