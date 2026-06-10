import Link from "next/link";

export const metadata = { title: "Careers — Sky Bridge Global" };

const JOBS = [
  {
    title: "Global Supply Chain Analyst",
    dept: "Operations & Strategy",
    location: "New York, USA",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    desc: "We are seeking an experienced analyst to optimize supply chain pipelines for major Fortune 500 accounts. You will design logistics networks, track carrier SLA performances, and implement inventory management models.",
    reqs: ["Bachelor degree in Logistics, Analytics, or Industrial Engineering", "3+ years experience with WMS, SQL, and data visualization tools", "Strong communication and client management skills"],
  },
  {
    title: "Customs Compliance Officer",
    dept: "Regulatory Affairs",
    location: "Hamburg, Germany",
    type: "Full-time",
    salary: "€70,000 - €90,000",
    desc: "Ensure compliance with German export laws and EU custom tariffs. Maintain regulatory licenses, file declarations, and interface with government customs agencies.",
    reqs: ["Certified Customs Broker license or equivalent training", "Expert knowledge of EU tariff structures and HS classification systems", "Fluent in German and English"],
  },
  {
    title: "Freight Sales Manager",
    dept: "Sales & Marketing",
    location: "Singapore",
    type: "Full-time",
    salary: "SG$90,000 + Commissions",
    desc: "Drive growth in sea and air freight volumes across Asia-Pacific corridors. Cultivate new client relationships, negotiate service contracts, and prepare pricing quotations.",
    reqs: ["Proven track record in freight forwarding sales", "Strong corporate networking connections in APAC region", "Excellent negotiation and presentation capabilities"],
  },
];

const BENEFITS = [
  { title: "Global Mobility", desc: "Relocation support and rotations across international hub offices." },
  { title: "Health & Wellness", desc: "Comprehensive medical coverage for you and your family." },
  { title: "Learning Budget", desc: "Annual stipend for certifications, courses, and conferences." },
  { title: "Performance Bonus", desc: "Quarterly incentives tied to network growth milestones." },
];

export default function CareersPage() {
  return (
    <main>
      {/* ── HERO BAND ─────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg,#060c18 0%,#0d1627 50%,#0a1322 100%)", position: "relative", overflow: "hidden" }}>
        <img src="/images/about_team.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.14 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 64, textAlign: "left" }}>
          <span className="section-label" style={{ color: "#4295e8", borderColor: "#4295e8" }}>Join the Team</span>
          <h1 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Build the Future of<br />Global Logistics
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: 560, lineHeight: 1.75 }}>
            Help us connect supply chains across land, air and ocean. Explore open roles across our international offices.
          </p>
        </div>
      </div>

      {/* ── OPEN POSITIONS ───────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ paddingTop: "var(--space-2xl)", marginBottom: "var(--space-3xl)", textAlign: "left" }}>
        <div className="section-header">
          <span className="section-label">Open Positions</span>
          <h2 className="section-title">Current Opportunities</h2>
          <p className="section-desc">Every role ships real cargo — and real careers.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {JOBS.map((j, i) => (
            <div key={i} className="card card-hover" style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 420px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <h3 className="heading-3" style={{ marginBottom: 0 }}>{j.title}</h3>
                    <span className="badge badge-primary">{j.type}</span>
                  </div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: 10 }}>
                    {j.dept} · {j.location} · <strong style={{ color: "var(--color-primary-blue)" }}>{j.salary}</strong>
                  </div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.65, marginBottom: 12 }}>{j.desc}</p>
                  <div className="form-label" style={{ marginBottom: 6 }}>Requirements</div>
                  <ul style={{ paddingLeft: 18, listStyle: "disc", color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                    {j.reqs.map((r, k) => <li key={k}>{r}</li>)}
                  </ul>
                </div>
                <Link href="/contact" className="btn btn-primary" style={{ borderRadius: "var(--radius-md)", flexShrink: 0 }}>Apply Now →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="container reveal-fade-up" style={{ marginBottom: "var(--space-3xl)" }}>
        <div className="card" style={{ background: "linear-gradient(135deg, #0b1120 0%, #0e172c 100%)", border: "none", padding: "var(--space-2xl)", borderRadius: "var(--radius-xl)" }}>
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "white", marginBottom: "var(--space-xs)" }}>Why Work With Us</span>
            <h2 className="heading-2" style={{ color: "#fff" }}>Benefits &amp; Culture</h2>
          </div>
          <div className="grid grid-4 gap-md" style={{ textAlign: "left", marginTop: "var(--space-lg)" }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-lg)", padding: "var(--space-md)" }}>
                <h4 className="heading-4" style={{ color: "#fff", marginBottom: 6 }}>{b.title}</h4>
                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--sky-200)", lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
