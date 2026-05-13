"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";

export function TodayHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[color:var(--bg)] border-b border-[color:var(--line)] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 30%, rgba(205,255,61,0.10) 0%, rgba(205,255,61,0) 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 slashes opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 pt-12 sm:pt-16 pb-14 sm:pb-20">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <span className="eyebrow text-white/55">
            {t("lk.topbar.greeting")}
          </span>
        </div>

        <Reveal>
          <h1 className="display-tight text-[clamp(2.8rem,9.5vw,8.5rem)] leading-[0.86]">
            <span className="block">{t("lk.hero.title.l1")}</span>
            <span className="block text-[color:var(--lime)] text-glow-lime">
              {t("lk.hero.title.l2")}
            </span>
          </h1>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-8 max-w-xl text-white/65 leading-relaxed">
            {t("lk.hero.lead")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
