/**
 * Canonical public site URL. Set NEXT_PUBLIC_SITE_URL in the environment to
 * switch domains (e.g. to a custom domain) without touching code. Falls back to
 * the Vercel URL. Trailing slash is stripped so callers can append paths.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://sky-bridge-global.vercel.app"
).replace(/\/+$/, "");
