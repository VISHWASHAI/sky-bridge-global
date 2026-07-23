import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True only when the service-role key is present (server-side admin access). */
export const isAdminConfigured = Boolean(url && serviceKey);

/**
 * Service-role Supabase client. Bypasses Row Level Security, so it can READ the
 * enquiries table (which is otherwise write-only to the public).
 *
 * SECURITY: the service-role key must never reach the browser. This module has
 * no NEXT_PUBLIC_ vars and must only be imported from Server Components, Route
 * Handlers, or Server Actions.
 */
export function getSupabaseAdminClient() {
  if (!isAdminConfigured) return null;
  return createClient(url!, serviceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
