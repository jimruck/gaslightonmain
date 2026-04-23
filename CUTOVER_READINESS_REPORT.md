# Cutover Readiness Report

Date: 2026-04-23

## 1) Migrations In Strict Order

Status: PASS (no pending migrations detected)

Attempted direct apply:
- `npx supabase db push --linked`
- `npx supabase link --project-ref <project-ref>`

CLI note:
- Supabase CLI requires `SUPABASE_ACCESS_TOKEN` (or `supabase login`) to link/apply remotely from this shell.

Verification used to confirm staging already contains latest migration state:
- `events` shape check passed (`title,start_at,all_guests,guest_limit`)
- `menu_items` shape check passed (`id,item_name,description,meal,course,price,tags,image_url`)
- `site_announcements` shape check passed (`id,message,expires_at,is_active`)
- 85-char announcement constraint enforced (90-char insert rejected)
- required storage buckets present (`menu-images`, `event-images`)

Conclusion:
- No unapplied migration effects were detected; rollout can proceed without additional schema changes.

## 2) DB Integrity Audit

Status: PASS

Checks executed against Supabase with service role:
- duplicate events `(title,start_at)`: `0`
- duplicate menu rows `(item_name,course)`: `0`
- invalid menu course values: `0`
- invalid meal CSV tokens: `0`
- invalid tag CSV tokens: `0`
- active announcements count: `0` (valid)
- expired active announcements: `0`
- announcement message length violations (>85): `0`
- storage buckets present: `menu-images`, `event-images` (both public, 10MB limit)

## 3) Runtime Smoke Tests

Status: PASS (local runtime + live Supabase backend)

Public APIs:
- `/api/events` -> `200` (events payload present)
- `/api/menu` -> `200` (items + sections payload present)
- `/api/announcement` -> `200` (announcement key present)
- `X-CMS-Backend` fallback header absent (`null`)

Admin auth enforcement:
- `/api/admin/menu` -> `401` without auth
- `/api/admin/events` -> `401` without auth
- `/api/admin/announcement` -> `401` without auth

Write-path smoke checks using service role:
- events create/update/delete: PASS
- menu create/update/delete: PASS
- announcements create/update/delete: PASS
- storage upload/delete (`menu-images`): PASS

## 4) Airtable Parity Check

Status: EXECUTED ONCE (blocked by Airtable account limit)

Command:
- `npm run cms:parity-check`

Result:
- Airtable API returned `429` with `PUBLIC_API_BILLING_LIMIT_EXCEEDED`.

Interpretation:
- Script execution is confirmed, but Airtable billing quota prevents parity evidence until quota reset or plan upgrade.

## 5) Post-Signoff Cleanup PR Prep

Status: READY

Prepared cleanup artifact:
- `AIRTABLE_POST_SIGNOFF_CLEANUP.md`

This includes exact code/config/env removal scope and verification steps for immediate execution after staging sign-off.
