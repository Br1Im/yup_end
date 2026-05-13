"use client";

import { useCallback, useState } from "react";
import { AscentTimeline } from "@/components/lk/AscentTimeline";
import { LkHeader } from "@/components/lk/LkHeader";
import { LkOutro } from "@/components/lk/LkOutro";
import { QuickAsk } from "@/components/lk/QuickAsk";
import { SphereProgress } from "@/components/lk/SphereProgress";
import { StatStrip } from "@/components/lk/StatStrip";
import { TodayHero } from "@/components/lk/TodayHero";
import { TodaySteps } from "@/components/lk/TodaySteps";

const DAY = 87;
const STREAK = 23;
const LOAD_MINUTES = 105;
const TOTAL_STEPS = 5;
const INITIAL_DONE: string[] = ["s1", "s3"];

export default function LkPage() {
  const [doneCount, setDoneCount] = useState(INITIAL_DONE.length);

  const handleStepsChange = useCallback((done: string[]) => {
    setDoneCount(done.length);
  }, []);

  return (
    <>
      <LkHeader day={DAY} />
      <main>
        <TodayHero />
        <StatStrip
          done={doneCount}
          total={TOTAL_STEPS}
          streak={STREAK}
          loadMinutes={LOAD_MINUTES}
        />
        <TodaySteps
          initialDone={INITIAL_DONE}
          onChange={handleStepsChange}
        />
        <AscentTimeline currentIndex={2} />
        <SphereProgress />
        <QuickAsk />
        <LkOutro />
      </main>
    </>
  );
}
