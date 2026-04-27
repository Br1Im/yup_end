"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function FAQ() {
  const { t } = useI18n();
  const items = [
    { q: t("faq.q1.q"), a: t("faq.q1.a") },
    { q: t("faq.q2.q"), a: t("faq.q2.a") },
    { q: t("faq.q3.q"), a: t("faq.q3.a") },
    { q: t("faq.q4.q"), a: t("faq.q4.a") },
    { q: t("faq.q5.q"), a: t("faq.q5.a") },
    { q: t("faq.q6.q"), a: t("faq.q6.a") },
  ];

  return (
    <section id="faq" className="relative bg-[color:var(--bg)] scroll-mt-20 text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("faq.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(3rem,9vw,8rem)] leading-[0.86]">
            <span className="block">{t("faq.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">{t("faq.title.l2")}</span>
          </h2>
        </Reveal>

        <p className="mt-10 max-w-2xl text-white/65 leading-relaxed">
          {t("faq.contact")}
          <a
            className="text-[color:var(--lime)] hover:underline ml-1"
            href="mailto:hi@yup.app"
          >
            hi@yup.app
          </a>
        </p>

        <ul className="mt-14 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {items.map((it, i) => (
            <Reveal
              key={it.q}
              as="li"
              variant="soft"
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            >
              <details className="group py-7">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="display text-lg md:text-2xl text-white group-open:text-[color:var(--lime)] transition-colors">
                    {it.q}
                  </span>
                  <span className="mt-1 size-9 shrink-0 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/50 transition-transform group-open:rotate-45 group-open:border-[color:var(--lime)] group-open:text-[color:var(--lime)]">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-white/65 leading-relaxed pr-10 max-w-3xl">
                  {it.a}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
