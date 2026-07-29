import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { JobRow } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers — Join Our Logistics Team",
  description:
    "Explore open roles at Sky Bridge Global across logistics operations, customs compliance, and freight sales — based in Kolar, Karnataka with competitive pay, health insurance, and provident fund.",
};

const BENEFITS = [
  { title: "Health Insurance", desc: "Medical coverage for you and your family." },
  { title: "Provident Fund & ESI", desc: "Statutory PF and ESI contributions from day one." },
  { title: "Learning Budget", desc: "Annual stipend for certifications, courses, and workshops." },
  { title: "Performance Incentives", desc: "Quarterly incentives tied to growth milestones." },
];

export default async function CareersPage() {
  const supabase = getSupabaseServerClient();
  let jobs: JobRow[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    jobs = (data ?? []) as JobRow[];
  }

  return (
    <main>
      {/* ── HERO BAND ─────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg,#060c18 0%,#0d1627 50%,#0a1322 100%)", position: "relative", overflow: "hidden" }}>
        <img src="/images/about_team.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.14 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 64, textAlign: "left" }}>
          <span className="section-label" style={{ color: "#4295e8", borderColor: "#4295e8" }}>Join the Team</span>
          <h1 style={{ fontFamily: "var(--font-header)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Build the Future of<br />Global Logistics
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: 560, lineHeight: 1.75 }}>
            Help us connect supply chains across land, air and ocean. Explore open roles at our Kolar, Karnataka base and across our India network.
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

        {jobs.length === 0 ? (
          <div className="card" style={{ textAlign: "left" }}>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              No open positions right now. Check back soon — or email us at{" "}
              <a href="mailto:info@skybridgeglobals.com" style={{ color: "var(--color-primary-blue)" }}>info@skybridgeglobals.com</a>{" "}
              to introduce yourself.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {jobs.map((j) => (
              <div key={j.id} className="card card-hover" style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 420px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                      <h3 className="heading-3" style={{ marginBottom: 0 }}>{j.title}</h3>
                      {j.type && <span className="badge badge-primary">{j.type}</span>}
                    </div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: 10 }}>
                      {[j.dept, j.location].filter(Boolean).join(" · ")}
                      {j.salary && <> · <strong style={{ color: "var(--color-primary-blue)" }}>{j.salary}</strong></>}
                    </div>
                    {j.description && <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.65, marginBottom: 12 }}>{j.description}</p>}
                    {j.requirements.length > 0 && (
                      <>
                        <div className="form-label" style={{ marginBottom: 6 }}>Requirements</div>
                        <ul style={{ paddingLeft: 18, listStyle: "disc", color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                          {j.requirements.map((r, k) => <li key={k}>{r}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                  <Link href="/contact" className="btn btn-primary" style={{ borderRadius: "var(--radius-md)", flexShrink: 0 }}>Apply Now →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
