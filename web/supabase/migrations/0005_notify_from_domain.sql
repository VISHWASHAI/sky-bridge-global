-- ============================================================================
-- Switch enquiry-notification sender from Resend's shared test address
-- (onboarding@resend.dev, which can only deliver to the Resend account
-- owner's own inbox) to the now-verified custom domain skybridgeglobals.com.
-- This lets notify_email be set to ANY inbox, not just the Resend account email.
-- ============================================================================

create or replace function notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  resend_key text;
  notify_to  text;
begin
  select decrypted_secret into resend_key from vault.decrypted_secrets where name = 'resend_api_key';
  select decrypted_secret into notify_to  from vault.decrypted_secrets where name = 'notify_email';

  -- If notifications aren't configured yet, never block the customer's submission.
  if resend_key is null or notify_to is null then
    return new;
  end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || resend_key,
      'Content-Type',  'application/json'
    ),
    body := jsonb_build_object(
      'from',     'Sky Bridge Global <notifications@skybridgeglobals.com>',
      'to',       array[notify_to],
      'reply_to', new.email,
      'subject',  'New website enquiry from ' || new.company_name,
      'html',
        '<h2 style="font-family:sans-serif">New enquiry from the Sky Bridge Global website</h2>' ||
        '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Company</b></td><td>' || coalesce(new.company_name,'') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Contact</b></td><td>' || coalesce(new.contact_name,'') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>'   || coalesce(new.email,'')        || '</td></tr>' ||
        '</table>' ||
        '<p style="font-family:sans-serif;font-size:14px"><b>Message:</b><br>' ||
        replace(coalesce(new.message,''), chr(10), '<br>') || '</p>' ||
        '<hr><p style="font-family:sans-serif;font-size:12px;color:#888">' ||
        'Received ' || to_char(new.created_at, 'DD Mon YYYY HH24:MI') || ' — reply directly to this email to respond to the customer.</p>'
    )
  );

  return new;
end;
$$;
