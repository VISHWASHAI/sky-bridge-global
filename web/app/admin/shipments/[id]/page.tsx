import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { getSupabaseAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { EVENT_STATUSES, type ShipmentRow, type ShipmentEventRow } from "@/lib/shipments";
import AdminNav from "@/components/admin/AdminNav";
import ShipmentFields from "@/components/admin/ShipmentFields";
import CopyLinkButton from "@/components/admin/CopyLinkButton";
import { updateShipment, deleteShipment, addEvent, deleteEvent, markDelivered } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Shipment", robots: { index: false, follow: false } };

const SITE_URL = "https://sky-bridge-global.vercel.app";
const shell: React.CSSProperties = { paddingTop: 140, paddingBottom: "var(--space-3xl)", minHeight: "70vh" };

function fmt(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  } catch { return iso; }
}

export default async function ShipmentDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; error?: string };
}) {
  if (!isAdminAuthConfigured || !isAdminConfigured || !isAdminAuthed()) redirect("/admin");

  const supabase = getSupabaseAdminClient()!;
  const { data: shipment } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!shipment) {
    return (
      <section style={shell}>
        <div className="container">
          <AdminNav active="shipments" />
          <div className="card"><p>Shipment not found. <Link href="/admin/shipments">Back to shipments</Link></p></div>
        </div>
      </section>
    );
  }

  const s = shipment as ShipmentRow;
  const { data: eventsData } = await supabase
    .from("shipment_events")
    .select("*")
    .eq("shipment_id", s.id)
    .order("event_time", { ascending: false });
  const events = (eventsData ?? []) as ShipmentEventRow[];

  const publicLink = `${SITE_URL}/tracking?code=${encodeURIComponent(s.tracking_no)}`;

  return (
    <section style={shell}>
      <div className="container" style={{ maxWidth: 820 }}>
        <AdminNav active="shipments" />

        <div style={{ marginBottom: "var(--space-md)" }}>
          <Link href="/admin/shipments" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-blue, #2563eb)" }}>← Back to shipments</Link>
          <h1 className="heading-2" style={{ color: "var(--color-primary-navy)", marginTop: 6 }}>{s.tracking_no}</h1>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
            Customer link:{" "}
            <a href={publicLink} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary-blue, #2563eb)" }}>{publicLink}</a>
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            <CopyLinkButton text={publicLink} label="Copy customer link" />
            {s.status_class !== "success" && (
              <form action={markDelivered}>
                <input type="hidden" name="id" value={s.id} />
                <button className="btn btn-outline btn-sm" type="submit" style={{ color: "var(--color-success, #16a34a)", borderColor: "var(--color-success, #16a34a)" }}>
                  ✓ Mark delivered
                </button>
              </form>
            )}
          </div>
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

        {/* ── Edit shipment details ─────────────────────────────────────────── */}
        <form className="card" action={updateShipment} style={{ textAlign: "left", marginBottom: "var(--space-lg)" }}>
          <input type="hidden" name="id" value={s.id} />
          <h3 className="heading-4" style={{ marginBottom: "var(--space-sm)" }}>Shipment details</h3>
          <ShipmentFields shipment={s} />
          <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)", marginTop: "var(--space-sm)" }}>Save changes</button>
        </form>

        {/* ── Add a tracking update ─────────────────────────────────────────── */}
        <form className="card" action={addEvent} style={{ textAlign: "left", marginBottom: "var(--space-lg)" }}>
          <input type="hidden" name="shipment_id" value={s.id} />
          <h3 className="heading-4" style={{ marginBottom: "var(--space-sm)" }}>Add tracking update</h3>
          <div className="grid grid-2 gap-md">
            <div className="form-group">
              <label className="form-label">Update title</label>
              <input name="title" className="form-control" placeholder="e.g. Departed Bangalore hub" required />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input name="location" className="form-control" placeholder="e.g. Bangalore, IN" />
            </div>
          </div>
          <div className="grid grid-2 gap-md">
            <div className="form-group">
              <label className="form-label">Date &amp; time (IST)</label>
              <input name="event_time" type="datetime-local" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Step state</label>
              <select name="status" className="form-control" defaultValue="completed">
                {EVENT_STATUSES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-textarea" placeholder="Optional detail shown under the update" />
          </div>
          <button className="btn btn-primary" type="submit" style={{ borderRadius: "var(--radius-md)" }}>Add update</button>
          <p style={{ marginTop: "var(--space-xs)", fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
            Leave date blank to use the current time. Mark the latest update as “Current step” to advance the route map.
          </p>
        </form>

        {/* ── Existing updates ──────────────────────────────────────────────── */}
        <div className="card" style={{ textAlign: "left", marginBottom: "var(--space-lg)" }}>
          <h3 className="heading-4" style={{ marginBottom: "var(--space-sm)" }}>Timeline ({events.length})</h3>
          {events.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)" }}>No updates yet. Add the first one above.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {events.map((ev) => (
                <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, borderBottom: "1px solid var(--color-border)", paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {ev.title}
                      {ev.status === "active" && <span className="badge badge-primary" style={{ marginLeft: 8, fontSize: 10 }}>current</span>}
                    </div>
                    <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                      {fmt(ev.event_time)}{ev.location ? ` · ${ev.location}` : ""}
                    </div>
                    {ev.description && <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: 2 }}>{ev.description}</div>}
                  </div>
                  <form action={deleteEvent}>
                    <input type="hidden" name="id" value={ev.id} />
                    <input type="hidden" name="shipment_id" value={s.id} />
                    <button className="btn btn-outline btn-sm" type="submit" style={{ color: "var(--color-danger, #d9534f)", borderColor: "var(--color-danger, #d9534f)" }}>Delete</button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Danger zone ───────────────────────────────────────────────────── */}
        <form action={deleteShipment} style={{ textAlign: "right" }}>
          <input type="hidden" name="id" value={s.id} />
          <button className="btn btn-outline btn-sm" type="submit" style={{ color: "var(--color-danger, #d9534f)", borderColor: "var(--color-danger, #d9534f)" }}>
            Delete this shipment
          </button>
        </form>
      </div>
    </section>
  );
}
