const ATTRIBUTION_KEY = "site-traffic-attribution";

export function getTrafficAttribution() {
  const params = new URLSearchParams(window.location.search);
  const currentUtm = {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || "",
  };

  let previous = {};
  try {
    previous = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch (error) {
    console.warn("Não foi possível recuperar a origem da visita nesta sessão:", error);
  }

  const externalReferrer = getExternalReferrer();
  const source =
    currentUtm.utmSource ||
    (externalReferrer ? `Referência: ${externalReferrer}` : "") ||
    previous.source ||
    "Acesso direto/sem identificação";
  const attribution = {
    source,
    utmSource: currentUtm.utmSource || previous.utmSource || "",
    utmMedium: currentUtm.utmMedium || previous.utmMedium || "",
    utmCampaign: currentUtm.utmCampaign || previous.utmCampaign || "",
    utmContent: currentUtm.utmContent || previous.utmContent || "",
    utmTerm: currentUtm.utmTerm || previous.utmTerm || "",
  };

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch (error) {
    console.warn("Não foi possível guardar a origem da visita nesta sessão:", error);
  }

  return attribution;
}

function getExternalReferrer() {
  if (!document.referrer) return "";

  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) return "";
    return referrer.hostname.replace(/^www\./, "");
  } catch (error) {
    console.warn("Não foi possível identificar o domínio de referência:", error);
    return "";
  }
}
