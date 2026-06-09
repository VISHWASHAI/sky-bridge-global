-- ============================================================================
-- Sky Bridge Global — v1 schema (Tracking + PIN-code serviceability)
-- Run in the Supabase SQL editor, then run seed.sql.
-- ============================================================================

-- ── Serviceability (PIN-code checker) ──────────────────────────────────────
create table if not exists service_areas (
  pin_code     text primary key,
  city         text,
  state        text,
  hub_name     text,
  address      text,
  transit_days int,
  tier         text,
  available    boolean not null default true,
  created_at   timestamptz not null default now()
);

alter table service_areas enable row level security;

drop policy if exists "service_areas public read" on service_areas;
create policy "service_areas public read"
  on service_areas for select
  to anon, authenticated
  using (true);

-- ── Shipments + events (tracking) ──────────────────────────────────────────
create table if not exists shipments (
  id               uuid primary key default gen_random_uuid(),
  tracking_no      text unique not null,
  status           text,
  status_class     text,
  origin           text,
  destination      text,
  weight           text,
  dimensions       text,
  carrier          text,
  current_location text,
  est_delivery     text,
  created_at       timestamptz not null default now()
);

create table if not exists shipment_events (
  id          uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references shipments(id) on delete cascade,
  title       text,
  event_time  timestamptz,
  location    text,
  description text,
  status      text
);

create index if not exists idx_shipment_events_shipment on shipment_events(shipment_id);

-- Tables stay locked down (no public select policy). Public tracking happens
-- only through this single-record function, so customers can't enumerate every
-- shipment in the system.
alter table shipments enable row level security;
alter table shipment_events enable row level security;

create or replace function get_shipment(p_tracking text)
returns json
language sql
security definer
set search_path = public
as $$
  select case when s.id is null then null else json_build_object(
    'tracking_no',      s.tracking_no,
    'status',           s.status,
    'status_class',     s.status_class,
    'origin',           s.origin,
    'destination',      s.destination,
    'weight',           s.weight,
    'dimensions',       s.dimensions,
    'carrier',          s.carrier,
    'current_location', s.current_location,
    'est_delivery',     s.est_delivery,
    'events', coalesce((
      select json_agg(json_build_object(
        'title', e.title, 'event_time', e.event_time, 'location', e.location,
        'description', e.description, 'status', e.status
      ) order by e.event_time desc)
      from shipment_events e where e.shipment_id = s.id
    ), '[]'::json)
  ) end
  from shipments s
  where upper(s.tracking_no) = upper(p_tracking);
$$;

grant execute on function get_shipment(text) to anon, authenticated;
