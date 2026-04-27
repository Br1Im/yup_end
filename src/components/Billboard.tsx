"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function Billboard() {
  const { t } = useI18n();
  return (
    <section className="relative bg-[color:var(--bg)] text-white border-y border-[color:var(--line)] overflow-hidden">
      <div className="absolute inset-0 slashes opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 50%, rgba(205,255,61,0.10) 0%, rgba(205,255,61,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 md:py-36">
        <div className="display-tight text-center leading-[0.86] text-[clamp(3.5rem,13vw,13.5rem)]">
          <Reveal as="div" delay={1}>{t("billboard.l1")}</Reveal>
          <Reveal as="div" delay={2} className="text-[color:var(--lime)] text-glow-lime">
            {t("billboard.l2")}
          </Reveal>
          <Reveal as="div" delay={3}>{t("billboard.l3")}</Reveal>
        </div>

        <Reveal variant="soft" delay={4} className="mt-14 flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="#waitlist" className="btn-lime">
            {t("billboard.cta")}
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
          <span className="text-white/45 text-sm tracking-[0.2em] uppercase">
            {t("billboard.tag")}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
