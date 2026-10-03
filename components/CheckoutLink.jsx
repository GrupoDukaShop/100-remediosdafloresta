"use client";

import { getTrafficAttribution } from "./traffic-attribution";

const CHECKOUT_URL = "https://pay.cakto.com.br/3ct27k5_1110487";

export default function CheckoutLink({
  children,
  className,
  trackingId,
  trackingLabel,
}) {
  function trackClick() {
    const event = {
      type: "click",
      ctaId: trackingId,
      ctaLabel: trackingLabel,
      pagePath: window.location.pathname,
      ...getTrafficAttribution(),
    };

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).then((response) => {
      if (!response.ok) {
        console.error("Não foi possível registrar o clique no checkout:", response.status);
      }
    }).catch((error) => {
      console.error("Falha ao enviar o clique do checkout:", error);
    });
  }

  return (
    <a
      href={CHECKOUT_URL}
      className={className}
      onClick={trackClick}
    >
      {children}
    </a>
  );
}
