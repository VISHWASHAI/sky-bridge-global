"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroPinCheck() {
  const router = useRouter();
  const [pin, setPin] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = pin.trim();
    router.push(p ? `/services?pin=${encodeURIComponent(p)}#pin-check` : "/services#pin-check");
  }

  return (
    <form className="animate-fade-up hero-track-wrap" onSubmit={onSubmit} style={{ margin: "0 0 28px", width: "100%", maxWidth: 520 }}>
      <div className="hero-track-bar" style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 50, padding: "6px 6px 6px 20px", backdropFilter: "blur(12px)", gap: 8 }}>
        <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Check serviceability  e.g. 563113"
          inputMode="numeric"
          maxLength={6}
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, fontFamily: "var(--font-primary)" }}
        />
        <button type="submit" className="btn btn-accent" style={{ borderRadius: 40, padding: "10px 22px", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          Check PIN
        </button>
      </div>
    </form>
  );
}
