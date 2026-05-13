"use client";

import { useEffect, useState } from "react";
import { Activity, BookOpen, Brain, Check, Compass, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import type { SphereId, Step } from "@/lib/plan/types";

const SPHERE_ICON: Record<SphereId, LucideIcon> = {
  lang: Languages,
  body: Activity,
  knowledge: BookOpen,
  habits: Compass,
  mind: Brain,
};

const SPHERE_LABEL: Record<SphereId, TranslationKey> = {
  lang: "domains.lang.t",
  body: "domains.body.t",
  knowledge: "domains.knowledge.t",
  habits: "domains.habits.t",
  mind: "domains.mind.t",
};

type Props = {
  steps: Step[];
  done: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
};

export function QuestList({ steps, done, onToggle, className }: Props) {
  const { t } = useI18n();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <section
      className={
        "relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] transition-all duration-500 " +
        (className ?? "")
      }
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <header className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.quests.eyebrow")}
          </h3>
        </div>
        <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {done.size} / {steps.length}
        </span>
      </header>

      <ul className="divide-y divide-[color:var(--line)]">
        {steps.map((step, i) => {
          const isDone = done.has(step.id);
          const Icon = SPHERE_ICON[step.sphere];
          return (
            <li
              key={step.id}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 460ms ease-out ${180 + i * 90}ms, transform 520ms cubic-bezier(0.22, 1, 0.36, 1) ${180 + i * 90}ms`,
              }}
            >
              <button
                type="button"
                onClick={() => onToggle(step.id)}
                aria-pressed={isDone}
                className={
                  "group w-full flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-colors " +
                  (isDone
                    ? "bg-[color:var(--lime)]/[0.04]"
                    : "hover:bg-[color:var(--bg-3)]")
                }
              >
                <div
                  className={
                    "shrink-0 size-9 rounded-md border flex items-center justify-center transition-all duration-300 " +
                    (isDone
                      ? "bg-[color:var(--lime)] border-[color:var(--lime)] text-[color:var(--bg)] shadow-[0_0_14px_rgba(205,255,61,0.45)] scale-100"
                      : "border-[color:var(--line-strong)] text-white/70 group-hover:border-[color:var(--lime)] group-hover:text-[color:var(--lime)] group-hover:scale-105")
                  }
                  aria-hidden
                >
                  {isDone ? (
                    <Check
                      className="size-[18px]"
                      strokeWidth={2.6}
                      style={{ animation: "yup-check-pop 360ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                    />
                  ) : (
                    <Icon className="size-[17px]" strokeWidth={1.7} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-[0.6rem] tracking-[0.22em] uppercase font-semibold text-white/35">
                      / 0{i + 1}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--lime)]">
                      + {t(SPHERE_LABEL[step.sphere])}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.18em] uppercase font-semibold text-white/45">
                      {step.minutes} {t("lk.steps.minutes")}
                    </span>
                  </div>
                  <h4
                    className={
                      "mt-1 text-[0.95rem] sm:text-base font-semibold leading-snug transition-colors " +
                      (isDone
                        ? "text-white/55 line-through"
                        : "text-white group-hover:text-[color:var(--lime)]")
                    }
                  >
                    {step.title}
                  </h4>
                  <p className="mt-1 text-white/45 text-[0.78rem] sm:text-[0.82rem] leading-snug line-clamp-2">
                    {step.note}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <style>{`
        @keyframes yup-check-pop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
