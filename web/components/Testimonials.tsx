"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    tag: "Client Testimonials",
    title: "Trusted by Global Shippers",
    quote:
      "“Sky Bridge Global optimized our Q2 ocean freight schedules, reducing customs clearance wait times by 40%. Their client portal dashboard is standard-setting.”",
    name: "Marcus Thorne",
    role: "VP of Operations, Global Retailers Inc.",
    logo: "GLOBAL RET.",
  },
  {
    tag: "Enterprise Feedback",
    title: "Resilient Supply Pipeline",
    quote:
      "“Their air freight charter service saved our components launch during the port congestions. Excellent GPS updates and reliable border clearance checks.”",
    name: "Helena Lindqvist",
    role: "Supply Director, Nordic Industrial Group",
    logo: "NORDIC IND.",
  },
  {
    tag: "Logistics Excellence",
    title: "Outstanding Rates & Dims",
    quote:
      "“We migrated all cross-border calculations to their API rates. Ground transport is fast and customer brokers are always proactive on filings.”",
    name: "Rajesh Mehta",
    role: "Head of Logistics, Asia Pacific Traders",
    logo: "AP TRADERS",
  },
];

/** Auto-playing testimonial carousel (ported from the prototype). */
export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
      <div className="card" style={{ backgroundColor: "var(--color-primary-navy)", color: "white", textAlign: "left", padding: "var(--space-2xl)", position: "relative", overflow: "hidden", minHeight: 320, display: "flex", alignItems: "center", borderRadius: "var(--radius-xl)" }}>
        <div className="testimonial-carousel" style={{ width: "100%" }}>
          {SLIDES.map((s, i) => (
            <div key={i} className={`testimonial-slide${i === index ? " active" : ""}`} style={{ display: i === index ? "block" : "none" }}>
              <div className="grid grid-2 gap-xl align-center">
                <div>
                  <div className="testimonial-stars" style={{ color: "var(--accent-orange)", marginBottom: "var(--space-xs)", fontSize: 16 }}>★★★★★</div>
                  <span className="badge" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", marginBottom: "var(--space-xs)" }}>{s.tag}</span>
                  <h3 className="heading-2" style={{ marginBottom: "var(--space-sm)", color: "white" }}>{s.title}</h3>
                  <p style={{ color: "var(--sky-300)", fontSize: "var(--font-size-md)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "var(--space-md)" }}>{s.quote}</p>
                  <div>
                    <strong>{s.name}</strong>
                    <br />
                    <span style={{ fontSize: 12, color: "var(--color-text-light)" }}>{s.role}</span>
                  </div>
                </div>
                <div className="flex justify-center flex-col align-center" style={{ gap: "var(--space-sm)" }}>
                  <svg width="120" height="40" fill="none" viewBox="0 0 120 40">
                    <text x="60" y="25" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="18" fill="rgba(255,255,255,0.15)">{s.logo}</text>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-dots" style={{ position: "absolute", bottom: 20, left: "var(--space-2xl)", display: "flex", gap: "var(--space-xs)", zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`dot${i === index ? " active" : ""}`}
              style={{ width: i === index ? 16 : 8, height: 8, borderRadius: "var(--radius-full)", background: "white", cursor: "pointer", opacity: i === index ? 1 : 0.3, transition: "all 0.3s" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
