"use client";

import { useEffect, useState } from "react";
import { Activity, BookOpen, Brain, Check, Compass, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import { Reveal } from "../Reveal";

type Step = {
  id: string;
  icon: LucideIcon;
  sphereKey: TranslationKey;
  titleKey: TranslationKey;
  noteKey: TranslationKey;
  duration: number;
};

const STEPS: Step[] = [
  {
    id: "s1",
    icon: Languages,
    sphereKey: "lk.steps.s1.sphere",
    titleKey: "lk.steps.s1.title",
    noteKey: "lk.steps.s1.note",
    duration: 12,
  },
  {
    id: "s2",
    icon: Activity,
    sphereKey: "lk.steps.s2.sphere",
    titleKey: "lk.steps.s2.title",
    noteKey: "lk.steps.s2.note",
    duration: 35,
  },
  {
    id: "s3",
    icon: BookOpen,
    sphereKey: "lk.steps.s3.sphere",
    titleKey: "lk.steps.s3.title",
    noteKey: "lk.steps.s3.note",
    duration: 25,
  },
  {
    id: "s4",
    icon: Compass,
    sphereKey: "lk.steps.s4.sphere",
    titleKey: "lk.steps.s4.title",
    noteKey: "lk.steps.s4.note",
    duration: 30,
  },
  {
    id: "s5",
    icon: Brain,
    sphereKey: "lk.steps.s5.sphere",
    titleKey: "lk.steps.s5.title",
    noteKey: "lk.steps.s5.note",
    duration: 3,
  },
];

type Props = {
  initialDone?: string[];
  onChange?: (done: string[]) => void;
};

export function TodaySteps({ initialDone = [], onChange }: Props) {
  const { t } = useI18n();
  const [done, setDone] = useState<Set<string>>(() => new Set(initialDone));

  useEffect(() => {
    onChange?.(Array.from(done));
  }, [done, onChange]);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="today" className="relative bg-[color:var(--bg)] text-white">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="size-2 rounded-full bg-[color:var(--lime)]" />
          <span className="eyebrow text-white/55">
            {t("lk.steps.eyebrow")}
          </span>
        </div>

        <Reveal>
          <h2 className="display-tight text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.86]">
            <span className="block">{t("lk.steps.title.l1")}</span>
            <span className="block text-[color:var(--lime)]">
              {t("lk.steps.title.l2")}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {STEPS.map((step, i) => {
            const isDone = done.has(step.id);
            return (
              <Reveal
                as="li"
                variant="soft"
                delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                key={step.id}
              >
                <div
                  className={
                    "group flex items-start gap-4 sm:gap-6 py-6 sm:py-7 transition-opacity " +
                    (isDone ? "opacity-55" : "")
                  }
                >
                  <div className="flex flex-col items-center gap-2 pt-1 shrink-0 w-9 sm:w-12">
                    <span className="text-[0.62rem] tracking-[0.22em] uppercase text-white/35 font-semibold">
                      / 0{i + 1}
                    </span>
                    <step.icon
                      className="size-5 text-white/70"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[0.66rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--lime)]">
                        {t(step.sphereKey)}
                      </span>
                      <span className="text-xs text-white/45 tracking-[0.2em] uppercase font-semibold">
                        {step.duration} {t("lk.steps.minutes")}
                      </span>
                    </div>
                    <h3
                      className={
                        "display mt-2 text-xl sm:text-2xl transition-colors " +
                        (isDone
                          ? "line-through text-white/55"
                          : "text-white group-hover:text-[color:var(--lime)]")
                      }
                    >
                      {t(step.titleKey)}
                    </h3>
                    <p className="mt-2 text-white/55 leading-relaxed text-sm max-w-2xl">
                      {t(step.noteKey)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(step.id)}
                    aria-pressed={isDone}
                    aria-label={
                      isDone ? t("lk.steps.done.state") : t("lk.steps.done")
                    }
                    className={
                      "shrink-0 self-center size-11 rounded-full border flex items-center justify-center transition-colors " +
                      (isDone
                        ? "bg-[color:var(--lime)] border-[color:var(--lime)] text-[color:var(--bg)] shadow-[0_0_18px_rgba(205,255,61,0.45)]"
                        : "border-[color:var(--line-strong)] text-white/50 hover:border-[color:var(--lime)] hover:text-[color:var(--lime)]")
                    }
                  >
                    <Check className="size-5" strokeWidth={2.4} />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
