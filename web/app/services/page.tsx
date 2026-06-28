import Link from "next/link";
import { Suspense } from "react";
import PinChecker from "@/components/PinChecker";

export const metadata = {
  title: "Air, Sea & Road Freight Services",
  description:
    "Air freight charters, FCL/LCL ocean cargo, GPS-tracked road freight, bonded warehousing and customs brokerage — Sky Bridge Global's freight forwarding services from Kolar, Karnataka to 150+ countries.",
};

const QUADRANTS = [
  { img: "/images/services_air.png", title: "Air Operations", desc: "Continuous high-priority charter slots and customs gate approvals." },
  { img: "/images/services_ocean.png", title: "Ocean Operations", desc: "FCL & LCL container capacity management across primary shipping channels." },
  { img: "/images/services_road.png", title: "Ground Networks", desc: "GPS dispatch trucking for freight deliveries and local logistics nodes." },
  { img: "/images/services_warehouse.png", title: "Secure Warehousing", desc: "Climate-regulated depots, inventory audits, and pick-and-pack lines." },
];

const CHOOSE = [
  { title: "Global Coverage", desc: "Direct logistics gates operating across 150+ countries.", icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
  { title: "Reliable Delivery", desc: "99.9% transit reliability supported by carrier redundancies.", icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2" ry="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
  { title: "Competitive Pricing", desc: "Highly optimized groupage consolidations that lower base rates.", icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="12" rx="2" /><path d="M12 18H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v6" /><circle cx="18" cy="16" r="3" /><line x1="20" y1="18" x2="22" y2="20" /></svg> },
  { title: "24/7 Support", desc: "Constant communication lines to active shipping agents.", icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
  { title: "Customs Expertise", desc: "Licensed customs brokers to audit tariff files and documentation.", icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg> },
];

const CATEGORIES = [
  {
    title: "Air Freight", color: "var(--sky-300)", badge: "Express", badgeBg: "rgba(66, 149, 232, 0.15)",
    img: "/images/category_air.png",
    points: ["✓ Staggered carrier slot reserves", "✓ Bonded airport warehouse links", "✓ Real-time ledger transit logs"],
    statLabel: "Av. Transit Time", statValue: "1-3 Business Days",
  },
  {
    title: "Ocean Freight", color: "var(--blue-400)", badge: "High Volume", badgeBg: "rgba(27, 77, 143, 0.2)",
    img: "/images/category_ocean.png",
    points: ["✓ Weekly full container bookings", "✓ Standard terminal consolidations", "✓ Secure maritime trade lanes"],
    statLabel: "Volume Capacity", statValue: "Infinite / FCL & LCL",
  },
  {
    title: "Road Freight", color: "var(--accent-orange)", badge: "Last Mile", badgeBg: "rgba(244, 180, 0, 0.15)",
    img: "/images/category_road.png",
    points: ["✓ Real-time active GPS trackers", "✓ Border control check lanes", "✓ Direct door-to-door dispatch"],
    statLabel: "Regional Tracking", statValue: "Active GPS / SMS",
  },
];

const PREMIUM_BANNERS = [
  {
    img: "/images/charter_plane.png", badge: "Premium Charter Service", badgeColor: "var(--sky-200)",
    title: "Rapid Air Freight Charter Solutions",
    desc: "Fast, Secure and Reliable Air Cargo Transportation Across International Destinations. Dedicated custom fleet routing for oversized machinery and priority shipments.",
    btn: { label: "Request Charter Quote", cls: "btn btn-accent" },
  },
  {
    img: "/images/sea_freight_premium.png", badge: "Ocean Consolidation Lines", badgeColor: "var(--blue-400)",
    title: "Global Ocean Freight Network",
    desc: "Resilient transoceanic container links bridging major Asian, European, and American trade centers. Guaranteed container block bookings and automated clearance checks.",
    btn: { label: "Sea Freight Rate Quote", cls: "btn btn-primary" },
  },
  {
    img: "/images/road_freight_premium.png", badge: "Ground Logistics", badgeColor: "var(--accent-orange)",
    title: "Connected Highway Freight Fleet",
    desc: "Cross-border shipping linehauls and secure regional deliveries. Automated GPS fleet allocation and electronic logbook integration for continuous transit logs.",
    btn: { label: "Check Ground Coverage", cls: "btn btn-outline-white" },
  },
];

export default function ServicesPage() {
  return (
    <main style={{ textAlign: "left" }}>
      <div className="reveal-fade-up" style={{ paddingTop: 140, marginBottom: "var(--space-3xl)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Logistics Solutions</span>
            <h2 className="section-title">Freight Routing Capabilities</h2>
            <p className="section-desc">We offer a robust portfolio of shipping, warehousing, and trade compliance services.</p>
          </div>

          {/* ── DARK MULTI-MODAL QUADRANT BANNER ─────────────────────────── */}
          <div className="card" style={{ background: "linear-gradient(135deg, #0b1120 0%, #0d1627 100%)", color: "white", border: "none", padding: "var(--space-xl)", borderRadius: "var(--radius-xl)", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: "var(--space-2xl)" }}>
            <div style={{ position: "relative", zIndex: 5, marginBottom: "var(--space-lg)" }}>
              <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "var(--space-xs)" }}>Multi-Modal Orchestration</span>
              <h3 className="heading-2" style={{ color: "white", fontFamily: "var(--font-header)" }}>Complete Logistics Solutions Under One Roof</h3>
              <p style={{ color: "var(--sky-200)", fontSize: "var(--font-size-sm)", maxWidth: 600, margin: "0 auto" }}>
                Continuous synchronization of air, ocean, and ground freight channels backed by climate-controlled secure terminals.
              </p>
            </div>

            <div className="split-operations-grid">
              {QUADRANTS.map((q, i) => (
                <div key={i} className="op-quadrant">
                  <div className="op-quadrant-bg" style={{ backgroundImage: `url('${q.img}')` }} />
                  <div className="op-content">
                    <div className="op-quadrant-title">{q.title}</div>
                    <div className="op-quadrant-desc">{q.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── MAGAZINE GRID ─────────────────────────────────────────────── */}
          <div className="grid-2 mag-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: "var(--space-2xl)" }}>
            <Link href="/contact" className="mag-card" style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", minHeight: 420, background: "#0a1322", display: "block" }}>
              <img src="/images/services_air.png" alt="Air Freight" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, transition: "transform 0.5s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,12,24,0.92) 0%, rgba(6,12,24,0.3) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                <span style={{ display: "inline-block", background: "var(--accent-orange)", color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 20, marginBottom: 10 }}>Air Freight</span>
                <h3 style={{ color: "#fff", fontFamily: "var(--font-header)", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Priority Air Charter<br />&amp; Express Corridors</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>Dedicated cargo flight slots, real-time clearance, and next-flight-out booking on 80+ global routes.</p>
                <span style={{ color: "var(--blue-400)", fontSize: 13, fontWeight: 600 }}>Request Air Rate →</span>
              </div>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { img: "/images/services_ocean.png", tag: "Ocean Freight", title: "FCL & LCL Sea Cargo", cta: "Request Ocean Rate →" },
                { img: "/images/services_road.png", tag: "Road Transport", title: "GPS Fleet Trucking Networks", cta: "Request Road Rate →" },
                { img: "/images/services_warehouse.png", tag: "Warehousing", title: "Secure Distribution Hubs", cta: "View Facilities →" },
              ].map((m, i) => (
                <Link key={i} href="/contact" className="mag-card" style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", flex: 1, minHeight: 120, background: "#0a1322", display: "block" }}>
                  <img src={m.img} alt={m.tag} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, transition: "transform 0.5s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,12,24,0.88) 0%, rgba(6,12,24,0.3) 100%)" }} />
                  <div style={{ position: "absolute", top: "50%", left: 24, transform: "translateY(-50%)" }}>
                    <span style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{m.tag}</span>
                    <h4 style={{ color: "#fff", fontFamily: "var(--font-header)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>{m.title}</h4>
                    <span style={{ color: "var(--blue-400)", fontSize: 12, fontWeight: 600 }}>{m.cta}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── PREMIUM IMAGE BANNERS ────────────────────────────────────── */}
          {PREMIUM_BANNERS.map((b, i) => (
            <div key={i} className="premium-services-banner reveal-fade-up" style={{ background: `linear-gradient(180deg, rgba(15, 28, 48, 0.75) 0%, rgba(9, 16, 28, 0.9) 100%), url('${b.img}') no-repeat center center`, backgroundSize: "cover", position: "relative", borderRadius: "var(--radius-xl)", padding: "var(--space-2xl)", color: "white", overflow: "hidden", marginBottom: "var(--space-2xl)", minHeight: 380, display: "flex", alignItems: "center", textAlign: "left" }}>
              <div style={{ position: "relative", zIndex: 5, maxWidth: 600 }}>
                <span className="badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: b.badgeColor, marginBottom: "var(--space-sm)" }}>{b.badge}</span>
                <h3 className="heading-2" style={{ color: "white", marginBottom: "var(--space-xs)" }}>{b.title}</h3>
                <p style={{ color: "var(--sky-200)", fontSize: "var(--font-size-sm)", lineHeight: 1.6, marginBottom: "var(--space-md)" }}>{b.desc}</p>
                <Link href="/contact" className={b.btn.cls} style={b.btn.cls.includes("outline-white") ? { color: "white", borderColor: "white" } : undefined}>{b.btn.label}</Link>
              </div>
            </div>
          ))}

          {/* ── CATEGORY SHOWCASE ────────────────────────────────────────── */}
          <div className="category-showcase-container">
            <div className="grid grid-3 gap-md" style={{ textAlign: "left" }}>
              {CATEGORIES.map((c, i) => (
                <div key={i} className="category-col">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "var(--space-2xs)", marginBottom: "var(--space-2xs)" }}>
                    <span className="op-quadrant-title" style={{ color: c.color }}>{c.title}</span>
                    <span className="badge" style={{ background: c.badgeBg, color: c.color, fontSize: 10 }}>{c.badge}</span>
                  </div>
                  <div style={{ height: 120, background: `linear-gradient(180deg, rgba(15, 28, 48, 0.15) 0%, rgba(9, 16, 28, 0.6) 100%), url('${c.img}') no-repeat center center`, backgroundSize: "cover", borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative", marginBottom: "var(--space-2xs)" }} />
                  <ul style={{ fontSize: 11, color: "var(--sky-200)", paddingLeft: 12, marginBottom: "var(--space-2xs)", lineHeight: 1.6, listStyle: "none" }}>
                    {c.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "var(--space-2xs)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "var(--sky-300)", textTransform: "uppercase" }}>{c.statLabel}</span>
                    <strong style={{ color: "white", fontSize: "var(--font-size-sm)" }}>{c.statValue}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TRUCKS PARALLAX DIVIDER ──────────────────────────────────── */}
          <div className="parallax-divider" style={{ backgroundImage: "url('/images/divider_trucks.png')" }} />

          {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
          <div style={{ marginTop: "var(--space-3xl)", background: "linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.92) 100%), url('/images/why_choose_bg.png') no-repeat center center", backgroundSize: "cover", padding: "var(--space-2xl) var(--space-xl)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
            <div className="section-header" style={{ textAlign: "center" }}>
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title" style={{ color: "var(--color-primary-navy)" }}>Why Businesses Choose Sky Bridge Global</h2>
              <p className="section-desc">Reliability, speed, and transparency built into every trade corridor.</p>
            </div>

            <div className="choose-grid">
              {CHOOSE.map((c, i) => (
                <div key={i} className="card choose-card">
                  <div className="choose-icon">{c.icon}</div>
                  <div className="choose-title">{c.title}</div>
                  <div className="choose-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DARK PIN-CODE COVERAGE SECTION (live Supabase) ──────────────── */}
      <div id="pin-check" style={{ background: "linear-gradient(160deg,#060c18 0%,#0a1322 100%)", marginBottom: "var(--space-3xl)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <span className="section-label" style={{ color: "#4295e8", borderColor: "#4295e8" }}>Coverage Network</span>
          <h2 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: "#fff", margin: "12px 0 10px", letterSpacing: "-0.02em" }}>PIN Code Service Checker</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, maxWidth: 520, lineHeight: 1.75, marginBottom: 32 }}>
            Instantly verify freight coverage, identify your nearest hub, and get estimated transit times for any Indian PIN code.
          </p>
          <Suspense fallback={null}>
            <PinChecker />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
