-- Secure CMS schema for replacing Airtable (menu + events).
-- Run this migration in Supabase SQL editor or via Supabase CLI.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  legacy_airtable_id text unique,
  title text not null,
  description text,
  start_at timestamptz,
  end_at timestamptz,
  price_text text,
  price_numeric numeric(10,2),
  guests_text text,
  guests_numeric integer,
  booking_url text,
  image_url text,
  featured boolean not null default false,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.event_tags (
  event_id uuid not null references public.events(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (event_id, tag)
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  legacy_airtable_id text unique,
  name text not null,
  description text not null default '',
  course text not null default '',
  price_text text,
  price_numeric numeric(10,2),
  photo_url text,
  featured boolean not null default false,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.menu_item_tags (
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (menu_item_id, tag)
);

create table if not exists public.menu_item_meals (
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  meal text not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (menu_item_id, meal)
);

create index if not exists idx_events_published_featured_start
  on public.events (is_published, featured, start_at);

create index if not exists idx_menu_items_published_featured_course
  on public.menu_items (is_published, featured, course);

create index if not exists idx_menu_item_meals_meal
  on public.menu_item_meals (meal);

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

drop trigger if exists trg_menu_items_updated_at on public.menu_items;
create trigger trg_menu_items_updated_at
before update on public.menu_items
for each row
execute function public.set_updated_at();

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.events enable row level security;
alter table public.event_tags enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_item_tags enable row level security;
alter table public.menu_item_meals enable row level security;

-- Admin-only access to allowlist table.
drop policy if exists admin_users_select_admin on public.admin_users;
create policy admin_users_select_admin
on public.admin_users
for select
using (public.is_admin_user());

drop policy if exists admin_users_insert_admin on public.admin_users;
create policy admin_users_insert_admin
on public.admin_users
for insert
with check (public.is_admin_user());

drop policy if exists admin_users_update_admin on public.admin_users;
create policy admin_users_update_admin
on public.admin_users
for update
using (public.is_admin_user())
with check (public.is_admin_user());

-- Public read policies for published content.
drop policy if exists events_select_published_public on public.events;
create policy events_select_published_public
on public.events
for select
using (is_published = true or public.is_admin_user());

drop policy if exists event_tags_select_published_public on public.event_tags;
create policy event_tags_select_published_public
on public.event_tags
for select
using (
  exists (
    select 1
    from public.events e
    where e.id = event_tags.event_id
      and (e.is_published = true or public.is_admin_user())
  )
);

drop policy if exists menu_items_select_published_public on public.menu_items;
create policy menu_items_select_published_public
on public.menu_items
for select
using (is_published = true or public.is_admin_user());

drop policy if exists menu_item_tags_select_published_public on public.menu_item_tags;
create policy menu_item_tags_select_published_public
on public.menu_item_tags
for select
using (
  exists (
    select 1
    from public.menu_items mi
    where mi.id = menu_item_tags.menu_item_id
      and (mi.is_published = true or public.is_admin_user())
  )
);

drop policy if exists menu_item_meals_select_published_public on public.menu_item_meals;
create policy menu_item_meals_select_published_public
on public.menu_item_meals
for select
using (
  exists (
    select 1
    from public.menu_items mi
    where mi.id = menu_item_meals.menu_item_id
      and (mi.is_published = true or public.is_admin_user())
  )
);

-- Admin CRUD policies.
drop policy if exists events_crud_admin on public.events;
create policy events_crud_admin
on public.events
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists event_tags_crud_admin on public.event_tags;
create policy event_tags_crud_admin
on public.event_tags
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists menu_items_crud_admin on public.menu_items;
create policy menu_items_crud_admin
on public.menu_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists menu_item_tags_crud_admin on public.menu_item_tags;
create policy menu_item_tags_crud_admin
on public.menu_item_tags
for all
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists menu_item_meals_crud_admin on public.menu_item_meals;
create policy menu_item_meals_crud_admin
on public.menu_item_meals
for all
using (public.is_admin_user())
with check (public.is_admin_user());
