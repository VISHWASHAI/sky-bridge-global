"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type ShipmentEvent = {
  title: string;
  event_time: string | null;
  location: string;
  description: string;
  status: string;
};

type Shipment = {
  tracking_no: string;
  status: string;
  status_class: string;
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  carrier: string;
  current_location: string;
  est_delivery: string;
  events: ShipmentEvent[];
};

const DEMO = ["SBG-102948-US", "SBG-584732-EU", "SBG-778899-EU"];

function fmt(ts: string | null) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export default function TrackingClient() {
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Shipment | null>(null);
  const [searched, setSearched] = useState(false);

  const lookup = useCallback(async (raw: string) => {
    const tracking = raw.trim();
    if (!tracking) return;
    setSearched(true);
    setResult(null);
    setError(null);

    if (!isSupabaseConfigured) {
      setError("Tracking backend is not connected yet. Add your Supabase keys to enable live lookups.");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setLoading(true);
    const { data, error } = await supabase.rpc("get_shipment", { p_tracking: tracking });
    setLoading(false);

    if (error) {
      setError("Something went wrong fetching this shipment. Please try again.");
      return;
    }
    if (!data) {
      setError(`No shipment found for "${tracking}". Check the number and try again.`);
      return;
    }
    setResult(data as Shipment);
  }, []);

  // Prefill + auto-search when arriving with ?code=
  useEffect(() => {
    const c = params.get("code");
    if (c) {
      setCode(c);
      lookup(c);
    }
  }, [params, lookup]);

  return (
    <>
      <div className="card" style={{ maxWidth: 720, margin: "0 auto", textAlign: "left", boxShadow: "var(--shadow-premium)" }}>
        <div className="form-label" style={{ marginBottom: 8 }}>Tracking Number</div>
        <form
          onSubmit={(e) => { e.preventDefault(); lookup(code); }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <input
            className="form-control"
            style={{ flex: "1 1 240px" }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. SBG-102948-US"
          />
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ borderRadius: "var(--radius-md)" }}>
            {loading ? "Tracking…" : "Track Shipment →"}
          </button>
        </form>
        <div style={{ marginTop: 14, fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
          Demo reference keys:{" "}
          {DEMO.map((d, i) => (
            <button
              key={d}
              onClick={() => { setCode(d); lookup(d); }}
              style={{ background: "var(--sky-100)", color: "var(--color-primary-blue)", border: "none", borderRadius: 6, padding: "3px 8px", marginRight: 6, cursor: "pointer", fontWeight: 600 }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="card" style={{ maxWidth: 720, margin: "24px auto 0", borderLeft: "5px solid var(--color-danger)", textAlign: "left" }}>
          <p style={{ color: "var(--color-danger)", fontWeight: 600 }}>{error}</p>
        </div>
      )}

      {result && (
        <div className="card" style={{ maxWidth: 720, margin: "24px auto 0", textAlign: "left", boxShadow: "var(--shadow-premium)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontFamily: "var(--font-header)", fontWeight: 700, fontSize: "1.25rem" }}>{result.tracking_no}</div>
              <div style={{ color: "var(--color-text-muted)" }}>{result.origin} → {result.destination}</div>
            </div>
            <span className={`badge badge-${result.status_class === "success" ? "success" : result.status_class === "warning" ? "warning" : "primary"}`}>
              {result.status}
            </span>
          </div>

          <div className="grid grid-2 gap-md" style={{ marginTop: 16 }}>
            <Info label="Carrier" value={result.carrier} />
            <Info label="Current Location" value={result.current_location} />
            <Info label="Weight" value={result.weight} />
            <Info label="Dimensions" value={result.dimensions} />
            <Info label="Estimated Delivery" value={result.est_delivery} />
          </div>

          <h4 className="heading-4" style={{ margin: "24px 0 8px" }}>Shipment History</h4>
          <div className="timeline">
            {result.events.map((ev, i) => (
              <div key={i} className={`timeline-item ${ev.status === "active" ? "active" : "completed"}`}>
                <div className="timeline-node" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-title">{ev.title}</span>
                    <span className="timeline-date">{fmt(ev.event_time)}</span>
                  </div>
                  <div className="timeline-desc">{ev.location} — {ev.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && !loading && !result && !error && (
        <p style={{ textAlign: "center", marginTop: 24, color: "var(--color-text-muted)" }}>Searching…</p>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="form-label">{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
