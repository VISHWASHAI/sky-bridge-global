import Link from "next/link";
import HeroPinCheck from "@/components/HeroPinCheck";
import JourneyPipeline from "@/components/JourneyPipeline";

const TRUST_STATS = [
  { n: "Air · Sea · Road", l: "Multi-Modal Freight" },
  { n: "Customs", l: "Clearance & Brokerage" },
  { n: "Live", l: "Shipment Tracking" },
  { n: "Global", l: "Export Handling" },
];

const SERVICE_CARDS = [
  { img: "/images/category_air.webp", title: "Air Freight Charter", desc: "Priority cargo scheduling and custom customs clearance on prime flight corridors." },
  { img: "/images/category_ocean.webp", title: "Sea Cargo Liners", desc: "Weekly ocean container space bookings for FCL & LCL cargo routes." },
  { img: "/images/category_road.webp", title: "Land Freight Networks", desc: "GPS-enabled domestic trucking fleets and border gateway checks." },
  { img: "/images/services_warehouse.webp", title: "Warehousing & Hubs", desc: "Distributed climate-controlled inventory facilities with cross-docking hubs." },
  { img: "/images/services_air.webp", title: "Customs Brokerage", desc: "Automated compliance audit filings, bonded clearance, and tariff assessments.", filter: "hue-rotate(200deg) brightness(0.85)" },
];

const COMMITMENTS = [
  { label: "Multi-Modal Freight", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
  { label: "Door-to-Door", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { label: "Customs Cleared", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="9 15 11 17 15 13" /></svg> },
  { label: "Real-Time Tracking", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> },
  { label: "Insured Cargo", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { label: "24/7 Support", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
];

const HOME = { x: 132, y: 176 };
const CORRIDORS = [
  { name: "Europe", x: 300, y: 78, dur: "5s" },
  { name: "Middle East", x: 420, y: 132, dur: "6s" },
  { name: "East Asia", x: 442, y: 214, dur: "7s" },
  { name: "Southeast Asia", x: 356, y: 276, dur: "5.5s" },
  { name: "Africa", x: 244, y: 286, dur: "6.5s" },
];
const corridorPath = (d: { x: number; y: number }) =>
  `M ${HOME.x} ${HOME.y} Q ${(HOME.x + d.x) / 2} ${Math.min(HOME.y, d.y) - 48} ${d.x} ${d.y}`;

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{ background: "linear-gradient(160deg, rgba(6,12,24,0.88) 0%, rgba(10,19,34,0.82) 60%, rgba(15,28,48,0.70) 100%), url('/images/hero_bg.webp') no-repeat center center / cover" }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 160, paddingBottom: 80 }}>
          <div className="hero-content" style={{ maxWidth: 720 }}>
            <span className="hero-tag">✈&nbsp; Air, Sea &amp; Road Freight Forwarding — Based in Kolar, Karnataka</span>
            <h1 className="hero-title" style={{ margin: "20px 0 16px" }}>
              Your Cargo, <span>Delivered On Time</span>
              <br />
              Anywhere in the World
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.125rem", lineHeight: 1.75, maxWidth: 580, color: "rgba(255,255,255,0.7)" }}>
              Sky Bridge Global handles air freight charters, FCL/LCL ocean cargo,
              road freight and customs clearance for Indian businesses shipping
              worldwide — with live tracking from pickup to delivery.
            </p>

            <HeroPinCheck />

            <div className="hero-btns">
              <Link href="/contact" className="btn btn-primary" style={{ padding: "14px 36px", fontSize: "1rem", fontWeight: 700, borderRadius: 50, boxShadow: "0 0 28px rgba(66,149,232,0.5)" }}>
                Get a Quote &nbsp;→
              </Link>
              <Link href="/about" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: "1rem", fontWeight: 500, cursor: "pointer", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                Learn More
                <span style={{ width: 28, height: 28, border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>→</span>
              </Link>
            </div>

            <div className="hero-trust-bar" style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
              {TRUST_STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "0 4px" }}>
                  <div style={{ fontFamily: "var(--font-header)", fontSize: "clamp(0.95rem, 2.6vw, 1.35rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "var(--space-3xl)" }} />

      {/* ── STATS BANNER (animated counters + moving routes) ─────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="stats-section" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl)", padding: "var(--space-xl) 0", backgroundColor: "var(--color-card-bg)", boxShadow: "var(--shadow-md)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.12, zIndex: 1 }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 80 Q 200 -20, 500 80 T 1100 80" stroke="var(--color-primary-blue)" strokeWidth="1.5" strokeDasharray="6,6">
              <animate attributeName="stroke-dashoffset" values="0;120" dur="18s" repeatCount="indefinite" />
            </path>
            <path d="M-100 40 Q 300 120, 600 40 T 1100 40" stroke="var(--color-primary-blue)" strokeWidth="1.5" strokeDasharray="6,6">
              <animate attributeName="stroke-dashoffset" values="120;0" dur="24s" repeatCount="indefinite" />
            </path>
          </svg>

          <div className="stats-grid" style={{ position: "relative", zIndex: 2 }}>
            {[
              { t: "Air Freight", d: "Priority Charters" },
              { t: "Ocean Cargo", d: "FCL & LCL" },
              { t: "Road Transport", d: "GPS-Tracked Fleet" },
              { t: "Customs", d: "Clearance & Brokerage" },
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <div style={{ fontFamily: "var(--font-header)", fontSize: "clamp(1.05rem, 3.2vw, 1.5rem)", fontWeight: 800, color: "var(--color-primary-navy)", lineHeight: 1.15 }}>{s.t}</div>
                <div className="stat-label">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL NETWORK MAP ───────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)", textAlign: "left" }}>
        <div className="grid grid-2 gap-xl align-center">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "var(--space-xs)" }}>Global Network</span>
            <h2 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-md)" }}>Serving Businesses Across Continents</h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.7, marginBottom: "var(--space-md)" }}>
              From Kolar, Karnataka, Sky Bridge Global delivers integrated logistics and supply chain solutions across domestic and international trade routes. Whether it&apos;s air freight, sea cargo, road transport, or customs brokerage, we combine modern warehousing, smart compliance audits, and route optimization to give businesses of all sizes reliable, efficient, and cost-effective transportation.
            </p>
            <Link href="/about" className="btn btn-outline">Our Network Story</Link>
          </div>

          <div className="map-placeholder" style={{ height: 350, background: "linear-gradient(160deg,#0a1322 0%,#060c18 100%)", border: "1px solid rgba(66,149,232,0.15)", position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)" }}>
            <span style={{ position: "absolute", top: 14, left: 16, zIndex: 10, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(148,163,184,0.9)", fontWeight: 700 }}>Freight Corridors from India</span>

            <svg viewBox="0 0 500 340" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              {/* Reach rings radiating from the home hub */}
              {[62, 116, 172].map((r) => (
                <circle key={r} cx={HOME.x} cy={HOME.y} r={r} fill="none" stroke="rgba(66,149,232,0.12)" strokeWidth="1" />
              ))}

              {/* Corridor routes */}
              {CORRIDORS.map((c, i) => (
                <path key={`p${i}`} id={`corr-${i}`} d={corridorPath(c)} fill="none" stroke="rgba(66,149,232,0.5)" strokeWidth="1.4" strokeDasharray="5,5" />
              ))}

              {/* Animated cargo pulses travelling the routes */}
              {CORRIDORS.map((c, i) => (
                <circle key={`m${i}`} r="3" fill="var(--accent-orange)">
                  <animateMotion dur={c.dur} repeatCount="indefinite">
                    <mpath href={`#corr-${i}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* Destination nodes + labels */}
              {CORRIDORS.map((c, i) => (
                <g key={`n${i}`}>
                  <circle cx={c.x} cy={c.y} r="4" fill="#e2e8f0" />
                  <circle cx={c.x} cy={c.y} r="4" fill="none" stroke="rgba(226,232,240,0.4)" strokeWidth="1">
                    <animate attributeName="r" values="4;9;4" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={c.x} y={c.y + 18} textAnchor="middle" fontFamily="var(--font-header)" fontSize="10" fontWeight="600" fill="rgba(203,213,225,0.9)">{c.name}</text>
                </g>
              ))}

              {/* Home hub — Kolar, India */}
              <g>
                <circle cx={HOME.x} cy={HOME.y} r="16" fill="rgba(244,180,0,0.18)">
                  <animate attributeName="r" values="13;22;13" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle cx={HOME.x} cy={HOME.y} r="6.5" fill="var(--accent-orange)" stroke="#fff" strokeWidth="1.5" />
                <text x={HOME.x} y={HOME.y - 15} textAnchor="middle" fontFamily="var(--font-header)" fontSize="11" fontWeight="800" fill="#fff" letterSpacing="0.03em">KOLAR</text>
                <text x={HOME.x} y={HOME.y + 23} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--accent-orange)" letterSpacing="0.14em">HOME HUB</text>
              </g>
            </svg>

            <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(6,12,24,0.7)", backdropFilter: "blur(8px)", padding: "7px 11px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 10, color: "#94a3b8", textAlign: "left", zIndex: 10, lineHeight: 1.8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-orange)", display: "inline-block", boxShadow: "0 0 6px var(--accent-orange)" }} />
                Kolar HQ
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e2e8f0", display: "inline-block" }} />
                Export corridors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SHOWCASE ────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)", overflow: "hidden" }}>
        <div className="section-header">
          <span className="section-label">Core Capabilities</span>
          <h2 className="section-title">Logistics &amp; Handling Solutions</h2>
          <p className="section-desc">Providing robust transport pipelines across multi-modal lanes.</p>
        </div>

        <div className="services-horizontal-track reveal-stagger-container" style={{ textAlign: "left" }}>
          {SERVICE_CARDS.map((c, i) => (
            <div key={i} className="card card-hover service-card reveal-stagger-item" style={{ padding: 0, overflow: "hidden" }}>
              <img src={c.img} alt={c.title} loading="lazy" decoding="async" style={{ width: "100%", height: 130, objectFit: "cover", display: "block", filter: c.filter }} />
              <div style={{ padding: "var(--space-md)" }}>
                <h3 className="service-title">{c.title}</h3>
                <p className="service-desc">{c.desc}</p>
                <Link href="/services" className="btn btn-outline btn-sm">Explore Rate</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORT IMAGE DIVIDER ───────────────────────────────────────────── */}
      <div className="container" style={{ marginBottom: "var(--space-3xl)" }}>
        <div style={{ width: "100%", height: 190, background: "url('/images/divider_port.webp') center/cover no-repeat", position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(6,12,24,0.9) 0%, rgba(6,12,24,0.62) 50%, rgba(6,12,24,0.9) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: "0 24px" }}>
            <span style={{ width: 44, height: 3, background: "var(--accent-orange)", borderRadius: 2 }} />
            <p style={{ color: "#fff", fontFamily: "var(--font-header)", fontSize: "clamp(1rem, 2.2vw, 1.35rem)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
              Precision Logistics · Every Route · Every Cargo Type
            </p>
          </div>
        </div>
      </div>

      {/* ── JOURNEY PIPELINE ─────────────────────────────────────────────── */}
      <JourneyPipeline />

      {/* ── TRUST MARQUEE ────────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="section-header" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto var(--space-md) auto" }}>
          <span className="section-label">Our Commitments</span>
          <h3 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Built for Reliable Delivery</h3>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {COMMITMENTS.map((c, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "10px 18px",
                border: "1px solid var(--color-border)",
                borderRadius: 999,
                background: "#fff",
                boxShadow: "var(--shadow-sm)",
                fontWeight: 600,
                fontSize: "var(--font-size-sm)",
                color: "var(--color-primary-navy)",
              }}
            >
              <span style={{ color: "var(--color-primary-blue)", display: "flex" }}>{c.icon}</span>
              {c.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)", textAlign: "center" }}>
        <div className="card cta-banner" style={{ background: "linear-gradient(135deg, #0b1120 0%, #0e172c 100%)", padding: "var(--space-2xl)", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.15, zIndex: 1 }} viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 150 Q 200 50, 400 150 T 750 150" stroke="var(--blue-400)" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="200" cy="100" r="5" fill="var(--accent-orange)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="200" r="5" fill="var(--accent-orange)">
              <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>

          <div style={{ position: "absolute", top: "15%", left: "8%", zIndex: 2, opacity: 0.45, animation: "floatContainer 6s ease-in-out infinite" }}>
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 5 L45 15 L25 25 L5 15 Z" fill="#1e40af" stroke="#3b82f6" strokeWidth="1" />
              <path d="M5 15 L25 25 L25 38 L5 28 Z" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />
              <path d="M25 25 L45 15 L45 28 L25 38 Z" fill="#172554" stroke="#3b82f6" strokeWidth="1" />
            </svg>
          </div>
          <div style={{ position: "absolute", bottom: "15%", right: "8%", zIndex: 2, opacity: 0.45, animation: "floatContainer 8s ease-in-out infinite alternate" }}>
            <svg width="45" height="36" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 5 L45 15 L25 25 L5 15 Z" fill="#c2410c" stroke="#ea580c" strokeWidth="1" />
              <path d="M5 15 L25 25 L25 38 L5 28 Z" fill="#b45309" stroke="#ea580c" strokeWidth="1" />
              <path d="M25 25 L45 15 L45 28 L25 38 Z" fill="#78350f" stroke="#ea580c" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 5 }}>
            <h2 className="heading-2" style={{ color: "white", marginBottom: "var(--space-2xs)", fontFamily: "var(--font-header)" }}>Ready to Coordinate Your Next Shipment?</h2>
            <p style={{ color: "var(--sky-300)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-md)", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Get instant calculations or consult directly with our customs brokers across land, air, and ocean corridors.
            </p>
            <div className="flex justify-center gap-sm">
              <Link href="/contact" className="btn btn-primary" style={{ boxShadow: "0 0 15px rgba(66, 149, 232, 0.4)" }}>Get a Quote</Link>
              <Link href="/contact" className="btn btn-outline-white">Speak to Agents</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
