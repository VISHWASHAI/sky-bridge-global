import Link from "next/link";
import HeroPinCheck from "@/components/HeroPinCheck";
import JourneyPipeline from "@/components/JourneyPipeline";
import Testimonials from "@/components/Testimonials";

const TRUST_STATS = [
  { n: "150+", l: "Countries" },
  { n: "2.4M+", l: "Deliveries" },
  { n: "25+", l: "Years" },
  { n: "250+", l: "Partners" },
];

const SERVICE_CARDS = [
  { img: "/images/category_air.png", title: "Air Freight Charter", desc: "Priority cargo scheduling and custom customs clearance on prime flight corridors." },
  { img: "/images/category_ocean.png", title: "Sea Cargo Liners", desc: "Weekly ocean container space bookings for FCL & LCL cargo routes." },
  { img: "/images/category_road.png", title: "Land Freight Networks", desc: "GPS-enabled domestic trucking fleets and border gateway checks." },
  { img: "/images/services_warehouse.png", title: "Warehousing & Hubs", desc: "Distributed climate-controlled inventory facilities with cross-docking hubs." },
  { img: "/images/services_air.png", title: "Customs Brokerage", desc: "Automated compliance audit filings, bonded clearance, and tariff assessments.", filter: "hue-rotate(200deg) brightness(0.85)" },
];

const PARTNER_LOGOS = ["MAERSK LINE", "FEDEX SLOT", "DHL EXPRESS", "UPS SYSTEMS", "IATA MEMBER", "FIATA COMPL"];

const MAP_HUBS = [
  { x: 80, y: 90, dur: "2.5s" },
  { x: 220, y: 70, dur: "2s" },
  { x: 350, y: 150, dur: "2.8s" },
  { x: 400, y: 100, dur: "2.2s" },
  { x: 430, y: 220, dur: "2.6s" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{ background: "linear-gradient(160deg, rgba(6,12,24,0.88) 0%, rgba(10,19,34,0.82) 60%, rgba(15,28,48,0.70) 100%), url('/images/hero_bg.png') no-repeat center center / cover" }}
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
              road freight and customs clearance for Indian businesses shipping to
              150+ countries — with live tracking from pickup to delivery.
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
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-header)", fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
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
            <div className="stat-item">
              <div className="stat-number stat-count" data-target="150" data-suffix="+">0</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number stat-count" data-target="2.4" data-decimals="1" data-suffix="M+">0</div>
              <div className="stat-label">Deliveries Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number stat-count" data-target="250" data-suffix="+">0</div>
              <div className="stat-label">Global Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number stat-count" data-target="25" data-suffix="+">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
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

          <div className="map-placeholder" style={{ height: 350, backgroundColor: "var(--navy-900)", borderColor: "var(--navy-800)", position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)" }}>
            <svg viewBox="0 0 500 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ background: "transparent" }}>
              <path d="M 30 50 Q 80 40 100 80 Q 90 120 70 140 Q 50 110 30 50 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />
              <path d="M 80 150 Q 110 160 120 180 Q 100 240 80 270 Q 60 210 80 150 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />
              <path d="M 200 40 Q 250 30 270 70 Q 250 100 240 130 Q 220 140 210 110 Q 180 80 200 40 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />
              <path d="M 220 140 Q 270 140 280 180 Q 250 240 220 250 Q 200 210 220 140 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />
              <path d="M 280 60 Q 380 40 440 80 Q 420 140 370 170 Q 310 150 280 60 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />
              <path d="M 400 200 Q 450 200 460 230 Q 420 260 400 200 Z" fill="rgba(66, 149, 232, 0.08)" stroke="rgba(66, 149, 232, 0.15)" strokeWidth="1" />

              <path id="route1" d="M 80 90 Q 150 65 220 70" stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.45" />
              <path id="route2" d="M 220 70 Q 285 100 350 150" stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.45" />
              <path id="route3" d="M 350 150 Q 375 120 400 100" stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.45" />
              <path id="route4" d="M 400 100 Q 415 160 430 220" stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.45" />
              <path id="route6" d="M 80 90 Q 250 200 430 220" stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.4" />

              {["route1", "route2", "route3", "route4", "route6"].map((r, i) => (
                <circle key={r} r="3.5" fill="var(--accent-orange)">
                  <animateMotion dur={`${[5, 7, 4, 6, 8][i]}s`} repeatCount="indefinite">
                    <mpath href={`#${r}`} />
                  </animateMotion>
                </circle>
              ))}

              {MAP_HUBS.map((h, i) => (
                <g key={i} transform={`translate(${h.x}, ${h.y})`}>
                  <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-orange)" opacity="0.6">
                    <animate attributeName="r" values="3.5;9;3.5" dur={h.dur} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0;0.7" dur={h.dur} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>

            <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 10, color: "#94a3b8", textAlign: "left", zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-orange)", display: "inline-block", boxShadow: "0 0 5px var(--accent-orange)" }} />
                Active Cargo Transits
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffffff", display: "inline-block" }} />
                Global Logistics Hubs
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
        <div style={{ width: "100%", height: 180, background: "url('/images/divider_port.png') center/cover no-repeat", position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,19,34,0.72) 0%, rgba(10,19,34,0.2) 50%, rgba(10,19,34,0.72) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-header)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center" }}>
              Precision Logistics · Every Route · Every Cargo Type
            </p>
          </div>
        </div>
      </div>

      {/* ── JOURNEY PIPELINE ─────────────────────────────────────────────── */}
      <JourneyPipeline />

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── TRUST MARQUEE ────────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="section-header" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto var(--space-md) auto" }}>
          <span className="section-label">Trusted Network</span>
          <h3 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Global Alliances &amp; Affiliations</h3>
        </div>

        <div className="trust-marquee-container">
          <div className="marquee-track">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <div key={i} className="logo-item" style={{ width: 120 }}>
                <svg width="120" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 120 40">
                  <text x="60" y="25" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="14">{name}</text>
                </svg>
              </div>
            ))}
          </div>
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
