/**
 * One-time: set long-lived cache-control on existing menu-images / event-images objects.
 *
 * Usage: npm run cms:storage-cache-headers
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import './load-env'
import { createClient } from '@supabase/supabase-js'
import { STORAGE_UPLOAD_CACHE_CONTROL } from '../src/lib/images/compressImage'

const BUCKETS = ['menu-images', 'event-images'] as const

const required = (name: string): string => {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

async function listAllPaths(supabase: any, bucket: string, prefix = ''): Promise<string[]> {
  const paths: string[] = []
  const { data, error } = await supabase.storage.from(bucket).list(prefix, { limit: 1000 })
  if (error) throw new Error(`List failed for ${bucket}/${prefix}: ${error.message}`)
  if (!data?.length) return paths

  for (const item of data) {
    const itemPath = prefix ? `${prefix}${item.name}` : item.name
    if (item.id == null) {
      paths.push(...(await listAllPaths(supabase, bucket, `${itemPath}/`)))
    } else {
      paths.push(itemPath)
    }
  }
  return paths
}

async function main() {
  const supabase = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  let updated = 0
  let skipped = 0

  for (const bucket of BUCKETS) {
    const paths = await listAllPaths(supabase, bucket)
    console.log(`\n${bucket}: ${paths.length} object(s)`)

    for (const path of paths) {
      const { data: blob, error: downloadError } = await supabase.storage.from(bucket).download(path)
      if (downloadError || !blob) {
        console.warn(`  skip ${path}: ${downloadError?.message || 'empty download'}`)
        skipped += 1
        continue
      }

      const contentType = blob.type || 'image/jpeg'
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, blob, {
        upsert: true,
        cacheControl: STORAGE_UPLOAD_CACHE_CONTROL,
        contentType,
      })

      if (uploadError) {
        console.warn(`  skip ${path}: ${uploadError.message}`)
        skipped += 1
        continue
      }

      console.log(`  ok ${path}`)
      updated += 1
    }
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
