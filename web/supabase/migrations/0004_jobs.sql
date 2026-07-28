-- ============================================================================
-- Sky Bridge Global — careers / job openings (admin-managed)
-- Run in the Supabase SQL editor.
-- ============================================================================

create table if not exists jobs (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  dept         text,
  location     text,
  type         text,
  salary       text,
  description  text,
  requirements text[] not null default '{}',
  active       boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

alter table jobs enable row level security;

-- The public careers page can read only ACTIVE jobs. Admin writes go through the
-- service-role key (bypasses RLS); there is no public insert/update/delete.
drop policy if exists "jobs public read active" on jobs;
create policy "jobs public read active"
  on jobs for select
  to anon, authenticated
  using (active = true);

-- Seed the current openings so the page isn't empty after switching to the DB.
insert into jobs (title, dept, location, type, salary, description, requirements, sort_order)
values
(
  'Logistics Operations Executive', 'Operations & Strategy', 'Kolar, Karnataka', 'Full-time', '₹3–5 LPA',
  'Coordinate day-to-day freight movement for domestic and export clients — booking carriers, tracking shipments, and keeping customers updated from pickup to delivery. You will optimise routing across air, sea, and road and maintain accurate shipment records.',
  array[
    'Bachelor''s degree in Logistics, Commerce, or a related field',
    '1–3 years in logistics/freight operations (freshers with strong Excel skills welcome)',
    'Good communication in English, Kannada, and Hindi'
  ], 1
),
(
  'Customs Compliance Officer', 'Regulatory Affairs', 'Kolar, Karnataka', 'Full-time', '₹4–6 LPA',
  'Handle Indian import/export customs compliance — file declarations on ICEGATE, manage HS classification and GST documentation, and liaise with customs and CHA partners to keep shipments moving.',
  array[
    'Knowledge of Indian customs procedures, ICEGATE, and HS classification',
    'Customs broker G-card/H-card or equivalent experience preferred',
    'Familiarity with GST and export documentation'
  ], 2
),
(
  'Freight Sales Manager', 'Sales & Marketing', 'Bengaluru, Karnataka', 'Full-time', '₹5–8 LPA + Incentives',
  'Grow air, sea, and road freight volumes across South India and export corridors. Build client relationships, prepare quotations, and negotiate service contracts with importers and exporters.',
  array[
    'Proven track record in freight forwarding or logistics sales',
    'Strong client network across Karnataka / South India',
    'Excellent negotiation and presentation skills'
  ], 3
)
on conflict do nothing;
