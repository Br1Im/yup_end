"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function Problem() {
  const { t } = useI18n();

  const cards = [
    { n: "01", t: t("problem.card1.t"), d: t("problem.card1.d") },
    { n: "02", t: t("problem.card2.t"), d: t("problem.card2.d") },
    { n: "03", t: t("problem.card3.t"), d: t("problem.card3.d") },
  ];

  return (
    <section id="why" className="relative bg-[color:var(--bg)] text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 md:pt-40 pb-20">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("problem.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(3rem,9.5vw,9rem)] leading-[0.86]">
            <span className="block">{t("problem.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">
              {t("problem.title.l2")}
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <Reveal
            variant="soft"
            delay={1}
            className="md:col-span-6 md:col-start-1"
          >
            <p className="text-white/70 leading-relaxed">{t("problem.lead")}</p>
          </Reveal>
          <Reveal
            variant="soft"
            delay={2}
            className="md:col-span-5 md:col-start-8"
          >
            <p className="text-white/85 leading-relaxed">
              {t("problem.lead2")}{" "}
              <span className="text-[color:var(--lime)] font-semibold">
                {t("problem.lead2.accent")}
              </span>
              .
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid md:grid-cols-3 gap-px bg-[color:var(--line)]">
          {cards.map((c, i) => (
            <PCard
              key={c.n}
              n={c.n}
              t={c.t}
              d={c.d}
              delay={(i + 1) as 1 | 2 | 3}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PCard({
  n,
  t,
  d,
  delay,
}: {
  n: string;
  t: string;
  d: string;
  delay: 1 | 2 | 3;
}) {
  return (
    <Reveal
      as="li"
      variant="soft"
      delay={delay}
      className="group bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-3)] p-8 transition-colors"
    >
      <div className="flex items-start justify-between">
        <span className="display text-2xl text-[color:var(--lime)]">{n}</span>
        <span className="size-8 rounded-full border border-[color:var(--line-strong)] flex items-center justify-center text-white/40 group-hover:text-[color:var(--lime)] group-hover:border-[color:var(--lime)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H8M17 7v9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <h3 className="display mt-10 text-2xl">{t}</h3>
      <p className="mt-4 text-sm text-white/60 leading-relaxed">{d}</p>
    </Reveal>
  );
}
