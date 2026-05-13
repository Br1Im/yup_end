"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";

export function LkOutro() {
  const { t } = useI18n();

  return (
    <section className="relative bg-[color:var(--bg)] border-t border-[color:var(--line)] text-white overflow-hidden">
      <div className="absolute inset-0 slashes opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-20 sm:py-32 text-center">
        <Reveal>
          <h2 className="display-tight text-[clamp(2.6rem,8.5vw,7rem)] leading-[0.88]">
            <span className="block text-white/85">{t("lk.outro.title")}</span>
            <span className="block text-[color:var(--lime)] text-glow-lime">
              {t("lk.outro.accent")}
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
