"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getTrafficAttribution } from "./traffic-attribution";

export default function SiteVisitTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    const attribution = getTrafficAttribution();
    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", pagePath: pathname, ...attribution }),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Não foi possível registrar o acesso ao site:", response.status);
        }
      })
      .catch((error) => {
        console.error("Falha ao registrar o acesso ao site:", error);
      });
  }, [pathname]);

  return null;
}
