import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { login } from "./actions";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Enquiries",
  robots: { index: false, follow: false },
};

type Enquiry = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  message: string;
  created_at: string;
};

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const shell: React.CSSProperties = {
  paddingTop: 140,
  paddingBottom: "var(--space-3xl)",
  minHeight: "70vh",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // ── Not configured ────────────────────────────────────────────────────────
  if (!isAdminAuthConfigured || !isAdminConfigured) {
    return (
      <section style={shell}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="card" style={{ borderLeft: "5px solid var(--accent-orange)" }}>
            <h1 className="heading-3" style={{ color: "var(--color-primary-navy)" }}>Admin not configured</h1>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              To enable the enquiries inbox, set these environment variables (locally in
              <code> web/.env.local</code> and in Vercel → Project → Settings → Environment Variables):
            </p>
            <ul style={{ color: "var(--color-text-muted)", lineHeight: 1.9, paddingLeft: 20 }}>
              <li><code>ADMIN_PASSWORD</code> — a password you choose {isAdminAuthConfigured ? "✓ set" : "✗ missing"}</li>
              <li><code>SUPABASE_SERVICE_ROLE_KEY</code> — Supabase → Settings → API → service_role key {isAdminConfigured ? "✓ set" : "✗ missing"}</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  // ── Login gate ────────────────────────────────────────────────────────────
  if (!isAdminAuthed()) {
    return (
      <section style={shell}>
        <div className="container" style={{ maxWidth: 420 }}>
          <form className="card" action={login} style={{ textAlign: "left" }}>
            <h1 className="heading-3" style={{ color: "var(--color-primary-navy)", marginBottom: "var(--space-xs)" }}>
              Admin Login
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-md)" }}>
              Enter the admin password to view website enquiries.
            </p>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" autoFocus required />
            </div>
            {searchParams?.error && (
              <p style={{ color: "var(--color-danger, #d9534f)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-sm)" }}>
                Incorrect password. Try again.
              </p>
            )}
            <button className="btn btn-primary" type="submit" style={{ width: "100%", borderRadius: "var(--radius-md)" }}>
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }

  // ── Authenticated: load enquiries ─────────────────────────────────────────
  const supabase = getSupabaseAdminClient()!;
  const { data, error } = await supabase
    .from("enquiries")
    .select("id, company_name, contact_name, email, message, created_at")
    .order("created_at", { ascending: false });

  const enquiries = (data ?? []) as Enquiry[];

  return (
    <section style={shell}>
      <div className="container">
        <AdminNav active="enquiries" />
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginBottom: 2 }}>Enquiries</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
            {enquiries.length} total · newest first
          </p>
        </div>

        {error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>Could not load enquiries: {error.message}</p>
          </div>
        )}

        {enquiries.length === 0 && !error ? (
          <div className="card">
            <p style={{ color: "var(--color-text-muted)" }}>No enquiries yet. Submissions from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--font-size-sm)", textAlign: "left", minWidth: 720 }}>
              <thead>
                <tr style={{ background: "var(--color-card-bg, #f8fafc)", borderBottom: "2px solid var(--color-border)" }}>
                  <th style={th}>Received</th>
                  <th style={th}>Company</th>
                  <th style={th}>Contact</th>
                  <th style={th}>Email</th>
                  <th style={th}>Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid var(--color-border)", verticalAlign: "top" }}>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "var(--color-text-muted)" }}>{formatWhen(e.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{e.company_name}</td>
                    <td style={td}>{e.contact_name}</td>
                    <td style={td}>
                      <a href={`mailto:${e.email}?subject=Re: your enquiry to Sky Bridge Global`} style={{ color: "var(--color-primary-blue, #2563eb)" }}>
                        {e.email}
                      </a>
                    </td>
                    <td style={{ ...td, maxWidth: 420, whiteSpace: "pre-wrap", color: "var(--color-text-muted)" }}>{e.message}</td>
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

const th: React.CSSProperties = {
  padding: "12px 16px",
  fontWeight: 700,
  color: "var(--color-primary-navy)",
  textTransform: "uppercase",
  fontSize: 11,
  letterSpacing: "0.05em",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  lineHeight: 1.6,
};
