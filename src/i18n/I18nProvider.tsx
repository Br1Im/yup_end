"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  detectBrowserLocale,
  translations,
  type Locale,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "yup.locale";

type Listener = () => void;

class LocaleStore {
  private listeners = new Set<Listener>();
  private current: Locale = "ru";
  private resolved = false;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): Locale => {
    if (!this.resolved && typeof window !== "undefined") {
      this.resolved = true;
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === "ru" || saved === "en") {
          this.current = saved;
        } else {
          this.current = detectBrowserLocale();
        }
      } catch {
        this.current = detectBrowserLocale();
      }
    }
    return this.current;
  };

  // SSR snapshot — must be deterministic
  getServerSnapshot = (): Locale => "ru";

  set = (next: Locale) => {
    if (next === this.current) return;
    this.current = next;
    this.resolved = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    for (const l of this.listeners) l();
  };
}

const store = new LocaleStore();

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /**
   * Pick the correct plural form for `count` and substitute the {count} placeholder.
   * `base` is the translation key prefix; the function will resolve
   * `${base}.one`, `${base}.few`, `${base}.many` (RU only) and `${base}.other`.
   */
  tp: (
    base: string,
    count: number,
    vars?: Record<string, string | number>,
  ) => string;
};

function pluralForm(locale: Locale, count: number): "one" | "few" | "many" | "other" {
  if (locale === "ru") {
    const abs = Math.abs(count);
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod100 >= 11 && mod100 <= 14) return "many";
    if (mod10 === 1) return "one";
    if (mod10 >= 2 && mod10 <= 4) return "few";
    return "many";
  }
  return count === 1 ? "one" : "other";
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => store.set(l), []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const dict = (translations[locale] ?? translations.ru) as Partial<
        Record<TranslationKey, string>
      >;
      let value: string = dict[key] ?? translations.ru[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(`{${k}}`, String(v));
        }
      }
      return value;
    },
    [locale],
  );

  const tp = useCallback(
    (
      base: string,
      count: number,
      vars?: Record<string, string | number>,
    ) => {
      const form = pluralForm(locale, count);
      const dict = translations[locale] ?? translations.ru;
      const ruDict = translations.ru as Record<string, string>;
      const localized = dict as unknown as Record<string, string>;
      const candidate =
        localized[`${base}.${form}`] ??
        localized[`${base}.other`] ??
        ruDict[`${base}.${form}`] ??
        ruDict[`${base}.other`] ??
        base;
      let value = candidate;
      const allVars = { count, ...(vars ?? {}) };
      for (const [k, v] of Object.entries(allVars)) {
        value = value.replace(`{${k}}`, String(v));
      }
      return value;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tp }),
    [locale, setLocale, t, tp],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
}
