import './load-env'
import { createClient } from '@supabase/supabase-js'
import { normalizeAirtableEvent, normalizeAirtableMenuItem } from '../src/lib/cms/normalizers'
import type { AirtableRecord } from '../src/lib/cms/types'

type AirtableListResponse = {
  records?: AirtableRecord[]
  offset?: string
}

const required = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim()
}

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

async function fetchAllAirtableRecords(tableName: string): Promise<AirtableRecord[]> {
  const baseId = required('AIRTABLE_BASE_ID')
  const apiKey = required('AIRTABLE_API_KEY')
  const sortField = process.env.AIRTABLE_SORT_FIELD?.trim()

  const all: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`)
    url.searchParams.set('pageSize', '100')
    if (sortField) {
      url.searchParams.set('sort[0][field]', sortField)
      url.searchParams.set('sort[0][direction]', 'asc')
    }
    if (offset) url.searchParams.set('offset', offset)

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Airtable request failed (${res.status}) for ${tableName}: ${text}`)
    }

    const json = (await res.json()) as AirtableListResponse
    all.push(...(json.records || []))
    offset = json.offset
  } while (offset)

  return all
}

async function migrateEvents(supabase: any) {
  const db = supabase as any
  const tableName = required('AIRTABLE_EVENTS_TABLE')
  const records = await fetchAllAirtableRecords(tableName)
  console.log(`Found ${records.length} Airtable event records`)

  const { error: clearEventsError } = await db.from('events').delete().not('title', 'is', null)
  if (clearEventsError) {
    throw new Error(`Failed to clear events table before migration: ${clearEventsError.message}`)
  }

  for (const record of records) {
    const normalized = normalizeAirtableEvent(record)
    const { error } = await db.from('events').insert({
      title: normalized.title,
      description: normalized.description || null,
      start_at: normalized.start_at || null,
      end_at: normalized.end_at || null,
      all_guests: Boolean(normalized.all_guests),
      guest_limit: normalized.guest_limit ?? null,
      price_per_person: normalized.price_per_person ?? null,
      booking_url: normalized.booking_url || null,
      image_url: normalized.image_url || null,
    })

    if (error) {
      throw new Error(`Failed to insert event ${record.id}: ${error.message}`)
    }
  }
}

async function migrateMenu(supabase: any) {
  const db = supabase as any
  const tableName = required('AIRTABLE_MENU_TABLE')
  const records = await fetchAllAirtableRecords(tableName)
  console.log(`Found ${records.length} Airtable menu records`)

  for (const record of records) {
    const normalized = normalizeAirtableMenuItem(record)
    const { error } = await db
      .from('menu_items')
      .upsert(
        {
          item_name: normalized.item_name,
          description: normalized.description || '',
          course: normalized.course || '',
          meal: normalized.meal || '',
          price: normalized.price || null,
          tags: normalized.tags || '',
          image_url: normalized.image_url || null,
        },
        { onConflict: 'item_name,course' }
      )

    if (error) {
      throw new Error(`Failed to upsert menu item ${record.id}: ${error?.message || 'Unknown error'}`)
    }
  }
}

async function main() {
  const supabaseUrl = required('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = required('SUPABASE_SERVICE_ROLE_KEY')
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  console.log('Starting Airtable -> Supabase migration...')
  await migrateEvents(supabase)
  await migrateMenu(supabase)
  console.log('Migration complete.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
