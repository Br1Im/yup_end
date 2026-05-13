"use client";

import { Languages, Activity, BookOpen, Compass, Brain } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function Domains() {
  const { t } = useI18n();

  const domains = [
    { icon: Languages, title: t("domains.lang.t"), text: t("domains.lang.d") },
    { icon: Activity, title: t("domains.body.t"), text: t("domains.body.d") },
    {
      icon: BookOpen,
      title: t("domains.knowledge.t"),
      text: t("domains.knowledge.d"),
    },
    { icon: Compass, title: t("domains.habits.t"), text: t("domains.habits.d") },
    { icon: Brain, title: t("domains.mind.t"), text: t("domains.mind.d") },
  ];

  return (
    <section
      id="domains"
      className="relative bg-[color:var(--bg)] scroll-mt-20 text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("domains.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(3rem,9vw,8.5rem)] leading-[0.86]">
            <span className="block">{t("domains.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">
              {t("domains.title.l2")}
            </span>
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
            {t("domains.lead")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--line)]">
          {domains.map((d, i) => (
            <Reveal
              key={d.title}
              as="li"
              variant="soft"
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className="relative bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-7 group transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white group-hover:border-[color:var(--lime)] group-hover:text-[color:var(--lime)] transition-colors">
                  <d.icon className="size-[18px]" strokeWidth={1.7} />
                </div>
                <span className="text-[0.66rem] tracking-[0.22em] uppercase text-white/35 group-hover:text-[color:var(--lime)] font-semibold transition-colors">
                  / 0{i + 1}
                </span>
              </div>
              <h3 className="display mt-8 text-2xl text-white group-hover:text-[color:var(--lime)] transition-colors">{d.title}</h3>
              <p className="mt-3 text-white/55 leading-relaxed text-[0.9rem]">
                {d.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
