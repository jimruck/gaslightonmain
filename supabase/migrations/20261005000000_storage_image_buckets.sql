-- Ensure storage buckets exist for admin image uploads.
-- Creates menu/events buckets and policies for public reads + admin writes.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'menu-images',
  'menu-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-images',
  'event-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read menu images" on storage.objects;
create policy "Public read menu images"
on storage.objects
for select
using (bucket_id = 'menu-images');

drop policy if exists "Admin upload menu images" on storage.objects;
create policy "Admin upload menu images"
on storage.objects
for insert
with check (
  bucket_id = 'menu-images'
  and public.is_admin_user()
);

drop policy if exists "Admin update menu images" on storage.objects;
create policy "Admin update menu images"
on storage.objects
for update
using (
  bucket_id = 'menu-images'
  and public.is_admin_user()
)
with check (
  bucket_id = 'menu-images'
  and public.is_admin_user()
);

drop policy if exists "Admin delete menu images" on storage.objects;
create policy "Admin delete menu images"
on storage.objects
for delete
using (
  bucket_id = 'menu-images'
  and public.is_admin_user()
);

drop policy if exists "Public read event images" on storage.objects;
create policy "Public read event images"
on storage.objects
for select
using (bucket_id = 'event-images');

drop policy if exists "Admin upload event images" on storage.objects;
create policy "Admin upload event images"
on storage.objects
for insert
with check (
  bucket_id = 'event-images'
  and public.is_admin_user()
);

drop policy if exists "Admin update event images" on storage.objects;
create policy "Admin update event images"
on storage.objects
for update
using (
  bucket_id = 'event-images'
  and public.is_admin_user()
)
with check (
  bucket_id = 'event-images'
  and public.is_admin_user()
);

drop policy if exists "Admin delete event images" on storage.objects;
create policy "Admin delete event images"
on storage.objects
for delete
using (
  bucket_id = 'event-images'
  and public.is_admin_user()
);
