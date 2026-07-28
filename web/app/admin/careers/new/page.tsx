import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { isAdminConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/admin/AdminNav";
import JobFields from "@/components/admin/JobFields";
import { createJob } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — New Job", robots: { index: false, follow: false } };

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };

export default function NewJobPage({ searchParams }: { searchParams: { error?: string } }) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  return (
    <section style={shell}>
      <div className="container" style={{ maxWidth: 760 }}>
        <AdminNav active="careers" />

        <div style={{ marginBottom: "var(--space-md)" }}>
          <Link href="/admin/careers" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-blue, #2563eb)" }}>← Back to careers</Link>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginTop: 6 }}>New job</h1>
        </div>

        {searchParams?.error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>{searchParams.error}</p>
          </div>
        )}

        <form className="card" action={createJob} style={{ textAlign: "left" }}>
          <JobFields />
          <div style={{ display: "flex", gap: 12, marginTop: "var(--space-sm)" }}>
            <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)" }}>Create job</button>
            <Link href="/admin/careers" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
