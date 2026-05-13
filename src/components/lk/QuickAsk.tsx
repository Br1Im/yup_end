"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";

export function QuickAsk() {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const [pulsing, setPulsing] = useState(false);

  const examples = [
    t("lk.ask.example1"),
    t("lk.ask.example2"),
    t("lk.ask.example3"),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 1200);
  };

  return (
    <section className="relative bg-[color:var(--bg)] border-t border-[color:var(--line)] text-white overflow-hidden">
      <div className="absolute inset-0 slashes opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">{t("lk.ask.eyebrow")}</span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2.2rem,6vw,5rem)] leading-[0.86] text-[color:var(--lime)]">
            {t("lk.ask.title")}
          </h2>
        </Reveal>

        <Reveal variant="soft" delay={1}>
          <p className="mt-6 max-w-2xl text-white/65 leading-relaxed">
            {t("lk.ask.lead")}
          </p>
        </Reveal>

        <Reveal variant="soft" delay={2}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("lk.ask.placeholder")}
              className="flex-1 bg-[color:var(--bg-2)] border border-[color:var(--line-strong)] rounded-full px-5 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[color:var(--lime)] transition-colors"
              aria-label={t("lk.ask.placeholder")}
            />
            <button
              type="submit"
              className={"btn-lime " + (pulsing ? "animate-pulse" : "")}
            >
              {t("lk.ask.cta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </Reveal>

        <Reveal variant="soft" delay={3}>
          <div className="mt-6 flex flex-wrap items-center gap-2 max-w-3xl">
            <span className="text-[0.66rem] tracking-[0.2em] uppercase text-white/35 font-semibold mr-1">
              {t("lk.ask.examples")}
            </span>
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setValue(ex)}
                className="text-xs px-3 py-1.5 rounded-full border border-[color:var(--line-strong)] text-white/65 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)] transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
