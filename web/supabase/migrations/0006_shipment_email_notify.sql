-- ============================================================================
-- Tracking Phase 3 — email the customer whenever a shipment gets a new
-- timeline event (status update). Reuses the resend_api_key secret already
-- stored in Vault for the enquiry-notification trigger (0003).
-- ============================================================================

alter table shipments add column if not exists customer_email text;

create or replace function notify_shipment_event()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  resend_key text;
  s          record;
begin
  select decrypted_secret into resend_key from vault.decrypted_secrets where name = 'resend_api_key';
  if resend_key is null then
    return new;
  end if;

  select tracking_no, customer_email, status, current_location, est_delivery
    into s
    from shipments
    where id = new.shipment_id;

  if s.customer_email is null then
    return new;
  end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || resend_key,
      'Content-Type',  'application/json'
    ),
    body := jsonb_build_object(
      'from',    'Sky Bridge Global <tracking@skybridgeglobals.com>',
      'to',      array[s.customer_email],
      'subject', 'Shipment ' || s.tracking_no || ' update: ' || coalesce(new.title, s.status, 'Status update'),
      'html',
        '<h2 style="font-family:sans-serif">Update on your shipment ' || s.tracking_no || '</h2>' ||
        '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Status</b></td><td>'   || coalesce(new.title, s.status, '')     || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Location</b></td><td>' || coalesce(new.location, s.current_location, '') || '</td></tr>' ||
        case when new.description is not null then
          '<tr><td style="padding:4px 12px 4px 0"><b>Details</b></td><td>' || new.description || '</td></tr>'
        else '' end ||
        case when s.est_delivery is not null then
          '<tr><td style="padding:4px 12px 4px 0"><b>Est. delivery</b></td><td>' || s.est_delivery || '</td></tr>'
        else '' end ||
        '</table>' ||
        '<p style="font-family:sans-serif;font-size:14px">' ||
        '<a href="https://skybridgeglobals.com/tracking?code=' || s.tracking_no || '">Track your shipment</a></p>'
    )
  );

  return new;
end;
$$;

drop trigger if exists on_shipment_event_created on shipment_events;
create trigger on_shipment_event_created
  after insert on shipment_events
  for each row execute function notify_shipment_event();
