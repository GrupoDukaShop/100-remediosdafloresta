"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", pagePath: pathname }),
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
