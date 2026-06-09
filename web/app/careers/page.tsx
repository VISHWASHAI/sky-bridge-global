import Link from "next/link";

export const metadata = { title: "Careers — Sky Bridge Global" };

const JOBS = [
  { title: "Global Supply Chain Analyst", dept: "Operations & Strategy", location: "New York, USA", type: "Full-time", salary: "$85,000 - $110,000" },
  { title: "Customs Compliance Officer", dept: "Regulatory Affairs", location: "Hamburg, Germany", type: "Full-time", salary: "€70,000 - €90,000" },
  { title: "Freight Sales Manager", dept: "Sales & Marketing", location: "Singapore", type: "Full-time", salary: "SG$90,000 + Commissions" },
];

export default function CareersPage() {
  return (
    <main>
      <div className="container" style={{ paddingTop: 140, paddingBottom: 48, textAlign: "left" }}>
        <span className="hero-tag" style={{ color: "var(--color-primary-blue)", background: "var(--sky-100)", border: "none" }}>Join the team</span>
        <h1 className="heading-2" style={{ marginTop: 16 }}>Careers at Sky Bridge Global</h1>
        <p className="section-desc" style={{ color: "var(--color-text-muted)", maxWidth: 560 }}>
          Help us connect supply chains across land, air and ocean. Explore open roles below.
        </p>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {JOBS.map((j, i) => (
            <div key={i} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <h3 className="heading-3">{j.title}</h3>
                <div style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                  {j.dept} · {j.location} · {j.type}
                </div>
                <div style={{ color: "var(--color-primary-blue)", fontWeight: 600, marginTop: 4 }}>{j.salary}</div>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ borderRadius: "var(--radius-md)" }}>Apply Now →</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
