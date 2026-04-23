-- Admin-managed site announcement banner content.
-- Intended for occasional closures / urgent notices.

create table if not exists public.site_announcements (
  id uuid primary key default gen_random_uuid(),
  message text not null check (char_length(message) between 1 and 120),
  expires_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_site_announcements_expires_at
  on public.site_announcements (expires_at);

drop trigger if exists trg_site_announcements_updated_at on public.site_announcements;
create trigger trg_site_announcements_updated_at
before update on public.site_announcements
for each row
execute function public.set_updated_at();

alter table public.site_announcements enable row level security;

drop policy if exists site_announcements_select_public on public.site_announcements;
create policy site_announcements_select_public
on public.site_announcements
for select
using (expires_at > timezone('utc', now()) or public.is_admin_user());

drop policy if exists site_announcements_crud_admin on public.site_announcements;
create policy site_announcements_crud_admin
on public.site_announcements
for all
using (public.is_admin_user())
with check (public.is_admin_user());
