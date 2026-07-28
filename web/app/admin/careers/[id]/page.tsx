import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import type { JobRow } from "@/lib/jobs";
import AdminNav from "@/components/admin/AdminNav";
import JobFields from "@/components/admin/JobFields";
import { updateJob, deleteJob } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Edit Job", robots: { index: false, follow: false } };

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };

export default async function EditJobPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  const supabase = getSupabaseAdminClient()!;
  const { data } = await supabase.from("jobs").select("*").eq("id", params.id).single();

  if (!data) {
    return (
      <section style={shell}>
        <div className="container">
          <AdminNav active="careers" />
          <div className="card"><p>Job not found. <Link href="/admin/careers">Back to careers</Link></p></div>
        </div>
      </section>
    );
  }

  const job = data as JobRow;

  return (
    <section style={shell}>
      <div className="container" style={{ maxWidth: 760 }}>
        <AdminNav active="careers" />

        <div style={{ marginBottom: "var(--space-md)" }}>
          <Link href="/admin/careers" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-blue, #2563eb)" }}>← Back to careers</Link>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginTop: 6 }}>{job.title}</h1>
        </div>

        {searchParams?.saved && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-success, #16a34a)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-success, #16a34a)", fontWeight: 600 }}>Saved.</p>
          </div>
        )}
        {searchParams?.error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>{searchParams.error}</p>
          </div>
        )}

        <form className="card" action={updateJob} style={{ textAlign: "left", marginBottom: "var(--space-lg)" }}>
          <input type="hidden" name="id" value={job.id} />
          <JobFields job={job} />
          <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)", marginTop: "var(--space-sm)" }}>Save changes</button>
        </form>

        <form action={deleteJob} style={{ textAlign: "right" }}>
          <input type="hidden" name="id" value={job.id} />
          <button className="btn btn-outline btn-sm" type="submit" style={{ color: "var(--color-danger, #d9534f)", borderColor: "var(--color-danger, #d9534f)" }}>
            Delete this job
          </button>
        </form>
      </div>
    </section>
  );
}
