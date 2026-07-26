import Link from "next/link";

export const metadata = {
  title: "About Us — Freight Forwarding Company in Kolar, Karnataka",
  description:
    "Sky Bridge Global is a freight forwarding and customs brokerage company headquartered in Robertsonpet, Kolar, Karnataka, offering air, sea and road freight, warehousing and customs clearance for businesses shipping across India and worldwide.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO BAND ─────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg,#060c18 0%,#0d1627 50%,#0a1322 100%)", position: "relative", overflow: "hidden" }}>
        <img src="/images/about_banner.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 64 }}>
          <span className="section-label" style={{ color: "#4295e8", borderColor: "#4295e8" }}>Corporate Profile</span>
          <h1 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Connecting Supply Chains,<br />Delivering Excellence
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: 560, lineHeight: 1.75 }}>
            From Kolar, Karnataka — we&apos;ve built a trusted multi-modal logistics network connecting Indian businesses to global trade routes.
          </p>
        </div>
      </div>

      {/* ── ABOUT + MISSION/VISION ───────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-2xl)", paddingTop: "var(--space-2xl)", textAlign: "left" }}>
        <span className="badge badge-primary" style={{ marginBottom: "var(--space-xs)" }}>Corporate Profile</span>
        <h2 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-sm)" }}>About Sky Bridge Global</h2>
        <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7, fontSize: "var(--font-size-sm)", marginBottom: "var(--space-md)" }}>
          Sky Bridge Global, headquartered in Robertsonpet, Kolar, Karnataka, is a professional logistics and supply chain solutions company dedicated to reliable, efficient, and cost-effective transportation. We provide integrated logistics services that simplify supply chain operations for businesses of all sizes — handling air freight, sea cargo, road transport, warehousing, and customs brokerage across domestic and international markets. Through customized logistics solutions, modern practices, and experienced professionals, we deliver safe, timely, and high-quality services while building long-term business relationships rooted in customer satisfaction and operational excellence.
        </p>

        <div className="grid grid-2 gap-lg" style={{ marginTop: "var(--space-xl)" }}>
          <div className="card">
            <h4 className="heading-4" style={{ marginBottom: "var(--space-2xs)" }}><span style={{ color: "var(--color-primary-blue)" }}>Our Mission</span></h4>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              To provide resilient, high-capacity trade routes bridging local manufacturers to international consumer markets through technology, compliance, and optimized transport lanes.
            </p>
          </div>
          <div className="card">
            <h4 className="heading-4" style={{ marginBottom: "var(--space-2xs)" }}><span style={{ color: "var(--color-primary-blue)" }}>Our Vision</span></h4>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              To lead carbon-offset multi-modal freight distribution by incorporating automated compliance check gates and real-time ledger tracking on all primary transcontinental routes.
            </p>
          </div>
        </div>
      </section>

      {/* ── ALTERNATING STORYTELLING PANELS ─────────────────────────────── */}
      <section className="container" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="grid grid-2 gap-xl reveal-fade-up" style={{ alignItems: "center", marginBottom: "var(--space-2xl)", textAlign: "left" }}>
          <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", height: 320, boxShadow: "var(--shadow-md)" }}>
            <img src="/images/about_team.webp" alt="Logistics Team Collaboration" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span className="badge badge-warning" style={{ marginBottom: "var(--space-xs)" }}>Operational Excellence</span>
            <h3 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-sm)" }}>Collaborative Fleet Management</h3>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, fontSize: "var(--font-size-sm)", marginBottom: "var(--space-md)" }}>
              Our central control dispatch room coordinates flight corridors and maritime slots in real-time. By bridging human logistics expertise with predictive routing algorithms, our team maintains full control over global transshipment paths and tariff compliance audits.
            </p>
            <Link href="/contact" className="btn btn-outline btn-sm">Speak with Our Team</Link>
          </div>
        </div>

        <div className="grid grid-2 gap-xl reveal-fade-up" style={{ alignItems: "center", textAlign: "left" }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "var(--space-xs)" }}>Terminal Operations</span>
            <h3 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-sm)" }}>Smart Secure Distribution Hubs</h3>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, fontSize: "var(--font-size-sm)", marginBottom: "var(--space-md)" }}>
              Based in Robertsonpet, Kolar, Karnataka, we operate a secure freight and warehousing facility with automated compliance checking gates, RFID-scanning inventory controls, and dedicated customs clearance brokers to accelerate audit logs across India and international corridors.
            </p>
            <Link href="/services" className="btn btn-outline btn-sm">Explore Hub Services</Link>
          </div>
          <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", height: 320, boxShadow: "var(--shadow-md)" }}>
            <img src="/images/about_warehouse.webp" alt="Warehouse Operations" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE NETWORK PRESENCE (dark card + counters) ──────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="card" style={{ background: "linear-gradient(180deg, rgba(15, 28, 48, 0.8) 0%, rgba(9, 16, 28, 0.9) 100%), url('/images/about_banner.webp') no-repeat center center", backgroundSize: "cover", color: "white", border: "none", padding: "var(--space-2xl)", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 5, textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "var(--space-xs)" }}>Enterprise Network Presence</span>
            <h2 className="heading-2" style={{ color: "white", fontFamily: "var(--font-header)", marginBottom: "var(--space-2xs)" }}>Building Bridges Across Global Trade</h2>
            <p style={{ color: "var(--sky-200)", fontSize: "var(--font-size-sm)", maxWidth: 600, margin: "0 auto" }}>
              Connecting continents through express corridors, freight compliance checkports, and smart ledger tracking hubs.
            </p>
          </div>

          <div className="grid grid-3 gap-lg" style={{ position: "relative", zIndex: 5, textAlign: "left" }}>
            {[
              { title: "Multi-Modal Reach", desc: "Air, sea, and road freight across India and international corridors, with direct customs clearance handling." },
              { title: "Dedicated Service", desc: "Personal coordination for retail and industrial clients, with integrated supply hubs and GPS logistics monitoring." },
              { title: "End-to-End Solutions", desc: "Ocean container consolidation, customs brokerage audits, and secure terminal warehousing under one roof." },
            ].map((c, i) => (
              <div key={i} className="card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "var(--space-md)", borderRadius: "var(--radius-lg)" }}>
                <h4 className="heading-4" style={{ color: "white", marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--sky-200)", lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORT PARALLAX DIVIDER ────────────────────────────────────────── */}
      <div className="parallax-divider" style={{ backgroundImage: "url('/images/divider_port.webp')" }} />
    </main>
  );
}
