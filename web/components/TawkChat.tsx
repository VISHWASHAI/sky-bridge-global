"use client";

import { useEffect } from "react";

/**
 * Tawk.to live chat widget. Loads only when both IDs are configured via env
 * (NEXT_PUBLIC_TAWK_PROPERTY_ID + NEXT_PUBLIC_TAWK_WIDGET_ID). Find them in your
 * Tawk.to embed code: https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>
 *
 * Widget position (left / right) is set in the Tawk.to dashboard:
 * Administration -> Chat Widget -> Widget Appearance -> Position -> Bottom Left.
 */
export default function TawkChat() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "6a79ecfcae85bc1d4a79891d";
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "1jvm4bf2n";

  useEffect(() => {
    if (!propertyId || !widgetId) return;
    if (document.getElementById("tawkto-script")) return; // avoid double-inject

    const s = document.createElement("script");
    s.id = "tawkto-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
  }, [propertyId, widgetId]);

  return null;
}
