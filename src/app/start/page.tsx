"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { OnboardingHeader } from "@/components/start/OnboardingHeader";
import { StepGoal } from "@/components/start/StepGoal";
import { StepContext } from "@/components/start/StepContext";
import { StepPreview } from "@/components/start/StepPreview";
import { generatePlan } from "@/lib/plan/generator";
import { savePlan } from "@/lib/plan/storage";
import type { Plan, PlanIntake } from "@/lib/plan/types";

const TOTAL_STEPS = 3;

const INITIAL_INTAKE: PlanIntake = {
  goal: "",
  identity: "",
  spheres: {},
  context: {
    minutesPerDay: 45,
    focusWindow: "morning",
    obstacles: [],
  },
  durationDays: 90,
};

export default function StartPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [intake, setIntake] = useState<PlanIntake>(INITIAL_INTAKE);
  const [showGoalError, setShowGoalError] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  const goalValid = useMemo(() => {
    const trimmedGoal = intake.goal.trim().length >= 10;
    const hasSphere = Object.values(intake.spheres).some(
      (s) => s && (s.title?.trim() || s.from?.trim() || s.to?.trim()),
    );
    return trimmedGoal || hasSphere;
  }, [intake.goal, intake.spheres]);

  const handleGoalChange = (patch: {
    goal?: string;
    identity?: string;
    spheres?: PlanIntake["spheres"];
  }) => {
    setIntake((prev) => ({
      ...prev,
      ...(patch.goal !== undefined ? { goal: patch.goal } : {}),
      ...(patch.identity !== undefined ? { identity: patch.identity } : {}),
      ...(patch.spheres !== undefined ? { spheres: patch.spheres } : {}),
    }));
    if (showGoalError) setShowGoalError(false);
  };

  const handleContextChange = (patch: Partial<PlanIntake["context"]>) => {
    setIntake((prev) => ({
      ...prev,
      context: { ...prev.context, ...patch },
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!goalValid) {
        setShowGoalError(true);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      const generated = generatePlan(intake);
      setPlan(generated);
      setStep(3);
      return;
    }
    if (step === 3 && plan) {
      savePlan(plan);
      router.push("/lk");
    }
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/");
      return;
    }
    if (step === 2) setStep(1);
    if (step === 3) {
      setPlan(null);
      setStep(2);
    }
  };

  const nextLabel =
    step === 1
      ? t("start.nav.next")
      : step === 2
        ? t("start.nav.generate")
        : t("start.nav.go");

  const backLabel =
    step === 1 ? "← " + t("header.nav.route") : t("start.nav.back");

  return (
    <>
      <OnboardingHeader currentStep={step} totalSteps={TOTAL_STEPS} />
      <main className="relative bg-[color:var(--bg)] text-white min-h-[calc(100vh-3.5rem)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(205,255,61,0.06) 0%, rgba(205,255,61,0) 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 slashes opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 py-10 sm:py-16 pb-32">
          <div className="mb-10 hidden md:block">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="size-2 rounded-full bg-[color:var(--lime)]" />
              <span className="eyebrow text-white/55">
                {t("start.head.eyebrow")}
              </span>
            </div>
            <h1 className="display-tight text-[clamp(2.4rem,6vw,5rem)] leading-[0.88]">
              <span className="block">{t("start.head.title.l1")}</span>
              <span className="block text-[color:var(--lime)] text-glow-lime">
                {t("start.head.title.l2")}
              </span>
            </h1>
          </div>

          {step === 1 ? (
            <StepGoal
              goal={intake.goal}
              identity={intake.identity ?? ""}
              spheres={intake.spheres}
              onChange={handleGoalChange}
              errorVisible={showGoalError}
            />
          ) : null}
          {step === 2 ? (
            <StepContext
              context={intake.context}
              onChange={handleContextChange}
            />
          ) : null}
          {step === 3 && plan ? <StepPreview plan={plan} /> : null}
        </div>

        <div className="fixed bottom-0 inset-x-0 z-30 bg-[color:var(--bg)]/85 backdrop-blur-md border-t border-[color:var(--line)]">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-white/55 hover:text-[color:var(--lime)] transition-colors"
            >
              {backLabel}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-lime"
            >
              {nextLabel}
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
          </div>
        </div>
      </main>
    </>
  );
}
