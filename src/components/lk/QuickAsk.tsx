"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

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
    <section className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-5 sm:p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.ask.eyebrow")}
          </h3>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 items-start">
        <div>
          <h2 className="display-tight text-2xl sm:text-3xl text-[color:var(--lime)] leading-[0.96]">
            {t("lk.ask.title")}
          </h2>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            {t("lk.ask.lead")}
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("lk.ask.placeholder")}
              className="flex-1 min-w-0 bg-[color:var(--bg)] border border-[color:var(--line-strong)] rounded-full px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[color:var(--lime)] transition-colors"
              aria-label={t("lk.ask.placeholder")}
            />
            <button
              type="submit"
              className={
                "btn-lime shrink-0 " + (pulsing ? "animate-pulse" : "")
              }
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

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/35 font-semibold mr-0.5">
              {t("lk.ask.examples")}
            </span>
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setValue(ex)}
                className="text-[0.7rem] px-3 py-1 rounded-full border border-[color:var(--line-strong)] text-white/65 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)] transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
