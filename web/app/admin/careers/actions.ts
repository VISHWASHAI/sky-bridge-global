"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthed } from "@/lib/admin-auth";

function field(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v.length ? v : null;
}

function requirementsFromForm(formData: FormData): string[] {
  return String(formData.get("requirements") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function jobFields(formData: FormData) {
  const sortRaw = field(formData, "sort_order");
  const sort = sortRaw ? parseInt(sortRaw, 10) : 0;
  return {
    title: field(formData, "title"),
    dept: field(formData, "dept"),
    location: field(formData, "location"),
    type: field(formData, "type"),
    salary: field(formData, "salary"),
    description: field(formData, "description"),
    requirements: requirementsFromForm(formData),
    active: formData.get("active") === "on",
    sort_order: Number.isFinite(sort) ? sort : 0,
  };
}

export async function createJob(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const fields = jobFields(formData);
  if (!fields.title) {
    redirect(`/admin/careers/new?error=${encodeURIComponent("Job title is required.")}`);
  }

  const { data, error } = await supabase.from("jobs").insert(fields).select("id").single();

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  if (error || !data) {
    redirect(`/admin/careers/new?error=${encodeURIComponent(error?.message ?? "Could not create job.")}`);
  }
  redirect(`/admin/careers/${data.id}?saved=1`);
}

export async function updateJob(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const supabase = getSupabaseAdminClient();
  if (!supabase) redirect("/admin");

  const id = String(formData.get("id") ?? "");
  const fields = jobFields(formData);
  const { error } = await supabase.from("jobs").update(fields).eq("id", id);

  revalidatePath("/admin/careers");
  revalidatePath(`/admin/careers/${id}`);
  revalidatePath("/careers");
  redirect(`/admin/careers/${id}?${error ? `error=${encodeURIComponent(error.message)}` : "saved=1"}`);
}

export async function deleteJob(formData: FormData) {
  if (!isAdminAuthed()) redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdminClient();
  if (supabase) await supabase.from("jobs").delete().eq("id", id);
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  redirect("/admin/careers");
}
