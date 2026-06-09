"use client";

import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type Area = {
  pin_code: string;
  city: string;
  state: string;
  hub_name: string;
  address: string;
  transit_days: number;
  tier: string;
  available: boolean;
};

const SAMPLES = ["563113", "560001", "600001", "400001", "110001"];

export default function PinChecker() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Area | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function check(raw: string) {
    const code = raw.trim();
    setResult(null);
    setError(null);
    setNotFound(false);
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    if (!isSupabaseConfigured) {
      setError("Serviceability backend is not connected yet. Add your Supabase keys to enable live checks.");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("service_areas")
      .select("*")
      .eq("pin_code", code)
      .maybeSingle();
    setLoading(false);

    if (error) {
      setError("Something went wrong. Please try again.");
      return;
    }
    if (!data) {
      setNotFound(true);
      return;
    }
    setResult(data as Area);
  }

  return (
    <div className="card" style={{ maxWidth: 640, margin: "0 auto", textAlign: "left", boxShadow: "var(--shadow-premium)" }}>
      <h3 className="heading-3" style={{ marginBottom: 4 }}>Check freight serviceability</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 16 }}>
        Verify coverage, find your nearest hub, and see estimated transit time for any Indian PIN code.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); check(pin); }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          className="form-control"
          style={{ flex: "1 1 200px" }}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter 6-digit PIN code"
          inputMode="numeric"
          maxLength={6}
        />
        <button id="btn-submit-postal" className="btn btn-primary" type="submit" disabled={loading} style={{ borderRadius: "var(--radius-md)" }}>
          {loading ? "Checking…" : "Check Coverage"}
        </button>
      </form>

      <div style={{ marginTop: 14, fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
        Try:{" "}
        {SAMPLES.map((s) => (
          <button key={s} onClick={() => { setPin(s); check(s); }} style={{ background: "var(--sky-100)", color: "var(--color-primary-blue)", border: "none", borderRadius: 6, padding: "3px 8px", marginRight: 6, cursor: "pointer", fontWeight: 600 }}>
            {s}
          </button>
        ))}
      </div>

      {error && <p style={{ color: "var(--color-danger)", fontWeight: 600, marginTop: 16 }}>{error}</p>}

      {notFound && (
        <div style={{ marginTop: 16, padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-warning-bg)", border: "1px solid var(--color-warning)" }}>
          <strong>Not in our direct network yet.</strong>
          <div style={{ color: "var(--color-text-muted)" }}>Contact us for a custom routing quote to this PIN code.</div>
        </div>
      )}

      {result && (
        <div style={{ marginTop: 16, padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-success-bg)", border: "1px solid var(--color-success)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <strong style={{ color: "var(--color-success)" }}>✓ Serviceable — {result.tier}</strong>
            <span className="badge badge-primary">{result.transit_days} day(s) transit</span>
          </div>
          <div style={{ marginTop: 10, fontWeight: 600 }}>{result.city}</div>
          <div style={{ color: "var(--color-text-muted)" }}>Nearest hub: {result.hub_name}</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>{result.address}</div>
        </div>
      )}
    </div>
  );
}
