"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Share2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { PeakMark } from "../PeakMark";
import { LogoutConfirmModal } from "./LogoutConfirmModal";
import { RebuildConfirmModal } from "./RebuildConfirmModal";
import { SharePlanModal } from "./SharePlanModal";
import { clearPlan, setIntakePrefill } from "@/lib/plan/storage";
import type { PlanIntake } from "@/lib/plan/types";

export function LkHeader({
  day,
  total = 90,
  stageLabel,
  intake,
}: {
  day: number;
  total?: number;
  stageLabel?: string;
  intake?: PlanIntake;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const camp = stageLabel ?? t("lk.topbar.camp");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [rebuildOpen, setRebuildOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleLogout = () => {
    clearPlan();
    setLogoutOpen(false);
    router.push("/start");
  };

  const handleRebuild = () => {
    if (intake) setIntakePrefill(intake);
    setRebuildOpen(false);
    router.push("/start");
  };

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between text-white">
        <Link
          href="/"
          className="flex items-end gap-1.5"
          aria-label="YUP — на главную"
        >
          <span className="display text-xl sm:text-2xl tracking-[-0.03em] text-white leading-none">
            YUP
          </span>
          <PeakMark size={13} className="mb-0.5" />
        </Link>

        <div className="hidden md:flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase font-semibold">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)] animate-pulse" />
          <span className="text-white/55">{t("lk.topbar.eyebrow")}</span>
          <span className="h-3 w-px bg-[color:var(--line)]" />
          <span className="text-white">{t("lk.topbar.day", { day, total })}</span>
          <span className="h-3 w-px bg-[color:var(--line)]" />
          <span className="text-[color:var(--lime)]">{camp}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />
          {intake ? (
            <>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs tracking-[0.16em] uppercase font-semibold text-white/65 hover:text-white border border-[color:var(--line-strong)] hover:border-[color:var(--lime)]/45 rounded-full py-1.5 px-3 transition-colors"
                title={t("lk.share.title")}
              >
                <Share2 className="size-3" strokeWidth={2.2} />
                <span>{t("lk.header.share.short")}</span>
              </button>
              <button
                type="button"
                onClick={() => setRebuildOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs tracking-[0.16em] uppercase font-semibold text-white/65 hover:text-white border border-[color:var(--line-strong)] hover:border-[color:var(--lime)]/45 rounded-full py-1.5 px-3 transition-colors"
                title={t("lk.rebuild.title")}
              >
                <RotateCcw className="size-3" strokeWidth={2.2} />
                <span>{t("lk.header.rebuild.short")}</span>
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="btn-pill !py-1.5 sm:!py-2 !px-3 sm:!px-4 text-xs sm:text-sm"
          >
            {t("lk.header.logout")}
          </button>
        </div>
      </div>

      <div className="md:hidden border-t border-[color:var(--line)] px-4 py-2 flex items-center justify-between text-[0.66rem] tracking-[0.2em] uppercase font-semibold text-white/55">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          {t("lk.topbar.day", { day, total })}
        </span>
        <span className="text-[color:var(--lime)]">{camp}</span>
      </div>

      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
      <RebuildConfirmModal
        open={rebuildOpen}
        onCancel={() => setRebuildOpen(false)}
        onConfirm={handleRebuild}
      />
      {shareOpen && intake ? (
        <SharePlanModal intake={intake} onClose={() => setShareOpen(false)} />
      ) : null}
    </header>
  );
}
