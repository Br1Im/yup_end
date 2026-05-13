"use client";

import { Activity, BookOpen, Brain, Compass, Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";

export function SphereProgress() {
  const { t } = useI18n();

  const items = [
    {
      icon: Languages,
      label: t("lk.spheres.lang.label"),
      metric: t("lk.spheres.lang.metric"),
      streak: t("lk.spheres.lang.streak"),
      progress: 62,
    },
    {
      icon: Activity,
      label: t("lk.spheres.body.label"),
      metric: t("lk.spheres.body.metric"),
      streak: t("lk.spheres.body.streak"),
      progress: 54,
    },
    {
      icon: BookOpen,
      label: t("lk.spheres.knowledge.label"),
      metric: t("lk.spheres.knowledge.metric"),
      streak: t("lk.spheres.knowledge.streak"),
      progress: 33,
    },
    {
      icon: Compass,
      label: t("lk.spheres.habits.label"),
      metric: t("lk.spheres.habits.metric"),
      streak: t("lk.spheres.habits.streak"),
      progress: 76,
    },
    {
      icon: Brain,
      label: t("lk.spheres.mind.label"),
      metric: t("lk.spheres.mind.metric"),
      streak: t("lk.spheres.mind.streak"),
      progress: 60,
    },
  ];

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
          {items.map((s, i) => (
            <Reveal
              as="li"
              variant="soft"
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              key={s.label}
              className="bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-7 group transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white group-hover:border-[color:var(--lime)] group-hover:text-[color:var(--lime)] transition-colors">
                  <s.icon className="size-[18px]" strokeWidth={1.7} />
                </div>
                <span className="text-[0.66rem] tracking-[0.22em] uppercase text-white/35 group-hover:text-[color:var(--lime)] font-semibold transition-colors">
                  / 0{i + 1}
                </span>
              </div>
              <h3 className="display mt-8 text-2xl text-white group-hover:text-[color:var(--lime)] transition-colors">
                {s.label}
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
                    {s.streak}
                  </span>
                  <span className="text-[0.66rem] tracking-[0.2em] uppercase text-[color:var(--lime)] font-semibold">
                    {s.progress}%
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
