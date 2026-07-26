import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/admin/AdminNav";
import { createServiceArea, deleteServiceArea } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Service Areas", robots: { index: false, follow: false } };

type ServiceArea = {
  pin_code: string;
  city: string | null;
  state: string | null;
  hub_name: string | null;
  transit_days: number | null;
  tier: string | null;
  available: boolean;
};

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };
const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 700, color: "var(--color-primary-navy)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" };
const td: React.CSSProperties = { padding: "12px 16px", lineHeight: 1.6 };

export default async function ServiceAreasPage({
  searchParams,
}: {
  searchParams: { error?: string; added?: string };
}) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  const supabase = getSupabaseAdminClient()!;
  const { data, error } = await supabase
    .from("service_areas")
    .select("pin_code, city, state, hub_name, transit_days, tier, available")
    .order("pin_code", { ascending: true });

  const areas = (data ?? []) as ServiceArea[];

  return (
    <section style={shell}>
      <div className="container">
        <AdminNav active="coverage" />

        <div style={{ marginBottom: "var(--space-md)" }}>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Service Areas</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
            {areas.length} PIN codes · these power the public serviceability checker
          </p>
        </div>

        {searchParams?.added && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-success, #16a34a)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-success, #16a34a)", fontWeight: 600 }}>Added PIN {searchParams.added}.</p>
          </div>
        )}
        {searchParams?.error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>{searchParams.error}</p>
          </div>
        )}

        {/* ── Add a service area ────────────────────────────────────────────── */}
        <form className="card" action={createServiceArea} style={{ textAlign: "left", marginBottom: "var(--space-lg)" }}>
          <h3 className="heading-4" style={{ marginBottom: "var(--space-sm)" }}>Add a PIN code</h3>
          <div className="grid grid-3 gap-md">
            <div className="form-group">
              <label className="form-label">PIN code *</label>
              <input name="pin_code" className="form-control" placeholder="560001" inputMode="numeric" required />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input name="city" className="form-control" placeholder="Bengaluru" />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input name="state" className="form-control" placeholder="Karnataka" />
            </div>
          </div>
          <div className="grid grid-3 gap-md">
            <div className="form-group">
              <label className="form-label">Nearest hub</label>
              <input name="hub_name" className="form-control" placeholder="Bengaluru Hub" />
            </div>
            <div className="form-group">
              <label className="form-label">Transit days</label>
              <input name="transit_days" className="form-control" placeholder="2" inputMode="numeric" />
            </div>
            <div className="form-group">
              <label className="form-label">Tier</label>
              <input name="tier" className="form-control" placeholder="Metro / Tier 2 …" />
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-sm)", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
            <input type="checkbox" name="available" defaultChecked />
            Serviceable (uncheck to list as not yet covered)
          </label>
          <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)" }}>Add PIN code</button>
        </form>

        {/* ── Existing areas ────────────────────────────────────────────────── */}
        {error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>Could not load service areas: {error.message}</p>
          </div>
        )}

        {areas.length === 0 && !error ? (
          <div className="card"><p style={{ color: "var(--color-text-muted)" }}>No PIN codes yet. Add your first one above.</p></div>
        ) : (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--font-size-sm)", textAlign: "left", minWidth: 720 }}>
              <thead>
                <tr style={{ background: "var(--color-card-bg, #f8fafc)", borderBottom: "2px solid var(--color-border)" }}>
                  <th style={th}>PIN</th>
                  <th style={th}>City / State</th>
                  <th style={th}>Hub</th>
                  <th style={th}>Transit</th>
                  <th style={th}>Status</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {areas.map((a) => (
                  <tr key={a.pin_code} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ ...td, fontWeight: 700, fontFamily: "var(--font-header)" }}>{a.pin_code}</td>
                    <td style={td}>{[a.city, a.state].filter(Boolean).join(", ") || "—"}</td>
                    <td style={{ ...td, color: "var(--color-text-muted)" }}>{a.hub_name || "—"}</td>
                    <td style={{ ...td, color: "var(--color-text-muted)" }}>{a.transit_days != null ? `${a.transit_days} day${a.transit_days === 1 ? "" : "s"}` : "—"}</td>
                    <td style={td}>
                      <span className={`badge ${a.available ? "badge-success" : "badge-warning"}`}>{a.available ? "Serviceable" : "Not covered"}</span>
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <form action={deleteServiceArea}>
                        <input type="hidden" name="pin_code" value={a.pin_code} />
                        <button className="btn btn-outline btn-sm" type="submit" style={{ color: "var(--color-danger, #d9534f)", borderColor: "var(--color-danger, #d9534f)" }}>Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
