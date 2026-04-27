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
};

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
      const dict = translations[locale] ?? translations.ru;
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

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
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
