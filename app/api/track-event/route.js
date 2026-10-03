import { NextResponse } from "next/server";

export const runtime = "nodejs";

function readText(value, maxLength) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed : null;
}

function getCountry(request) {
  const countryCode = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    ""
  ).toUpperCase();

  if (!/^[A-Z]{2}$/.test(countryCode) || ["XX", "ZZ"].includes(countryCode)) {
    return "Não identificado";
  }

  return new Intl.DisplayNames(["pt-BR"], { type: "region" }).of(countryCode) || "Não identificado";
}

export async function POST(request) {
  const endpoint = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (!endpoint) {
    console.error("Event tracking is not configured: GOOGLE_SHEETS_WEB_APP_URL is missing.");
    return NextResponse.json({ error: "Event tracking is not configured." }, { status: 503 });
  }

  let scriptUrl;
  try {
    scriptUrl = new URL(endpoint);
  } catch {
    console.error("Event tracking has an invalid Apps Script URL.");
    return NextResponse.json({ error: "Event tracking configuration is invalid." }, { status: 500 });
  }
  if (
    scriptUrl.protocol !== "https:" ||
    scriptUrl.hostname !== "script.google.com" ||
    !scriptUrl.pathname.startsWith("/macros/s/")
  ) {
    console.error("Event tracking URL must be an HTTPS Google Apps Script web app URL.");
    return NextResponse.json({ error: "Event tracking configuration is invalid." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  if (body?.type === "visit" && process.env.GOOGLE_SHEETS_VISITS_ENABLED !== "true") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const pagePath = readText(body?.pagePath, 512);
  if (!pagePath?.startsWith("/") || pagePath.startsWith("//")) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  let event;
  if (body?.type === "visit") {
    event = {
      type: "visit",
      timestamp: new Date().toISOString(),
      country: getCountry(request),
      pagePath,
    };
  } else if (body?.type === "click") {
    const ctaId = readText(body?.ctaId, 80);
    const ctaLabel = readText(body?.ctaLabel, 160);
    const utmSource = readText(body?.utmSource ?? "", 200);
    const utmMedium = readText(body?.utmMedium ?? "", 200);
    const utmCampaign = readText(body?.utmCampaign ?? "", 200);
    const utmContent = readText(body?.utmContent ?? "", 200);
    const utmTerm = readText(body?.utmTerm ?? "", 200);

    if (
      !ctaId ||
      !ctaLabel ||
      [utmSource, utmMedium, utmCampaign, utmContent, utmTerm].some((value) => value === null)
    ) {
      return NextResponse.json({ error: "Invalid event." }, { status: 400 });
    }

    event = {
      type: "click",
      timestamp: new Date().toISOString(),
      ctaId,
      ctaLabel,
      pagePath,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
    };
  } else {
    return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Google Apps Script rejected a tracking event:", response.status);
      return NextResponse.json({ error: "Could not record the event." }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to forward a tracking event to Google Sheets:", error);
    return NextResponse.json({ error: "Could not record the event." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
