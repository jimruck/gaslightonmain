-- Reduce announcement message length to 85 chars.

alter table public.site_announcements
  drop constraint if exists site_announcements_message_check;

alter table public.site_announcements
  add constraint site_announcements_message_check
  check (char_length(message) between 1 and 85);
