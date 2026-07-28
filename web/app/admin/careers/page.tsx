import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import type { JobRow } from "@/lib/jobs";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Careers", robots: { index: false, follow: false } };

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };
const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 700, color: "var(--color-primary-navy)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" };
const td: React.CSSProperties = { padding: "12px 16px", lineHeight: 1.6 };

export default async function AdminCareersPage() {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  const supabase = getSupabaseAdminClient()!;
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, dept, location, active, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const jobs = (data ?? []) as JobRow[];

  return (
    <section style={shell}>
      <div className="container">
        <AdminNav active="careers" />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: "var(--space-md)" }}>
          <div>
            <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Careers</h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>{jobs.length} jobs · shown on the public careers page when active</p>
          </div>
          <Link href="/admin/careers/new" className="btn btn-primary btn-sm" style={{ borderRadius: "var(--radius-md)" }}>+ New job</Link>
        </div>

        {error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>Could not load jobs: {error.message}. Have you run migration 0004_jobs.sql?</p>
          </div>
        )}

        {jobs.length === 0 && !error ? (
          <div className="card"><p style={{ color: "var(--color-text-muted)" }}>No jobs yet. Click “New job” to add your first opening.</p></div>
        ) : (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--font-size-sm)", textAlign: "left", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "var(--color-card-bg, #f8fafc)", borderBottom: "2px solid var(--color-border)" }}>
                  <th style={th}>Title</th>
                  <th style={th}>Dept / Location</th>
                  <th style={th}>Status</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ ...td, fontWeight: 700 }}>{j.title}</td>
                    <td style={{ ...td, color: "var(--color-text-muted)" }}>{[j.dept, j.location].filter(Boolean).join(" · ") || "—"}</td>
                    <td style={td}>
                      <span className={`badge ${j.active ? "badge-success" : "badge-warning"}`}>{j.active ? "Live" : "Hidden"}</span>
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <Link href={`/admin/careers/${j.id}`} className="btn btn-outline btn-sm">Edit</Link>
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
