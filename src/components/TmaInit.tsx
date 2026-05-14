"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { syncAnimationsClass } from "@/lib/prefs";

type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  themeParams?: Record<string, string>;
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
};

type TelegramGlobal = {
  WebApp?: TelegramWebApp;
};

declare global {
  interface Window {
    Telegram?: TelegramGlobal;
  }
}

/**
 * Initializes the Telegram Mini App SDK if we're running inside Telegram's
 * WebView. No-op outside Telegram so the same bundle ships everywhere.
 *
 * Responsibilities:
 *   - Call WebApp.ready() so Telegram hides the loading spinner.
 *   - Expand to full height (default opens at ~70% on mobile).
 *   - Match the WebView chrome color to YUP's dark background.
 *   - Wire Telegram's native BackButton to Next.js router on non-root routes.
 *
 * Also syncs the user's "animations off" pref class on mount so the rest
 * of the tree picks it up before first paint of /lk.
 */
export function TmaInit() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    syncAnimationsClass();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    try {
      tg.ready?.();
      tg.expand?.();
      tg.setHeaderColor?.("#07080a");
      tg.setBackgroundColor?.("#07080a");
    } catch {
      // SDK may not be fully ready — fail silently.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = window.Telegram?.WebApp;
    const back = tg?.BackButton;
    if (!back) return;
    const isRoot = pathname === "/";
    if (isRoot) {
      back.hide();
      return;
    }
    const handler = () => router.back();
    back.onClick(handler);
    back.show();
    return () => {
      back.offClick(handler);
      back.hide();
    };
  }, [pathname, router]);

  return null;
}
