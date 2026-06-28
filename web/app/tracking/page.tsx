import { Suspense } from "react";
import TrackingClient from "@/components/TrackingClient";

export const metadata = {
  title: "Track Your Shipment",
  description:
    "Enter your Sky Bridge Global tracking number to get real-time cargo location, customs clearance status, and estimated delivery for your air, sea or road freight shipment.",
};

export default function TrackingPage() {
  return (
    <main style={{ minHeight: "70vh" }}>
      <div className="container" style={{ paddingTop: 150, paddingBottom: 80 }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="hero-tag" style={{ color: "var(--color-primary-blue)", background: "var(--sky-100)", border: "none" }}>Real-time ledger</span>
          <h1 className="heading-2" style={{ marginTop: 16 }}>Cargo Transit Tracking</h1>
          <p className="section-desc" style={{ color: "var(--color-text-muted)", maxWidth: 560, margin: "8px auto 0" }}>
            Search active cargo IDs to pull real-time location logs, compliance
            audits, and ETA indicators.
          </p>
        </div>

        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading…</p>}>
          <TrackingClient />
        </Suspense>
      </div>
    </main>
  );
}
