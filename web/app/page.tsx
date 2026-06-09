import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";

const STATS = [
  { n: "150+", l: "Countries" },
  { n: "2.4M+", l: "Deliveries" },
  { n: "25+", l: "Years" },
  { n: "250+", l: "Partners" },
];

const HIGHLIGHTS = [
  { title: "Air Freight", desc: "Time-critical delivery via global air corridors with express customs clearance." },
  { title: "Sea Freight", desc: "Cost-effective FCL & LCL ocean transport with weekly departures worldwide." },
  { title: "Road & Land", desc: "Reliable domestic and cross-border trucking with GPS-tracked fleets." },
];

export default function HomePage() {
  return (
    <>
      <section
        className="hero-section"
        style={{ background: "linear-gradient(160deg, rgba(6,12,24,0.88) 0%, rgba(10,19,34,0.82) 60%, rgba(15,28,48,0.70) 100%), url('/images/hero_bg.png') no-repeat center center / cover" }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 160, paddingBottom: 80 }}>
          <div className="hero-content" style={{ maxWidth: 720 }}>
            <span className="hero-tag">✈&nbsp; Your Gateway Across Land, Air &amp; Ocean</span>
            <h1 className="hero-title" style={{ margin: "20px 0 16px" }}>
              Connecting <span>Global Trade</span>
              <br />
              Without Boundaries
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.125rem", lineHeight: 1.75, maxWidth: 580, color: "rgba(255,255,255,0.7)" }}>
              Resilient supply chains, smart border compliance, and express cargo
              routes across 150+ countries — all in one platform.
            </p>

            <HeroSearch />

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
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-header)", fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="container" style={{ padding: "80px 0" }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="hero-tag" style={{ color: "var(--color-primary-blue)", background: "var(--sky-100)", border: "none" }}>What we do</span>
          <h2 className="heading-2" style={{ marginTop: 16 }}>End-to-end logistics, one partner</h2>
        </div>
        <div className="grid grid-3 gap-lg">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="card card-hover">
              <h3 className="heading-3" style={{ marginBottom: 8 }}>{h.title}</h3>
              <p style={{ color: "var(--color-text-muted)" }}>{h.desc}</p>
              <Link href="/services" className="footer-link" style={{ color: "var(--color-primary-blue)", fontWeight: 600, display: "inline-block", marginTop: 12 }}>
                Explore services →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={{ background: "linear-gradient(135deg, var(--navy-800), var(--navy-900))", borderRadius: "var(--radius-xl)", padding: "56px 40px", textAlign: "center", color: "#fff" }}>
          <h2 className="heading-2" style={{ color: "#fff" }}>Ready to move your cargo?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "12px auto 28px" }}>
            Track a shipment in real time or request a tailored freight quote from our team.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tracking" className="btn btn-primary" style={{ borderRadius: 50, padding: "14px 32px" }}>Track a Shipment</Link>
            <Link href="/contact" className="btn btn-outline-white" style={{ borderRadius: 50, padding: "14px 32px" }}>Get a Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
