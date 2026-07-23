import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { isAdminConfigured } from "@/lib/supabase/admin";
import AdminNav from "@/components/admin/AdminNav";
import ShipmentFields from "@/components/admin/ShipmentFields";
import { createShipment } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — New Shipment", robots: { index: false, follow: false } };

const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };

export default function NewShipmentPage({ searchParams }: { searchParams: { error?: string } }) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  return (
    <section style={shell}>
      <div className="container" style={{ maxWidth: 760 }}>
        <AdminNav active="shipments" />

        <div style={{ marginBottom: "var(--space-md)" }}>
          <Link href="/admin/shipments" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-blue, #2563eb)" }}>← Back to shipments</Link>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginTop: 6 }}>New shipment</h1>
        </div>

        {searchParams?.error && (
          <div className="card" style={{ borderLeft: "5px solid var(--color-danger, #d9534f)", marginBottom: "var(--space-md)" }}>
            <p style={{ color: "var(--color-danger, #d9534f)" }}>{searchParams.error}</p>
          </div>
        )}

        <form className="card" action={createShipment} style={{ textAlign: "left" }}>
          <ShipmentFields />
          <div style={{ display: "flex", gap: 12, marginTop: "var(--space-sm)" }}>
            <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)" }}>Create shipment</button>
            <Link href="/admin/shipments" className="btn btn-outline">Cancel</Link>
          </div>
          <p style={{ marginTop: "var(--space-sm)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
            After creating, you can add tracking updates (timeline events) on the shipment page.
          </p>
        </form>
      </div>
    </section>
  );
}
