/**
 * Optional Phase 3: inventory CMS images still served from Supabase Storage.
 *
 * This script does NOT migrate automatically — it reports URLs and object counts
 * so you can move assets to Vercel Blob / static hosting and update image_url in Postgres.
 *
 * Usage:
 *   npm run cms:storage-migrate-report
 *   npm run cms:storage-migrate-report -- --dry-run
 *
 * After migrating files, update menu_items.image_url and events.image_url, then make
 * Storage buckets private or stop uploading to Supabase.
 */
import './load-env'
import { createClient } from '@supabase/supabase-js'

const BUCKETS = ['menu-images', 'event-images'] as const

const required = (name: string): string => {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function isSupabaseStorageUrl(url: string | null | undefined, projectHost: string): boolean {
  if (!url) return false
  return url.includes(projectHost) && url.includes('/storage/v1/object/public/')
}

async function listAllPaths(
  supabase: any,
  bucket: string,
  prefix = ''
): Promise<{ path: string; publicUrl: string }[]> {
  const out: { path: string; publicUrl: string }[] = []
  const { data, error } = await supabase.storage.from(bucket).list(prefix, { limit: 1000 })
  if (error) throw new Error(`List failed for ${bucket}/${prefix}: ${error.message}`)
  if (!data?.length) return out

  for (const item of data) {
    const itemPath = prefix ? `${prefix}${item.name}` : item.name
    if (item.id == null) {
      out.push(...(await listAllPaths(supabase, bucket, `${itemPath}/`)))
    } else {
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(itemPath)
      out.push({ path: itemPath, publicUrl: urlData.publicUrl })
    }
  }
  return out
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const supabaseUrl = required('NEXT_PUBLIC_SUPABASE_URL')
  const projectHost = new URL(supabaseUrl).hostname

  const supabase = createClient(supabaseUrl, required('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  console.log('=== Supabase Storage inventory ===\n')
  for (const bucket of BUCKETS) {
    const objects = await listAllPaths(supabase, bucket)
    console.log(`${bucket}: ${objects.length} file(s)`)
    for (const obj of objects) {
      console.log(`  ${obj.path}`)
      console.log(`    ${obj.publicUrl}`)
    }
  }

  console.log('\n=== Database image_url references ===\n')

  const { data: menuRows, error: menuError } = await supabase
    .from('menu_items')
    .select('item_name, image_url')
    .not('image_url', 'is', null)
  if (menuError) throw new Error(`menu_items: ${menuError.message}`)

  const { data: eventRows, error: eventError } = await supabase
    .from('events')
    .select('title, image_url')
    .not('image_url', 'is', null)
  if (eventError) throw new Error(`events: ${eventError.message}`)

  const menuOnStorage = (menuRows || []).filter((r) =>
    isSupabaseStorageUrl(r.image_url as string, projectHost)
  )
  const eventsOnStorage = (eventRows || []).filter((r) =>
    isSupabaseStorageUrl(r.image_url as string, projectHost)
  )

  console.log(`menu_items with Supabase Storage URLs: ${menuOnStorage.length}`)
  for (const row of menuOnStorage) {
    console.log(`  ${row.item_name}: ${row.image_url}`)
  }

  console.log(`\nevents with Supabase Storage URLs: ${eventsOnStorage.length}`)
  for (const row of eventsOnStorage) {
    console.log(`  ${row.title}: ${row.image_url}`)
  }

  if (dryRun) {
    console.log('\n(dry-run) No changes made. Upload copies to your target CDN, then UPDATE image_url in Supabase SQL.')
  } else {
    console.log(
      '\nNext steps: copy files to Vercel Blob or /public, update image_url columns, deploy, then run cms:storage-cache-headers or remove public bucket access.'
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
