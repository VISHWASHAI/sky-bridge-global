"use client";

import { useEffect, useState } from "react";

const NODES = [
  { progress: 0, label: "Pickup" },
  { progress: 25, label: "Warehouse" },
  { progress: 50, label: "Customs" },
  { progress: 75, label: "In Transit" },
  { progress: 100, label: "Delivered" },
];

/** Animated shipment journey pipeline (ported from the prototype). */
export default function JourneyPipeline() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let step = 0;
    const id = window.setInterval(() => {
      step = (step + 1) % (NODES.length + 1);
      setProgress(step === NODES.length ? 0 : NODES[step].progress);
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="container reveal-fade-up journey-section" style={{ marginBottom: "var(--space-3xl)" }}>
      <div className="section-header">
        <span className="section-label">Real-Time Dispatch Pipeline</span>
        <h2 className="section-title">Automated Journey Pipeline</h2>
        <p className="section-desc">Track a simulated shipment transit across international control points.</p>
      </div>

      <div className="journey-pipeline-card card" style={{ padding: "var(--space-xl)", position: "relative", backgroundColor: "var(--color-card-bg)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
        <div className="journey-pipeline-wrapper" style={{ position: "relative", margin: "40px 0" }}>
          <div className="journey-line-bg" style={{ position: "absolute", top: 12, left: "5%", right: "5%", height: 4, background: "rgba(66, 149, 232, 0.15)", borderRadius: 2, zIndex: 1 }} />
          <div className="journey-line-fill" style={{ position: "absolute", top: 12, left: "5%", width: `${progress * 0.9}%`, height: 4, background: "var(--color-primary-blue)", borderRadius: 2, zIndex: 2, transition: "width 1.4s linear" }} />

          <div className="journey-carrier" style={{ position: "absolute", top: -6, left: `calc(${5 + progress * 0.9}% - 15px)`, zIndex: 10, transition: "left 1.4s linear", color: "var(--color-primary-blue)" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ background: "var(--color-card-bg)", borderRadius: "50%", padding: 4, border: "2px solid var(--color-primary-blue)", boxShadow: "0 0 10px rgba(66, 149, 232, 0.4)" }}>
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>

          <div className="journey-nodes" style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 3, padding: "0 5%" }}>
            {NODES.map((n) => (
              <div key={n.label} className={`journey-node${progress >= n.progress ? " active" : ""}`}>
                <div className="node-dot" />
                <div className="node-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
