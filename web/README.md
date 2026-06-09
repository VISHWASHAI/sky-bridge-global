# Sky Bridge Global — Web App (Next.js + Supabase)

Full-stack rebuild of the Sky Bridge Global logistics site.

- **Frontend:** Next.js 14 (App Router, TypeScript) → deploys to **Vercel**
- **Backend:** **Supabase** (Postgres + Auth + Storage + Edge Functions)
- **v1 live features:** Shipment **Tracking** and PIN-code **Serviceability checker**, both wired to Supabase. Other pages (Home, About, Services content, Careers, Contact) are ported and ready; their write/auth features are the next backend phase.

> The original static prototype still lives at the repo root / on the `main` branch. This Next.js app is in `web/`.

---

## 1. Local development

```bash
cd web
cp .env.local.example .env.local      # then fill in your Supabase values
npm install
npm run dev                            # http://localhost:3000
```

`.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```
(Both are safe to expose to the browser — Row Level Security protects the data. Never put the `service_role` key here.)

The app runs **without** Supabase keys too — the Tracking and PIN checker simply show a "backend not connected yet" message instead of crashing.

---

## 2. Supabase setup

1. Create a project at https://supabase.com → **Project Settings → API** for the URL + anon key.
2. In the **SQL Editor**, run, in order:
   - `supabase/migrations/0001_init.sql` — tables, RLS policies, and the secure `get_shipment()` lookup function
   - `supabase/seed.sql` — sample shipments + PIN-code coverage (ported from the prototype)
3. Done. Tracking (`SBG-102948-US`, `SBG-584732-EU`, `SBG-778899-EU`) and PIN lookups (`563113`, `560001`, …) now return live data.

**Security model:** `service_areas` is publicly readable. `shipments`/`shipment_events` are *not* publicly readable — tracking goes only through the `get_shipment(tracking_no)` function, so customers can't enumerate every shipment.

---

## 3. Deploy to Vercel

1. Push this repo to GitHub (already connected).
2. In Vercel → **New Project** → import the repo.
3. **Set Root Directory to `web`** (important — the app is in a subfolder).
4. Add Environment Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Deploy. Every push auto-deploys.

### Custom domain
- Buy a domain (Cloudflare / Namecheap ≈ $12/yr).
- Vercel → Project → **Domains** → add it → set the DNS records Vercel shows. HTTPS is automatic.
- In Supabase → **Authentication → URL Configuration**, add the production domain (needed once auth is added).

---

## 4. Project structure

```
web/
├─ app/                 # routes: / about/ services/ tracking/ careers/ contact/
├─ components/          # TopBar, SiteHeader, SiteFooter, HeroSearch,
│                       # TrackingClient (live), PinChecker (live), ContactForm
├─ lib/supabase/        # client.ts (browser), server.ts (RSC/route handlers)
├─ styles/              # ported design CSS (main/components/pages/mobile/simulator)
├─ public/images/       # all site images + circular badge logo
└─ supabase/            # migrations/ + seed.sql
```

---

## 5. Next backend phases (not in v1)

| Feature | Work |
|---|---|
| Contact form | `enquiries` table + insert + Edge Function email (Resend/SendGrid) |
| Careers | `jobs` + `job_applications` tables, resume upload to Storage |
| Client portal | Supabase Auth login → `shipments` / `invoices` / `notifications` (owner-only via RLS) |
| Admin panel | `profiles.role = 'admin'`, RLS-gated management of all tables + pricing |

---

## 6. Handover checklist (to the client/startup)

- [ ] Transfer the **Supabase** project to the company's org
- [ ] Transfer the **Vercel** project to the company's team
- [ ] Transfer the **domain** at the registrar
- [ ] Transfer the **GitHub** repo
- [ ] Hand over `.env` values via a password manager (never commit them)
- [ ] Replace placeholder contact details (phone, Facebook/LinkedIn/YouTube URLs)
