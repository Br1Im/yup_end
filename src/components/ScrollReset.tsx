"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration so reloads always start at the top
 * (unless the URL has a hash, in which case we let the native anchor jump).
 */
export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}
