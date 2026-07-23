import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { badgeClassFor, type ShipmentRow } from "@/lib/shipments";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Shipments", robots: { index: false, follow: false } };

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };

export default async function ShipmentsPage({ searchParams }: { searchParams: { q?: string } }) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  // Strip characters that would break PostgREST's or() filter syntax.
  const q = (searchParams?.q ?? "").replace(/[,()]/g, " ").trim();

  const supabase = getSupabaseAdminClient()!;
  let query = supabase
    .from("shipments")
    .select("id, tracking_no, status, status_class, origin, destination, created_at")
    .order("created_at", { ascending: false });
  if (q) {
    query = query.or(`tracking_no.ilike.%${q}%,origin.ilike.%${q}%,destination.ilike.%${q}%`);
  }
  const { data, error } = await query;

  const shipments = (data ?? []) as ShipmentRow[];

  return (
    <section style={shell}>
      <div className="container">
        <AdminNav active="shipments" />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: "var(--space-md)" }}>
          <div>
            <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Shipments</h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>{shipments.length} total · newest first</p>
          </div>
          <Link href="/admin/shipments/new" className="btn btn-primary btn-sm" style={{ borderRadius: "var(--radius-md)" }}>+ New shipment</Link>
        </div>

        <form method="get" style={{ display: "flex", gap: 8, marginBottom: "var(--space-md)", maxWidth: 420 }}>
          <input name="q" defaultValue={q} className="form-control" placeholder="Search tracking no., origin, destination…" style={{ flex: 1 }} />
          <button className="btn btn-outline btn-sm" type="submit">Search</button>
          {q && <Link href="/admin/shipments" className="btn btn-outline btn-sm">Clear</Link>}
        </form>

        {error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>Could not load shipments: {error.message}</p>
          </div>
        )}

        {shipments.length === 0 && !error ? (
          <div className="card">
            <p style={{ color: "var(--color-text-muted)" }}>
              {q ? `No shipments match “${q}”.` : "No shipments yet. Click “New shipment” to add your first one."}
            </p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--font-size-sm)", textAlign: "left", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "var(--color-card-bg, #f8fafc)", borderBottom: "2px solid var(--color-border)" }}>
                  <th style={th}>Tracking No.</th>
                  <th style={th}>Status</th>
                  <th style={th}>Route</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ ...td, fontWeight: 700, fontFamily: "var(--font-header)" }}>{s.tracking_no}</td>
                    <td style={td}>
                      {s.status ? <span className={`badge ${badgeClassFor(s.status_class)}`}>{s.status}</span> : <span style={{ color: "var(--color-text-muted)" }}>—</span>}
                    </td>
                    <td style={{ ...td, color: "var(--color-text-muted)" }}>{s.origin || "?"} → {s.destination || "?"}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <Link href={`/admin/shipments/${s.id}`} className="btn btn-outline btn-sm">Manage</Link>
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

const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 700, color: "var(--color-primary-navy)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" };
const td: React.CSSProperties = { padding: "12px 16px", lineHeight: 1.6 };
