"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Mountain } from "./Mountain";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[color:var(--bg)] text-white pt-28 md:pt-32"
      style={{ isolation: "isolate" }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(205,255,61,0.10) 0%, rgba(205,255,61,0) 60%)",
        }}
      />
      <div className="absolute inset-0 -z-10 slashes opacity-60" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-12">
        <h1 className="display-tight text-center mt-4 text-[clamp(3.4rem,11.5vw,11rem)] leading-[0.84]">
          <span className="block hero-anim-1">{t("hero.title.l1")}</span>
          <span className="block text-[color:var(--lime)] text-glow-lime hero-anim-2">
            {t("hero.title.l2")}
          </span>
        </h1>

        <div className="relative mt-2 md:-mt-12">
          <div className="relative mx-auto w-[78%] md:w-[58%] aspect-square hero-anim-fade hero-anim-fade-d2">
            <Mountain className="w-full h-full block" />
          </div>

          <div className="md:absolute md:left-0 md:top-1/3 md:w-[22rem] mt-6 md:mt-0 hero-anim-fade hero-anim-fade-d3">
            <div className="hairline-lime w-12 mb-5" />
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              {t("hero.intro")}
            </p>

            <div className="mt-6 inline-flex items-center gap-3">
              <a href="#how" className="btn-pill">
                <span>
                  {t("hero.cta.steps")}{" "}
                  <span className="text-[color:var(--muted)]">
                    {t("hero.cta.steps.suffix")}
                  </span>
                </span>
                <span className="size-7 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="md:absolute md:right-0 md:top-[28%] grid grid-cols-2 md:grid-cols-1 gap-4 mt-8 md:mt-0 md:w-[14rem] hero-anim-fade hero-anim-fade-d4">
            <StatCard kpi={t("hero.stat1.kpi")} caption={t("hero.stat1.caption")} />
            <StatCard kpi={t("hero.stat2.kpi")} caption={t("hero.stat2.caption")} />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[14%] md:bottom-[18%] z-10 hero-anim-fade hero-anim-fade-d4">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[color:var(--bg-3)]/90 border border-[color:var(--line-strong)] backdrop-blur text-white font-semibold hover:border-[color:var(--lime)] hover:text-[color:var(--lime)] transition-colors text-sm"
            >
              {t("hero.cta.start")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-8 border-t border-b border-[color:var(--line)] py-6">
          <div className="flex flex-wrap items-center justify-around gap-y-4 text-white/55 uppercase text-xs tracking-[0.2em]">
            <Sphere label={t("hero.spheres.lang")} />
            <Sep />
            <Sphere label={t("hero.spheres.body")} />
            <Sep />
            <Sphere label={t("hero.spheres.knowledge")} />
            <Sep />
            <Sphere label={t("hero.spheres.habits")} />
            <Sep />
            <Sphere label={t("hero.spheres.mind")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ kpi, caption }: { kpi: string; caption: string }) {
  return (
    <div className="card-glass p-5">
      <div className="display text-3xl md:text-4xl text-white">{kpi}</div>
      <p className="mt-3 text-xs text-white/60 leading-relaxed">{caption}</p>
    </div>
  );
}

function Sphere({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 font-semibold">
      <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
      <span>{label}</span>
    </div>
  );
}

function Sep() {
  return (
    <span className="hidden sm:inline-block h-4 w-px bg-[color:var(--line)]" />
  );
}
