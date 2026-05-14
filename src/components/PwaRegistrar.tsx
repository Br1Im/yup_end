"use client";

import { useEffect } from "react";

/**
 * Registers the service worker once on mount in production builds only.
 * Dev builds skip registration to avoid stale cached pages during HMR.
 */
export function PwaRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Swallow — registration is best-effort.
        });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
