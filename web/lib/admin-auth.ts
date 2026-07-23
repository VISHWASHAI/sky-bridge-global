import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Minimal password gate for the /admin area. Not a full user-auth system —
 * a single shared password (env ADMIN_PASSWORD) unlocks a session cookie whose
 * value is a hash of that password, so the plaintext is never stored client-side.
 *
 * Server-only: relies on node:crypto and process.env secrets. Only import from
 * Server Components / Server Actions.
 */

export const ADMIN_COOKIE = "sbg_admin";
export const ADMIN_SESSION_HOURS = 8;

const password = process.env.ADMIN_PASSWORD;

/** True only when an admin password has been configured. */
export const isAdminAuthConfigured = Boolean(password && password.length > 0);

/** Stable session token derived from the password (null if unconfigured). */
export function sessionToken(): string | null {
  if (!password) return null;
  return crypto.createHash("sha256").update(`${password}::sbg-admin-v1`).digest("hex");
}

/** Constant-time comparison of a submitted password against the configured one. */
export function verifyPassword(input: string): boolean {
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** True when the current request carries a valid admin session cookie. */
export function isAdminAuthed(): boolean {
  const token = sessionToken();
  if (!token) return false;
  return cookies().get(ADMIN_COOKIE)?.value === token;
}
