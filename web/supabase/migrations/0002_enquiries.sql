-- ============================================================================
-- Sky Bridge Global — contact form enquiries
-- Run in the Supabase SQL editor.
-- ============================================================================

create table if not exists enquiries (
  id            uuid primary key default gen_random_uuid(),
  company_name  text not null,
  contact_name  text not null,
  email         text not null,
  message       text not null,
  created_at    timestamptz not null default now()
);

alter table enquiries enable row level security;

-- Anyone can submit an enquiry, but nobody can read, update, or delete via the
-- public API — only accessible from the Supabase dashboard / service role.
drop policy if exists "enquiries public insert" on enquiries;
create policy "enquiries public insert"
  on enquiries for insert
  to anon, authenticated
  with check (true);
