"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { n: "01", title: t("how.s1.t"), text: t("how.s1.d") },
    { n: "02", title: t("how.s2.t"), text: t("how.s2.d") },
    { n: "03", title: t("how.s3.t"), text: t("how.s3.d") },
    { n: "04", title: t("how.s4.t"), text: t("how.s4.d") },
  ];

  return (
    <section
      id="how"
      className="relative bg-[color:var(--bg-2)] text-white scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("how.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(3rem,9vw,8.5rem)] leading-[0.86]">
            <span className="block">{t("how.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">
              {t("how.title.l2")}
            </span>
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
            {t("how.lead")}
          </p>
        </Reveal>

        <ol className="mt-20 grid md:grid-cols-2 gap-x-px gap-y-px bg-[color:var(--line)]">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              variant="soft"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="group relative bg-[color:var(--bg)] hover:bg-[color:var(--bg-3)] p-8 md:p-10 transition-colors"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="display text-5xl md:text-6xl text-white/80 group-hover:text-[color:var(--lime)] transition-colors">
                  {s.n}
                </span>
                <span className="size-9 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/40 group-hover:text-[color:var(--lime)] group-hover:border-[color:var(--lime)] transition-colors mt-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="display mt-12 text-2xl md:text-3xl text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed text-sm md:text-base max-w-md">
                {s.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
