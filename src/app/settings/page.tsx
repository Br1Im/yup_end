"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  Download,
  Eye,
  EyeOff,
  Globe2,
  RotateCcw,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  Trash2,
  Upload,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LogoutConfirmModal } from "@/components/lk/LogoutConfirmModal";
import {
  clearPlan,
  exportSnapshot,
  importSnapshot,
  updateIntakeContext,
  usePlan,
} from "@/lib/plan/storage";
import {
  setAnimationsEnabled,
  syncAnimationsClass,
  useAnimationsEnabled,
} from "@/lib/prefs";
import {
  FOCUS_WINDOWS,
  TIME_OPTIONS,
  type FocusWindow,
  type MinutesPerDay,
} from "@/lib/plan/types";

export default function SettingsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { plan } = usePlan();
  const animationsEnabled = useAnimationsEnabled();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<
    "idle" | "ok" | "bad" | "empty"
  >("idle");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const tz = useSyncExternalStore(
    (cb) => {
      const id = requestAnimationFrame(cb);
      return () => cancelAnimationFrame(id);
    },
    () => {
      if (typeof Intl === "undefined") return "—";
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "—";
      } catch {
        return "—";
      }
    },
    () => "—",
  );

  const minutes = plan?.intake.context.minutesPerDay ?? null;
  const focusWindow = plan?.intake.context.focusWindow ?? null;

  const handleFocusChange = (next: FocusWindow) => {
    if (!plan || next === focusWindow) return;
    updateIntakeContext({ focusWindow: next });
  };

  const handleMinutesChange = (next: MinutesPerDay) => {
    if (!plan || next === minutes) return;
    updateIntakeContext({ minutesPerDay: next });
  };

  const handleAnimToggle = (next: boolean) => {
    setAnimationsEnabled(next);
    syncAnimationsClass();
  };

  const handleExport = () => {
    const snapshot = exportSnapshot();
    if (!snapshot) {
      setImportStatus("empty");
      window.setTimeout(() => setImportStatus("idle"), 2400);
      return;
    }
    const blob = new Blob([snapshot], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 10);
    a.download = `yup-snapshot-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileRef.current?.click();
  };

  const handleFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    const text = await file.text();
    const ok = importSnapshot(text);
    setImportStatus(ok ? "ok" : "bad");
    window.setTimeout(() => setImportStatus("idle"), 2800);
  };

  const handleLogoutConfirmed = () => {
    clearPlan();
    setLogoutOpen(false);
    router.push("/start");
  };

  const FOCUS_ICONS: Record<FocusWindow, React.ReactNode> = {
    morning: <Sunrise className="size-3.5" strokeWidth={1.7} />,
    day: <Sun className="size-3.5" strokeWidth={1.7} />,
    evening: <Sunset className="size-3.5" strokeWidth={1.7} />,
  };

  return (
    <main className="min-h-dvh bg-[color:var(--bg)] text-white">
      <header className="sticky top-0 z-40 bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]">
        <div className="mx-auto max-w-[920px] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/lk"
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" strokeWidth={1.7} />
            <span>{t("settings.back")}</span>
          </Link>
          <span className="eyebrow text-white/55 text-[0.65rem]">
            {t("settings.eyebrow")}
          </span>
          <LocaleSwitcher />
        </div>
      </header>

      <div className="mx-auto max-w-[920px] px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <header className="mb-2">
          <h1 className="display-tight text-3xl sm:text-5xl leading-[0.95]">
            {t("settings.title.l1")}{" "}
            <span className="text-[color:var(--lime)]">
              {t("settings.title.l2")}
            </span>
          </h1>
          <p className="text-sm text-white/55 mt-3 max-w-prose leading-relaxed">
            {t("settings.lead")}
          </p>
        </header>

        {/* Locale & Timezone */}
        <Section
          eyebrow={t("settings.section.locale")}
          title={t("settings.locale.title")}
          lead={t("settings.locale.lead")}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--line)] bg-[color:var(--bg-2)] px-4 py-3.5">
            <span className="inline-flex items-center gap-2 text-sm text-white/85">
              <Globe2 className="size-3.5 text-white/55" strokeWidth={1.7} />
              {t("settings.locale.label")}
            </span>
            <LocaleSwitcher />
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--line)] bg-[color:var(--bg-2)] px-4 py-3.5">
            <span className="inline-flex items-center gap-2 text-sm text-white/85">
              <Clock className="size-3.5 text-white/55" strokeWidth={1.7} />
              {t("settings.tz.label")}
            </span>
            <span className="text-xs text-white/55 tabular-nums">{tz}</span>
          </div>
        </Section>

        {/* Daily load */}
        {plan ? (
          <Section
            eyebrow={t("settings.section.load")}
            title={t("settings.load.title")}
            lead={t("settings.load.lead")}
          >
            <div className="flex flex-wrap gap-2">
              {TIME_OPTIONS.map((m) => (
                <Chip
                  key={m}
                  selected={m === minutes}
                  onClick={() => handleMinutesChange(m)}
                >
                  {m} {t("settings.load.unit")}
                </Chip>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Focus window */}
        {plan ? (
          <Section
            eyebrow={t("settings.section.window")}
            title={t("settings.window.title")}
            lead={t("settings.window.lead")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FOCUS_WINDOWS.map((fw) => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => handleFocusChange(fw)}
                  className={`flex items-center justify-between gap-2 rounded-md border px-4 py-3 transition-colors text-left ${
                    fw === focusWindow
                      ? "border-[color:var(--lime)]/55 bg-[color:var(--lime)]/[0.06] text-white"
                      : "border-[color:var(--line)] bg-[color:var(--bg-2)] text-white/75 hover:border-[color:var(--line-strong)]"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 text-sm">
                    {FOCUS_ICONS[fw]}
                    {t(`settings.window.${fw}` as const)}
                  </span>
                  {fw === focusWindow ? (
                    <Check
                      className="size-3.5 text-[color:var(--lime)]"
                      strokeWidth={2.2}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Animations */}
        <Section
          eyebrow={t("settings.section.motion")}
          title={t("settings.motion.title")}
          lead={t("settings.motion.lead")}
        >
          <Toggle
            on={animationsEnabled}
            onChange={handleAnimToggle}
            onLabel={t("settings.motion.on")}
            offLabel={t("settings.motion.off")}
            onIcon={<Eye className="size-3.5" strokeWidth={1.7} />}
            offIcon={<EyeOff className="size-3.5" strokeWidth={1.7} />}
          />
        </Section>

        {/* Data: export / import */}
        <Section
          eyebrow={t("settings.section.data")}
          title={t("settings.data.title")}
          lead={t("settings.data.lead")}
        >
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-4 py-2 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!plan}
            >
              <Download className="size-4" strokeWidth={2} />
              {t("settings.data.export")}
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] hover:border-[color:var(--lime)]/45 text-white/85 hover:text-white px-4 py-2 text-sm transition"
            >
              <Upload className="size-4" strokeWidth={2} />
              {t("settings.data.import")}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleFileChosen}
            />
          </div>
          <div
            className="mt-3 flex items-center gap-2 text-xs"
            aria-live="polite"
          >
            {importStatus === "ok" ? (
              <span className="inline-flex items-center gap-1.5 text-[color:var(--lime)]">
                <Sparkles className="size-3.5" strokeWidth={2} />
                {t("settings.data.imported")}
              </span>
            ) : null}
            {importStatus === "bad" ? (
              <span className="text-rose-300">
                {t("settings.data.imported.bad")}
              </span>
            ) : null}
            {importStatus === "empty" ? (
              <span className="text-white/55">
                {t("settings.data.empty")}
              </span>
            ) : null}
          </div>
        </Section>

        {/* Danger zone */}
        <Section
          eyebrow={t("settings.section.danger")}
          title={t("settings.danger.title")}
          lead={t("settings.danger.lead")}
          tone="danger"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lk"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] hover:border-[color:var(--lime)]/45 text-white/85 hover:text-white px-4 py-2 text-sm transition"
            >
              <RotateCcw className="size-4" strokeWidth={2} />
              {t("settings.danger.rebuild")}
            </Link>
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/35 text-rose-200/90 hover:text-rose-200 hover:border-rose-400/55 px-4 py-2 text-sm transition"
            >
              <Trash2 className="size-4" strokeWidth={2} />
              {t("settings.danger.reset")}
            </button>
          </div>
        </Section>
      </div>

      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogoutConfirmed}
      />
    </main>
  );
}

function Section({
  eyebrow,
  title,
  lead,
  tone = "default",
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  const borderClass =
    tone === "danger"
      ? "border-rose-400/15"
      : "border-[color:var(--line-strong)]";
  return (
    <section
      className={`rounded-2xl border ${borderClass} bg-[color:var(--bg-2)]/60 p-5 sm:p-6`}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`size-1.5 rounded-full ${tone === "danger" ? "bg-rose-300" : "bg-[color:var(--lime)]"}`}
          />
          <span className="eyebrow text-white/55 text-[0.6rem]">{eyebrow}</span>
        </div>
        <h2 className="display text-xl sm:text-2xl text-white leading-tight">
          {title}
        </h2>
        {lead ? (
          <p className="mt-1.5 text-sm text-white/55 leading-relaxed max-w-prose">
            {lead}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs sm:text-sm border transition-colors ${
        selected
          ? "border-[color:var(--lime)]/55 bg-[color:var(--lime)]/[0.06] text-white"
          : "border-[color:var(--line)] bg-[color:var(--bg)] text-white/75 hover:border-[color:var(--line-strong)]"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({
  on,
  onChange,
  onLabel,
  offLabel,
  onIcon,
  offIcon,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  onLabel: string;
  offLabel: string;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 transition-colors text-sm ${
        on
          ? "border-[color:var(--lime)]/55 bg-[color:var(--lime)]/[0.06] text-white"
          : "border-[color:var(--line)] bg-[color:var(--bg-2)] text-white/75 hover:border-[color:var(--line-strong)]"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        {on ? onIcon : offIcon}
        {on ? onLabel : offLabel}
      </span>
      <span
        className="relative inline-block w-9 h-5 rounded-full border border-[color:var(--line-strong)]"
        style={{
          background: on ? "var(--lime)" : "transparent",
          transition: "background-color 220ms ease-out",
        }}
      >
        <span
          className="absolute top-0.5 size-3.5 rounded-full bg-[color:var(--bg)]"
          style={{
            left: on ? "calc(100% - 1.05rem)" : "0.125rem",
            transition: "left 260ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </span>
    </button>
  );
}
