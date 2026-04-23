-- Simplify menu schema to a single Airtable-like table.
-- Keeps only content columns and constrains select options.

alter table public.menu_items
  add column if not exists item_name text,
  add column if not exists meal text[] not null default '{}'::text[],
  add column if not exists price text,
  add column if not exists tags text[] not null default '{}'::text[],
  add column if not exists image_url text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'menu_items'
      and column_name = 'name'
  ) then
    execute $sql$
      update public.menu_items
      set item_name = coalesce(item_name, name)
    $sql$;
  end if;
end
$$;

do $$
begin
  if to_regclass('public.menu_item_meals') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'menu_items'
        and column_name = 'id'
    ) then
    execute $sql$
      update public.menu_items mi
      set meal = coalesce(
        (
          select array_agg(distinct mim.meal)
          from public.menu_item_meals mim
          where mim.menu_item_id = mi.id
        ),
        '{}'::text[]
      )
      where coalesce(array_length(mi.meal, 1), 0) = 0
    $sql$;
  end if;
end
$$;

do $$
begin
  if to_regclass('public.menu_item_tags') is not null
    and exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'menu_items'
        and column_name = 'id'
    ) then
    execute $sql$
      update public.menu_items mi
      set tags = coalesce(
        (
          select array_agg(distinct mit.tag)
          from public.menu_item_tags mit
          where mit.menu_item_id = mi.id
        ),
        '{}'::text[]
      )
      where coalesce(array_length(mi.tags, 1), 0) = 0
    $sql$;
  end if;
end
$$;

do $$
declare
  has_price_text boolean;
  has_price_numeric boolean;
begin
  select exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'menu_items'
      and column_name = 'price_text'
  )
  into has_price_text;

  select exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'menu_items'
      and column_name = 'price_numeric'
  )
  into has_price_numeric;

  if has_price_text and has_price_numeric then
    execute $sql$
      update public.menu_items
      set price = coalesce(
        nullif(trim(price), ''),
        nullif(trim(price_text), ''),
        case
          when price_numeric is not null then trim(to_char(price_numeric, 'FM999999990.##'))
          else null
        end
      )
    $sql$;
  elsif has_price_text then
    execute $sql$
      update public.menu_items
      set price = coalesce(
        nullif(trim(price), ''),
        nullif(trim(price_text), '')
      )
    $sql$;
  elsif has_price_numeric then
    execute $sql$
      update public.menu_items
      set price = coalesce(
        nullif(trim(price), ''),
        case
          when price_numeric is not null then trim(to_char(price_numeric, 'FM999999990.##'))
          else null
        end
      )
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
      and table_name = 'menu_items'
      and column_name = 'photo_url'
  ) then
    execute $sql$
      update public.menu_items
      set image_url = coalesce(image_url, photo_url)
    $sql$;
  end if;
end
$$;

update public.menu_items
set course = case
  when course in ('Main Courses', 'Appetizers and Small Plates', 'Desserts') then course
  when lower(coalesce(course, '')) in ('main', 'mains', 'main course', 'main courses') then 'Main Courses'
  when lower(coalesce(course, '')) in ('appetizer', 'appetizers', 'small plates', 'appetizers and small plates') then 'Appetizers and Small Plates'
  when lower(coalesce(course, '')) in ('dessert', 'desserts') then 'Desserts'
  else 'Main Courses'
end;

do $$
begin
  if to_regclass('public.menu_item_tags') is not null then
    execute 'drop policy if exists menu_item_tags_select_published_public on public.menu_item_tags';
    execute 'drop policy if exists menu_item_tags_crud_admin on public.menu_item_tags';
  end if;
end
$$;

do $$
begin
  if to_regclass('public.menu_item_meals') is not null then
    execute 'drop policy if exists menu_item_meals_select_published_public on public.menu_item_meals';
    execute 'drop policy if exists menu_item_meals_crud_admin on public.menu_item_meals';
  end if;
end
$$;
drop table if exists public.menu_item_tags cascade;
drop table if exists public.menu_item_meals cascade;

drop policy if exists menu_items_select_published_public on public.menu_items;
drop policy if exists menu_items_select_public on public.menu_items;
drop policy if exists menu_items_crud_admin on public.menu_items;
drop trigger if exists trg_menu_items_updated_at on public.menu_items;
drop index if exists idx_menu_items_published_featured_course;

alter table public.menu_items
  alter column item_name set not null,
  alter column description drop not null,
  alter column description drop default,
  alter column course set not null,
  alter column meal set not null,
  alter column tags set not null,
  drop column if exists id,
  drop column if exists legacy_airtable_id,
  drop column if exists name,
  drop column if exists price_text,
  drop column if exists price_numeric,
  drop column if exists photo_url,
  drop column if exists featured,
  drop column if exists is_published,
  drop column if exists display_order,
  drop column if exists created_at,
  drop column if exists updated_at;

alter table public.menu_items
  drop constraint if exists menu_items_course_check,
  drop constraint if exists menu_items_meal_check,
  drop constraint if exists menu_items_tags_check;

alter table public.menu_items
  add constraint menu_items_course_check check (
    course in ('Main Courses', 'Appetizers and Small Plates', 'Desserts')
  ),
  add constraint menu_items_meal_check check (
    meal <@ array['Brunch', 'Lunch', 'Dinner']::text[]
  ),
  add constraint menu_items_tags_check check (
    tags <@ array[
      'Seasonal',
      'Featured',
      'Gluten Free',
      'Vegetarian',
      'Locally Sourced',
      'Vegetarian Available',
      'Chef''s Favorite'
    ]::text[]
  );

create index if not exists idx_menu_items_course_item_name
  on public.menu_items (course, item_name);

create unique index if not exists idx_menu_items_item_name_course_unique
  on public.menu_items (item_name, course);

create policy menu_items_select_public
on public.menu_items
for select
using (true);

create policy menu_items_crud_admin
on public.menu_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());
