"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim();
    router.push(c ? `/tracking?code=${encodeURIComponent(c)}` : "/tracking");
  }

  return (
    <form className="animate-fade-up hero-track-wrap" onSubmit={onSubmit} style={{ margin: "28px 0", width: "100%", maxWidth: 520 }}>
      <div className="hero-track-bar" style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 50, padding: "6px 6px 6px 20px", backdropFilter: "blur(12px)", gap: 8 }}>
        <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input
          id="hero-track-input"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter tracking code  e.g. SBG-102948-US"
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, fontFamily: "var(--font-primary)" }}
        />
        <button id="hero-track-btn" type="submit" className="btn btn-accent" style={{ borderRadius: 40, padding: "10px 22px", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          Track Cargo
        </button>
      </div>
    </form>
  );
}
