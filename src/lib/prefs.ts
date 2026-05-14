"use client";

import { useSyncExternalStore } from "react";

/**
 * Lightweight client-only preferences shared across the app.
 * Stored in localStorage under `yup.prefs.*` keys, never sent anywhere.
 * Each pref has a typed getter/setter + a React hook.
 */

const KEY_ANIMATIONS = "yup.prefs.animations";

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

function readBoolean(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === "1";
}

function writeBoolean(key: string, value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value ? "1" : "0");
  emit();
}

export function getAnimationsEnabled(): boolean {
  return readBoolean(KEY_ANIMATIONS, true);
}

export function setAnimationsEnabled(value: boolean) {
  writeBoolean(KEY_ANIMATIONS, value);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("no-anim", !value);
  }
}

export function useAnimationsEnabled(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getAnimationsEnabled(),
    () => true,
  );
}

/**
 * Reads the user's pref on first paint and applies the `no-anim` class to
 * `<html>` so global CSS rules can short-circuit transitions/keyframes.
 * Idempotent; safe to call multiple times.
 */
export function syncAnimationsClass() {
  if (typeof document === "undefined") return;
  const enabled = getAnimationsEnabled();
  document.documentElement.classList.toggle("no-anim", !enabled);
}
