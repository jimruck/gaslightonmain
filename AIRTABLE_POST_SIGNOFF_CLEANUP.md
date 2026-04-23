# Airtable Post-Signoff Cleanup PR

Use this checklist immediately after staging sign-off to remove Airtable safely in one focused PR.

## Scope

- Remove Airtable migration/parity scripts and dependencies from app runtime.
- Remove Airtable env vars and revoke Airtable API key in Airtable workspace.
- Remove Airtable image host allowlist entries from `next.config.js`.
- Keep historical Supabase migrations intact.

## Phase 1: Code Removal

- Delete `scripts/migrate-airtable-to-postgres.ts`.
- Delete `scripts/parity-check-cms.ts`.
- Remove Airtable normalizer functions from `src/lib/cms/normalizers.ts` if no longer used.
- Remove Airtable-only type(s) from `src/lib/cms/types.ts` if no longer used.
- Update `package.json` scripts:
  - remove `cms:migrate`
  - remove `cms:parity-check`
- Update `package-lock.json` by reinstalling dependencies if needed.

## Phase 2: Config and Image Host Cleanup

- Remove Airtable host patterns from `next.config.js`:
  - `v5.airtableusercontent.com`
  - `dl.airtable.com`
  - `*.airtableusercontent.com`
- Remove Airtable keys from deployed environment variables:
  - `AIRTABLE_BASE_ID`
  - `AIRTABLE_API_KEY`
  - `AIRTABLE_MENU_TABLE`
  - `AIRTABLE_EVENTS_TABLE`
  - `AIRTABLE_SORT_FIELD` (if set)

## Phase 3: Secrets and Access

- Revoke Airtable personal access token used by this project.
- Confirm no CI/CD provider or hosting platform still has Airtable variables set.

## Verification Checklist

- `npm run build` passes.
- `npm run lint` passes.
- `curl http://localhost:3000/api/events` returns expected payload.
- `curl http://localhost:3000/api/menu` returns expected payload.
- `curl http://localhost:3000/api/announcement` returns expected payload.
- Admin login, CRUD, and image upload still work against Supabase.
- `rg -n "AIRTABLE|Airtable|airtable" .` only matches historical migration comments (if any).

## Suggested PR Title

`chore: remove Airtable fallback tooling after Supabase cutover`
