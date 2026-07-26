"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthed } from "@/lib/admin-auth";

function field(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v.length ? v : null;
}

export async function createServiceArea(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const pin_code = field(formData, "pin_code");
  if (!pin_code) {
    redirect(`/admin/service-areas?error=${encodeURIComponent("PIN code is required.")}`);
  }
  if (!/^\d{6}$/.test(pin_code!)) {
    redirect(`/admin/service-areas?error=${encodeURIComponent("PIN code must be 6 digits.")}`);
  }

  const transitRaw = field(formData, "transit_days");
  const transit = transitRaw ? parseInt(transitRaw, 10) : null;

  const { error } = await supabase.from("service_areas").insert({
    pin_code,
    city: field(formData, "city"),
    state: field(formData, "state"),
    hub_name: field(formData, "hub_name"),
    tier: field(formData, "tier"),
    transit_days: transit !== null && Number.isFinite(transit) ? transit : null,
    available: formData.get("available") === "on",
  });

  revalidatePath("/admin/service-areas");
  if (error) {
    const msg =
      error.code === "23505"
        ? `PIN ${pin_code} already exists — delete it first to re-add.`
        : error.message;
    redirect(`/admin/service-areas?error=${encodeURIComponent(msg)}`);
  }
  redirect(`/admin/service-areas?added=${encodeURIComponent(pin_code!)}`);
}

export async function deleteServiceArea(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const pin_code = String(formData.get("pin_code") ?? "");
  const supabase = getSupabaseAdminClient();
  if (supabase) await supabase.from("service_areas").delete().eq("pin_code", pin_code);
  revalidatePath("/admin/service-areas");
  redirect("/admin/service-areas");
}
