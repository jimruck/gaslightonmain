-- Simplify events schema to Airtable-like naming.
-- Removes system columns from events and keeps only content columns.

alter table public.events
  add column if not exists all_guests boolean not null default false,
  add column if not exists guest_limit integer,
  add column if not exists price_per_person numeric(10,2);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'events'
      and column_name = 'guests_text'
  ) then
    execute $sql$
      update public.events
      set all_guests = true
      where lower(coalesce(guests_text, '')) = 'all guests'
    $sql$;
  end if;
end
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'events'
      and column_name = 'guests_numeric'
  ) then
    execute $sql$
      update public.events
      set guest_limit = coalesce(guest_limit, guests_numeric)
    $sql$;
  end if;
end
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'events'
      and column_name = 'price_numeric'
  ) then
    execute $sql$
      update public.events
      set price_per_person = coalesce(price_per_person, price_numeric)
    $sql$;
  end if;
end
$$;

drop table if exists public.event_tags cascade;

drop policy if exists events_select_published_public on public.events;
drop policy if exists events_select_public on public.events;
drop policy if exists events_crud_admin on public.events;
drop trigger if exists trg_events_updated_at on public.events;

drop index if exists idx_events_published_featured_start;
drop index if exists idx_events_start_at;
create index if not exists idx_events_start_at on public.events (start_at);
create unique index if not exists idx_events_title_start_unique on public.events (title, start_at);

alter table public.events
  drop column if exists id,
  drop column if exists legacy_airtable_id,
  drop column if exists price_text,
  drop column if exists price_numeric,
  drop column if exists guests_text,
  drop column if exists guests_numeric,
  drop column if exists featured,
  drop column if exists is_published,
  drop column if exists display_order,
  drop column if exists created_at,
  drop column if exists updated_at;

create policy events_select_public
on public.events
for select
using (true);

create policy events_crud_admin
on public.events
for all
using (public.is_admin_user())
with check (public.is_admin_user());
