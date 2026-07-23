"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthed } from "@/lib/admin-auth";
import { generateTrackingNo } from "@/lib/shipments";

/** Read a trimmed form field, returning null when empty. */
function field(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v.length ? v : null;
}

/** Convert a datetime-local value (naive, entered in IST) to a UTC ISO string. */
function toIsoFromIST(raw: string | null): string {
  if (!raw) return new Date().toISOString();
  const withSecs = raw.length === 16 ? `${raw}:00` : raw; // add seconds if absent
  const d = new Date(`${withSecs}+05:30`);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function shipmentFields(formData: FormData) {
  return {
    status: field(formData, "status"),
    status_class: field(formData, "status_class"),
    origin: field(formData, "origin"),
    destination: field(formData, "destination"),
    weight: field(formData, "weight"),
    dimensions: field(formData, "dimensions"),
    carrier: field(formData, "carrier"),
    current_location: field(formData, "current_location"),
    est_delivery: field(formData, "est_delivery"),
  };
}

export async function createShipment(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const typed = field(formData, "tracking_no"); // null => auto-generate
  const payload = shipmentFields(formData);

  let lastError = "Could not create shipment.";
  for (let attempt = 0; attempt < 5; attempt++) {
    const tracking_no = typed ?? generateTrackingNo();
    const { data, error } = await supabase
      .from("shipments")
      .insert({ tracking_no, ...payload })
      .select("id")
      .single();

    if (!error && data) {
      revalidatePath("/admin/shipments");
      redirect(`/admin/shipments/${data.id}`);
    }
    // Unique-violation on an auto-generated number: retry with a new one.
    if (error?.code === "23505" && !typed) continue;
    lastError = error?.code === "23505"
      ? `Tracking number "${tracking_no}" already exists. Choose another.`
      : (error?.message ?? lastError);
    break;
  }
  redirect(`/admin/shipments/new?error=${encodeURIComponent(lastError)}`);
}

export async function updateShipment(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const id = String(formData.get("id") ?? "");
  const tracking_no = field(formData, "tracking_no");
  const { error } = await supabase
    .from("shipments")
    .update({ tracking_no, ...shipmentFields(formData) })
    .eq("id", id);

  revalidatePath(`/admin/shipments/${id}`);
  redirect(`/admin/shipments/${id}?${error ? `error=${encodeURIComponent(error.message)}` : "saved=1"}`);
}

export async function deleteShipment(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdminClient();
  if (supabase) await supabase.from("shipments").delete().eq("id", id);
  revalidatePath("/admin/shipments");
  redirect("/admin/shipments");
}

export async function addEvent(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const shipment_id = String(formData.get("shipment_id") ?? "");
  await supabase.from("shipment_events").insert({
    shipment_id,
    title: field(formData, "title"),
    location: field(formData, "location"),
    description: field(formData, "description"),
    status: field(formData, "status") ?? "completed",
    event_time: toIsoFromIST(field(formData, "event_time")),
  });

  revalidatePath(`/admin/shipments/${shipment_id}`);
  redirect(`/admin/shipments/${shipment_id}`);
}

export async function markDelivered(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const id = String(formData.get("id") ?? "");
  const { data: s } = await supabase.from("shipments").select("destination").eq("id", id).single();
  const destination = (s as { destination: string | null } | null)?.destination ?? null;

  await supabase
    .from("shipments")
    .update({ status: "Delivered", status_class: "success", current_location: destination })
    .eq("id", id);

  // Demote any existing "current" step, then add Delivered as the current one.
  await supabase.from("shipment_events").update({ status: "completed" }).eq("shipment_id", id).eq("status", "active");
  await supabase.from("shipment_events").insert({
    shipment_id: id,
    title: "Delivered",
    location: destination,
    description: "Shipment delivered successfully.",
    status: "active",
    event_time: new Date().toISOString(),
  });

  revalidatePath(`/admin/shipments/${id}`);
  redirect(`/admin/shipments/${id}?saved=1`);
}

export async function deleteEvent(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const shipment_id = String(formData.get("shipment_id") ?? "");
  const supabase = getSupabaseAdminClient();
  if (supabase) await supabase.from("shipment_events").delete().eq("id", id);
  revalidatePath(`/admin/shipments/${shipment_id}`);
  redirect(`/admin/shipments/${shipment_id}`);
}
