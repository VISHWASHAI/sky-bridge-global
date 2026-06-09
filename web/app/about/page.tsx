export const metadata = { title: "About — Sky Bridge Global" };

const STATS = [
  { n: "150+", l: "Countries served" },
  { n: "2.4M+", l: "Deliveries completed" },
  { n: "250+", l: "Global partners" },
  { n: "25+", l: "Years experience" },
];

export default function AboutPage() {
  return (
    <main>
      <section
        className="hero-section"
        style={{ minHeight: "auto", background: "linear-gradient(160deg, rgba(6,12,24,0.9), rgba(15,28,48,0.8)), url('/images/about_banner.png') no-repeat center center / cover" }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 64 }}>
          <span className="hero-tag">Corporate profile</span>
          <h1 className="hero-title" style={{ margin: "16px 0", fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Connecting Supply Chains,<br />Delivering Excellence
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 620, color: "rgba(255,255,255,0.7)" }}>
            From Kolar, Karnataka — we&apos;ve built a trusted multi-modal logistics
            network connecting Indian businesses to global trade routes.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: "64px 0" }}>
        <div className="grid grid-4 gap-lg">
          {STATS.map((s, i) => (
            <div key={i} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-header)", fontSize: "2rem", fontWeight: 800, color: "var(--color-primary-blue)" }}>{s.n}</div>
              <div style={{ color: "var(--color-text-muted)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 80, maxWidth: 760 }}>
        <h2 className="heading-2" style={{ marginBottom: 16 }}>Our mission</h2>
        <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}>
          We re-engineer end-to-end supply chains to minimise waste, reduce transit
          costs, and increase visibility. From express air corridors to full-container
          ocean freight and cross-border trucking, Sky Bridge Global gives shippers a
          single, accountable partner for moving cargo across land, air and ocean.
        </p>
      </section>
    </main>
  );
}
