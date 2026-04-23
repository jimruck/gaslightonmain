-- Add activation toggle support and enforce single active announcement.

alter table public.site_announcements
  add column if not exists is_active boolean not null default false;

-- Only one row may be active at a time.
create unique index if not exists idx_site_announcements_single_active
  on public.site_announcements (is_active)
  where is_active = true;

create index if not exists idx_site_announcements_active_expires
  on public.site_announcements (is_active, expires_at desc);

drop policy if exists site_announcements_select_public on public.site_announcements;
create policy site_announcements_select_public
on public.site_announcements
for select
using (
  (is_active = true and expires_at > timezone('utc', now()))
  or public.is_admin_user()
);
