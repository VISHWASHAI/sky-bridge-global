import Link from "next/link";

export const metadata = {
  title: "About Us — Freight Forwarding Company in Kolar, Karnataka",
  description:
    "Founded in 2001 by Arivazhagan K, Sky Bridge Global is a freight and customs brokerage company headquartered in Robertsonpet, Kolar, Karnataka, serving 150+ countries with 99.9% dispatch reliability.",
};

const MILESTONES = [
  { year: "2001", title: "Company Foundation", accent: true, desc: "Established by Arivazhagan K as a regional freight and customs brokerage firm in Robertsonpet, Kolar, Karnataka, India — coordinating compliance filings and duty clearances for local and regional importers." },
  { year: "2007", title: "First International Air Cargo Charter", accent: false, desc: "Successfully managed our first international air freight charter from Frankfurt to Chicago and opened transit agent offices at major airport corridors worldwide." },
  { year: "2013", title: "Expansion into Global Markets", accent: false, desc: "Expanded operations to serve pan-India freight corridors and launched multi-modal LCL cargo consolidation lines bridging South Indian manufacturing hubs to international ports." },
  { year: "2019", title: "Strategic Enterprise Alliances", accent: false, desc: "Signed framework alliances with Nordic Retailers and AP Traders Group, scaling our network to 100+ countries and launching our first digital tracking portal." },
  { year: "2026 · Now", title: "Sustainable Growth & Green Fleet", accent: true, desc: "Launching carbon-offset tracking, climate-regulated depots, and a fleet of electric last-mile containers for zero-emission dispatching across all primary corridors." },
];

const COMMITTEE = [
  { initials: "CEO", name: "Sarah Jenkins", role: "Chief Executive Officer" },
  { initials: "COO", name: "David Vance", role: "Chief Operations Officer" },
  { initials: "CFO", name: "Aya Yoshida", role: "VP of Global Tariffs" },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO BAND ─────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg,#060c18 0%,#0d1627 50%,#0a1322 100%)", position: "relative", overflow: "hidden" }}>
        <img src="/images/about_banner.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
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
          Sky Bridge Global, founded by Arivazhagan K and headquartered in Robertsonpet, Kolar, Karnataka, is a professional logistics and supply chain solutions company dedicated to reliable, efficient, and cost-effective transportation. We provide integrated logistics services that simplify supply chain operations for businesses of all sizes — handling air freight, sea cargo, road transport, warehousing, and customs brokerage across domestic and international markets. Through customized logistics solutions, modern practices, and experienced professionals, we deliver safe, timely, and high-quality services while building long-term business relationships rooted in customer satisfaction and operational excellence.
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
            <img src="/images/about_team.png" alt="Logistics Team Collaboration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            <img src="/images/about_warehouse.png" alt="Warehouse Operations" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE NETWORK PRESENCE (dark card + counters) ──────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="card" style={{ background: "linear-gradient(180deg, rgba(15, 28, 48, 0.8) 0%, rgba(9, 16, 28, 0.9) 100%), url('/images/about_banner.png') no-repeat center center", backgroundSize: "cover", color: "white", border: "none", padding: "var(--space-2xl)", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 5, textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "var(--space-xs)" }}>Enterprise Network Presence</span>
            <h2 className="heading-2" style={{ color: "white", fontFamily: "var(--font-header)", marginBottom: "var(--space-2xs)" }}>Building Bridges Across Global Trade</h2>
            <p style={{ color: "var(--sky-200)", fontSize: "var(--font-size-sm)", maxWidth: 600, margin: "0 auto" }}>
              Connecting continents through express corridors, freight compliance checkports, and smart ledger tracking hubs.
            </p>
          </div>

          <div className="grid grid-3 gap-lg" style={{ position: "relative", zIndex: 5, textAlign: "left" }}>
            {[
              { title: "Global Reach", desc: "Weekly charters serving 150+ countries. Direct clearance gates across major shipping straits and air flight slots.", target: "99.9", decimals: "1", suffix: "%", label: "Dispatch Reliability" },
              { title: "Trusted Partner", desc: "Serving retail leaders and Nordic heavy industries with integrated supply hubs and GPS logistics monitoring.", target: "250", decimals: "0", suffix: "+", label: "Enterprise Partners" },
              { title: "End-to-End Solutions", desc: "Coordinating ocean container consolidations, customs brokers audits, and smart secure terminal warehousing.", target: "2.4", decimals: "1", suffix: "M+", label: "Completed Deliveries" },
            ].map((c, i) => (
              <div key={i} className="card" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "var(--space-md)", borderRadius: "var(--radius-lg)" }}>
                <h4 className="heading-4" style={{ color: "white", marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--sky-200)", lineHeight: 1.5, marginBottom: "var(--space-sm)" }}>{c.desc}</p>
                <div className="stat-number stat-count" data-target={c.target} data-decimals={c.decimals} data-suffix={c.suffix} style={{ color: "var(--accent-orange)", fontSize: "var(--font-size-2xl)" }}>0</div>
                <span style={{ fontSize: 10, color: "var(--sky-300)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORT PARALLAX DIVIDER ────────────────────────────────────────── */}
      <div className="parallax-divider" style={{ backgroundImage: "url('/images/divider_port.png')" }} />

      {/* ── EXECUTIVE COMMITTEE ──────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <h3 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-md)", textAlign: "center" }}>Executive Committee</h3>
        <div className="grid grid-3 gap-md">
          {COMMITTEE.map((m, i) => (
            <div key={i} className="card text-center">
              <div style={{ width: 80, height: 80, backgroundColor: "var(--color-light-bg)", borderRadius: "var(--radius-full)", margin: "0 auto var(--space-sm) auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--color-primary-blue)" }}>{m.initials}</div>
              <h4 className="heading-4" style={{ marginBottom: 2 }}>{m.name}</h4>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-xs)" }}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPANY JOURNEY TIMELINE ─────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)", textAlign: "left" }}>
        <div className="section-header">
          <span className="section-label">Our History</span>
          <h2 className="section-title">Company Journey</h2>
          <p className="section-desc">Key milestones that shaped Sky Bridge Global into an international cargo consolidator.</p>
        </div>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, var(--color-primary-blue), rgba(66,149,232,0.1))" }} />

          {MILESTONES.map((m, i) => {
            const color = m.accent ? "var(--accent-orange)" : "var(--color-primary-blue)";
            return (
              <div key={i} style={{ position: "relative", marginBottom: i === MILESTONES.length - 1 ? 0 : 40, paddingLeft: 32 }}>
                <div style={{ position: "absolute", left: -21, top: 4, width: 20, height: 20, borderRadius: "50%", background: color, border: "3px solid #fff", boxShadow: `0 0 0 3px ${color}` }} />
                <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.year}</span>
                <h4 style={{ fontFamily: "var(--font-header)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-navy)", margin: "4px 0 8px" }}>{m.title}</h4>
                <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.65, maxWidth: 600 }}>{m.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
