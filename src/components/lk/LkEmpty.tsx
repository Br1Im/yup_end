"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { clearPlan } from "@/lib/plan/storage";

export function LkEmpty() {
  const { t } = useI18n();

  return (
    <section className="relative bg-[color:var(--bg)] text-white min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 30%, rgba(205,255,61,0.12) 0%, rgba(205,255,61,0) 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 slashes opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-20 sm:py-32 flex flex-col items-center text-center">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <span className="eyebrow text-white/55">{t("lk.empty.eyebrow")}</span>
        </div>

        <Reveal>
          <h1 className="display-tight text-[clamp(3rem,10vw,9rem)] leading-[0.86]">
            <span className="block">{t("lk.empty.title.l1")}</span>
            <span className="block text-[color:var(--lime)] text-glow-lime">
              {t("lk.empty.title.l2")}
            </span>
          </h1>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-8 max-w-xl text-white/65 leading-relaxed">
            {t("lk.empty.lead")}
          </p>
        </Reveal>

        <Reveal variant="soft" delay={2}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href="/start" className="btn-lime text-base">
              {t("lk.empty.cta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => clearPlan()}
              className="text-xs text-white/35 hover:text-[color:var(--lime)] transition-colors uppercase tracking-[0.22em] font-semibold"
            >
              {t("lk.empty.reset")}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
